import { Button, Grid } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { FileType } from "dashboard-core";
import { FileFieldsFragment } from "../../generated/graphql";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ReactElement } from "react";

export function FileGrid({
  files,
}: {
  parentID: string;
  fileType: FileType;
  files: FileFieldsFragment[];
}): ReactElement {
  const columns: GridColDef<FileFieldsFragment>[] = [
    {
      field: "createdAt",
      headerName: "Upload time",
      type: "date",
      flex: 1,
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "contributor",
      headerName: "Contributor",
      type: "string",
      flex: 1,
      valueGetter: ({ row }: { row: FileFieldsFragment }) => {
        return row.user?.fullName ?? "";
      },
    },
    {
      field: "link",
      headerName: "Download Copy",
      type: "string",
      flex: 1,
      renderCell: (params: GridCellParams<string>) => (
        <Button
          href={params.value ?? "#"}
          target="_blank"
          variant={"text"}
          size={"medium"}
        >
          <FileDownloadOutlinedIcon fontSize="large" color="action" />
        </Button>
      ),
    },
  ];

  return (
    <Grid item xs={12}>
      <DataGrid
        rows={files ?? []}
        columns={columns}
        getRowId={item => item.id}
        initialState={{
          pagination: {
            pageSize: 5,
          },
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        disableSelectionOnClick={true}
        autoHeight
        sx={{ mt: 1 }}
      />
    </Grid>
  );
}
