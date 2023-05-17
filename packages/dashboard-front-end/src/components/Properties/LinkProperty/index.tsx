import { Grid } from "@mui/material";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { FieldTitle } from "../../Common/Typography";

export function LinkProperty({
  title,
  baseUrl,
  resources,
}: {
  title: string;
  baseUrl: string;
  resources: { id: string; text: string }[];
}): ReactElement {
  return (
    <Grid item container columnGap={2} alignItems={"center"}>
      <Grid item xs={12}>
        <FieldTitle title={title} />
      </Grid>
      {resources.map(({ id, text }) => (
        <Grid item key={id}>
          <Link
            key={id}
            to={`/${baseUrl}/${id}`}
            style={{ textDecoration: "none" }}
          >
            {text}
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}
