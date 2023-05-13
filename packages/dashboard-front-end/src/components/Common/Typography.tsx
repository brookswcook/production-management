import { Typography, TypographyProps } from "@mui/material";

export function FieldTitle({
  title,
  children,
  ...typographyProps
}: { title?: string } & TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      style={{ textTransform: "capitalize", color: "gray" }}
      {...typographyProps}
    >
      {title}
      {children}
    </Typography>
  );
}

export function FieldValue({ children, ...typographyProps }: TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      style={{ textTransform: "capitalize" }}
      {...typographyProps}
    >
      {children}
    </Typography>
  );
}
