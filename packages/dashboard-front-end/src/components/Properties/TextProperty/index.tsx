import { Grid, Typography } from "@mui/material";
import { ReactElement } from "react";

export function TextProperty({
  value,
  title,
}: {
  value: string;
  title?: string;
}): ReactElement {
  return (
    <Grid container columnGap={2} alignItems={"center"}>
      {title != null && (
        <Grid item>
          <Typography variant="subtitle2">{title}</Typography>
        </Grid>
      )}
      <Grid item>
        <Typography variant="overline">{value}</Typography>
      </Grid>
    </Grid>
  );
}
