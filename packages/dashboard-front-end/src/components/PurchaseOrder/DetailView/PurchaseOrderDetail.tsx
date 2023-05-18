import {
  Box,
  Button,
  Grid,
  LinearProgress,
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

import EntityTimeline from "../../EntityTimeline";

import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  DetailViewHeader,
  DetailView,
  DetailViewSection,
} from "../../DetailView";
import { OrderItemsGroupedByAttributeList } from "../../OrderItem";
import { ObjectProperty } from "../../Properties";
import { FieldTitle, FieldValue } from "../../Typography";

function PurchaseOrderHeader({
  purchaseOrder: {
    uid,
    createdAt,
    expectedDeliveryDate,
    status,
    factory: { name: factoryCode },
    nextStatus,
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

  const headerTitle = `Purchase Order #${String(uid)} ${new Date(
    createdAt
  ).toLocaleDateString()}`;
  const headerData = [
    factoryCode,
    `expected delivery on ${new Date(
      expectedDeliveryDate
    ).toLocaleDateString()}`,
    status,
  ];

  return (
    <DetailViewHeader title={headerTitle} headerData={headerData}>
      <>
        {nextStatus != null && (
          <Button
            startIcon={<ThumbUpOutlinedIcon />}
            size="large"
            variant="outlined"
            onClick={updateStatus}
          >
            {`Next stage`}
          </Button>
        )}
      </>
    </DetailViewHeader>
  );
}

export default function PurchaseOrderDetail(): ReactElement {
  const { uid = -1 } = useParams();
  const { data, error, loading } = usePurchaseOrderQuery({
    variables: { uid: Number(uid) },
  });
  const theme = useTheme();
  const greaterThanXS = useMediaQuery(theme.breakpoints.up("sm"));

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error)
    return <>There's no data to show or unexpected error has happened!</>;

  const {
    purchaseOrder: {
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
  } = data;

  return (
    <DetailView
      header={<PurchaseOrderHeader purchaseOrder={data.purchaseOrder} />}
    >
      <DetailViewSection>
        <Grid item container columnGap={2} rowGap={2}>
          <Grid item xs={12} md={"auto"}>
            <FieldTitle title="stage" />
          </Grid>
          <Grid item xs={12} md={"auto"}>
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
          </Grid>
          <Grid item xs={12} md={"auto"}>
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
          </Grid>
        </Grid>
      </DetailViewSection>
      <DetailViewSection title="Order items">
        <OrderItemsGroupedByAttributeList
          orderUid={Number(uid)}
          addActionDisabled={data.purchaseOrder.status !== "draft"}
        />
      </DetailViewSection>
      <DetailViewSection title="Timeline">
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
