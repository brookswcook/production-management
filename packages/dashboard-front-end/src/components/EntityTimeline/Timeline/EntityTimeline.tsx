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
import EditIcon from "@mui/icons-material/Edit";

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
    <TimelineItem sx={{ minHeight: 50, px: 0 }}>
      <TimelineSeparator sx={{ minHeight: 70 }}>
        <TimelineDot variant="outlined" sx={{ m: 0 }}>
          <EditIcon fontSize="small" />
        </TimelineDot>
        {last && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
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

  return (
    <Box
      sx={{
        py: 1,
        borderTop: "1px solid rgba(224, 224, 224, 1)",
        borderBottom: "1px solid rgba(224, 224, 224, 1)",
      }}
    >
      <Timeline
        sx={{
          padding: 0,
          margin: 0,
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
    </Box>
  );
}
