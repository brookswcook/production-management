import { Container, Grid } from "@mui/material";
import { DataGrid, DataGridProps, GridValidRowModel } from "@mui/x-data-grid";
import { RefAttributes } from "react";

export function ListView<R extends GridValidRowModel = any>(
  props: DataGridProps<R> & RefAttributes<HTMLDivElement>
) {
  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <DataGrid
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          sx={{
            mt: 1,
            border: "2px solid rgba(224, 224, 224, 1)",
            borderRadius: 4,
          }}
          autoHeight
          {...props}
        />
      </Grid>
    </Container>
  );
}
