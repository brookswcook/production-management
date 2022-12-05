import { Box, Button, Grid, LinearProgress, Stack } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  File,
  Style,
  useStyleQuery,
  useTechPackLinksLazyQuery,
} from "../../../generated/graphql";
import RequireRole from "../../Auth/RequireRole";
import { DetailView } from "../../Common/DetailView";
import { DetailViewHeaderTitle } from "../../Common/DetailViewHeaderTitle";
import { BooleanProperty, TextProperty } from "../../Properties";
import { LinkProperty } from "../../Properties/LinkProperty";
import { UploadTechPackPopperButton } from "../../TechPackForm";

function StyleHeaderSection({
  style: { code, name: title, techPackUploaded, techPacks, productCodes },
}: {
  style: Pick<Style, "code" | "name" | "techPackUploaded" | "productCodes"> & {
    techPacks: Pick<File, "uploadingKey">[];
  };
}) {
  const [getTechPackLinks] = useTechPackLinksLazyQuery();
  const [techPackLinks, setTechPackLinks] = useState<string[]>(["#"]);

  useEffect(() => {
    void generateTechPackLinks();
  }, [techPacks]);

  async function generateTechPackLinks() {
    if (techPacks.length > 0) {
      try {
        const { data } = await getTechPackLinks({
          variables: {
            uploadingKeys: techPacks.map(({ uploadingKey }) => uploadingKey),
          },
        });
        if (data == null) return;
        setTechPackLinks(data.techPackLinks);
      } catch (error) {
        toast.error((error as Error).message);
      }
    }
  }

  return (
    <Fragment>
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
            {techPackUploaded &&
              techPackLinks.map((techPackLink, index) => {
                return (
                  <Grid key={index} item>
                    <Button
                      href={techPackLink}
                      target="_blank"
                      variant={"contained"}
                      size={"small"}
                    >
                      Download tech pack
                    </Button>
                  </Grid>
                );
              })}
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
    </Fragment>
  );
}

function StyleBottomSection() {
  return <Fragment></Fragment>;
}

export function StyleDetail() {
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
    return <Fragment>No data or unexpected error has happened!</Fragment>;

  const { name, techPackUploaded, techPacks, productCodes } = data.style;

  return (
    <DetailView
      headerSections={
        <StyleHeaderSection
          style={{
            code,
            name,
            techPackUploaded: Boolean(techPackUploaded),
            techPacks,
            productCodes,
          }}
        />
      }
      bottomSections={<StyleBottomSection />}
    ></DetailView>
  );
}
