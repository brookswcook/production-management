import {
  useMediaQuery,
  AppBar as MuiAppBar,
  Toolbar,
  Grid,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
  useTheme,
} from "@mui/material";
import { UserRole } from "dashboard-core";
import {
  ReactElement,
  useContext,
  useEffect,
  useState,
  Suspense,
  MouseEvent,
} from "react";
import { Link } from "react-router-dom";
import { useCreateNotificationSubscriptionMutation } from "../../generated/graphql";
import { AuthContext } from "../Auth/AuthProvider";
import useMessagingToken from "../Notification/useMessagingToken";
import RequireRole from "../Auth/RequireRole";
import NavigationMenu from "./NavigationMenu";

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

export default function AppBar(): ReactElement {
  const { signOut } = useContext(AuthContext);
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { messagingToken: savedMessagingToken, setMessagingToken } =
    useMessagingToken();
  const [newNotificationSubscription] =
    useCreateNotificationSubscriptionMutation();
  const theme = useTheme();
  const greaterThanSM = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    async function requestNotificationsPermission() {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const getMessagingToken = await import("../../firebase").then(
          module => module.getMessagingToken
        );
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

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
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
    <MuiAppBar position="static">
      <Toolbar>
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
          {!greaterThanSM && (
            <Suspense fallback={<span></span>}>
              <NavigationMenu
                navigationPaths={navigationPaths}
                anchorElNav={anchorElNav}
                handleCloseNavMenu={handleCloseNavMenu}
                handleOpenNavMenu={handleOpenNavMenu}
              />
            </Suspense>
          )}
          <Grid item xs={"auto"}>
            <Typography variant="button" sx={{ color: "white" }}>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Production Management
              </Link>
            </Typography>
          </Grid>
          {greaterThanSM && (
            <Grid item>
              {navigationPaths.map(({ path, name, authorizedRoles }) => (
                <ToolbarNavigationButton
                  title={name}
                  path={path}
                  key={path}
                  authorizedRoles={authorizedRoles as UserRole[]}
                />
              ))}
            </Grid>
          )}
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
    </MuiAppBar>
  );
}
