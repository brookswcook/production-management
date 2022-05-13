import { Container, Grid, Typography } from "@mui/material";
import {
  OperationLogFieldsFragment,
  useOperationLogsQuery,
  User,
} from "../../generated/graphql";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { renderCellExpand } from "../Common/GridCellExpand";

export default function OperationLogGrid() {
  const { data, loading, error } = useOperationLogsQuery({
    variables: {},
  });

  const columns: GridColDef[] = [
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
    {
      field: "name",
      headerName: "Operation name",
      minWidth: 70,
      flex: 2,
      type: "string",
    },
    {
      field: "variables",
      headerName: "Variables",
      minWidth: 70,
      flex: 15,
      type: "string",
      renderCell: renderCellExpand,
    },
  ];

  const rows: OperationLogFieldsFragment[] = data ? data.operationLogs : [];

  return (
    <Container maxWidth="xl">
      <Grid item xs={12}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={item => item.id as string}
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
    </Container>
  );
}
