import { Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export function ObjectProperty({
  title,
  value,
}: {
  title: string;
  value: Record<string, string | boolean>;
}) {
  const stringValueProperty = (value: string) => (
    <Typography component="div" variant="overline">
      {value}
    </Typography>
  );
  const booleanValueProperty = (value: boolean) => {
    const sx = { pl: 3, textAlign: "center", verticalAlign: "text-bottom" };
    return (
      <Typography component="div" variant="overline">
        {value ? (
          <CheckIcon fontSize={"small"} sx={sx} />
        ) : (
          <CloseIcon fontSize={"small"} sx={sx} />
        )}
      </Typography>
    );
  };
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
            const entryValueType = typeof entryValue;
            return (
              <Grid item sx={{ pl: 3 }} key={key}>
                <Typography component="div" variant="caption">
                  {key}
                </Typography>
                {/* TODO: reuse existing string and boolean property components */}
                {entryValueType === "string"
                  ? stringValueProperty(entryValue as string)
                  : booleanValueProperty(entryValue as boolean)}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
