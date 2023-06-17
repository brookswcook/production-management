import AddIcon from "@mui/icons-material/Add";
import { ReactElement, useState } from "react";
import PopperButton from "../../PopperButton";
import CreateFactoryForm from "../Form/CreateFactoryForm";

export default function CreateFactoryPopperButton({
  disabled = false,
}: {
  disabled?: boolean;
}): ReactElement {
  const [closeSwitch, setCloseSwitch] = useState(0);
  function closePopper() {
    setCloseSwitch(closeSwitch + 1);
  }

  return (
    <PopperButton
      icon={<AddIcon />}
      title={"Add Factory"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateFactoryForm onCancel={closePopper} />
    </PopperButton>
  );
}
