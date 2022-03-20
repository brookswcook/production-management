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
import { useCreateProductMutation } from "../../generated/graphql";

interface IProps {
  anchorEl: HTMLElement | null;
}

const NewProductPopper: FunctionComponent<IProps> = ({ anchorEl }) => {
  const [newProductMutation] = useCreateProductMutation();
  const [open, setOpen] = useState<boolean>(false);

  const [model, setModel] = useState<string>("");
  const [style, setStyle] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

  useEffect(() => {
    setOpen(Boolean(anchorEl));
  }, [anchorEl]);

  async function createNewProduct() {
    await newProductMutation({
      variables: { data: { model, style, sku, deliveryDate } },
    });
    setOpen(false);
  }

  return (
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
          <Stack spacing={2}>
            <FormControl>
              <InputLabel htmlFor="model-input">Model</InputLabel>
              <Input
                id="model-input"
                value={model}
                onChange={({ target: { value } }) => {
                  setModel(value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="style-input">Style</InputLabel>
              <Input
                id="style-input"
                value={style}
                onChange={({ target: { value } }) => {
                  setStyle(value);
                }}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="sku-input">SKU</InputLabel>
              <Input
                id="sku-input"
                value={sku}
                onChange={({ target: { value } }) => {
                  setSku(value);
                }}
              />
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
