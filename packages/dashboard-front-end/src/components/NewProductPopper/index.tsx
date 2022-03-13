import { FunctionComponent, useState } from "react";
import {
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

interface IProps {
  anchorEl: HTMLElement | null;
}

const NewProductPopper: FunctionComponent<IProps> = ({ anchorEl }) => {
  const open = Boolean(anchorEl);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  return (
    <ClickAwayListener onClickAway={() => (anchorEl = null)}>
      <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
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
          </Stack>
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
};

export default NewProductPopper;
