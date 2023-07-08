import { Button, Grid } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FileType } from "dashboard-core";
import { FileFieldsFragment } from "../../../generated/graphql";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export default function FileList({
  files,
}: {
  parentID: string;
  fileType: FileType;
  files: FileFieldsFragment[];
}) {
  const columns: GridColDef<FileFieldsFragment>[] = [
    {
      field: "createdAt",
      headerName: "Upload time",
      minWidth: 130,
      type: "date",
      flex: 1,
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "contributor",
      headerName: "Contributor",
      minWidth: 130,
      type: "string",
      flex: 1,
      valueGetter: ({ row }: { row: FileFieldsFragment }) => {
        return row.user?.fullName ?? "";
      },
    },
    {
      field: "link",
      headerName: "Download Copy",
      minWidth: 150,
      type: "string",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, string>) => (
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
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
        disableRowSelectionOnClick={true}
        autoHeight
        sx={{ mt: 1 }}
        disableColumnMenu
      />
    </Grid>
  );
}
