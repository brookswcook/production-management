import { Box, Grid, Typography } from "@mui/material";
import { ReactElement } from "react";
import { BooleanProperty } from "../BooleanProperty";
import { TextProperty } from "../TextProperty";

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
  return (
    <Box component="fieldset">
      <legend>{title}</legend>
      <Grid item container columnGap={2} alignItems={"center"}>
        <>
          {Object.entries(value)
            .filter(([, entryValue]) => entryValue != null)
            .map(([key, entryValue]) => {
              const entryValueType = typeof entryValue;
              return (
                <Grid item key={key}>
                  <Typography component="div" variant="caption">
                    {key}
                  </Typography>
                  {entryValueType === "string" ||
                  entryValueType === "number" ? (
                    <TextProperty value={entryValue as string} />
                  ) : entryValueType === "boolean" ? (
                    <Typography component="div" variant="h5">
                      <BooleanProperty value={entryValue as boolean} />
                    </Typography>
                  ) : (
                    <></>
                  )}
                </Grid>
              );
            })}
        </>
      </Grid>
    </Box>
  );
}
