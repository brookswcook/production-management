import { Box, Grid, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FabricFieldsFragment,
  Sample,
  useFabricQuery,
  usePrintLinkLazyQuery,
} from "../../generated/graphql";
import { DetailView } from "../Common/DetailView";
import { DetailViewHeader } from "../Common/DetailViewHeader";
import { DetailViewSection } from "../Common/DetailViewSection";
import EntityTimeline from "../EntityTimeline";
import { LinkProperty } from "../Properties/LinkProperty";
import { ObjectProperty } from "../Properties/ObjectProperty";
import SampleGrid from "../SampleGrid";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

export function FabricDetailHeader({
  fabric: {
    stage,
    title,
    factory: { code: factoryCode },
  },
}: {
  fabric: FabricFieldsFragment;
}) {
  return <DetailViewHeader title={title} headerData={[factoryCode, stage]} />;
}

export function FabricDetail(): ReactElement {
  const { code = "" } = useParams();
  const { data, error, loading } = useFabricQuery({
    variables: { code },
  });
  const [getPrintLink] = usePrintLinkLazyQuery();
  const [printLink, setPrintLink] = useState<string | null>(null);

  useEffect(() => {
    void generatePrintLink();
  }, [loading]);

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error)
    return <>There's no data to show or unexpected error has happened!</>;

  const {
    id,
    colorName,
    colorType,
    colorCode,
    printFileName,
    productCodes,
    samples,
  }: FabricFieldsFragment = data.fabric;

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

  const colorFieldSet: {
    type: string;
    name: string;
    code?: string;
    file?: string;
  } = {
    type: colorType,
    name: colorName,
  };
  if (colorType === "solid") {
    colorFieldSet["code"] = String(colorCode);
  } else {
    colorFieldSet["file"] = String(printFileName);
  }

  return (
    <DetailView header={<FabricDetailHeader fabric={data.fabric} />}>
      <DetailViewSection>
        <Grid item container gap={3}>
          <Grid item xs={12} md={"auto"}>
            <ObjectProperty title="Color" value={colorFieldSet}>
              {colorType === "print" && printLink != null ? (
                <IconButton
                  href={printLink}
                  size="small"
                  edge="start"
                  color="primary"
                  aria-label="edit"
                >
                  <Tooltip title="Print file download">
                    <FileDownloadOutlinedIcon />
                  </Tooltip>
                </IconButton>
              ) : (
                <></>
              )}
            </ObjectProperty>
          </Grid>
          <Grid item xs={12}>
            <LinkProperty
              title="Products"
              baseUrl="products"
              resources={productCodes.map(code => ({ id: code, text: code }))}
            />
          </Grid>

          {printLink != null ? (
            <Grid item xs={12} md={4}>
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
          ) : (
            <></>
          )}
        </Grid>
      </DetailViewSection>
      <DetailViewSection title="fabric samples">
        <SampleGrid
          parentCode={code}
          sampleType="fabric"
          samples={samples as Sample[]}
        />
      </DetailViewSection>
      <DetailViewSection title="timeline">
        <EntityTimeline
          entityIds={[id, ...samples.map(({ id }) => id)]}
          entityTypes={["Fabric", "FabricSample"]}
          noteType="fabricNote"
        />
      </DetailViewSection>
    </DetailView>
  );
}
