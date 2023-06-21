import ActionDialog from "../../ActionDialog/ActionDialog";
import CreateFactoryForm from "../Form/CreateFactoryForm";

export default function CreateFactoryDialog({
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
      title={`Create new factory`}
      open={open}
      onClose={onClose}
      form="createFactory"
    >
      <CreateFactoryForm onSubmit={onSave} />
    </ActionDialog>
  );
}
