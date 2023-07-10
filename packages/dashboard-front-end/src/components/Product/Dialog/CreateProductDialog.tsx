import { Suspense, lazy } from "react";
import ActionDialog from "../../ActionDialog/ActionDialog";

const CreateProductForm = lazy(() => import("../Form/CreateProductForm"));

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
      <Suspense fallback={<div>loading</div>}>
        <CreateProductForm onSubmit={onSave} />
      </Suspense>
    </ActionDialog>
  );
}
