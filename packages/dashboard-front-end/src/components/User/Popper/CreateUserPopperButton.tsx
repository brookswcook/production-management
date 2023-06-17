import { ReactElement, useState } from "react";
import PopperButton from "../../PopperButton";
import AddIcon from "@mui/icons-material/Add";
import CreateUserForm from "../Form/CreateUserForm";

export default function CreateUserPopperButton({
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
      title={"Add User"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateUserForm onCancel={closePopper} />
    </PopperButton>
  );
}
