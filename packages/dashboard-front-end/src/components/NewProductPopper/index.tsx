import { FunctionComponent, useState } from "react";
import {
  Button,
  ClickAwayListener,
  FormControl,
  Input,
  InputLabel,
  Paper,
  Popper,
  Stack,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/lab";
import { useEffect } from "react";

interface IProps {
  anchorEl: HTMLElement | null;
}

const NewProductPopper: FunctionComponent<IProps> = ({ anchorEl }) => {
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(Boolean(anchorEl));
  }, [anchorEl]);

  function createNewProduct() {
    setOpen(false);
  }

  return (
    <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Paper
          sx={{
            border: 1,
            p: 1,
            bgcolor: "background.paper",
            transform: "translate3d(-5px, 60px, 0px)",
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <InputLabel htmlFor="model-input">Model</InputLabel>
              <Input id="model-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="style-input">Style</InputLabel>
              <Input id="style-input" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="sku-input">SKU</InputLabel>
              <Input id="sku-input" />
            </FormControl>
            <DatePicker
              label="Delivery Date"
              value={deliveryDate}
              onChange={newValue => {
                setDeliveryDate(newValue);
              }}
              renderInput={params => <TextField {...params} />}
            />
            <Button variant="contained" onClick={createNewProduct}>
              Create
            </Button>
          </Stack>
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

export default NewProductPopper;
