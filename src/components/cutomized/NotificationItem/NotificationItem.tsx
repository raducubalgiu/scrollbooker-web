"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemProps,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useMutate } from "@/hooks/useHttp";
import { useRouter } from "next/navigation";
import { Notification } from "@/ts/models/user/Notification";
import { NotificationTypeEnum } from "@/ts/enums/NotificationTypeEnum";
import { formatRating } from "@/utils/formatters";
import StarIcon from "@mui/icons-material/Star";

type NotificationItemProps = {
  notification: Notification;
  refetchNotifications: () => void;
} & ListItemProps;

export default function NotificationItem({
  notification,
  refetchNotifications,
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

  const styles = {
    badge: {
      "& .MuiBadge-badge": {
        right: "auto",
        left: "50%",
        transform: `translate(-50%, 100%)`,
      },
    },
    badgeContent: {
      backgroundColor: "background.paper",
      px: 1.5,
      py: 0.5,
      borderRadius: 50,
      boxShadow: 1,
    },
    avatar: { width: 50, height: 50, border: 1, borderColor: "divider" },
  };

  switch (true) {
    case type === NotificationTypeEnum.FOLLOW:
      return (
        <ListItem disablePadding>
          <ListItemButton onClick={() => {}} sx={{ py: 2.5 }}>
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Stack flexDirection="row" alignItems="center">
                {sender.is_business_or_employee ? (
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={
                      <Stack
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        sx={styles.badgeContent}
                      >
                        <StarIcon
                          sx={{ fontSize: 18, mr: 0.5 }}
                          color="primary"
                        />
                        <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                          {formatRating(sender.ratings_average)}
                        </Typography>
                      </Stack>
                    }
                    sx={styles.badge}
                  >
                    <Avatar
                      sx={styles.avatar}
                      src={sender.avatar ?? ""}
                      alt={sender.fullname}
                    />
                  </Badge>
                ) : (
                  <Avatar
                    sx={styles.avatar}
                    src={sender.avatar ?? ""}
                    alt={sender.fullname}
                  />
                )}

                <Box sx={{ ml: 2.5 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: 17 }}>
                    {sender.fullname}
                  </Typography>
                  <Typography color="text.secondary">
                    {sender.is_business_or_employee
                      ? sender.profession
                      : `@${sender.username}`}
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant={sender.is_follow ? "outlined" : "contained"}
                color={sender.is_follow ? "secondary" : "primary"}
                size="small"
                disableElevation
              >
                {sender.is_follow ? "Urmărești" : "Urmărește"}
              </Button>
            </Stack>
          </ListItemButton>
        </ListItem>
      );
    default:
      return null;
  }

  return (
    <Paper sx={{ flexGrow: 1, borderRadius: 5 }}>
      <ListItemButton
        component="div"
        onClick={() => sender?.id && router.push(`/profile/${sender.username}`)}
        sx={{ p: 0, mb: 1.5, borderRadius: 5 }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          p={2.5}
          flexGrow={1}
        >
          <Stack flexDirection="row" alignItems="center" maxWidth={400} gap={2}>
            <Avatar src={sender?.avatar ?? ""} sx={{ width: 45, height: 45 }} />
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
          </Stack>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              deleteNotification({ id: notification.id });
            }}
          >
            {isPending ? <CircularProgress size={20} /> : <CloseIcon />}
          </IconButton>
        </Stack>
      </ListItemButton>
    </Paper>
  );
}
