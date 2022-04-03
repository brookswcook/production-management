import { TextField } from "@mui/material";
import { Fragment } from "react";

export function ObjectInputSet({
  objectToRender,
  fields,
}: {
  objectToRender: object | { [x: string]: string };
  fields: string[];
}) {
  return (
    <Fragment>
      {Object.entries(objectToRender)
        .filter(([objectKey]) =>
          fields.some(fieldToRender => fieldToRender === objectKey)
        )
        .map(([label, value]) => (
          <TextField
            label={label
              .replace(/([a-z])([A-Z])/g, "$1 $2")
              .split(" ")
              .map(s => s.charAt(0).toUpperCase() + s.substring(1))
              .join(" ")}
            defaultValue={value as string}
            InputProps={{
              readOnly: true,
            }}
            key={label}
            variant="standard"
          />
        ))}
    </Fragment>
  );
}
