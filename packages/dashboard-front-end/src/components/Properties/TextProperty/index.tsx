import { Typography } from "@mui/material";
import { ReactElement } from "react";

export function TextProperty({
  title,
  value,
  vertical = false,
}: {
  title: string;
  value: string;
  vertical?: boolean;
}): ReactElement {
  return (
    <Typography component={vertical ? "div" : "span"} variant="subtitle2">
      {title}
      <Typography
        component={vertical ? "div" : "span"}
        variant="overline"
        sx={{ pl: 3 }}
      >
        {value}
      </Typography>
    </Typography>
  );
}
