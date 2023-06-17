import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
} from "@mui/lab";
import {
  Box,
  Button,
  capitalize,
  Divider,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { NoteType } from "dashboard-core";
import React, { FormEvent, useState } from "react";
import {
  ActionLogListFieldsFragment,
  CreateNoteInput,
  FileUploadInput,
  useActionLogsQuery,
  useCreateNoteMutation,
  useNotesQuery,
} from "../../../generated/graphql";
import EditIcon from "@mui/icons-material/Edit";
import { ApolloError } from "@apollo/client";
import { toast } from "react-toastify";

type TimelineItem = Omit<ActionLogListFieldsFragment, "__typename"> & {
  __typename?: "ActionLog" | "Note";
};

function TimelineSeparatorItem() {
  return (
    <TimelineItem sx={{ minHeight: 20, pl: 2 }}>
      <TimelineSeparator>
        <TimelineConnector />
      </TimelineSeparator>
    </TimelineItem>
  );
}

function TimelineCommentItem({
  userFullName,
  comment,
  date,
}: {
  userFullName: string;
  comment: string;
  date: Date;
}) {
  return (
    <TimelineItem sx={{ minHeight: 40, backgroundColor: "#ffffff" }}>
      <TimelineContent sx={{ p: 0 }}>
        <ListItemText
          disableTypography={true}
          sx={{
            m: 0,
            p: 0,
            border: "2px solid rgba(224, 224, 224, 1)",
            borderRadius: 2,
          }}
          primary={
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderBottom: "2px solid rgba(224, 224, 224, 1) ",
              }}
            >
              <Typography
                fontWeight={600}
                sx={{ display: "inline" }}
                component="span"
                variant="body1"
              >{`${userFullName}`}</Typography>
              <Typography
                fontWeight={400}
                fontSize={14}
                sx={{ display: "inline" }}
                component="span"
              >
                {` commented on ${new Date(date).toLocaleDateString()}`}
              </Typography>
            </Box>
          }
          secondary={
            <Box sx={{ px: 2, py: 1 }}>
              <Typography
                sx={{
                  display: "inline",
                }}
                component="span"
                variant="body1"
              >
                {comment}
              </Typography>
            </Box>
          }
        />
      </TimelineContent>
    </TimelineItem>
  );
}

function TimeLineActionItem({
  title,
  userFullName,
  date,
  last = false,
}: {
  title: string;
  userFullName: string;
  date: Date;
  last?: boolean;
}) {
  return (
    <TimelineItem sx={{ minHeight: 50, p: 0 }}>
      <TimelineSeparator sx={{ minHeight: 70 }}>
        <TimelineDot variant="outlined" sx={{ m: 0 }}>
          <EditIcon fontSize="small" />
        </TimelineDot>
        {last && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ py: 0 }}>
        <>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ display: "inline" }}
            component="span"
          >
            {`${capitalize(title)} by `}
          </Typography>
          <Typography
            fontWeight={600}
            sx={{ display: "inline" }}
            component="span"
            variant="body1"
          >{`${userFullName}`}</Typography>
          <Typography
            fontWeight={400}
            fontSize={14}
            sx={{ display: "inline" }}
            component="span"
          >
            {` on ${new Date(date).toLocaleDateString()}`}
          </Typography>
        </>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function EntityTimeline({
  entityIds,
  entityTypes,
  noteType,
}: {
  entityIds: string[];
  entityTypes: string[];
  noteType: NoteType;
}) {
  const refetchQueries = ["Notes", "ActionLogs"];
  if (noteType === "productNote") refetchQueries.push("Product");
  if (noteType === "fabricNote") refetchQueries.push("Fabric");
  if (noteType === "purchaseOrderNote") refetchQueries.push("PurchaseOrder");
  if (noteType === "styleNote") refetchQueries.push("Style");
  const refetchPolicy = {
    refetchQueries,
  };

  const [noteText, setNoteText] = useState<string>("");
  const [createNoteMutation] = useCreateNoteMutation(refetchPolicy);
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

  if (loading || notesLoading) return <>"Loading..."</>;
  if (error || notesError) return <>"An error occured"</>;

  const items: TimelineItem[] =
    data != null && notesData != null
      ? [
          ...data.actionLogs,
          ...notesData.notes.map(item => ({ ...item, title: item.text })),
        ].sort(
          (a, b) =>
            new Date(a.createdAt ?? 0).getTime() -
            new Date(b.createdAt ?? 0).getTime()
        )
      : [];

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

      setNoteText("");
    } catch (error) {
      toast.error((error as ApolloError).message);
    }
  }

  return (
    <Box
      sx={{
        py: 1,
        borderTop: "1px solid rgba(224, 224, 224, 1)",
        borderBottom: "2px solid rgba(224, 224, 224, 1)",
      }}
    >
      <Timeline
        sx={{
          p: 0,
          m: 0,
          mb: 1,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {items.map(({ __typename, title, id, user, createdAt }, index) => {
          const isLastItem = index < items.length - 1;
          const userFullName = user?.fullName ?? "";
          return __typename === "ActionLog" ? (
            <TimeLineActionItem
              title={title}
              date={new Date(createdAt ?? 0)}
              key={id}
              last={isLastItem}
              userFullName={userFullName}
            />
          ) : (
            <React.Fragment key={id}>
              <TimelineCommentItem
                userFullName={userFullName}
                comment={title}
                date={new Date(createdAt ?? 0)}
              />
              {isLastItem && <TimelineSeparatorItem />}
            </React.Fragment>
          );
        })}
      </Timeline>
      <Divider sx={{ mb: 1 }}></Divider>
      <Stack
        component="form"
        onSubmit={createNewNote}
        spacing={2}
        autoComplete="off"
      >
        <TextField
          variant="outlined"
          label="Leave a comment"
          multiline
          rows={2}
          maxRows={4}
          onChange={({ target: { value } }) => {
            setNoteText(value);
          }}
          value={noteText}
          required
        />
        <Box>
          <Button sx={{ float: "right" }} variant="contained" type="submit">
            Comment
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
