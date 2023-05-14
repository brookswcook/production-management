import { Grid, Divider } from "@mui/material";
import { Fragment } from "react";
import { DetailViewHeaderTitle, DetailViewHeaderDataValue } from "./Typography";

export function DetailViewHeader({
  title,
  headerData,
}: {
  title: string;
  headerData: string[];
}) {
  return (
    <Grid item container rowGap={1} xs={12}>
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
  );
}
