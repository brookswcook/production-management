import { Container } from "@mui/material";
import { GridColDef, GridToolbarContainer, DataGrid } from "@mui/x-data-grid";
import { ReactElement } from "react";
import {
  FactoryListFieldsFragment,
  useFactoriesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand } from "../../Common/GridCellExpand";
import { CreateFactoryPopperButton } from "../Form";

export function FactoryList(): ReactElement {
  const { data, loading, error } = useFactoriesQuery({});
  const rows: FactoryListFieldsFragment[] = data?.factories ?? [];

  const columns: GridColDef<FactoryListFieldsFragment>[] = [
    {
      field: "code",
      headerName: "Code",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 70,
      flex: 1,
      renderCell: renderCellExpand,
      type: "string",
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 70,
      flex: 3,
      renderCell: renderCellExpand,
      type: "string",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 70,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: FactoryListFieldsFragment }) => {
        return row.contacts[0]?.email ?? "";
      },
    },
  ];

  function CustomToolbar() {
    return (
      <>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <CreateFactoryPopperButton />
          </RequireRole>
        </GridToolbarContainer>
      </>
    );
  }

  return (
    <Container maxWidth="xl">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item => item.code}
        loading={loading}
        error={error}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            pageSize: 10,
          },
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        disableSelectionOnClick
        sx={{ mt: 1 }}
      />
    </Container>
  );
}
