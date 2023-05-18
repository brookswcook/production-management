import { TypographyProps, Typography } from "@mui/material";

export default function DetailViewHeaderDataValue({
  title,
  children,
  ...typographyProps
}: { title?: string } & TypographyProps) {
  return (
    <Typography
      variant="subtitle2"
      style={{ textTransform: "uppercase", color: "gray" }}
      {...typographyProps}
    >
      {title}
      {children}
    </Typography>
  );
}
