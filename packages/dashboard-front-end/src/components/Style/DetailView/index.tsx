import { Box, Grid, LinearProgress, Stack } from "@mui/material";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { StyleFieldsFragment, useStyleQuery } from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { DetailView } from "../../Common/DetailView";
import { DetailViewHeaderTitle } from "../../Common/DetailViewHeaderTitle";
import { DetailViewSection } from "../../Common/DetailViewSection";
import EntityTimeline from "../../EntityTimeline";
import { FileGrid } from "../../FileGrid";
import { BooleanProperty, TextProperty } from "../../Properties";
import { LinkProperty } from "../../Properties/LinkProperty";
import { UploadTechPackPopperButton } from "../../TechPackForm";

function StyleHeaderSection({
  style: { code, name: title, techPackUploaded, productCodes },
}: {
  style: StyleFieldsFragment;
}): ReactElement {
  return (
    <>
      <DetailViewHeaderTitle title={`${title} style`} />
      <Grid item xs={12} sx={{ pl: 1 }}>
        <Stack spacing={2} sx={{ pl: 0.5 }}>
          <TextProperty title="Number" value={code} />
          <Grid alignItems="baseline" gap={3} container>
            <Grid item>
              <BooleanProperty
                title="Tech pack uploaded"
                value={techPackUploaded}
              />
            </Grid>
            <RequireRole authorizedRoles={["Admin", "VChapman"]}>
              <Grid item>
                <UploadTechPackPopperButton
                  variant="contained"
                  styleCode={code}
                />
              </Grid>
            </RequireRole>
          </Grid>
          {productCodes.length > 0 ? (
            <LinkProperty
              title="Products"
              baseUrl="products"
              resources={productCodes.map(code => ({
                id: code,
                text: code,
              }))}
            />
          ) : (
            <TextProperty title="Products" value="no associated products" />
          )}
        </Stack>
      </Grid>
    </>
  );
}

export function StyleDetail(): ReactElement {
  const { code = "" } = useParams();
  const { data, error, loading } = useStyleQuery({
    variables: { code },
  });

  if (loading)
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  if (data == null || error)
    return <>There's no data to show or unexpected error has happened!</>;

  const { id, techPacks } = data.style;

  return (
    <DetailView headerSections={<StyleHeaderSection style={data.style} />}>
      <DetailViewSection headerTitle="Tech packs:">
        <FileGrid fileType="tech-pack" parentID={id} files={techPacks} />
      </DetailViewSection>
      <DetailViewSection headerTitle="Timeline">
        <EntityTimeline
          entityIds={[id]}
          entityTypes={["Style"]}
          noteType="styleNote"
        />
      </DetailViewSection>
    </DetailView>
  );
}
