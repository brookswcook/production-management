import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { SxProps, Theme, Typography } from "@mui/material";
import { ReactElement } from "react";

export function BooleanProperty({
  title,
  value,
  //fontSize = "small",
  sx = { pl: 3, textAlign: "center", verticalAlign: "text-bottom" },
}: {
  title: string;
  value: boolean;
  //fontSize?: "inherit" | "large" | "medium" | "small";
  sx?: SxProps<Theme>;
}): ReactElement {
  const fontSize = "small";
  return (
    <Typography component="span" variant="subtitle2">
      {title}
      {value ? (
        <CheckIcon fontSize={fontSize} sx={sx} />
      ) : (
        <CloseIcon fontSize={fontSize} sx={sx} />
      )}
    </Typography>
  );
}
