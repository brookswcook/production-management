import { TypographyProps, Typography } from "@mui/material";

export default function FieldValue({
  children,
  ...typographyProps
}: TypographyProps) {
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
