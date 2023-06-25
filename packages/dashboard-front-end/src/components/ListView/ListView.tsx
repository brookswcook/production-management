import { Container, Grid, useMediaQuery, useTheme } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColumnVisibilityModel,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { RefAttributes, useEffect, useState } from "react";
import { HideableGridColDef } from "./types";

export default function ListView<R extends GridValidRowModel = any>(
  props: DataGridProps<R> & RefAttributes<HTMLDivElement>
) {
  const theme = useTheme();
  const greaterThanXS = useMediaQuery(theme.breakpoints.up("sm"));

  const initialColumnVisibilityModel = (
    props.columns as HideableGridColDef<any>[]
  ).reduce((acc, { field, hideOnMobile }) => {
    acc[field] = greaterThanXS ? true : !hideOnMobile;
    return acc;
  }, {} as GridColumnVisibilityModel);

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(initialColumnVisibilityModel);

  useEffect(() => {
    setColumnVisibilityModel(initialColumnVisibilityModel);
  }, [greaterThanXS]);

  return (
    <Container maxWidth="xl" disableGutters={greaterThanXS ? false : true}>
      <Grid item xs={12}>
        <DataGrid
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          onColumnVisibilityModelChange={newModel =>
            setColumnVisibilityModel(newModel)
          }
          columnVisibilityModel={columnVisibilityModel}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          sx={{
            mt: 1,
            border: "2px solid rgba(224, 224, 224, 1)",
            borderRadius: 4,
          }}
          autoHeight
          {...props}
        />
      </Grid>
    </Container>
  );
}
