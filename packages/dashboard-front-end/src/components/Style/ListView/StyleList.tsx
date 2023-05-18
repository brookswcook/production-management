import { Box } from "@mui/material";
import {
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import {
  StyleFieldsFragment,
  useStylesQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { ListView } from "../../ListView";
import CreateStylePopperButton from "../Popper/CreateStylePopperButton";

export default function StyleList(): ReactElement {
  const { data, loading, error } = useStylesQuery({});
  const rows: StyleFieldsFragment[] = data?.styles ?? [];

  const columns: GridColDef<StyleFieldsFragment>[] = [
    {
      field: "name",
      headerName: "Name",
      minWidth: 70,
      flex: 3,
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
      minWidth: 50,
      flex: 1,
      type: "string",
    },
    {
      field: "techPackUploaded",
      description: "Tech pack is uploaded",
      headerName: "Tech pack uploaded",
      minWidth: 50,
      flex: 1,
      type: "boolean",
    },
    {
      field: "productCodes",
      headerName: "Associated Products",
      minWidth: 100,
      flex: 5,
      valueGetter: ({ row }: { row: StyleFieldsFragment }) => {
        return row.productCodes;
      },
      // TODO: reuse
      renderCell({
        value: productCodes,
      }: GridRenderCellParams<string[], StyleFieldsFragment>) {
        return productCodes?.map(code => (
          <Box key={code} sx={{ whiteSpace: "pre" }}>
            <Link to={`/products/${code}`} style={{ textDecoration: "none" }}>
              {code}
            </Link>
            {"  "}
          </Box>
        ));
      },
    },
  ];

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <RequireRole authorizedRoles={["Admin", "VChapman"]}>
          <CreateStylePopperButton />
        </RequireRole>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  return (
    <ListView
      rows={rows}
      columns={columns}
      getRowId={item => item.code}
      loading={loading}
      error={error}
      autoHeight
      components={{
        Toolbar: CustomToolbar,
      }}
      disableSelectionOnClick
    />
  );
}
