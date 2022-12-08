import { Paper, Typography } from "@mui/material";
import { ReactElement } from "react";

export function DetailViewSection({
  children,
  headerTitle,
}: {
  children: JSX.Element[] | JSX.Element;
  headerTitle: string;
}): ReactElement {
  return (
    <Paper elevation={0} sx={{ p: 1 }}>
      <Typography component="h4" variant="inherit">
        {headerTitle}
      </Typography>
      {children}
    </Paper>
  );
}
