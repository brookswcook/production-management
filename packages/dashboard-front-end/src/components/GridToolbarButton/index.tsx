import { Fragment, MouseEvent, useEffect, useState, ReactElement } from "react";
import { Button, ClickAwayListener, Paper, Popper } from "@mui/material";

export default function GridToolbarButton({
  icon,
  title,
  children,
  disabled,
}: {
  icon: ReactElement;
  title: string;
  children: ReactElement;
  disabled?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(Boolean(anchorEl));
  }, [anchorEl]);

  function toggleNewProduct(event: MouseEvent<HTMLElement>) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <Fragment>
      <Button
        disabled={disabled}
        variant="text"
        size="small"
        onClick={toggleNewProduct}
      >
        {icon}
        {title}
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Paper
            elevation={9}
            sx={{
              padding: 1,
              bgcolor: "background.paper",
              transform: "translate3d(-4px, 58px, 0px)",
            }}
          >
            {children}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Fragment>
  );
}
