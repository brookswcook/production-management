import { Grid, Box, Typography } from "@mui/material";
import { ReactElement } from "react";

export function DetailViewHeaderTitle({
  title,
}: {
  title: string;
}): ReactElement {
  return (
    <Grid item xs={12} sx={{ pl: 1, pt: 1 }}>
      <Box sx={{ mb: 2 }}>
        <Typography
          component="span"
          variant="h6"
          sx={{ mr: 5, textTransform: "uppercase" }}
        >
          {title}
        </Typography>
      </Box>
    </Grid>
  );
}
