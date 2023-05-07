import { TextField } from "@mui/material";
import { ReactElement } from "react";

export function ObjectInputSet<T>({
  objectToRender,
  fields,
}: {
  objectToRender: Record<string, unknown> | null | undefined;
  fields: (keyof T)[];
}): ReactElement {
  return (
    <>
      {fields
        .map(field => field.toString())
        .map(field => {
          const value = objectToRender ? objectToRender[field] : null;
          const label = field
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
          return (
            <TextField
              label={label}
              defaultValue={value}
              InputProps={{
                readOnly: true,
              }}
              key={field}
              size="small"
              variant="standard"
            />
          );
        })}
    </>
  );
}
