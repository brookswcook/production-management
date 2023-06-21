import ActionDialog from "../../ActionDialog/ActionDialog";
import CreateProductForm from "../Form/CreateProductForm";

export default function CreateProductDialog({
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
      title={`Create new product`}
      open={open}
      onClose={onClose}
      form="createProduct"
    >
      <CreateProductForm onSubmit={onSave} />
    </ActionDialog>
  );
}
