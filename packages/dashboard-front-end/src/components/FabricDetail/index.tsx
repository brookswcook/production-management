import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FabricFieldsFragment,
  useFabricQuery,
  usePrintLinkLazyQuery,
} from "../../generated/graphql";
import { BooleanProperty, TextProperty } from "../Properties";
import { LinkProperty } from "../Properties/LinkProperty";
import { ObjectProperty } from "../Properties/ObjectProperty";

export function FabricDetail() {
  const { code = "" } = useParams();
  const { data, error, loading } = useFabricQuery({
    variables: { code },
  });
  const [getPrintLink] = usePrintLinkLazyQuery();
  const [printLink, setPrintLink] = useState<string>("print");

  useEffect(() => {
    if (loading) return;
    void generatePrintLink();
  }, [loading]);

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
    printFileName,
    productCodes,
  }: FabricFieldsFragment = data.fabric;

  const colorFieldSet: {
    "Color Type": string;
    "Color Name": string;
    "Color Code"?: string;
    "Print File"?: string;
  } = {
    "Color Type": colorType,
    "Color Name": colorName,
  };
  if (colorType === "solid") {
    colorFieldSet["Color Code"] = String(colorCode);
  } else {
    colorFieldSet["Print File"] = String(printFileName);
  }

  async function generatePrintLink() {
    if (printFileName != null) {
      try {
        const { data } = await getPrintLink({
          variables: { fileName: String(printFileName) },
        });
        setPrintLink(data?.printLink ?? "#");
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  }

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
        <Grid item xs={12} sx={{ pl: 1, pt: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography component="span" variant="h6">
              {title?.toUpperCase()}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ pl: 1 }}>
          <Stack spacing={3} sx={{ pl: 0.5 }}>
            <BooleanProperty
              title="Fabric approved"
              value={stage === "Approved"}
            />
            <TextProperty title="Stage" value={stage} />
            <TextProperty title="Factory" value={factoryName} />
            <Grid container direction={"row"} alignItems={"center"}>
              <Grid item xs={12} sm={5} md={4}>
                <ObjectProperty title="Color" value={colorFieldSet} />
              </Grid>
              {colorType === "print" && (
                <Grid item xs={12} sm={2}>
                  <Button href={printLink} variant={"contained"}>
                    Download print
                  </Button>
                </Grid>
              )}
            </Grid>
            <LinkProperty
              title="Products"
              baseUrl="products"
              resources={productCodes.map(code => ({ id: code, text: code }))}
            />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            sx={{
              maxHeight: { xs: 200, sm: 300, md: 400 },
              maxWidth: { xs: 200, sm: 300, md: 400 },
            }}
            alt="print image"
            src=""
          />
        </Grid>
      </Grid>
    </Container>
  );
}
