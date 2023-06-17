import { Box, Grid, LinearProgress } from "@mui/material";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProductFieldsFragment,
  Sample,
  useProductQuery,
} from "../../../generated/graphql";
import {
  DetailViewHeader,
  DetailView,
  DetailViewSection,
} from "../../DetailView";
import { EntityTimeline } from "../../EntityTimeline";
import { ObjectProperty } from "../../Properties";
import { SampleList } from "../../Sample";
import toCurrency from "../../Utils";
import UpdateProductionCostDialog from "../Dialog/UpdateProductionCostDialog";

function ProductDetailHeader({
  product: { name, deliveryDate, stage, factory },
}: {
  product: ProductFieldsFragment;
}): ReactElement {
  const headerData: string[] = [
    factory.code,
    `production due on ${new Date(deliveryDate).toLocaleDateString()}`,
    stage,
  ];

  return <DetailViewHeader title={name} headerData={headerData} />;
}

export default function ProductDetail(): ReactElement {
  const { code = "" } = useParams();
  const { data, error, loading } = useProductQuery({
    variables: { code },
  });
  const [updateCostDialogOpen, setUpdateCostDialogOpen] =
    useState<boolean>(false);

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error)
    return <>There's no data to show or unexpected error has happened!</>;

  const {
    product: {
      techPackUploaded,
      production: { cost: productionCost, bulkProductionCostDiscounts },
      style,
      fabric,
    },
  } = data;

  return (
    <DetailView header={<ProductDetailHeader product={data.product} />}>
      <UpdateProductionCostDialog
        productCode={code}
        open={updateCostDialogOpen}
        onSave={() => setUpdateCostDialogOpen(false)}
        onClose={() => setUpdateCostDialogOpen(false)}
      />
      <DetailViewSection>
        <Grid item container columnGap={3}>
          <Grid item xs={12} md={"auto"}>
            <ObjectProperty
              title="style"
              value={{
                code: style.code,
                "tech pack uploaded": techPackUploaded,
              }}
              detailLink={`/styles/${style.code}`}
            />
          </Grid>
          <Grid item xs={12} md={"auto"}>
            <ObjectProperty
              title="fabric"
              value={{
                Name: fabric.title,
                Code: fabric.code,
                "color type": fabric.colorType,
                "color name": fabric.colorName,
                "fabric approved": fabric.stage === "Approved",
              }}
              detailLink={`/fabrics/${fabric.code}`}
            />
          </Grid>
          <Grid item xs={12} sm={"auto"}>
            <ObjectProperty
              title="production cost"
              value={{
                Base: toCurrency(productionCost),
                ...bulkProductionCostDiscounts.reduce<Record<string, string>>(
                  (acc, { quantityThreshold, discount }) => ({
                    ...acc,
                    [`> ${quantityThreshold} Units`]: toCurrency(
                      productionCost - discount
                    ),
                  }),
                  {}
                ),
              }}
              onEdit={() => setUpdateCostDialogOpen(true)}
            />
          </Grid>
        </Grid>
      </DetailViewSection>
      <DetailViewSection title="Fit samples">
        <SampleList
          parentCode={code}
          sampleType="fit"
          samples={data.product.fitSamples as Sample[]}
        />
      </DetailViewSection>
      <DetailViewSection title="Timeline">
        <EntityTimeline
          entityIds={[
            data.product.id,
            ...data.product.fitSamples.map(({ id }) => id),
          ]}
          entityTypes={["Product", "FitSample"]}
          noteType="productNote"
        ></EntityTimeline>
      </DetailViewSection>
    </DetailView>
  );
}
