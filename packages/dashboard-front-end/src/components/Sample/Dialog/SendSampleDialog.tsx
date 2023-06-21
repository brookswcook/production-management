import { SampleType } from "dashboard-core";
import ActionDialog from "../../ActionDialog/ActionDialog";
import SendSampleForm from "../Form/SendSampleForm";

export default function SendSampleDialog({
  parentCode,
  sampleType,
  open = false,
  onSave = () => {},
  onClose = () => {},
}: {
  parentCode: string;
  sampleType: SampleType;
  open?: boolean;
  onSave?: () => void;
  onClose?: () => void;
}) {
  return (
    <ActionDialog
      title={`Send new ${sampleType == "fit" ? "fit" : "fabric"} sample`}
      open={open}
      onClose={onClose}
      form="sendSampleForm"
    >
      <SendSampleForm
        parentCode={parentCode}
        sampleType={sampleType}
        onSubmit={onSave}
      />
    </ActionDialog>
  );
}
