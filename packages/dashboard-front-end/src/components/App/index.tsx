import {
  AppBar,
  Avatar,
  Box,
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
  MouseEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import FabricGrid from "../Fabric/ListView/FabricList";
import { StyleDetail, StyleList } from "../Style";
import { UserList } from "../User";
import { getMessagingToken } from "../../firebase";
import { useCreateNotificationSubscriptionMutation } from "../../generated/graphql";
import useMessagingToken from "../Notification/useMessagingToken";
import { UserRole } from "dashboard-core";
import { ProductList, ProductDetail } from "../Product";
import { PurchaseOrderList, PurchaseOrderDetail } from "../PurchaseOrder";
import SignInWithEmailLink from "../Auth/SignInWithEmail";
import { FabricDetail } from "../Fabric";
import { FactoryList } from "../Factory";

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
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
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
          const { load: fingerprintLoad } = await import(
            "@fingerprintjs/fingerprintjs"
          );
          const fingerprintAgent = await fingerprintLoad();
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

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigationPaths: {
    path: string;
    name: string;
    authorizedRoles?: UserRole[];
  }[] = [
    { path: "products", name: "Products" },
    { path: "fabrics", name: "Fabrics" },
    { path: "styles", name: "Styles" },
    { path: "purchase-orders", name: "Purchase orders" },
    { path: "users", name: "Users", authorizedRoles: ["Admin"] },
    { path: "factories", name: "Factories", authorizedRoles: ["Admin"] },
  ];

  return (
    <RequireAuth>
      <>
        <AppBar position="static">
          <Toolbar>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
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
                  {navigationPaths.map(({ path, name, authorizedRoles }) => (
                    <RequireRole
                      authorizedRoles={authorizedRoles ?? []}
                      key={path}
                    >
                      <MenuItemLink
                        onClick={handleCloseNavMenu}
                        name={name}
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
                    Production Management
                  </Link>
                </Typography>
              </Grid>
              <Grid item sx={{ display: { xs: "none", md: "inline" } }}>
                {navigationPaths.map(({ path, name, authorizedRoles }) => (
                  <ToolbarNavigationButton
                    title={name}
                    path={path}
                    key={path}
                    authorizedRoles={authorizedRoles as UserRole[]}
                  />
                ))}
              </Grid>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/*TODO: add avatars */}
                  <Avatar alt={firstName} src="/static/images/" />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={() => {
                      signOut();
                      handleCloseUserMenu();
                    }}
                  >
                    <Typography textAlign="center">{"Logout"}</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
        {children}
      </>
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
        <Link
          to={to}
          style={{
            textDecoration: "none",
            color: "black",
            textTransform: "capitalize",
          }}
        >
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
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
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <ApolloApp />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
