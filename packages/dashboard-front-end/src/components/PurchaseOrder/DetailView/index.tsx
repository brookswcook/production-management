import { Box, Grid, LinearProgress, Stack } from "@mui/material";
import { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  PurchaseOrderDetailFieldsFragment,
  usePurchaseOrderQuery,
} from "../../../generated/graphql";
import { DetailView } from "../../Common/DetailView";
import { DetailViewHeaderTitle } from "../../Common/DetailViewHeaderTitle";
import { ObjectProperty } from "../../Properties/ObjectProperty";
import { TextProperty } from "../../Properties/TextProperty";

function PurchaseOrderHeaderSection({
  purchaseOrder: {
    uid,
    expectedDeliveryDate,
    createdAt,
    factory: {
      name: factoryName,
      address: factoryAddress,
      contacts: [
        {
          email: factoryEmail,
          fullName: factoryContactName,
          phone: factoryContactPhone,
        },
      ],
    },
    company: {
      name: companyName,
      address: companyAddress,
      contacts: [
        {
          email: companyEmail,
          fullName: companyContactName,
          phone: companyContactPhone,
        },
      ],
    },
  },
}: {
  purchaseOrder: PurchaseOrderDetailFieldsFragment;
}): ReactElement {
  return (
    <>
      <DetailViewHeaderTitle
        title={`Purchase Order #${String(uid)} ${new Date(
          createdAt
        ).toLocaleDateString()}`}
      />
      <Grid item xs={12} sx={{ pl: 1 }}>
        <Stack spacing={2} sx={{ pl: 0.5 }}>
          <TextProperty
            title="Delivery"
            value={new Date(expectedDeliveryDate).toLocaleDateString()}
          />
          <ObjectProperty
            title="To       "
            value={{
              name: String(factoryName),
              address: String(factoryAddress),
              contact: String(factoryContactName),
              email: String(factoryEmail),
              phone: String(factoryContactPhone),
            }}
          />
          <ObjectProperty
            title="Ship to"
            value={{
              name: String(companyName),
              address: String(companyAddress),
              contact: String(companyContactName),
              email: String(companyEmail),
              phone: String(companyContactPhone),
            }}
          />
        </Stack>
      </Grid>
    </>
  );
}

export function PurchaseOrderDetail(): ReactElement {
  const { uid = -1 } = useParams();
  const { data, error, loading } = usePurchaseOrderQuery({
    variables: { uid: Number(uid) },
  });

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error)
    return (
      <Fragment>
        There's no data to show or unexpected error has happened!
      </Fragment>
    );

  return (
    <DetailView
      headerSections={
        <PurchaseOrderHeaderSection purchaseOrder={data.purchaseOrder} />
      }
    >
      <></>
    </DetailView>
  );
}
