import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { purchaseOrderStatusSet } from "dashboard-core";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import {
  PurchaseOrderDetailFieldsFragment,
  usePurchaseOrderQuery,
  usePushPurchaseOrderToNextStageMutation,
} from "../../../generated/graphql";
import { DetailView } from "../../Common/DetailView";
import { DetailViewHeaderTitle } from "../../Common/DetailViewHeaderTitle";
import { DetailViewSection } from "../../Common/DetailViewSection";
import { FieldTitle, FieldValue } from "../../Common/Typography";
import EntityTimeline from "../../EntityTimeline";
import { OrderItemsGroupedByAttributeList } from "../../OrderItem/ListView";
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

  const theme = useTheme();
  const greaterThanXS = useMediaQuery(theme.breakpoints.up("sm"));

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
          <Grid
            container
            columnGap={{ xs: 1, sm: 2 }}
            rowGap={{ xs: 2, md: 0 }}
            justifyContent={"flex-start"}
          >
            <Grid item xs={12} sm={10} md={"auto"}>
              <FieldTitle title="status" />
            </Grid>
            <Grid item xs={12} sm={10} md={"auto"}>
              <FieldValue>
                <Stepper
                  orientation={greaterThanXS ? "horizontal" : "vertical"}
                  activeStep={
                    purchaseOrderStatusSet.indexOf(status) +
                    (nextStatus == null ? 1 : 0)
                  }
                  alternativeLabel={false}
                >
                  {purchaseOrderStatusSet
                    .slice(0, -1)
                    .map((statusName, index) => (
                      <Step key={index}>
                        <StepLabel>{statusName}</StepLabel>
                      </Step>
                    ))}
                </Stepper>
              </FieldValue>
            </Grid>
            <Grid item xs={12} md={"auto"}>
              {nextStatus != null && (
                <Button size="small" variant="contained" onClick={updateStatus}>
                  {`Set to ${nextStatus}`}
                </Button>
              )}
            </Grid>
          </Grid>
          <ObjectProperty
            title="To"
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
    return <>There's no data to show or unexpected error has happened!</>;

  return (
    <DetailView
      headerSections={
        <PurchaseOrderHeaderSection purchaseOrder={data.purchaseOrder} />
      }
    >
      <DetailViewSection headerTitle="Order items:">
        <OrderItemsGroupedByAttributeList
          orderUid={Number(uid)}
          addActionDisabled={data.purchaseOrder.status !== "draft"}
        />
      </DetailViewSection>
      <DetailViewSection headerTitle="Timeline">
        <EntityTimeline
          entityIds={[
            data.purchaseOrder.id,
            ...data.purchaseOrder.items.map(({ id }) => id),
          ]}
          entityTypes={["PurchaseOrder", "OrderItem"]}
          noteType="purchaseOrderNote"
        />
      </DetailViewSection>
    </DetailView>
  );
}
