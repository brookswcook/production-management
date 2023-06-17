import { TypographyProps, Typography } from "@mui/material";

export default function FieldTitle({
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
