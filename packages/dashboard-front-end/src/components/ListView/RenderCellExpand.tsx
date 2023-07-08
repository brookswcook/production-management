import { Suspense } from "react";
import { CellExpand } from ".";
import { GridRenderCellParams } from "@mui/x-data-grid/models/params/gridCellParams";

export default function ({ value, colDef }: GridRenderCellParams) {
  return (
    <Suspense fallback={<div>{String(value)}</div>}>
      <CellExpand value={String(value)} width={colDef.computedWidth} />
    </Suspense>
  );
}
