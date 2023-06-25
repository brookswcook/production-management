import { GridValidRowModel, GridColDef } from "@mui/x-data-grid";

export type HideableGridColDef<T extends GridValidRowModel> = GridColDef<T> & {
  hideOnMobile?: boolean;
};
