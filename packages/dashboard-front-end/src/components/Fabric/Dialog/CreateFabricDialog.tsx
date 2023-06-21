import ActionDialog from "../../ActionDialog/ActionDialog";
import CreateFabricForm from "../Form/CreateFabricForm";

export default function CreateFabricDialog({
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
      title={`Create fabric`}
      open={open}
      onClose={onClose}
      form="createFabric"
    >
      <CreateFabricForm onSubmit={onSave} />
    </ActionDialog>
  );
}
