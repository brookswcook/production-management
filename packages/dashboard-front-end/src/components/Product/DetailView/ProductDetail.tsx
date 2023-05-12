import {
  Box,
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProductFieldsFragment,
  Sample,
  useProductQuery,
} from "../../../generated/graphql";
import SampleGrid from "../../SampleGrid";
import { DetailViewSection } from "../../Common/DetailViewSection";
import { TextProperty } from "../../Properties";
import { ObjectProperty } from "../../Properties/ObjectProperty";
import EntityTimeline from "../../EntityTimeline";
import { UpdateProductionCostDialog } from "../Dialog/UpdateProductionCostDialog";
import { toCurrency } from "../../Common";

export function ProductDetail(): ReactElement {
  const [updateCostDialogOpen, setUpdateCostDialogOpen] =
    useState<boolean>(false);
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
  if (data == null || error) return <>Wrong path!</>;

  const {
    id,
    name,
    dueIn,
    deliveryDate,
    stage,
    factory,
    techPackUploaded,
    production: { cost: productionCost, bulkProductionCostDiscounts },
    style,
    fabric,
    fitSamples,
  }: ProductFieldsFragment = data.product;

  return (
    <Container maxWidth="xl">
      <UpdateProductionCostDialog
        productCode={code}
        open={updateCostDialogOpen}
        onSave={() => setUpdateCostDialogOpen(false)}
        onClose={() => setUpdateCostDialogOpen(false)}
      />
      <Box sx={{ p: 1 }}>
        <Grid
          container
          sx={{
            border: "1px solid rgba(224, 224, 224, 1)",
            borderRadius: "4px",
            p: 1,
          }}
        >
          <Grid item xs={12} sx={{ pl: 1, pt: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography
                component="span"
                variant="h6"
                sx={{ mr: 5, textTransform: "uppercase" }}
              >
                {name}
              </Typography>
              <Typography component="span" variant="body2">
                {`Production Due in ${dueIn} Days`}
              </Typography>
            </Box>
          </Grid>
          <Grid item container xs={12} sx={{ pl: 1.5 }} rowSpacing={1}>
            <Grid item container alignItems="baseline" xs={12} gap={1}>
              <Grid item xs={12} md={"auto"}>
                <ObjectProperty
                  title="Style"
                  value={{
                    Code: style.code,
                    "Tech Pack Uploaded": techPackUploaded,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={"auto"}>
                <Button
                  href={`/styles/${style.code}`}
                  size={"small"}
                  variant={"contained"}
                >
                  Style details
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextProperty title="Stage" value={stage} />
            </Grid>
            <Grid item xs={12}>
              <TextProperty title="Factory" value={factory.code} />
            </Grid>
            <Grid
              item
              container
              justifyContent={"left"}
              alignItems="baseline"
              gap={2}
              xs={12}
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
              <Grid item xs={12} md={"auto"}>
                <Button
                  href={`/fabrics/${fabric.code}`}
                  variant={"contained"}
                  size={"small"}
                >
                  Fabric details
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextProperty
                title="Next Production Due"
                value={new Date(deliveryDate).toLocaleDateString()}
              />
            </Grid>
            <Grid item container gap={2} alignItems={"center"} xs={12}>
              <Grid item xs={12} sm={"auto"}>
                <ObjectProperty
                  title="Production cost"
                  value={{
                    Base: toCurrency(productionCost),
                    ...bulkProductionCostDiscounts.reduce<
                      Record<string, string>
                    >(
                      (acc, { quantityThreshold, discount }) => ({
                        ...acc,
                        [`> ${quantityThreshold} Units`]: toCurrency(
                          productionCost - discount
                        ),
                      }),
                      {}
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={"auto"}>
                <Button
                  variant={"contained"}
                  size={"small"}
                  onClick={() => setUpdateCostDialogOpen(true)}
                >
                  Update costs
                </Button>
              </Grid>
            </Grid>
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
      <DetailViewSection headerTitle="Timeline">
        <EntityTimeline
          entityIds={[id, ...fitSamples.map(({ id }) => id)]}
          entityTypes={["Product", "FitSample"]}
          noteType="productNote"
        />
      </DetailViewSection>
    </Container>
  );
}
