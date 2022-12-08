import { Box, Button } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { FileType } from "dashboard-core";
import { FileFieldsFragment } from "../../generated/graphql";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export function FileGrid({
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
    <Box sx={{ height: "300px", width: "100%", pt: 1 }}>
      <DataGrid
        rows={files ?? []}
        columns={columns}
        pageSize={5}
        getRowId={item => item.id}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick={true}
        // onSelectionModelChange={selectionModel =>
        //   setSelectedGridItems(selectionModel)
        // }
        // components={{
        //   Toolbar: CustomToolbar,
        // }}
      />
    </Box>
  );
}
