import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useProductQuery } from "../../generated/graphql";
import { ObjectInputSet } from "../Common";
import GridToolbarButton from "../GridToolbarButton";
import NewProduct from "../NewProduct";

export default function ProductDetail() {
  const { productName = "" } = useParams();
  const { data, error, loading } = useProductQuery({
    variables: { productName },
  });

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error) return <Fragment>Wrong path!</Fragment>;

  const { name, dueIn, deliveryDate, onTime, stage } = data.product;
  const techpack = data.product.techPack ?? {};
  const fabricSample = data.product.fabricSample ?? {};

  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{
          marginTop: 1,
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "4px",
          padding: 1,
        }}
      >
        <Grid item xs={12}>
          <Box pl={1}>
            <Typography component="span" variant="h6">
              {name}
            </Typography>
            <Typography component="span" ml={1}>
              {stage}
            </Typography>
            <Typography component="span" ml={1}>
              {`${onTime ? "is on time" : "is not on time"}`}
            </Typography>
          </Box>
          <GridToolbarButton
            icon={<Fragment />}
            title="New"
            children={<NewProduct />}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="New"
            children={<NewProduct />}
          />
          <GridToolbarButton
            icon={<Fragment />}
            title="New"
            children={<NewProduct />}
          />
        </Grid>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography component="h4" variant="inherit">
                {`Details:`}
              </Typography>
              <TextField
                label="Expected delivery date"
                defaultValue={new Date(deliveryDate).toLocaleDateString()}
                InputProps={{
                  readOnly: true,
                }}
                helperText={`Due In: ${dueIn} days`}
                variant="standard"
              />
            </Paper>
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography component="h4" variant="inherit">
                {`Tech pack:`}
              </Typography>
              <ObjectInputSet
                objectToRender={techpack}
                fields={["fabricCode", "type", "pantone"]}
              />
            </Paper>
            <Paper elevation={1} sx={{ p: 1 }}>
              <Typography component="h4" variant="inherit">
                {`Fabric sample:`}
              </Typography>
              <ObjectInputSet
                objectToRender={fabricSample}
                fields={["sku", "approved", "trackNumber", "delivered"]}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
