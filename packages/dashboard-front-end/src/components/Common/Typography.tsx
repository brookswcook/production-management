import { Typography } from "@mui/material";

export function FieldTitle({ title }: { title: string }) {
  return (
    <Typography
      variant="subtitle2"
      style={{ textTransform: "capitalize", color: "gray" }}
    >
      {title}
    </Typography>
  );
}

export function FieldValue({ value }: { value: string }) {
  return (
    <Typography variant="subtitle2" style={{ textTransform: "capitalize" }}>
      {value}
    </Typography>
  );
}
