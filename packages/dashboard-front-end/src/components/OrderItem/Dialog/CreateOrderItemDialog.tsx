import ActionDialog from "../../ActionDialog/ActionDialog";
import CreateOrderItemForm from "../Form/CreateOrderItemForm";

export default function CreateOrderItemDialog({
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
  return (
    <ActionDialog
      title={`Add items to the order`}
      open={open}
      onClose={onClose}
      form="createOrderItem"
    >
      <CreateOrderItemForm onSubmit={onSave} orderUid={orderUid} />
    </ActionDialog>
  );
}
