import {
  Container,
  CssBaseline,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { FirebaseError } from "firebase/app";
import { signInWithEmailLink } from "firebase/auth";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginResult, useLoginMutation } from "../../generated/graphql";
import { AuthContext } from "./AuthProvider";
import { firebaseAuth as auth } from "../../firebase";

export function SignInWithEmailLink(): ReactElement {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginMutation] = useLoginMutation();

  const [storagedAuthEmail] = useState<string | null>(
    window.localStorage.getItem("emailForSignIn")
  );
  const [authEmail, setAuthEmail] = useState<string>("");

  useEffect(() => {
    if (storagedAuthEmail != null) {
      void handleSignInWithEmailLink();
    }
  }, []);

  async function handleSignInWithEmailLink() {
    try {
      const userCredential = await signInWithEmailLink(
        auth,
        storagedAuthEmail ?? authEmail,
        window.location.href
      );
      window.localStorage.removeItem("emailForSignIn");
      const firebaseToken = await userCredential.user.getIdToken(true);
      const { data: loginData } = await loginMutation({
        variables: { data: { token: firebaseToken } },
      });
      const { token } = (loginData?.login as LoginResult) ?? {
        token: null,
      };
      signIn({ token });
      navigate("/", { replace: true });
    } catch (error) {
      if (error instanceof FirebaseError) toast.error(error.code);
      else if (error instanceof Error) toast.error(error.message);
      else toast.error("Unknown error");
    }
  }

  return storagedAuthEmail == null ? (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 1,
        }}
      >
        <Typography component="h1" variant="h5">
          Please provide your email for confirmation
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          autoComplete="email"
          type={"email"}
          onChange={({ target: { value } }) => {
            setAuthEmail(value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignInWithEmailLink}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  ) : (
    <></>
  );
}
