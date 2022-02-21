import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useProductsQuery } from "../../generated/graphql";

export default function ProductGrid() {
  const { data, loading, error } = useProductsQuery({
    variables: {},
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  if (data == null || data.products == null)
    return <p>No products available</p>;

  const rows = data.products;
  const columns: GridColDef[] = [
    { field: "name", headerName: "Title", width: 150 },
    {
      field: "deliveryDate",
      headerName: "Delivery date",
      width: 200,
      type: "date",
      valueFormatter: params => {
        return new Date(params.value as string).toLocaleDateString();
      },
    },
    {
      field: "dueIn",
      headerName: "Due in",
      width: 100,
    },
  ];

  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item => item.name as string}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
