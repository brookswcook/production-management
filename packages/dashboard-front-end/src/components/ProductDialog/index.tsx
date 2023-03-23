import {
  Box,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  ProductBulkProductionCostDiscount,
  useProductQuery,
  useUpdateCostMutation,
} from "../../generated/graphql";
import { ActionDialog } from "../Common/ActionDialog";
import FloatTextField from "../Common/FloatTextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export function UpdateProductionCostDialog({
  productCode: code,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  productCode: string;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  const [{ cost, bulkProductionCostDiscounts }, setCostData] = useState<{
    cost: number;
    bulkProductionCostDiscounts: ProductBulkProductionCostDiscount[];
  }>({ cost: 0, bulkProductionCostDiscounts: [] });
  const [newCostMutation] = useUpdateCostMutation({
    refetchQueries: ["Product"],
  });
  const { data, error, loading } = useProductQuery({
    variables: { code },
  });

  useEffect(() => {
    if (data == null) return;
    const { cost, bulkProductionCostDiscounts } = data.product.production;
    setCostData({
      cost,
      bulkProductionCostDiscounts: bulkProductionCostDiscounts.map(
        ({ discount, discountType, quantityThreshold }) => ({
          discount,
          discountType,
          quantityThreshold,
        })
      ),
    });
  }, [data]);

  async function updateCostDialogHandle() {
    await newCostMutation({
      variables: {
        data: {
          code,
          productionCost: cost,
          bulkProductionCostDiscounts,
        },
      },
    });
    onSave();
  }

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error) return <>An error occured</>;

  return (
    <ActionDialog
      title="Update costs"
      open={open}
      onClose={onClose}
      form="createProductionCostDiscountForm"
    >
      <Grid
        container
        rowSpacing={1}
        component={"form"}
        id="createProductionCostDiscountForm"
        onSubmit={async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          await updateCostDialogHandle();
        }}
      >
        <Grid item xs={12}>
          <FloatTextField
            fullWidth
            label="New base cost"
            value={cost}
            onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
              setCostData({ cost: Number(value), bulkProductionCostDiscounts })
            }
            required
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography component="h4" variant="inherit">
            Discounts based on quantities{" "}
            <IconButton
              size="medium"
              color="secondary"
              onClick={() => {
                const bulkProductionCostDiscount: ProductBulkProductionCostDiscount =
                  {
                    quantityThreshold: 0,
                    discount: 0,
                    discountType: "currency",
                  };
                setCostData({
                  cost,
                  bulkProductionCostDiscounts: [
                    ...bulkProductionCostDiscounts,
                    bulkProductionCostDiscount,
                  ],
                });
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              size="medium"
              color="secondary"
              onClick={() => {
                const withoutLast = bulkProductionCostDiscounts.slice(0, -1);
                setCostData({
                  cost,
                  bulkProductionCostDiscounts: withoutLast,
                });
              }}
            >
              <RemoveIcon />
            </IconButton>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {bulkProductionCostDiscounts != null ? (
            bulkProductionCostDiscounts.map((discountData, index) => (
              <CreateProductionCostDiscountForm
                key={index}
                discountData={discountData}
                onChange={value => {
                  bulkProductionCostDiscounts[index] = value;
                  setCostData({
                    cost: cost,
                    bulkProductionCostDiscounts,
                  });
                }}
              />
            ))
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </ActionDialog>
  );
}

function CreateProductionCostDiscountForm({
  discountData,
  onChange,
}: {
  discountData: ProductBulkProductionCostDiscount;
  onChange: (value: ProductBulkProductionCostDiscount) => void;
}) {
  return (
    <Grid container columnSpacing={{ xs: 1 }}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Qty from"
          value={discountData.quantityThreshold}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            const data = {
              ...discountData,
              quantityThreshold: Number(value),
            };
            onChange(data);
          }}
          required
          type={"number"}
          inputProps={{ min: 0 }}
          sx={{ mt: 1 }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FloatTextField
          fullWidth
          label="Discount per unit, $"
          value={discountData.discount}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            const data = { ...discountData, discount: Number(value) };
            onChange(data);
          }}
          required
          type={"number"}
          sx={{ mt: 1 }}
        />
      </Grid>
    </Grid>
  );
}
