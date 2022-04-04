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
import {
  ProductFieldsFragment,
  TechPack,
  Sample,
  useProductQuery,
  FabricProduction,
  ProductProduction,
  ProductQualityControl,
  ProductShipping,
} from "../../generated/graphql";
import { ObjectInputSet } from "../Common";
import GridToolbarButton from "../GridToolbarButton";
import ProductParams from "../ProductParams";
import SampleGrid from "../SampleGrid";

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

  const {
    name,
    dueIn,
    deliveryDate,
    onTime,
    stage,
    techPack,
    fabricSample,
    fitSamples,
    preProductionSample,
    fabricProduction,
    production,
    qualityControl,
    shipping,
  }: ProductFieldsFragment = data.product;

  const DetailViewSection = ({
    children,
    headerTitle,
  }: {
    children: JSX.Element[] | JSX.Element;
    headerTitle: string;
  }) => (
    <Paper elevation={0} sx={{ p: 1 }}>
      <Typography component="h4" variant="inherit">
        {headerTitle}
      </Typography>
      {children}
    </Paper>
  );

  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{
          border: "1px solid rgba(224, 224, 224, 1)",
          borderRadius: "4px",
          m: 1,
        }}
      >
        <Grid item xs={12} sx={{ mb: 1 }}>
          <Paper elevation={1} sx={{ pl: 1, mb: 1 }}>
            <Typography component="span" variant="h6">
              {name}
            </Typography>
            <Typography component="span" ml={1}>
              {`${stage} stage ${onTime ? "is on time" : "is not on time"}`}
            </Typography>
            <Box>
              <GridToolbarButton
                icon={<Fragment />}
                title="New"
                children={<ProductParams />}
              />
            </Box>
          </Paper>
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
            <DetailViewSection headerTitle="Details:">
              <TextField
                label="Expected delivery date"
                defaultValue={new Date(deliveryDate).toLocaleDateString()}
                InputProps={{
                  readOnly: true,
                }}
                helperText={`Due In: ${dueIn} days`}
                variant="standard"
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Tech pack:">
              <ObjectInputSet<TechPack>
                objectToRender={techPack}
                fields={["fabricCode", "type", "pantone"]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Fabric sample:">
              <ObjectInputSet<Sample>
                objectToRender={fabricSample}
                fields={["sku", "approved", "trackNumber", "delivered"]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Fit samples:">
              <SampleGrid samples={fitSamples as Sample[]} />
            </DetailViewSection>
            <DetailViewSection headerTitle="Pre production sample:">
              <ObjectInputSet<Sample>
                objectToRender={preProductionSample}
                fields={["sku", "approved", "trackNumber", "delivered"]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Fabric production:">
              <ObjectInputSet<FabricProduction>
                objectToRender={fabricProduction}
                fields={[
                  "lastStartDate",
                  "actualStartDate",
                  "onTime",
                  "started",
                  "sufficientFabric",
                ]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Production:">
              <ObjectInputSet<ProductProduction>
                objectToRender={production}
                fields={[
                  "lastStartDate",
                  "actualStartDate",
                  "onTime",
                  "started",
                ]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Quality control:">
              <ObjectInputSet<ProductQualityControl>
                objectToRender={qualityControl}
                fields={[
                  "lastVisitDate",
                  "scheduledVisitDate",
                  "visited",
                  "passed",
                ]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Shipping:">
              <ObjectInputSet<ProductShipping>
                objectToRender={shipping}
                fields={[
                  "lastShippingDate",
                  "actualShippingDate",
                  "trackNumber",
                  "shipped",
                  "delivered",
                ]}
              />
            </DetailViewSection>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
