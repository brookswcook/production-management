import { Container } from "@mui/material";
import { DataGrid, GridColDef, GridToolbarContainer } from "@mui/x-data-grid";
import { Fragment, ReactElement } from "react";
import {
  UserListFieldsFragment,
  useUsersQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { CreateUserPopperButton } from "../Form";

export function UserList(): ReactElement {
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
      <Fragment>
        <GridToolbarContainer>
          <RequireRole authorizedRoles={["Admin", "VChapman"]}>
            <CreateUserPopperButton />
          </RequireRole>
        </GridToolbarContainer>
      </Fragment>
    );
  }

  return (
    <Container maxWidth="xl">
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item => item.id}
        loading={loading}
        error={error}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
        }}
        initialState={{
          pagination: {
            pageSize: 20,
          },
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        disableSelectionOnClick
        sx={{ mt: 1 }}
      />
    </Container>
  );
}
