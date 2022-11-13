import {
  AppBar,
  Box,
  Button,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ProductGrid from "../ProductGrid";
import { Fragment, MouseEventHandler, ReactElement, useContext } from "react";
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
  To,
} from "react-router-dom";
import SignIn from "../Auth/SignIn";
import RequireAuth from "../Auth/RequireAuth";
import { AuthContext, AuthProvider } from "../Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "../ProductDetail";
import React from "react";
import OperationLogGrid from "../OperationLogGrid";
import RequireRole from "../Auth/RequireRole";
import FabricGrid from "../FabricGrid";

function Dashboard({ children }: { children: ReactElement }) {
  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function onSignOut() {
    signOut();
    navigate("/");
  }

  return (
    <RequireAuth>
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Box>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItemLink onClick={handleCloseNavMenu} name="Products" to="/products"/>
                <MenuItemLink onClick={handleCloseNavMenu} name="Fabrics" to="/fabrics"/>
                <RequireRole authorizedRoles={["Admin"]}>
                  <MenuItemLink onClick={handleCloseNavMenu} name="Operation logs" to="/oplog"/>
                </RequireRole>
              </Menu>
            </Box>
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

function MenuItemLink({
  onClick,
  name,
  to
}: {
  onClick?: MouseEventHandler<HTMLLIElement>;
  name: string
  to: To
}) {
  return (
    <MenuItem key={name.toLowerCase()} onClick={onClick}>
      <Typography textAlign="center">
        <Link to={to} style={{ textDecoration: "none", color: "black" }}>
          {name}
        </Link>
      </Typography>
    </MenuItem>
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
              path="/products"
              element={<Dashboard children={<ProductGrid />} />}
            />
            <Route
              path="/products/:code"
              element={<Dashboard children={<ProductDetail />} />}
            />
            <Route
              path="/fabrics"
              element={<Dashboard children={<FabricGrid />} />}
            />
            <Route
              path="/fabrics/:code"
              element={<Dashboard children={<FabricGrid />} />}
            />
            <Route
              path="/oplog"
              element={<Dashboard children={<OperationLogGrid />} />}
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
