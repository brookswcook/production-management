import { SampleType } from "dashboard-core";
import ActionDialog from "../../ActionDialog/ActionDialog";
import RejectSampleForm from "../Form/RejectSampleForm";

export default function RejectSampleDialog({
  parentCode,
  sampleType,
  sku,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  parentCode: string;
  sampleType: SampleType;
  sku: string;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  return (
    <ActionDialog
      title={`Reject ${sampleType == "fit" ? "fit" : "fabric"} sample`}
      open={open}
      onClose={onClose}
      form="rejectSample"
    >
      <RejectSampleForm
        parentCode={parentCode}
        sampleType={sampleType}
        sku={sku}
        onSubmit={onSave}
      />
    </ActionDialog>
  );
}
