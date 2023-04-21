import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { VariantAttributeSet } from "./types";

export function stringifyAttributes(
  attributes: { key: string; value: string }[]
) {
  return attributes.length > 0
    ? attributes.map(({ key, value }) => `${key}: ${value}`).join("; ")
    : "No Attributes";
}

export function stringifyVariantSetsAttributes({
  variantSets,
}: {
  variantSets: { attributes: { key: string; value: string }[] }[];
}): string[] {
  return variantSets.reduce<string[]>((acc, { attributes }) => {
    const attributesIdentifier = stringifyAttributes(attributes);
    return [...acc, attributesIdentifier];
  }, []);
}

export function VariantAttributeSetTable({
  productCode,
}: {
  productCode?: string;
}) {
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 180, editable: true },
  ];

  const rows: GridRowsProp = [
    {
      id: 1,
      name: "size_01",
      editable: true,
    },
  ];

  return (
    <Grid container>
      <DataGrid autoHeight editMode="row" rows={rows} columns={columns} />
    </Grid>
  );

  // return (
  //   <Grid container>
  //     <Grid item xs={12}>
  //       <TableContainer component={Paper}>
  //         <Table>
  //           <TableHead>
  //             <TableRow>
  //               {variantSets.map(({ attributes, id }) => {
  //                 const stringifiedAttributes = stringifyAttributes(attributes);
  //                 return (
  //                   <TableCell align="right" key={id}>
  //                     {stringifiedAttributes}
  //                   </TableCell>
  //                 );
  //               })}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             <TableRow>
  //               {variantSets.map(row => (
  //                 <TableCell align="right" key={row.id}>
  //                   {row.quantity}
  //                 </TableCell>
  //               ))}
  //             </TableRow>
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //     </Grid>
  //   </Grid>
  // );
}
