import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { NoteType } from "dashboard-core";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  ProductFieldsFragment,
  Sample,
  useProductQuery,
  Note,
} from "../../generated/graphql";
import NoteGrid from "../NoteGrid";
import SampleGrid from "../SampleGrid";
import { DetailViewSection } from "../Common/DetailViewSection";
import { TextProperty } from "../Properties";
import { ObjectProperty } from "../Properties/ObjectProperty";

export default function ProductDetail() {
  const { code = "" } = useParams();
  const { data, error, loading } = useProductQuery({
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
    id,
    name,
    dueIn,
    deliveryDate,
    stage,
    factoryName,
    techPackUploaded,
    style,
    fabric,
    fitSamples,
    notes,
  }: ProductFieldsFragment = data.product;

  return (
    <Container maxWidth="xl">
      <Box sx={{ p: 1 }}>
        <Grid
          justifyContent={"left"}
          container
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "4px",
            p: 1,
          }}
        >
          <Grid item xs={12} sx={{ pl: 1, pt: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography component="span" variant="h6" sx={{ mr: 5 }}>
                {name.toUpperCase()}
              </Typography>
              <Typography component="span" variant="body2">
                {`Production Due in ${dueIn} Days`}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ pl: 1 }}>
            <Stack spacing={2} sx={{ pl: 0.5 }}>
              <Grid
                direction={"row"}
                justifyContent={"left"}
                alignItems="baseline"
                container
              >
                <Grid item xs={12} md={"auto"}>
                  <ObjectProperty
                    title="Style"
                    value={{
                      Code: style.code,
                      "Tech Pack Uploaded": techPackUploaded,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={"auto"} sx={{ pl: 2 }}>
                  <Button
                    href={`/styles/${style.code}`}
                    size={"small"}
                    variant={"contained"}
                  >
                    Style details
                  </Button>
                </Grid>
              </Grid>
              {/* <TextProperty title="Style No." value={style.code} /> */}
              <TextProperty title="Stage" value={stage} />
              <TextProperty title="Factory" value={factoryName} />
              <Grid
                direction={"row"}
                justifyContent={"left"}
                alignItems="baseline"
                container
              >
                <Grid item xs={12} md={"auto"}>
                  <ObjectProperty
                    title="Fabric"
                    value={{
                      Name: fabric.title,
                      Code: fabric.code,
                      "Color Type": fabric.colorType,
                      "Color Name": fabric.colorName,
                      "Fabric Approved?": fabric.stage === "Approved",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={"auto"} sx={{ pl: 2 }}>
                  <Button
                    href={`/fabrics/${fabric.code}`}
                    variant={"contained"}
                    size={"small"}
                  >
                    Fabric details
                  </Button>
                </Grid>
              </Grid>
              <TextProperty
                title="Next Production Due"
                value={new Date(deliveryDate).toLocaleDateString()}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <DetailViewSection headerTitle="Fit samples:">
        <SampleGrid
          parentCode={code}
          sampleType="fit"
          samples={fitSamples as Sample[]}
        />
      </DetailViewSection>
      <DetailViewSection headerTitle="Notes:">
        <NoteGrid
          notes={notes as Note[]}
          type={"productNote" as NoteType}
          parentId={id}
        />
      </DetailViewSection>
    </Container>
  );
}
