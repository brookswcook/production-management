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
import { VariantAttributeSet } from "./types";

//TODO: move to another file for attributes
function stringifyAttributes(
  attributes: { key: string; value: string }[]
): string | null {
  return attributes.length > 0
    ? attributes.map(({ key, value }) => `${key}: ${value}`).join("; ")
    : null;
}

export function VariantAttributeSetTable({
  variantSets,
}: {
  variantSets: VariantAttributeSet[];
}) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {variantSets.map(({ attributes, id }) => {
                  const stringifiedAttributes = stringifyAttributes(attributes);
                  return (
                    <TableCell align="right" key={id}>
                      {stringifiedAttributes}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {variantSets.map(row => (
                  <TableCell align="right" key={row.id}>
                    {row.quantity}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
