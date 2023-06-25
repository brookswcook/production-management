import {
  Container,
  Divider,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactElement } from "react";

export default function DetailView({
  header,
  children,
}: {
  header: JSX.Element;
  children: JSX.Element[] | JSX.Element;
}): ReactElement {
  const theme = useTheme();
  const greaterThanXS = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Container
      maxWidth="xl"
      disableGutters={greaterThanXS ? false : true}
      sx={{ pt: 1 }}
    >
      <Grid
        justifyContent={"left"}
        container
        sx={{
          border: "2px solid rgba(224, 224, 224, 1)",
          borderRadius: 4,
        }}
      >
        <Grid item xs={12} sx={{ p: 2 }}>
          {header}
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ borderBottomWidth: 2 }} />
        </Grid>
        <Grid item container rowGap={3} xs={12} sx={{ p: 2 }}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}
