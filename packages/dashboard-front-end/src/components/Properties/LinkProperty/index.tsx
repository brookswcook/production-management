import { Grid, Typography } from "@mui/material";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

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
    <Grid container columnGap={2} alignItems={"center"}>
      <Grid item>
        <Typography component="span" variant="subtitle2">
          {title}
        </Typography>
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
