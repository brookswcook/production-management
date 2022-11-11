import { Container, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function FabricGrid() {
  return (
    <Container>
      <Grid>
        <DataGrid rows={[]} columns={[]}/>
      </Grid>
    </Container>
  )
}