import { ChangeEvent, useState } from "react";
import { useUpdateCostMutation } from "../../generated/graphql";
import { ActionDialog } from "../Common/ActionDialog";
import FloatTextField from "../Common/FloatTextField";

export function UpdateProductionCostDialog({
  productCode: code,
  currentCost,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  productCode: string;
  currentCost: number;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  const [newCost, setNewCost] = useState<number | null>(null);
  const [newCostMutation] = useUpdateCostMutation({
    refetchQueries: ["Product"],
  });

  async function updateCostDialogHandle() {
    newCost &&
      (await newCostMutation({
        variables: { data: { code, productionCost: newCost } },
      }));
    onSave();
  }

  return (
    <ActionDialog
      title="Update costs"
      open={open}
      onSave={updateCostDialogHandle}
      onClose={onClose}
    >
      <FloatTextField
        label="New base cost"
        value={newCost != null ? newCost : currentCost}
        onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
          setNewCost(Number(value))
        }
        required
        sx={{ mt: 1 }}
      />
    </ActionDialog>
  );
}
