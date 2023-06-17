import { TypographyProps, Typography } from "@mui/material";

export default function DetailViewHeaderTitle({
  title,
  children,
  ...typographyProps
}: { title?: string } & TypographyProps) {
  return (
    <Typography
      variant="h6"
      sx={{ textTransform: "uppercase" }}
      {...typographyProps}
    >
      {title}
      {children}
    </Typography>
  );
}
