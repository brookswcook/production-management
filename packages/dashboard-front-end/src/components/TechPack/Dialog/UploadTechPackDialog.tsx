import ActionDialog from "../../ActionDialog/ActionDialog";
import UploadTechPackForm from "../Form/UploadTechPackForm";

export default function UploadTechPackDialog({
  styleCode,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  styleCode: string;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  return (
    <ActionDialog
      title="Upload tech pack"
      open={open}
      onClose={onClose}
      form="uploadTechPackForm"
    >
      <UploadTechPackForm styleCode={styleCode} onSubmit={onSave} />
    </ActionDialog>
  );
}
