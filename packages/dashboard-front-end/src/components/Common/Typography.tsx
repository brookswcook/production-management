import { Typography, TypographyProps } from "@mui/material";

export function FieldTitle({
  title,
  ...typographyProps
}: { title: string } & TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      style={{ textTransform: "capitalize", color: "gray" }}
      {...typographyProps}
    >
      {title}
    </Typography>
  );
}

export function FieldValue({
  value,
  ...typographyProps
}: { value: string } & TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      style={{ textTransform: "capitalize" }}
      {...typographyProps}
    >
      {value}
    </Typography>
  );
}
