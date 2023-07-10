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
  props: DataGridProps<R> &
    RefAttributes<HTMLDivElement> & { name: string; disableGutters?: true }
) {
  const theme = useTheme();
  const greaterThanXS = useMediaQuery(theme.breakpoints.up("sm"));

  const defaultColumnVisibilityModel = (
    props.columns as HideableGridColDef<any>[]
  ).reduce((acc, { field, hideOnMobile }) => {
    acc[field] = greaterThanXS ? true : !hideOnMobile;
    return acc;
  }, {} as GridColumnVisibilityModel);

  // TODO: save it per user
  const savedColumnVisibilityModelString = localStorage.getItem(
    `${props.name}-columnVisibilityModel`
  );
  const savedColumnVisibilityModel =
    savedColumnVisibilityModelString != null
      ? (JSON.parse(
          savedColumnVisibilityModelString
        ) as GridColumnVisibilityModel)
      : null;

  const [columnVisibilityModel, setColumnVisibilityModel] =
    useState<GridColumnVisibilityModel>(
      savedColumnVisibilityModel ?? defaultColumnVisibilityModel
    );

  useEffect(() => {
    setColumnVisibilityModel(
      savedColumnVisibilityModel ?? defaultColumnVisibilityModel
    );
  }, [greaterThanXS]);

  return (
    <Container
      maxWidth="xl"
      disableGutters={props.disableGutters ?? (greaterThanXS ? false : true)}
    >
      <Grid item xs={12}>
        <DataGrid
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          onColumnVisibilityModelChange={newModel => {
            setColumnVisibilityModel(newModel);
            localStorage.setItem(
              `${props.name}-columnVisibilityModel`,
              JSON.stringify(newModel)
            );
          }}
          columnVisibilityModel={columnVisibilityModel}
          sx={{
            mt: 1,
            border: "2px solid rgba(224, 224, 224, 1)",
            borderRadius: 4,
          }}
          autoHeight
          disableColumnMenu
          disableRowSelectionOnClick
          {...props}
        />
      </Grid>
    </Container>
  );
}
