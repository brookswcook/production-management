import { Fragment, MouseEvent, useEffect, useState, ReactElement } from "react";
import { Button, ClickAwayListener, Paper, Popper } from "@mui/material";

export function PopperButton({
  icon,
  title,
  children,
  disabled,
  popperCloseCounter,
}: {
  icon?: ReactElement;
  title: string;
  children: ReactElement;
  disabled?: boolean;
  popperCloseCounter?: number;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(Boolean(anchorEl));
  }, [anchorEl]);

  useEffect(() => {
    setOpen(false);
  }, [popperCloseCounter]);

  function togglePopper(event: MouseEvent<HTMLElement>) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <Fragment>
      <Button
        disabled={disabled}
        variant="text"
        size="small"
        onClick={togglePopper}
      >
        {icon ? icon : <Fragment />}
        {title}
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={() => setOpen(false)}>
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
    </Fragment>
  );
}
