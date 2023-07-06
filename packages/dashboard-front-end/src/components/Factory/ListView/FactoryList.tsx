import { Button } from "@mui/material";
import { GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { ReactElement, useState } from "react";
import {
  FactoryListFieldsFragment,
  useFactoriesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand, ListView } from "../../ListView";
import CreateFactoryDialog from "../Dialog/CreateFactoryDialog";

export default function FactoryList(): ReactElement {
  const [createFactoryDialogOpen, setCreateFactoryDialogOpen] = useState(false);
  const { data, loading, error } = useFactoriesQuery({});
  const rows: FactoryListFieldsFragment[] = data?.factories ?? [];

  const columns: GridColDef<FactoryListFieldsFragment>[] = [
    // {
    //   field: "code",
    //   headerName: "Code",
    //   minWidth: 250,
    //   flex: 1,
    //   type: "string",
    // },
    {
      field: "name",
      headerName: "Name",
      minWidth: 250,
      flex: 2,
      renderCell: renderCellExpand,
      type: "string",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 210,
      flex: 1,
      type: "string",
      valueGetter: ({ row }: { row: FactoryListFieldsFragment }) => {
        return row.contacts[0]?.email ?? "";
      },
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 300,
      flex: 5,
      renderCell: renderCellExpand,
      type: "string",
    },
  ];

  function CustomToolbar() {
    return (
      <>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <Button
              variant={"text"}
              size={"small"}
              onClick={() => setCreateFactoryDialogOpen(true)}
            >
              Add factory
            </Button>
          </RequireRole>
        </GridToolbarContainer>
      </>
    );
  }

  return (
    <>
      <CreateFactoryDialog
        open={createFactoryDialogOpen}
        onSave={() => setCreateFactoryDialogOpen(false)}
        onClose={() => setCreateFactoryDialogOpen(false)}
      />
      <ListView
        name="factories"
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
    </>
  );
}
