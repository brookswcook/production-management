import { Grid, Box, Typography } from "@mui/material";

export function DetailViewHeaderTitle({ title }: { title: string }) {
  return (
    <Grid item xs={12} sx={{ pl: 1, pt: 1 }}>
      <Box sx={{ mb: 2 }}>
        <Typography component="span" variant="h6" sx={{ mr: 5 }}>
          {title.toUpperCase()}
        </Typography>
      </Box>
    </Grid>
  );
}
