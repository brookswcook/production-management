import { GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { ReactElement } from "react";
import {
  FactoryListFieldsFragment,
  useFactoriesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand } from "../../Common/GridCellExpand";
import { ListView } from "../../Common/ListView";
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
    <ListView
      rows={rows}
      columns={columns}
      getRowId={item => item.code}
      loading={loading}
      error={error}
      components={{
        Toolbar: CustomToolbar,
      }}
      disableSelectionOnClick
    />
  );
}
