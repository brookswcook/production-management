import { Box, LinearProgress } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  ProductBulkProductionCostDiscount,
  useProductQuery,
  useUpdateCostMutation,
} from "../../generated/graphql";
import { ActionDialog } from "../Common/ActionDialog";
import FloatTextField from "../Common/FloatTextField";

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
  const [costData, setCostData] = useState<{
    cost: number;
    bulkProductionCostDiscounts?: ProductBulkProductionCostDiscount[];
  } | null>(null);
  const [newCostMutation] = useUpdateCostMutation({
    refetchQueries: ["Product"],
  });
  const { data, error, loading } = useProductQuery({
    variables: { code },
  });

  useEffect(() => {
    if (data == null) return;
    const { cost, bulkProductionCostDiscounts } = data.product.production;
    setCostData({ cost, bulkProductionCostDiscounts });
  }, [data]);

  async function updateCostDialogHandle() {
    costData &&
      (await newCostMutation({
        variables: {
          data: {
            code,
            productionCost: costData.cost,
            bulkProductionCostDiscounts: [],
          },
        },
      }));
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
      onSave={updateCostDialogHandle}
      onClose={onClose}
    >
      <FloatTextField
        label="New base cost"
        value={costData != null ? costData.cost : 0}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setCostData({ ...costData, cost: Number(value) })
        }
        required
        sx={{ mt: 1 }}
      />
    </ActionDialog>
  );
}
