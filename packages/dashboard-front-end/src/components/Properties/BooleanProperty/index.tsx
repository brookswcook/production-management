import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { Grid } from "@mui/material";
import { ReactElement } from "react";
import { FieldTitle } from "../../Common/Typography";

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
        <Grid item xs={12}>
          <FieldTitle title={title} />
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
