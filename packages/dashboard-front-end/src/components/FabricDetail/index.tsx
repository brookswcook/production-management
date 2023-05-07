import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FabricFieldsFragment,
  Sample,
  useFabricQuery,
  usePrintLinkLazyQuery,
} from "../../generated/graphql";
import { DetailViewSection } from "../Common/DetailViewSection";
import EntityTimeline from "../EntityTimeline";
import { BooleanProperty, TextProperty } from "../Properties";
import { LinkProperty } from "../Properties/LinkProperty";
import { ObjectProperty } from "../Properties/ObjectProperty";
import SampleGrid from "../SampleGrid";

export function FabricDetail(): ReactElement {
  const { code = "" } = useParams();
  const { data, error, loading } = useFabricQuery({
    variables: { code },
  });
  const [getPrintLink] = usePrintLinkLazyQuery();
  const [printLink, setPrintLink] = useState<string>("#");

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
  if (data == null || error) return <>Wrong path!</>;

  const {
    id,
    title,
    stage,
    factory,
    colorName,
    colorType,
    colorCode,
    printFileName,
    productCodes,
    samples,
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
          variables: { fileName: printFileName },
        });
        setPrintLink(data?.printLink ?? "#");
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 1 }}>
        <Grid
          justifyContent={"left"}
          container
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "5px",
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
          <Grid item xs={12} lg={8} sx={{ pl: 1 }}>
            <Stack spacing={2} sx={{ pl: 0.5 }}>
              <BooleanProperty
                title="Fabric approved"
                value={stage === "Approved"}
              />
              <TextProperty title="Stage" value={stage} />
              <TextProperty title="Factory" value={factory.code} />
              <Grid container direction={"row"} alignItems={"center"}>
                <Grid item xs={12} sm={8} xl={6}>
                  <ObjectProperty title="Color" value={colorFieldSet} />
                </Grid>
                {colorType === "print" && (
                  <Grid item xs={12} sm={4} xl={2}>
                    <Button
                      href={printLink}
                      size={"small"}
                      variant={"contained"}
                    >
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
          {printLink != null && (
            <Grid item xs={12} lg={4}>
              <Box
                component="img"
                sx={{
                  maxWidth: { xs: 300, lg: 370 },
                  backgroundColor: "#D9D9D9",
                }}
                alt="print image"
                src={printLink}
              />
            </Grid>
          )}
        </Grid>
      </Box>
      <DetailViewSection headerTitle="Fabric samples:">
        <SampleGrid
          parentCode={code}
          sampleType="fabric"
          samples={samples as Sample[]}
        />
      </DetailViewSection>
      <DetailViewSection headerTitle="Timeline">
        <EntityTimeline
          entityIds={[id, ...samples.map(({ id }) => id)]}
          entityTypes={["Fabric", "FabricSample"]}
          noteType="fabricNote"
        />
      </DetailViewSection>
    </Container>
  );
}
