import { Button, Grid } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FileType } from "dashboard-core";
import { FileFieldsFragment } from "../../../generated/graphql";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ListView } from "../../ListView";

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
      <ListView
        name="file-list"
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
        sx={{ mt: 1 }}
        disableGutters
      />
    </Grid>
  );
}
