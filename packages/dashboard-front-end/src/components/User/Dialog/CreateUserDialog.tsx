import ActionDialog from "../../ActionDialog/ActionDialog";
import CreateUserForm from "../Form/CreateUserForm";

export default function CreateUserDialog({
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
      title={`Create new user`}
      open={open}
      onClose={onClose}
      form="createNewUser"
    >
      <CreateUserForm onSubmit={onSave} />
    </ActionDialog>
  );
}
