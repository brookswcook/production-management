import { Grid } from "@mui/material";
import { ReactElement } from "react";
import { FieldTitle } from "../Typography";

export default function DetailViewSection({
  children,
  title,
}: {
  children: JSX.Element[] | JSX.Element;
  title?: string;
}): ReactElement {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <FieldTitle style={{ color: "inherit", textTransform: "capitalize" }}>
          {title}
        </FieldTitle>
      </Grid>
      <Grid item xs={12}>
        {children}
      </Grid>
    </Grid>
  );
}
