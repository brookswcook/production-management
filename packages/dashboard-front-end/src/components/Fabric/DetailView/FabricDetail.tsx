import { Box, Grid, IconButton, LinearProgress, Tooltip } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FabricFieldsFragment,
  Sample,
  useFabricQuery,
  usePrintLinkLazyQuery,
} from "../../../generated/graphql";
import { EntityTimelineList } from "../../EntityTimeline";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { ObjectProperty, LinkProperty } from "../../Properties";
import {
  DetailViewHeader,
  DetailView,
  DetailViewSection,
} from "../../DetailView";
import SampleList from "../../Sample/ListView/SampleList";

function FabricDetailHeader({
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

export default function FabricDetail(): ReactElement {
  const { code = "" } = useParams();
  const { data, error, loading } = useFabricQuery({
    variables: { code },
  });
  const [getPrintLink] = usePrintLinkLazyQuery();
  const [printLink, setPrintLink] = useState<string | null>(null);

  useEffect(() => {
    !loading && void generatePrintLink();
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
    name: string;
    code?: string;
    file?: string;
  } = {
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
            <ObjectProperty
              title={colorType === "print" ? "print" : "color"}
              value={colorFieldSet}
            >
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
          {productCodes.length > 0 && (
            <Grid item xs={12}>
              <LinkProperty
                title="Products"
                baseUrl="products"
                resources={productCodes.map(code => ({ id: code, text: code }))}
              />
            </Grid>
          )}

          {printLink != null ? (
            <Grid item xs={12}>
              <Box
                component="img"
                sx={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: 2,
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
        <SampleList
          parentCode={code}
          sampleType="fabric"
          samples={samples as Sample[]}
        />
      </DetailViewSection>
      <DetailViewSection title="timeline">
        <EntityTimelineList
          entityIds={[id, ...samples.map(({ id }) => id)]}
          entityTypes={["Fabric", "FabricSample"]}
          noteType="fabricNote"
        />
      </DetailViewSection>
    </DetailView>
  );
}
