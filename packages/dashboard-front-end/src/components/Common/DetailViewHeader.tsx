import { Grid, Divider } from "@mui/material";
import { Fragment, ReactElement } from "react";
import { DetailViewHeaderTitle, DetailViewHeaderDataValue } from "./Typography";

export function DetailViewHeader({
  title,
  headerData,
  children,
}: {
  title: string;
  headerData: string[];
  children?: ReactElement;
}) {
  return (
    <Grid
      item
      container
      rowGap={1}
      xs={12}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Grid item container rowGap={1} xs={12} sm={"auto"}>
        <Grid item xs={12}>
          <DetailViewHeaderTitle>{title}</DetailViewHeaderTitle>
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
      <Grid item columnGap={1} xs={12} sm={"auto"}>
        {children}
      </Grid>
    </Grid>
  );
}
