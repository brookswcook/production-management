import { Container, Box, Grid } from "@mui/material";
import { ReactElement } from "react";

export function DetailView({
  headerSections,
  children,
}: {
  headerSections: JSX.Element[] | JSX.Element;
  children: JSX.Element[] | JSX.Element;
}): ReactElement {
  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 1 }}>
        <Grid
          justifyContent={"left"}
          container
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "4px",
            p: 1,
          }}
        >
          {headerSections}
        </Grid>
      </Box>
      {children}
    </Container>
  );
}
