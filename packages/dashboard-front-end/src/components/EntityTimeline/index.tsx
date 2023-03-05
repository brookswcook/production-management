import { ApolloError } from "@apollo/client";
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { NoteType } from "dashboard-core";
import { FormEvent, ReactElement, useState } from "react";
import { toast } from "react-toastify";
import {
  ActionLogListFieldsFragment,
  CreateNoteInput,
  FileUploadInput,
  useActionLogsQuery,
  useCreateNoteMutation,
  useNotesQuery,
  User,
} from "../../generated/graphql";
import { PopperButton } from "../PopperButton";

export default function EntityTimeline({
  entityIds,
  entityTypes,
  noteType,
}: {
  entityIds: string[];
  entityTypes: string[];
  noteType: NoteType;
}): ReactElement {
  const { data, loading, error } = useActionLogsQuery({
    variables: { data: { entityIds, entityTypes } },
  });

  const {
    data: notesData,
    loading: notesLoading,
    error: notesError,
  } = useNotesQuery({
    variables: { data: { entityId: entityIds[0], type: noteType } },
  });

  const columns: GridColDef<ActionLogListFieldsFragment>[] = [
    {
      field: "title",
      headerName: "Title",
      minWidth: 70,
      flex: 2,
      type: "string",
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 40,
      flex: 1,
      type: "string",
      valueFormatter: params => {
        const user = params.value as User;
        return user.firstName;
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 70,
      flex: 2,
      type: "date",
      valueFormatter: params => {
        const date = new Date(params.value as string);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
  ];

  const rows: Omit<ActionLogListFieldsFragment, "__typename">[] =
    data != null && notesData != null
      ? [
          ...data.actionLogs,
          ...notesData.notes.map(item => ({ ...item, title: item.text })),
        ]
      : [];

  function CustomToolbar() {
    const refetchQueries = ["Notes", "ActionLogs"];
    if (noteType === "productNote") refetchQueries.push("Product");
    if (noteType === "fabricNote") refetchQueries.push("Fabric");
    if (noteType === "purchaseOrderNote") refetchQueries.push("PurchaseOrder");
    if (noteType === "styleNote") refetchQueries.push("Style");
    const refetchPolicy = {
      refetchQueries,
    };
    const [createNoteMutation] = useCreateNoteMutation(refetchPolicy);
    const [noteText, setNoteText] = useState<string>("");

    async function createNewNote(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      try {
        const newNoteData = {
          parentId: entityIds[0],
          text: noteText,
          type: noteType,
          images: [],
        } as CreateNoteInput & { images: FileUploadInput[] };

        await createNoteMutation({
          variables: {
            data: newNoteData,
          },
        });
      } catch (error) {
        toast.error((error as ApolloError).message);
      }
    }

    return (
      <GridToolbarContainer>
        <PopperButton title="New note">
          <Stack
            component="form"
            onSubmit={createNewNote}
            spacing={2}
            autoComplete="off"
          >
            <TextField
              variant="standard"
              label="Note text"
              multiline
              onChange={({ target: { value } }) => {
                setNoteText(value);
              }}
              required
            />
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        </PopperButton>
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  return (
    <Grid item xs={12}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={item => item.id}
        loading={loading && notesLoading}
        error={error || notesError}
        autoHeight
        components={{
          Toolbar: CustomToolbar,
          ErrorOverlay: () => {
            return (
              <Typography variant="h6" style={{ whiteSpace: "nowrap" }}>
                {error?.message}
              </Typography>
            );
          },
        }}
        initialState={{
          pagination: {
            pageSize: 10,
          },
          sorting: { sortModel: [{ field: "createdAt", sort: "desc" }] },
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        disableSelectionOnClick
        sx={{ mt: 1 }}
      />
    </Grid>
  );
}
