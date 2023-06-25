import { Stack } from "@mui/material";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

export default function LinkColumn({
  linkIds,
  linkPath,
}: {
  linkIds: string[];
  linkPath: string;
}): ReactElement {
  return (
    <Stack direction={"row"} columnGap={1}>
      {linkIds?.map(code => (
        <Link to={`${linkPath}${code}`} style={{ textDecoration: "none" }}>
          {code}
        </Link>
      ))}
    </Stack>
  );
}
