import { Grid } from "@mui/material";
import { ReactElement } from "react";
import { FieldTitle } from "./Typography";

export function DetailViewSection({
  children,
  title,
}: {
  children: JSX.Element[] | JSX.Element;
  title?: string;
}): ReactElement {
  return (
    <Grid item container xs={12}>
      <FieldTitle style={{ color: "inherit", textTransform: "capitalize" }}>
        {title}
      </FieldTitle>
      {children}
    </Grid>
  );
}
