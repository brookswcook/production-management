import { Grid } from "@mui/material";
import { ReactElement } from "react";
import { FieldTitle, FieldValue } from "../../Common/Typography";

export function TextProperty({
  value,
  title,
}: {
  value: string;
  title?: string;
}): ReactElement {
  const isEmail = /\S+@\S+\.\S+/.test(value);
  return (
    <Grid item container columnGap={1} alignItems={"center"}>
      {title != null && (
        <Grid item xs={12}>
          <FieldTitle title={title} />
        </Grid>
      )}
      <Grid item>
        {isEmail ? (
          <FieldValue style={{ textTransform: "lowercase" }}>
            {value}
          </FieldValue>
        ) : (
          <FieldValue>{value}</FieldValue>
        )}
      </Grid>
    </Grid>
  );
}
