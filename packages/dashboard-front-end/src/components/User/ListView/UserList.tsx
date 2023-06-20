import { Button } from "@mui/material";
import { GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { ReactElement, useState } from "react";
import {
  UserListFieldsFragment,
  useUsersQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { ListView } from "../../ListView";
import CreateUserDialog from "../Dialog/CreateUserDialog";

export default function UserList(): ReactElement {
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const { data, loading, error } = useUsersQuery({});
  const rows: UserListFieldsFragment[] = data?.users ?? [];

  const columns: GridColDef<UserListFieldsFragment>[] = [
    {
      field: "fullName",
      headerName: "Name",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 70,
      flex: 1,
      type: "string",
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "active",
      headerName: "Active",
      minWidth: 50,
      flex: 1,
      type: "boolean",
      valueGetter: params => !params.value,
    },
    {
      field: "emailVerified",
      headerName: "Email Verified",
      minWidth: 50,
      flex: 1,
      type: "boolean",
      valueGetter: ({ row }: { row: UserListFieldsFragment }) => {
        return row.firebaseUser?.emailVerified ?? false;
      },
    },
    {
      field: "creationTime",
      headerName: "Creation Time",
      minWidth: 70,
      flex: 1,
      type: "date",
      valueGetter: ({ row }: { row: UserListFieldsFragment }) => {
        return row.firebaseUser?.metadata?.creationTime ?? new Date(0);
      },
      valueFormatter: params => {
        const date = new Date(params.value as string);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
    {
      field: "lastSignInTime",
      headerName: "Last Sign In Time",
      minWidth: 70,
      flex: 1,
      type: "date",
      valueGetter: ({ row }: { row: UserListFieldsFragment }) => {
        return row.firebaseUser?.metadata.lastSignInTime ?? new Date(0);
      },
      valueFormatter: params => {
        const date = new Date(params.value as string);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <RequireRole authorizedRoles={["Admin", "VChapman"]}>
          <Button
            variant={"text"}
            size={"small"}
            onClick={() => setCreateUserDialogOpen(true)}
          >
            Add User
          </Button>
        </RequireRole>
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <CreateUserDialog
        open={createUserDialogOpen}
        onSave={() => setCreateUserDialogOpen(false)}
        onClose={() => setCreateUserDialogOpen(false)}
      />
      <ListView
        rows={rows}
        columns={columns}
        getRowId={item => item.id}
        loading={loading}
        error={error}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
        disableSelectionOnClick
      />
    </>
  );
}
