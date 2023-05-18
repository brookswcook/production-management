import { SampleType } from "dashboard-core";
import { ReactElement } from "react";
import PopperButton from "../../PopperButton";
import SendSampleForm from "../Form/SendSampleForm";

export default function SendSamplePopperButton({
  disabled = false,
  sampleType,
  parentCode,
}: {
  disabled?: boolean;
  sampleType: SampleType;
  parentCode: string;
}): ReactElement {
  return (
    <PopperButton
      title={`New ${sampleType == "fit" ? "fit" : "fabric"} sample`}
      disabled={disabled}
    >
      <SendSampleForm parentCode={parentCode} sampleType={sampleType} />
    </PopperButton>
  );
}
