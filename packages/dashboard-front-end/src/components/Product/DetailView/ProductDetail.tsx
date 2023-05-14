import { Box, Divider, Grid, LinearProgress } from "@mui/material";
import { Fragment, ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ProductFieldsFragment,
  Sample,
  useProductQuery,
} from "../../../generated/graphql";
import SampleGrid from "../../SampleGrid";
import { DetailViewSection } from "../../Common/DetailViewSection";

import { ObjectProperty } from "../../Properties/ObjectProperty";
import EntityTimeline from "../../EntityTimeline";
import { UpdateProductionCostDialog } from "../Dialog/UpdateProductionCostDialog";
import { toCurrency } from "../../Common";
import { DetailView } from "../../Common/DetailView";
import {
  DetailViewHeaderTitle,
  DetailViewHeaderDataValue,
} from "../../Common/Typography";

export function ProductDetailHeader({
  product: { name, deliveryDate, stage, factory },
}: {
  product: ProductFieldsFragment;
}): ReactElement {
  const headerData: string[] = [
    factory.code,
    `production due on ${new Date(deliveryDate).toLocaleDateString()}`,
    stage,
  ];

  return (
    <Grid item container rowGap={1} xs={12}>
      <Grid item xs={12}>
        <DetailViewHeaderTitle>{name}</DetailViewHeaderTitle>
      </Grid>
      <Grid item container columnGap={1} xs={12} sm={"auto"}>
        {headerData.map((item, index) => (
          <Fragment key={item}>
            <Grid item xs={12} sm={"auto"}>
              <DetailViewHeaderDataValue>{item}</DetailViewHeaderDataValue>
            </Grid>
            {index < headerData.length - 1 && (
              <Divider
                orientation="vertical"
                flexItem={true}
                sx={{ borderRightWidth: 2 }}
              />
            )}
          </Fragment>
        ))}
      </Grid>
    </Grid>
  );
}

export function ProductDetail(): ReactElement {
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
        <SampleGrid
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
        />
      </DetailViewSection>
    </DetailView>
  );
}
