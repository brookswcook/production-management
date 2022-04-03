import { TextField } from "@mui/material";
import { Fragment } from "react";

export function ObjectInputSet<T>({
  objectToRender,
  fields,
}: {
  objectToRender: Record<string, unknown> | null | undefined;
  fields: (keyof T)[];
}) {
  return (
    <Fragment>
      {fields
        .map(field => field.toString())
        .map(field => {
          const value = objectToRender ? objectToRender[field] : null;
          return (
            <TextField
              label={field
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .split(" ")
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(" ")}
              defaultValue={value}
              InputProps={{
                readOnly: true,
              }}
              key={field}
              variant="standard"
            />
          );
        })}
    </Fragment>
  );
}
