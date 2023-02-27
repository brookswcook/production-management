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
  onSave,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onSave: () => void;
  onClose: () => void;
  children: ReactElement | ReactElement[];
}): ReactElement {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
