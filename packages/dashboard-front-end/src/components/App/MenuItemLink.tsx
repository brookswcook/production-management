import { MenuItem, Typography } from "@mui/material";
import { MouseEventHandler } from "react";
import { To, Link } from "react-router-dom";

export default function MenuItemLink({
  onClick,
  name,
  to,
}: {
  onClick?: MouseEventHandler<HTMLLIElement>;
  name: string;
  to: To;
}) {
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
