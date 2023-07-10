import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ReactElement, useContext, useState, FormEvent } from "react";
import { AuthContext } from "./AuthProvider";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  sendEmailVerification,
} from "firebase/auth";
import { firebaseAuth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoginResult, useLoginMutation } from "../../generated/graphql";
import { config } from "../../config";

type JSONValue = string | number | { [x: string]: JSONValue };

export function Copyright(props: { [x: string]: JSONValue }): ReactElement {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/brookswcook">
        Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn(): ReactElement {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authType, setAuthType] = useState<string>("");
  const [loginMutation] = useLoginMutation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      if (authType === "password") {
        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );
        if (!userCredential.user.emailVerified) {
          toast.error(
            "User email is not verified. Verification email was sent"
          );
          return await sendEmailVerification(userCredential.user);
        }
        const firebaseToken = await userCredential.user.getIdToken(true);
        const { data: loginData } = await loginMutation({
          variables: { data: { token: firebaseToken } },
        });
        const { token } = (loginData?.login as LoginResult) ?? {
          token: null,
        };
        signIn({ token });
        navigate("/", { replace: true });
      } else if (authType === "passwordless") {
        const actionCodeSettings = {
          url: `${config.appURI}/singinwithemaillink`,
          handleCodeInApp: true,
        };
        await sendSignInLinkToEmail(firebaseAuth, email, actionCodeSettings);
        window.localStorage.setItem("emailForSignIn", email);
        toast.info(`Verification link was sent to ${email}`);
      }
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error.code);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Unknown error");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            type={"email"}
            onChange={({ target: { value } }) => {
              setEmail(value);
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type={"password"}
            id="password"
            autoComplete="current-password"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setAuthType("password")}
          >
            Sign In
          </Button>
          <Divider>or</Divider>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => setAuthType("passwordless")}
          >
            Sign in with verification link
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </Box>
      </Box>
      {/* {<Copyright sx={{ mt: 8, mb: 4 }} />} */}
    </Container>
  );
}
