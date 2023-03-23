import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateOrderItemMutation } from "../../../generated/graphql";
import { ActionDialog } from "../../Common/ActionDialog";
import { CreateOrderItemBulkyForm, OrderItemBulkyFormType } from "../Form";

export function CreateOrderItemByVariantSetsDialog({
  orderUid,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  orderUid: number;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  const [variantSetsData, setVariantSetsData] =
    useState<OrderItemBulkyFormType>();
  const [newOrderItem] = useCreateOrderItemMutation({
    refetchQueries: [
      "PurchaseOrder",
      "OrderItems",
      "ActionLogs",
      "OrderItemsGroupedByAttributes",
    ],
  });

  async function createOrderItemsByVariantSets() {
    if (variantSetsData == null) return;
    const { productCode, pricePerItem, variantSets } = variantSetsData;
    try {
      for await (const { attributes, quantity } of variantSets) {
        await newOrderItem({
          variables: {
            data: {
              orderUid,
              productCode,
              quantity: Number(quantity),
              price: Number(pricePerItem),
              variantAttributes: attributes,
            },
          },
        });
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  return (
    <ActionDialog
      title="Add order items"
      open={open}
      onClose={onClose}
      form="createOrderItemBulkyForm"
    >
      <CreateOrderItemBulkyForm
        onSubmit={async e => {
          e.preventDefault();
          await createOrderItemsByVariantSets();
          onSave();
        }}
        onChange={setVariantSetsData}
        id="createOrderItemBulkyForm"
      />
    </ActionDialog>
  );
}
