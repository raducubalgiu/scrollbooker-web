"use client";

import {
  Avatar,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemProps,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { useMutate } from "@/hooks/useHttp";
import { NotificationType } from "@/ts/models/Notification/NotificationType";

type NotificationItemProps = {
  notification: NotificationType;
  refetchNotifications: () => void;
} & ListItemProps;

export default function NotificationItem({
  notification,
  refetchNotifications,
  ...props
}: NotificationItemProps) {
  const { type, sender, is_read } = notification || {};
  let constructedMessage = "";

  const { mutate: deleteNotification, isPending } = useMutate({
    key: ["delete-notification"],
    url: "/api/notifications",
    method: "DELETE",
    options: {
      onSuccess: refetchNotifications,
    },
  });

  switch (true) {
    case type === "follow":
      constructedMessage = `started following you`;
      break;
    default:
      return null;
  }

  return (
    <ListItem sx={{ p: 0, mb: 2.5 }} {...props}>
      <Paper sx={{ flexGrow: 1, borderRadius: 5 }}>
        <CustomStack p={2.5} flexGrow={1}>
          <CustomStack justifyContent="flex-start" maxWidth={400}>
            <Avatar
              src={sender.avatar}
              sx={{ width: 45, height: 45, mr: 1.5 }}
            />
            <Stack flexWrap="wrap">
              <Typography fontWeight={600}>{sender.username}</Typography>
              <Typography
                color="neutral.900"
                fontWeight={is_read ? 600 : 500}
                mt={0.5}
              >
                {constructedMessage}
              </Typography>
            </Stack>
          </CustomStack>
          <IconButton
            onClick={() => deleteNotification({ id: notification.id })}
          >
            {isPending ? <CircularProgress size={20} /> : <CloseIcon />}
          </IconButton>
        </CustomStack>
      </Paper>
    </ListItem>
  );
}
