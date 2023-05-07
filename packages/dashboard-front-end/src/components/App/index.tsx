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
import { getMessagingToken } from "../../firebase";
import { useCreateNotificationSubscriptionMutation } from "../../generated/graphql";
import useMessagingToken from "../Notification/useMessagingToken";
import fingerprintjs from "@fingerprintjs/fingerprintjs";
import { UserRole } from "dashboard-core";

function ToolbarNavigationButton({
  title,
  path,
  authorizedRoles = [],
}: {
  title: string;
  path: string;
  authorizedRoles?: UserRole[];
}) {
  return (
    <RequireRole authorizedRoles={authorizedRoles}>
      <Button variant="text" size="small">
        <Link
          to={`/${path}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          {title}
        </Link>
      </Button>
    </RequireRole>
  );
}

function Dashboard({ children }: { children: ReactElement }): ReactElement {
  const { signOut } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const { messagingToken: savedMessagingToken, setMessagingToken } =
    useMessagingToken();
  const [newNotificationSubscription] =
    useCreateNotificationSubscriptionMutation();

  useEffect(() => {
    async function requestNotificationsPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getMessagingToken();
        if (savedMessagingToken !== token) {
          const fingerprintAgent = await fingerprintjs.load();
          const { visitorId: fingerprint } = await fingerprintAgent.get();
          await newNotificationSubscription({
            variables: { data: { token, fingerprint } },
          });
          setMessagingToken(token);
        }
      }
    }
    void requestNotificationsPermission();
  }, []);

  const { decodedToken } = useContext(AuthContext);
  const firstName = decodedToken?.firstName ?? "";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigationPaths: { path: string; authorizedRoles?: UserRole[] }[] = [
    { path: "products" },
    { path: "fabrics" },
    { path: "styles" },
    { path: "purchase-orders" },
    { path: "users", authorizedRoles: ["Admin"] },
    { path: "factories", authorizedRoles: ["Admin"] },
  ];

  return (
    <RequireAuth>
      <Fragment>
        <AppBar position="static">
          <Toolbar>
            <Grid container alignItems={"center"}>
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
                  {navigationPaths.map(({ path, authorizedRoles }) => (
                    <RequireRole authorizedRoles={authorizedRoles ?? []}>
                      <MenuItemLink
                        onClick={handleCloseNavMenu}
                        name={path}
                        to={`/${path}`}
                      />
                    </RequireRole>
                  ))}
                </Menu>
              </Grid>
              <Grid item xs={"auto"}>
                <Typography variant="button" sx={{ color: "white" }}>
                  <Link
                    to="/"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Production Management App
                  </Link>
                </Typography>
              </Grid>
              <Grid item sx={{ display: { xs: "none", md: "inline" } }}>
                {navigationPaths.map(({ path, authorizedRoles }) => (
                  <ToolbarNavigationButton
                    title={path}
                    path={path}
                    key={path}
                    authorizedRoles={authorizedRoles as UserRole[]}
                  />
                ))}
              </Grid>
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
