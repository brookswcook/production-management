import { Typography } from "@mui/material";

export function TextProperty({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Typography component="span" variant="subtitle2">
      {title}
      <Typography component="span" variant="body2" sx={{ pl: 3 }}>
        {value}
      </Typography>
    </Typography>
  );
}
