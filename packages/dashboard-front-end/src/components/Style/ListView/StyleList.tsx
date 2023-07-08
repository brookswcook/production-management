import { Button } from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import {
  StyleFieldsFragment,
  useStylesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { ListView } from "../../ListView";
import LinkColumn from "../../ListView/LinkColumn";
import CreateStyleDialog from "../Dialog/CreateStyleDialog";

export default function StyleList(): ReactElement {
  const [createStyleDialogOpen, setCreateStyleDialogOpen] = useState(false);
  const { data, loading } = useStylesQuery({});
  const rows: StyleFieldsFragment[] = data?.styles ?? [];

  const columns: GridColDef<StyleFieldsFragment>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 120,
      flex: 1,
      renderCell({ id, formattedValue }: GridRenderCellParams) {
        const linkPath = `/styles/${id}`;
        const linkText = `${String(formattedValue)}`;
        return (
          <Link to={linkPath} style={{ textDecoration: "none" }}>
            {linkText}
          </Link>
        );
      },
    },
    {
      field: "code",
      headerName: "Number",
      minWidth: 100,
      flex: 1,
      type: "string",
    },
    {
      field: "techPackUploaded",
      description: "Tech pack is uploaded",
      headerName: "Tech pack uploaded",
      minWidth: 180,
      flex: 1,
      type: "boolean",
    },
    {
      field: "productCodes",
      headerName: "Associated Products",
      minWidth: 190,
      flex: 5,
      valueGetter: ({ row }: { row: StyleFieldsFragment }) => {
        return row.productCodes;
      },
      renderCell({
        value: productCodes,
      }: GridRenderCellParams<any, string[], StyleFieldsFragment>) {
        return (
          <LinkColumn linkIds={productCodes ?? []} linkPath="/products/" />
        );
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
            onClick={() => setCreateStyleDialogOpen(true)}
          >
            Add style
          </Button>
        </RequireRole>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <>
      <CreateStyleDialog
        open={createStyleDialogOpen}
        onSave={() => setCreateStyleDialogOpen(false)}
        onClose={() => setCreateStyleDialogOpen(false)}
      />
      <ListView
        name="styles"
        rows={rows}
        columns={columns}
        getRowId={item => item.code}
        loading={loading}
        autoHeight
        slots={{
          toolbar: CustomToolbar,
        }}
        disableRowSelectionOnClick
      />
    </>
  );
}
