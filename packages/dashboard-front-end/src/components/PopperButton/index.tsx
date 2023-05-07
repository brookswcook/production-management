import { useEffect, useState, ReactElement, useRef } from "react";
import {
  Button,
  ButtonPropsVariantOverrides,
  ClickAwayListener,
  Paper,
  Popper,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";

export function PopperButton({
  icon,
  title,
  children,
  variant = "text",
  disabled,
  closeSwitch,
  closeOnClickAway = true,
}: {
  icon?: ReactElement;
  title: string;
  children: ReactElement;
  variant?: OverridableStringUnion<
    "text" | "outlined" | "contained",
    ButtonPropsVariantOverrides
  >;
  disabled?: boolean;
  closeSwitch?: number;
  closeOnClickAway?: boolean;
}): ReactElement {
  const buttonRef = useRef<null | HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(false);
  }, [closeSwitch]);

  return (
    <>
      <Button
        disabled={disabled}
        variant={variant}
        size="small"
        onClick={() => setOpen(!open)}
        ref={buttonRef}
      >
        {icon ? icon : <></>}
        {title}
      </Button>
      <Popper
        open={open}
        anchorEl={buttonRef?.current}
        placement="bottom-start"
      >
        <ClickAwayListener
          onClickAway={() => {
            closeOnClickAway && setOpen(false);
          }}
        >
          <Paper
            elevation={9}
            sx={{
              padding: 1,
              bgcolor: "background.paper",
            }}
          >
            {children}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
