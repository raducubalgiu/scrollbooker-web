"use client";

import {
  Avatar,
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemProps,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { useMutate } from "@/hooks/useHttp";
import { NotificationType } from "@/ts/models/user/Notification";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

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
    <Paper sx={{ flexGrow: 1, borderRadius: 5 }}>
      <ListItemButton
        component="div"
        onClick={() => sender?.id && router.push(`/profile/${sender.username}`)}
        sx={{ p: 0, mb: 1.5, borderRadius: 5 }}
        {...props}
      >
        <CustomStack p={2.5} flexGrow={1}>
          <CustomStack justifyContent="flex-start" maxWidth={400}>
            <Avatar
              src={sender?.avatar}
              sx={{ width: 45, height: 45, mr: 1.5 }}
            />
            <Stack flexWrap="wrap">
              <Typography fontWeight={600}>{sender?.username ?? ""}</Typography>
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
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification({ id: notification.id });
            }}
          >
            {isPending ? <CircularProgress size={20} /> : <CloseIcon />}
          </IconButton>
        </CustomStack>
      </ListItemButton>
    </Paper>
  );
}
