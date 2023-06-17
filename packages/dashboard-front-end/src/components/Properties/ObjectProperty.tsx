import { Grid, IconButton, Stack, Tooltip } from "@mui/material";
import { ReactElement } from "react";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { FieldTitle } from "../Typography";
import BooleanProperty from "./BooleanProperty";
import TextProperty from "./TextProperty";

interface PropertyObject {
  [x: string]: PropertyValue;
}
type PropertyValue =
  | string
  | number
  | boolean
  | null
  | PropertyObject
  | Array<PropertyValue>;

export default function ObjectProperty({
  title,
  value,
  detailLink,
  onEdit,
  children,
}: {
  title: string;
  value: Record<string, PropertyValue>;
  detailLink?: string;
  onEdit?: () => void;
  children?: ReactElement;
}): ReactElement {
  return (
    <Grid
      component="fieldset"
      sx={{
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid rgba(224, 224, 224, 1)",
      }}
      item
      container
      justifyContent={"space-between"}
      rowGap={1}
      alignItems={"center"}
    >
      <Stack
        component="legend"
        direction={"row"}
        columnGap={1}
        alignItems="center"
      >
        <FieldTitle style={{ color: "inherit", textTransform: "capitalize" }}>
          {title}
        </FieldTitle>
        {detailLink && (
          <IconButton
            href={detailLink}
            size="small"
            edge="start"
            color="primary"
            aria-label="details"
          >
            <Tooltip title="Open details">
              <PageviewOutlinedIcon />
            </Tooltip>
          </IconButton>
        )}
        {onEdit && (
          <IconButton
            size="small"
            edge="start"
            color="primary"
            aria-label="edit"
            onClick={onEdit}
          >
            <Tooltip title="Edit">
              <EditOutlinedIcon />
            </Tooltip>
          </IconButton>
        )}
        <>{children}</>
      </Stack>

      {Object.entries(value)
        .filter(([, entryValue]) => entryValue != null)
        .map(([key, entryValue]) => {
          const entryValueType = typeof entryValue;
          return (
            <Grid item alignItems={"baseline"} xs={12} md={"auto"} key={key}>
              {entryValueType === "string" || entryValueType === "number" ? (
                <TextProperty title={key} value={entryValue as string} />
              ) : entryValueType === "boolean" ? (
                <BooleanProperty title={key} value={entryValue as boolean} />
              ) : (
                <></>
              )}
            </Grid>
          );
        })}
    </Grid>
  );
}
