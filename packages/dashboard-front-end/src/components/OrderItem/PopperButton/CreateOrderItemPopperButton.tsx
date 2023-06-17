import { Button } from "@mui/material";
import { ReactElement, useState } from "react";
import CreateOrderItemForm from "../Form/CreateOrderItemForm";
import AddIcon from "@mui/icons-material/Add";
import PopperButton from "../../PopperButton";

// TODO: replace with dialog
export default function CreateOrderItemPopperButton({
  orderUid,
  disabled = false,
}: {
  orderUid: number;
  disabled?: boolean;
}): ReactElement {
  const [closeSwitch, setCloseSwitch] = useState(0);
  function closePopper() {
    setCloseSwitch(closeSwitch + 1);
  }

  return (
    <PopperButton
      icon={<AddIcon />}
      title={"Add item"}
      disabled={disabled}
      closeSwitch={closeSwitch}
    >
      <CreateOrderItemForm
        orderUid={orderUid}
        title="Add items to the order"
        footerEl={
          <Button variant="contained" onClick={closePopper}>
            Cancel
          </Button>
        }
      />
    </PopperButton>
  );
}
