import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { ReactElement } from "react";

export function ActionDialog({
  open,
  title,
  children,
  onSave = () => {},
  onClose = () => {},
  form = "",
}: {
  open: boolean;
  title: string;
  children: ReactElement | ReactElement[];
  onSave?: () => void;
  onClose?: () => void;
  form?: string;
}): ReactElement {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button type="submit" form={form} onClick={onSave} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
