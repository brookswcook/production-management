import ActionDialog from "../../ActionDialog/ActionDialog";
import CreateStyleForm from "../Form/CreateStyleForm";

export default function CreateStyleDialog({
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
      title={`Create new style`}
      open={open}
      onClose={onClose}
      form="createStyle"
    >
      <CreateStyleForm onSubmit={onSave} />
    </ActionDialog>
  );
}
