import { Box, Container } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  StyleFieldsFragment,
  useStylesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { CreateStylePopperButton } from "../Form";

export function StyleList() {
  const { data, loading, error } = useStylesQuery({});
  const rows: StyleFieldsFragment[] = data?.styles ?? [];

  const columns: GridColDef<StyleFieldsFragment>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 70,
      flex: 3,
      renderCell({ id, formattedValue }: GridRenderCellParams) {
        const linkPath = `/styles/${id}`;
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
      headerName: "Number",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "techPackUploaded",
      description: "Tech pack is uploaded",
      headerName: "Tech pack uploaded",
      minWidth: 50,
      flex: 1,
      type: "boolean",
    },
    {
      field: "productCodes",
      headerName: "Associated Products",
      minWidth: 100,
      flex: 5,
      valueGetter: ({ row }: { row: StyleFieldsFragment }) => {
        return row.productCodes;
      },
      // TODO: reuse
      renderCell({
        value: productCodes,
      }: GridRenderCellParams<string[], StyleFieldsFragment>) {
        return productCodes?.map(code => (
          <Box key={code} sx={{ whiteSpace: "pre" }}>
            <Link to={`/products/${code}`} style={{ textDecoration: "none" }}>
              {code}
            </Link>
            {"  "}
          </Box>
        ));
      },
    },
  ];

  function CustomToolbar() {
    return (
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <CreateStylePopperButton />
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
    </Container>
  );
}
