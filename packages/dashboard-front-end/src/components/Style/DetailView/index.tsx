import { Box, Button, Grid, LinearProgress, Stack } from "@mui/material";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { StyleFieldsFragment, useStyleQuery } from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { DetailView } from "../../Common/DetailView";
import { DetailViewHeader } from "../../Common/DetailViewHeader";
import { DetailViewSection } from "../../Common/DetailViewSection";
import EntityTimeline from "../../EntityTimeline";
import { TextProperty } from "../../Properties";
import { LinkProperty } from "../../Properties/LinkProperty";
import { UploadTechPackDialog } from "../../TechPackForm";
import { FileList } from "../../File";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

function StyleDetailHeader({
  style: { name: title, code, techPackUploaded },
}: {
  style: StyleFieldsFragment;
}): ReactElement {
  const [updateTechPackDialogOpen, setUpdateTechPackDialogOpen] =
    useState<boolean>(false);
  const status = techPackUploaded
    ? "tech pack uploaded"
    : "awaiting tech pack upload";

  return (
    <DetailViewHeader title={`${title} style #${code}`} headerData={[status]}>
      <>
        <UploadTechPackDialog
          styleCode={code}
          open={updateTechPackDialogOpen}
          onSave={() => setUpdateTechPackDialogOpen(false)}
          onClose={() => setUpdateTechPackDialogOpen(false)}
        />
        <RequireRole authorizedRoles={["Admin", "VChapman"]}>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={() => setUpdateTechPackDialogOpen(true)}
            startIcon={<FileUploadOutlinedIcon />}
          >
            Upload tech pack
          </Button>
        </RequireRole>
      </>
    </DetailViewHeader>
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

  const { id, techPacks, productCodes } = data.style;

  return (
    <DetailView header={<StyleDetailHeader style={data.style} />}>
      <DetailViewSection>
        <Grid item xs={12}>
          <Stack spacing={2}>
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
      </DetailViewSection>
      <DetailViewSection title="tech packs">
        <FileList fileType="tech-pack" parentID={id} files={techPacks} />
      </DetailViewSection>
      <DetailViewSection title="timeline">
        <EntityTimeline
          entityIds={[id]}
          entityTypes={["Style"]}
          noteType="styleNote"
        />
      </DetailViewSection>
    </DetailView>
  );
}
