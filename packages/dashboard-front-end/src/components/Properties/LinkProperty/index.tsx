import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function LinkProperty({
  title,
  baseUrl,
  resources,
}: {
  title: string;
  baseUrl: string;
  resources: { id: string; text: string }[];
}) {
  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
    >
      <Grid item>
        <Typography component="span" variant="subtitle2">
          {title}
        </Typography>
      </Grid>
      {resources.map(({ id, text }) => (
        <Grid item sx={{ pl: 3 }} key={id}>
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
