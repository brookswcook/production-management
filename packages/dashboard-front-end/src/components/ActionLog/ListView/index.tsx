import { Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { ReactElement } from "react";
import {
  ActionLogListFieldsFragment,
  useActionLogsQuery,
  User,
} from "../../../generated/graphql";

export default function ActionLogList({
  entityIds,
  entityTypes,
}: {
  entityIds: string[];
  entityTypes: string[];
}): ReactElement {
  const { data, loading, error } = useActionLogsQuery({
    variables: { data: { entityIds, entityTypes } },
  });

  const columns: GridColDef<ActionLogListFieldsFragment>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 70,
      flex: 2,
      type: "string",
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 40,
      flex: 1,
      type: "string",
      valueFormatter: params => {
        const user = params.value as User;
        return user.firstName;
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 70,
      flex: 2,
      type: "date",
      valueFormatter: params => {
        const date = new Date(params.value as string);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  ];

  const rows: ActionLogListFieldsFragment[] = data ? data.actionLogs : [];

  return (
    <Grid item xs={12}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item => item.id}
        pageSize={100}
        loading={loading}
        error={error}
        autoHeight
        components={{
          Toolbar: GridToolbar,
          ErrorOverlay: () => {
            return (
              <Typography variant="h6" style={{ whiteSpace: "nowrap" }}>
                {error?.message}
              </Typography>
            );
          },
        }}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        sx={{ mt: 1 }}
      />
    </Grid>
  );
}
