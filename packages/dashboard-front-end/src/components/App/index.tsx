import {
  AppBar,
  Button,
  createTheme,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProductGrid from "../ProductGrid";
import { Fragment, ReactElement, useContext } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "../../apolloClient";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  Link,
} from "react-router-dom";
import SignIn from "../Auth/SignIn";
import RequireAuth from "../Auth/RequireAuth";
import { AuthContext, AuthProvider } from "../Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "../ProductDetail";

function Dashboard({ children }: { children: ReactElement }) {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  function onSignOut() {
    signOut();
    navigate("/");
  }

  return (
    <RequireAuth>
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Button variant="text" size="small">
              <Typography variant="h6" sx={{ color: "white" }}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Production Management
                </Link>
              </Typography>
            </Button>
            <Button color="inherit" onClick={onSignOut} sx={{ ml: "auto" }}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {children}
      </Fragment>
    </RequireAuth>
  );
}

function ApolloApp() {
  const { token } = useContext(AuthContext);
  const client = createApolloClient(token);

  return (
    <ApolloProvider client={client}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/"
              element={<Dashboard children={<ProductGrid />} />}
            />
            <Route
              path="/products/:code"
              element={<Dashboard children={<ProductDetail />} />}
            />
          </Routes>
        </Router>
        <ToastContainer />
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default function App() {
  const theme = createTheme();
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ApolloApp />
        </AuthProvider>
      </ThemeProvider>
    </Fragment>
  );
}
