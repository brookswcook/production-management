import ActionDialog from "../../ActionDialog/ActionDialog";
import CreatePurchaseOrderForm from "../Form/CreatePurchaseOrderForm";

export default function CreatePurchaseOrderDialog({
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  return (
    <ActionDialog
      title={`Add purchase order`}
      open={open}
      onClose={onClose}
      form="createPurchaseOrder"
    >
      <CreatePurchaseOrderForm onSubmit={onSave} />
    </ActionDialog>
  );
}
