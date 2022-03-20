import { Fragment, MouseEvent, useState } from "react";
import { Button } from "@mui/material";
import NewProductPopper from "../NewProductPopper";
import AddIcon from "@mui/icons-material/Add";

export default function GridToolBarNewProductButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function toggleNewProduct(event: MouseEvent<HTMLElement>) {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  }

  return (
    <Fragment>
      <Button variant="text" size="small" onClick={toggleNewProduct}>
        <AddIcon />
        New Product
      </Button>
      <NewProductPopper anchorEl={anchorEl} />
    </Fragment>
  );
}
