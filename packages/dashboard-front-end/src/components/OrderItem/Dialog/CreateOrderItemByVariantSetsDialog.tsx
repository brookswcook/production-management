import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateOrderItemMutation } from "../../../generated/graphql";
import { ActionDialog } from "../../Common/ActionDialog";
import {
  CreateOrderItemBulkyDropdownForm,
  OrderItemBulkyFormType,
} from "../Form";
import { CreateOrderItemBulkyTableForm } from "../Form/CreateOrderItemBulkyTableForm";

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
  const theme = useTheme();
  const greaterThanXS = useMediaQuery(theme.breakpoints.up("sm"));

  async function createOrderItemsByVariantAttributeSets() {
    if (variantSetsData == null) return;
    const { productCode, pricePerItem, variantAttributeSets } = variantSetsData;
    try {
      for await (const { attributes, quantity } of variantAttributeSets) {
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
      {greaterThanXS ? (
        <CreateOrderItemBulkyTableForm
          onSubmit={async e => {
            e.preventDefault();
            await createOrderItemsByVariantAttributeSets();
            onSave();
          }}
          onChange={setVariantSetsData}
          id="createOrderItemBulkyForm"
        />
      ) : (
        <CreateOrderItemBulkyDropdownForm
          onSubmit={async e => {
            e.preventDefault();
            await createOrderItemsByVariantAttributeSets();
            onSave();
          }}
          onChange={setVariantSetsData}
          id="createOrderItemBulkyForm"
        />
      )}
    </ActionDialog>
  );
}
