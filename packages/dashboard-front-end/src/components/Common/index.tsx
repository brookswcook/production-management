import { TextField } from "@mui/material";
import { Fragment } from "react";

export function ObjectInputSet<T>({
  objectToRender,
  fields,
}: {
  objectToRender: Record<string, unknown> | null | undefined;
  fields: (keyof T)[];
}) {
  const keyValueTupleToShow = Object.entries(objectToRender ?? {}).filter(
    ([objectKey]) => fields.some(fieldToRender => fieldToRender === objectKey)
  );

  return (
    <Fragment>
      {keyValueTupleToShow.map(([label, value]) => (
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
