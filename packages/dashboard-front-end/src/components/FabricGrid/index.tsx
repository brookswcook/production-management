import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { FabricFieldsFragment, useFabricsQuery } from "../../generated/graphql";
import { Fragment } from "react";
import { CreateFabricPopperButton } from "../FabricForm";
import RequireRole from "../Auth/RequireRole";

export default function FabricGrid() {
  const { data, loading, error } = useFabricsQuery({});
  const rows: FabricFieldsFragment[] = data?.fabrics ?? [];

  const columns: GridColDef<FabricFieldsFragment>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 70,
      flex: 3,
      renderCell({ id, formattedValue }: GridRenderCellParams) {
        const linkPath = `/fabrics/${id}`;
        const linkText = `${String(formattedValue)}`;
        return (
          <Link to={linkPath} style={{ textDecoration: "none" }}>
            {linkText}
          </Link>
        );
      },
    },
    {
      field: "code",
      headerName: "Code",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "colorName",
      headerName: "Color Name",
      minWidth: 120,
      flex: 2,
      type: "string",
    },
    {
      field: "stage",
      headerName: "Stage",
      minWidth: 70,
      flex: 2,
      type: "string",
    },
    {
      field: "productCodes",
      headerName: "Associated Products",
      minWidth: 100,
      flex: 5,
      valueGetter: ({ row }: { row: FabricFieldsFragment }) => {
        return row.productCodes;
      },
      renderCell({
        value: productCodes,
      }: GridRenderCellParams<string[], FabricFieldsFragment>) {
        return productCodes?.map(code => (
          <div key={code} style={{ whiteSpace: "pre" }}>
            <Link to={`/products/${code}`} style={{ textDecoration: "none" }}>
              {code}
            </Link>
            {"  "}
          </div>
        ));
      },
    },
  ];

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <CreateFabricPopperButton />
          </RequireRole>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarExport />
        </GridToolbarContainer>
      </Fragment>
    );
  }

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={item => item.code}
          pageSize={100}
          loading={loading}
          error={error}
          autoHeight
          components={{
            Toolbar: CustomToolbar,
          }}
          disableSelectionOnClick
          sx={{ mt: 1 }}
        />
      </Grid>
    </Container>
  );
}
