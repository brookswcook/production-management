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
  const isFile = /\.[0-9a-z]+$/.test(value);
  return (
    <Grid item container alignItems={"center"}>
      {title != null && (
        <Grid item xs={12}>
          <FieldTitle title={title} />
        </Grid>
      )}
      <Grid item xs={12}>
        {isEmail || isFile ? (
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
