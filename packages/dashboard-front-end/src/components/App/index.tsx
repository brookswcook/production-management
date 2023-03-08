import {
  AppBar,
  Button,
  createTheme,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Fragment,
  MouseEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import createApolloClient from "../../apolloClient";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Link,
  To,
} from "react-router-dom";
import SignIn from "../Auth/SignIn";
import RequireAuth from "../Auth/RequireAuth";
import { AuthContext, AuthProvider } from "../Auth/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import RequireRole from "../Auth/RequireRole";
import FabricGrid from "../FabricGrid";
import { FabricDetail } from "../FabricDetail";
import { StyleDetail, StyleList } from "../Style";
import { SignInWithEmailLink } from "../Auth/SignInWithEmail";
import { UserList } from "../User";
import { FactoryList } from "../Factory/ListView";
import { ProductDetail, ProductList } from "../Product";
import { PurchaseOrderList, PurchaseOrderDetail } from "../PurchaseOrder";

function Dashboard({ children }: { children: ReactElement }): ReactElement {
  const { signOut } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { decodedToken } = useContext(AuthContext);
  const firstName = decodedToken?.firstName ?? "";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <RequireAuth>
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Grid
                container
                item
                xs={8}
                md={10}
                alignItems={"center"}
                justifyContent={"left"}
              >
                <Grid item xs="auto" sx={{ display: { md: "none" } }}>
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
                    <MenuItemLink
                      onClick={handleCloseNavMenu}
                      name="Products"
                      to="/products"
                    />
                    <MenuItemLink
                      onClick={handleCloseNavMenu}
                      name="Fabrics"
                      to="/fabrics"
                    />
                    <MenuItemLink
                      onClick={handleCloseNavMenu}
                      name="Styles"
                      to="/styles"
                    />
                    <RequireRole authorizedRoles={["Admin"]}>
                      <MenuItemLink
                        onClick={handleCloseNavMenu}
                        name="Users"
                        to="/users"
                      />
                    </RequireRole>
                    <RequireRole authorizedRoles={["Admin"]}>
                      <MenuItemLink
                        onClick={handleCloseNavMenu}
                        name="Factories"
                        to="/factories"
                      />
                    </RequireRole>
                    <MenuItemLink
                      onClick={handleCloseNavMenu}
                      name="Purchase Orders"
                      to="/purchase-orders"
                    />
                  </Menu>
                </Grid>
                <Grid item container alignItems={"center"} gap={3} xs={10}>
                  <Grid item xs={"auto"}>
                    <Button variant="text" size="small">
                      <Typography variant="h6" sx={{ color: "white" }}>
                        <Link
                          to="/"
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Production Management App
                        </Link>
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item sx={{ display: { xs: "none", md: "inline" } }}>
                    {["products", "fabrics", "styles", "purchase-orders"].map(
                      item => (
                        <Button variant="text" size="small" key={item}>
                          <Link
                            to={`/${item}`}
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {item}
                          </Link>
                        </Button>
                      )
                    )}
                    <RequireRole authorizedRoles={["Admin"]}>
                      <Button variant="text" size="small">
                        <Link
                          to={`/users`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Users
                        </Link>
                      </Button>
                    </RequireRole>
                    <RequireRole authorizedRoles={["Admin"]}>
                      <Button variant="text" size="small">
                        <Link
                          to={`/factories`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          Factories
                        </Link>
                      </Button>
                    </RequireRole>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                item
                xs={4}
                md={2}
                alignItems={"center"}
                justifyContent={"end"}
              >
                <Grid item>
                  <Typography
                    component={"span"}
                    variant={"button"}
                    sx={{ whiteSpace: "nowrap", overflow: "hidden" }}
                  >
                    {`Hi ${firstName}, `}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button color="inherit" onClick={signOut}>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Grid>
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
  to,
}: {
  onClick?: MouseEventHandler<HTMLLIElement>;
  name: string;
  to: To;
}): ReactElement {
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
  const { token, signOut } = useContext(AuthContext);
  const [apolloClient, setApolloClient] = useState<
    ApolloClient<NormalizedCacheObject>
  >(createApolloClient(token, signOut));

  useEffect(() => {
    setApolloClient(createApolloClient(token, signOut));
  }, [token]);

  return (
    <ApolloProvider client={apolloClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/singinwithemaillink"
              element={<SignInWithEmailLink />}
            />
            <Route
              path="/"
              element={<Dashboard children={<ProductList />} />}
            />
            <Route
              path="/products"
              element={<Dashboard children={<ProductList />} />}
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
              element={<Dashboard children={<FabricDetail />} />}
            />
            <Route
              path="/styles"
              element={<Dashboard children={<StyleList />} />}
            />
            <Route
              path="/styles/:code"
              element={<Dashboard children={<StyleDetail />} />}
            />
            <Route
              path="/users"
              element={<Dashboard children={<UserList />} />}
            />
            <Route
              path="/factories"
              element={<Dashboard children={<FactoryList />} />}
            />
            <Route
              path="/purchase-orders"
              element={<Dashboard children={<PurchaseOrderList />} />}
            />
            <Route
              path="/purchase-orders/:uid"
              element={<Dashboard children={<PurchaseOrderDetail />} />}
            />
          </Routes>
        </Router>
        <ToastContainer />
      </LocalizationProvider>
    </ApolloProvider>
  );
}

export default function App(): ReactElement {
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
