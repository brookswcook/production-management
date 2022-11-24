import { Grid, Typography } from "@mui/material";

export function ObjectProperty({
  title,
  value,
}: {
  title: string;
  value: Record<string, string>;
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
      <Grid item>
        <Grid
          container
          direction={"row"}
          justifyContent="flex-start"
          alignItems="baseline"
        >
          {Object.entries(value).map(([key, entryValue]) => {
            return (
              <Grid item sx={{ pl: 3 }} key={key}>
                <Typography component="div" variant="caption">
                  {key}
                </Typography>
                <Typography component="div" variant="overline">
                  {entryValue}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
