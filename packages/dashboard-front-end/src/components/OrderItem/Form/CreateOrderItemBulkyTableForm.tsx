export function CreateOrderItemBulkyTableForm() {
  return <></>;
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
  //     <Grid item container gap={1}>
  //       <Grid item xs={12} sm={"auto"}>
  //         <Typography
  //           component="h4"
  //           variant="subtitle2"
  //         >{`Total quantity: ${totalQuantity}`}</Typography>
  //       </Grid>
  //       <Grid item xs={12} sm={"auto"}>
  //         <Typography
  //           component="h4"
  //           variant="subtitle2"
  //         >{`Total price: ${toCurrency(totalPrice)}`}</Typography>
  //       </Grid>
  //       <Grid item xs={12} sm={"auto"}>
  //         {discountPerItem !== 0 && (
  //           <Typography component="h4" variant="subtitle2">
  //             Discount: {`${toCurrency(discountPerItem)}/unit is applied`}
  //           </Typography>
  //         )}
  //       </Grid>
  //     </Grid>
  //   </Grid>
  // );
}
