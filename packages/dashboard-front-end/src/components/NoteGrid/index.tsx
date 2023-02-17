import { Box, Button, Stack, TextField } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import {
  CreateNoteInput,
  FileUploadInput,
  Note,
  useCreateNoteMutation,
  User,
} from "../../generated/graphql";
import { PopperButton } from "../PopperButton";
import { FormEvent, ReactElement, useState } from "react";
import { toast } from "react-toastify";
import { NoteType } from "dashboard-core";
import { ApolloError } from "@apollo/client";
import { renderCellExpand } from "../Common/GridCellExpand";

export default function NoteGrid({
  parentId,
  notes: rows,
  type,
}: {
  parentId: string;
  notes: Note[];
  type: NoteType;
}): ReactElement {
  const columns: GridColDef<Note>[] = [
    {
      field: "text",
      headerName: "Note",
      type: "string",
      flex: 5,
      renderCell: renderCellExpand,
    },
    {
      field: "user",
      headerName: "Author",
      type: "string",
      flex: 1,
      valueFormatter: params => {
        const user = params.value as User;
        return user.fullName;
      },
    },
    {
      field: "createdAt",
      headerName: "Date",
      type: "date",
      flex: 1,
      valueFormatter: params => {
        const date = new Date(params.value as string);
        return date.toLocaleDateString();
      },
    },
  ];

  return (
    <Box sx={{ height: "400px", width: "100%", pt: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        getRowId={item => item.id}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        components={{ Toolbar: CustomToolbar }}
      />
    </Box>
  );

  function CustomToolbar() {
    const refetchQueries = [];
    if (type === "productNote") refetchQueries.push("Product");
    if (type === "fabricNote") refetchQueries.push("Fabric");
    if (type === "purchaseOrderNote") refetchQueries.push("PurchaseOrder");
    const refetchPolicy = {
      refetchQueries,
    };
    const [createNoteMutation] = useCreateNoteMutation(refetchPolicy);
    const [noteText, setNoteText] = useState<string>("");

    async function createNewNote(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      try {
        const newNoteData = {
          parentId,
          text: noteText,
          type,
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
}
