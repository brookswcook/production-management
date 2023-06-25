import { Link } from "react-router-dom";
import {
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  FabricFieldsFragment,
  useFabricsQuery,
} from "../../../generated/graphql";
import { ReactElement, useState } from "react";
import RequireRole from "../../Auth/RequireRole";
import { renderCellExpand, ListView } from "../../ListView";
import CreateFabricDialog from "../Dialog/CreateFabricDialog";
import { Button } from "@mui/material";
import { HideableGridColDef } from "../../ListView/types";
import LinkColumn from "../../ListView/LinkColumn";

export default function FabricList(): ReactElement {
  const [createFabricDialogOpen, setCreateFabricDialogOpen] = useState(false);
  const { data, loading, error } = useFabricsQuery({});
  const rows: FabricFieldsFragment[] = data?.fabrics ?? [];

  const columns: HideableGridColDef<FabricFieldsFragment>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 220,
      flex: 3,
      renderCell({ id, formattedValue }: GridRenderCellParams) {
        const linkPath = `/fabrics/${id}`;
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
      headerName: "Code",
      minWidth: 70,
      flex: 1,
      type: "string",
    },
    {
      field: "colorName",
      headerName: "Color Name",
      minWidth: 130,
      flex: 2,
      type: "string",
      hideOnMobile: true,
    },
    {
      field: "stage",
      headerName: "Stage",
      minWidth: 130,
      flex: 2,
      type: "string",
    },
    {
      field: "factoryCode",
      headerName: "Factory",
      minWidth: 120,
      flex: 2,
      type: "string",
      renderCell: renderCellExpand,
      valueGetter: ({ row }: { row: FabricFieldsFragment }) => {
        return row.factory.name;
      },
      hideOnMobile: true,
    },
    {
      field: "productCodes",
      headerName: "Associated Products",
      minWidth: 150,
      flex: 5,
      valueGetter: ({ row }: { row: FabricFieldsFragment }) => {
        return row.productCodes;
      },
      renderCell({
        value: productCodes,
      }: GridRenderCellParams<string[], FabricFieldsFragment>) {
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
            onClick={() => setCreateFabricDialogOpen(true)}
          >
            Add fabric
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
      <CreateFabricDialog
        open={createFabricDialogOpen}
        onSave={() => setCreateFabricDialogOpen(false)}
        onClose={() => setCreateFabricDialogOpen(false)}
      />
      <ListView
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
