import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { ReactElement, useState } from "react";
import PopperButton from "../../PopperButton";
import CreateFabricForm from "../Form/CreateFabricForm";

export default function CreateFabricPopperButton({
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
      title={"Add Fabric"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateFabricForm
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
