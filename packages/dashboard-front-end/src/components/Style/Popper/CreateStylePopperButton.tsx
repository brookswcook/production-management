import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { ReactElement, useState } from "react";
import PopperButton from "../../PopperButton";
import CreateStyleForm from "../Form/CreateStyleForm";

export default function CreateStylePopperButton({
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
      title={"Add Style"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateStyleForm
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
