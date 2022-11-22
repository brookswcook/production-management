import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { FabricFieldsFragment, useFabricQuery } from "../../generated/graphql";
import { BooleanProperty, TextProperty } from "../Properties";
import { LinkProperty } from "../Properties/LinkProperty";
import { ObjectProperty } from "../Properties/ObjectProperty";

export function FabricDetail() {
  const { code = "" } = useParams();
  const { data, error, loading } = useFabricQuery({
    variables: { code },
  });

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error) return <Fragment>Wrong path!</Fragment>;

  const {
    title,
    stage,
    factoryName,
    colorName,
    colorType,
    colorCode,
    productCodes,
  }: FabricFieldsFragment = data.fabric;

  return (
    <Container maxWidth="xl">
      <Grid
        container
        sx={{
          border: "1px solid #AAAAAA",
          borderRadius: "5px",
          m: 1,
          p: 1,
        }}
      >
        <Grid item xs={12} sx={{ p: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography component="span" variant="h6">
              {title?.toUpperCase()}
            </Typography>
          </Box>
          <Stack spacing={3} sx={{ pl: 0.5 }}>
            <BooleanProperty
              title="Fabric approved"
              value={stage === "Approved"}
            />
            <TextProperty title="Stage" value={stage} />
            <TextProperty title="Factory" value={factoryName} />
            <ObjectProperty
              title="Color"
              value={{
                "Color Type": colorType,
                "Color Name": colorName,
                "Color Code": colorCode,
              }}
            />
            <LinkProperty
              title="Products"
              baseUrl="products"
              resources={productCodes.map(code => ({ id: code, text: code }))}
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
