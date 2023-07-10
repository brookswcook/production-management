import { Grid, IconButton, Menu } from "@mui/material";
import { Suspense, lazy, MouseEvent } from "react";
import RequireRole from "../Auth/RequireRole";
import MenuItemLink from "./MenuItemLink";
import { UserRole } from "dashboard-core";

const MenuIcon = lazy(() => import("@mui/icons-material/Menu"));

export default function NavigationMenu({
  navigationPaths,
  anchorElNav,
  handleOpenNavMenu,
  handleCloseNavMenu,
}: {
  navigationPaths: {
    path: string;
    name: string;
    authorizedRoles?: UserRole[];
  }[];
  anchorElNav: HTMLElement | null;
  handleOpenNavMenu: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCloseNavMenu: () => void;
}) {
  return (
    <Grid item>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={handleOpenNavMenu}
      >
        <Suspense fallback={<span></span>}>
          <MenuIcon />
        </Suspense>
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
          <RequireRole authorizedRoles={authorizedRoles ?? []} key={path}>
            <MenuItemLink
              onClick={handleCloseNavMenu}
              name={name}
              to={`/${path}`}
            />
          </RequireRole>
        ))}
      </Menu>
    </Grid>
  );
}
