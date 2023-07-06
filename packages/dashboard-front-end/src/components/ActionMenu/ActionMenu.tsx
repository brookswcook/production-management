import { Menu, MenuItem } from "@mui/material";
import { ReactElement } from "react";

export default function ActionMenu({
  anchorEl,
  onClose,
  children,
}: {
  anchorEl: HTMLElement | null;
  onClose: () => void;
  children: ReactElement[];
}): ReactElement {
  return (
    <Menu
      id="menu-actions"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      keepMounted
      onClose={onClose}
    >
      {children.map((child, index) => {
        return <MenuItem key={`menu-actions-item-${index}`}>{child}</MenuItem>;
      })}
    </Menu>
  );
}
