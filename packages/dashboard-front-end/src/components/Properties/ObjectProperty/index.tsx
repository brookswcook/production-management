import { Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { ReactElement } from "react";

interface PropertyObject {
  [x: string]: PropertyValue;
}
type PropertyValue =
  | string
  | number
  | boolean
  | null
  | PropertyObject
  | Array<PropertyValue>;

export function ObjectProperty({
  title,
  value,
}: {
  title: string;
  value: Record<string, PropertyValue>;
}): ReactElement {
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
        <Typography
          component="span"
          variant="subtitle2"
          style={{ whiteSpace: "pre" }}
        >
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
          {Object.entries(value)
            .filter(([, entryValue]) => entryValue != null)
            .map(([key, entryValue]) => {
              const entryValueType = typeof entryValue;
              return (
                <Grid item sx={{ pl: 3 }} key={key}>
                  <Typography component="div" variant="caption">
                    {key}
                  </Typography>
                  {/* TODO: reuse existing string and boolean property components */}
                  {entryValueType === "string" ||
                  entryValueType === "number" ? (
                    stringValueProperty(String(entryValue))
                  ) : entryValueType === "boolean" ? (
                    booleanValueProperty(entryValue as boolean)
                  ) : (
                    <></>
                  )}
                </Grid>
              );
            })}
        </Grid>
      </Grid>
    </Grid>
  );
}
