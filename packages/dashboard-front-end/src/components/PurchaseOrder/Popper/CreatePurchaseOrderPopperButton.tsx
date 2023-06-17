import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { ReactElement, useState } from "react";
import PopperButton from "../../PopperButton";
import CreatePurchaseOrderForm from "../Form/CreatePurchaseOrderForm";

// TODO: replace with dialog
export default function CreatePurchaseOrderPopperButton({
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
      title={"Add Purchase Order"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreatePurchaseOrderForm
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
