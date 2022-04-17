import { ApolloError } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ProductFieldsFragment,
  Sample,
  useProductQuery,
  FabricProduction,
  ProductProduction,
  ProductQualityControl,
  ProductShipping,
  Fabric,
  Style,
  useTechPackLinkLazyQuery,
  usePrintLinkLazyQuery,
} from "../../generated/graphql";
import { ObjectInputSet } from "../Common";
import SampleGrid from "../SampleGrid";
import SendSampleToolbarButton from "../SampleParams";
import { UploadTechPackToolbarButton } from "../TechPackParams";

export default function ProductDetail() {
  const { code = "" } = useParams();
  const { data, error, loading } = useProductQuery({
    variables: { code },
  });

  const [getTechPackLink] = useTechPackLinkLazyQuery();
  const [getPrintLink] = usePrintLinkLazyQuery();
  const [techPackLink, setTechPackLink] = useState<string>("techPack");
  const [printLink, setPrintLink] = useState<string>("print");

  useEffect(() => {
    if (loading) return;
    void generateTechPackLink();
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
    name,
    dueIn,
    deliveryDate,
    onTime,
    stage,
    factoryName,
    style,
    fabric,
    fitSamples,
    preProductionSample,
    fabricProduction,
    production,
    qualityControl,
    shipping,
  }: ProductFieldsFragment = data.product;

  async function generateTechPackLink() {
    if (style.techPackFileName != null) {
      try {
        const { data } = await getTechPackLink({
          variables: { fileName: style.techPackFileName },
        });
        setTechPackLink(data?.techPackLink ?? "#");
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }
  }

  async function generatePrintLink() {
    if (fabric.printFileName != null) {
      try {
        const { data } = await getPrintLink({
          variables: { fileName: fabric.printFileName },
        });
        setPrintLink(data?.printLink ?? "#");
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }
  }

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
              <UploadTechPackToolbarButton styleCode={style.code} />
              <SendSampleToolbarButton
                sampleType={"fabric"}
                parentCode={fabric.code}
              />
              <SendSampleToolbarButton sampleType={"fit"} parentCode={code} />
              <a
                href={techPackLink}
                target="_blank"
                style={{
                  pointerEvents: `${!style.techPackUploaded ? "none" : "auto"}`,
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="text"
                  size="small"
                  onClick={generateTechPackLink}
                  disabled={!style.techPackUploaded}
                >
                  Download TP
                </Button>
              </a>
              <a
                href={printLink}
                target="_blank"
                style={{
                  pointerEvents: `${
                    fabric.colorType == "solid" ? "none" : "auto"
                  }`,
                  textDecoration: "none",
                }}
              >
                <Button
                  variant="text"
                  size="small"
                  onClick={generatePrintLink}
                  disabled={fabric.colorType == "solid"}
                >
                  Download Print
                </Button>
              </a>
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
                size="small"
                helperText={`Due In: ${dueIn} days`}
                variant="standard"
              />
              <TextField
                label="Factory"
                defaultValue={factoryName}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
                variant="standard"
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Style:">
              <ObjectInputSet<Style>
                objectToRender={style}
                fields={["code", "name", "techPackUploaded"]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Fabric:">
              <ObjectInputSet<Fabric>
                objectToRender={fabric}
                fields={["code", "colorType", "colorName"]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Fabric samples:">
              <SampleGrid
                parentCode={fabric.code}
                sampleType="fabric"
                samples={fabric.samples as Sample[]}
              />
            </DetailViewSection>
            <DetailViewSection headerTitle="Fit samples:">
              <SampleGrid
                parentCode={code}
                sampleType="fit"
                samples={fitSamples as Sample[]}
              />
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

  function DetailViewSection({
    children,
    headerTitle,
  }: {
    children: JSX.Element[] | JSX.Element;
    headerTitle: string;
  }) {
    return (
      <Paper elevation={0} sx={{ p: 1 }}>
        <Typography component="h4" variant="inherit">
          {headerTitle}
        </Typography>
        {children}
      </Paper>
    );
  }
}
