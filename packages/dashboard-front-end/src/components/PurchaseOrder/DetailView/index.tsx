import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { NoteType, purchaseOrderStatusSet } from "dashboard-core";
import { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  Note,
  PurchaseOrderDetailFieldsFragment,
  usePurchaseOrderQuery,
  usePushPurchaseOrderToNextStageMutation,
} from "../../../generated/graphql";
import ActionLogList from "../../ActionLog/ListView";
import { DetailView } from "../../Common/DetailView";
import { DetailViewHeaderTitle } from "../../Common/DetailViewHeaderTitle";
import { DetailViewSection } from "../../Common/DetailViewSection";
import NoteGrid from "../../NoteGrid";
import { OrderItemList } from "../../OrderItem/ListView";
import { ObjectProperty } from "../../Properties/ObjectProperty";
import { TextProperty } from "../../Properties/TextProperty";

function PurchaseOrderHeaderSection({
  purchaseOrder: {
    uid,
    expectedDeliveryDate,
    createdAt,
    status,
    nextStatus,
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
  const [pushPurchaseOrderToNextStage] =
    usePushPurchaseOrderToNextStageMutation({
      refetchQueries: ["PurchaseOrders", "PurchaseOrder", "ActionLogs"],
    });

  function updateStatus() {
    void pushPurchaseOrderToNextStage({ variables: { uid } });
  }

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
          <Stack spacing={2} direction={"row"}>
            <Typography component={"span"} variant="subtitle2">
              Status
            </Typography>
            <Typography component={"span"} variant="subtitle2">
              <Stepper
                activeStep={
                  purchaseOrderStatusSet.indexOf(status) +
                  (nextStatus == null ? 1 : 0)
                }
                alternativeLabel={false}
              >
                {purchaseOrderStatusSet.slice(0, -1).map(statusName => (
                  <Step key={statusName}>
                    <StepLabel>{statusName}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Typography>
            {nextStatus != null && (
              <Button size="small" variant="contained" onClick={updateStatus}>
                {`Set to ${nextStatus}`}
              </Button>
            )}
          </Stack>
          <ObjectProperty
            title="To       "
            value={{
              name: factoryName,
              address: factoryAddress,
              contact: factoryContactName,
              email: factoryEmail,
              phone: factoryContactPhone,
            }}
          />
          <ObjectProperty
            title="Ship to"
            value={{
              name: companyName,
              address: companyAddress,
              contact: companyContactName,
              email: companyEmail,
              phone: companyContactPhone,
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
      <DetailViewSection headerTitle="Order items:">
        <OrderItemList
          orderUid={Number(uid)}
          addActionDisabled={data.purchaseOrder.status !== "draft"}
        />
      </DetailViewSection>
      <DetailViewSection headerTitle="Notes:">
        <NoteGrid
          notes={data.purchaseOrder.notes as Note[]}
          type={"purchaseOrderNote" as NoteType}
          parentId={data.purchaseOrder.id}
        />
      </DetailViewSection>
      <DetailViewSection headerTitle="Log records:">
        <ActionLogList
          entityIds={[
            data.purchaseOrder.id,
            ...data.purchaseOrder.items.map(({ id }) => id),
            ...data.purchaseOrder.notes.map(({ id }) => id),
          ]}
          entityTypes={["PurchaseOrder", "OrderItem", "Note"]}
        />
      </DetailViewSection>
    </DetailView>
  );
}
