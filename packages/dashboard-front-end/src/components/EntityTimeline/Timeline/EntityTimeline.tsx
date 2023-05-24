import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
} from "@mui/lab";
import { Box, capitalize, ListItemText, Typography } from "@mui/material";
import { NoteType } from "dashboard-core";
import React from "react";
import {
  ActionLogListFieldsFragment,
  useActionLogsQuery,
  useNotesQuery,
} from "../../../generated/graphql";

type TimelineItem = Omit<ActionLogListFieldsFragment, "__typename"> & {
  __typename?: "ActionLog" | "Note";
};

function TimelineSeparatorItem() {
  return (
    <TimelineItem sx={{ minHeight: 20, pl: "5px" }}>
      <TimelineSeparator>
        <TimelineConnector />
      </TimelineSeparator>
    </TimelineItem>
  );
}

function TimelineCommentItem({
  userFullName,
  comment,
  date: _,
}: {
  userFullName: string;
  comment: string;
  date?: Date;
}) {
  return (
    <TimelineItem sx={{ minHeight: 50 }}>
      <TimelineContent sx={{ p: 0 }}>
        <ListItemText
          sx={{ m: 0 }}
          primary={`${userFullName} commented`}
          secondary={
            <>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment}
              </Typography>
            </>
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
    <TimelineItem sx={{ minHeight: 50 }}>
      <TimelineSeparator>
        <TimelineDot />
        {last && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>{`${capitalize(title)} by ${userFullName} on ${new Date(
        date
      ).toLocaleDateString()}`}</TimelineContent>
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

  console.log(items);

  return (
    <Box
      sx={{
        backgroundColor: "#FCFCFC",
        border: "1px solid rgba(224, 224, 224, 1)",
        borderRadius: 1,
      }}
    >
      <Timeline
        sx={{
          padding: 0,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
          // [`& .${timelineItemClasses.root}`]: {
          //   border: "1px solid rgba(224, 224, 224, 1)",
          // },
        }}
      >
        {items.map(({ __typename, title, id, user, createdAt }, index) => {
          const isLastItem = index < items.length - 1;
          const isNextItemNote =
            index < items.length - 1 && items[index + 1].__typename === "Note";
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
              {isLastItem && !isNextItemNote && <TimelineSeparatorItem />}
            </React.Fragment>
          );
        })}
      </Timeline>
    </Box>
  );
}
