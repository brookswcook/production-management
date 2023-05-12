import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Grid, Typography } from "@mui/material";
import { ReactElement } from "react";

export function BooleanProperty({
  value,
  title,
}: {
  value: boolean;
  title?: string;
}): ReactElement {
  return (
    <Grid container columnGap={2}>
      {title != null && (
        <Grid item>
          <Typography component="span" variant="subtitle2">
            {title}
          </Typography>
        </Grid>
      )}
      <Grid item>
        {value ? (
          <CheckIcon fontSize={"small"} color="success" />
        ) : (
          <CloseIcon fontSize={"small"} color="error" />
        )}
      </Grid>
    </Grid>
  );
}
