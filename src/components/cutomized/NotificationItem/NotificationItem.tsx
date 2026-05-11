"use client";

import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemProps,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Notification } from "@/ts/models/user/Notification";
import { NotificationTypeEnum } from "@/ts/enums/NotificationTypeEnum";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type NotificationItemProps = {
  notification: Notification;
  onNavigateToUserProfile: (username: string) => void;
} & ListItemProps;

export default function NotificationItem({
  notification,
  onNavigateToUserProfile,
}: NotificationItemProps) {
  const { type, sender } = notification || {};

  const queryClient = useQueryClient();

  const { mutate: toggleFollow } = useMutation({
    mutationFn: async ({
      targetUserId,
      isFollow,
    }: {
      targetUserId: number;
      isFollow: boolean;
    }) => {
      const url = `/api/follow`;
      const data = { followeeId: targetUserId };
      return isFollow ? axios.delete(url, { data }) : axios.post(url, data);
    },
    onMutate: async ({ targetUserId }) => {
      const queryKey = ["notifications"];
      await queryClient.cancelQueries({ queryKey });

      const previousData = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            results: page.results.map((notif: Notification) =>
              notif.sender.id === targetUserId
                ? {
                    ...notif,
                    sender: {
                      ...notif.sender,
                      is_follow: !notif.sender.is_follow,
                    },
                  }
                : notif
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["notifications"], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFollow({
      targetUserId: sender.id,
      isFollow: !!sender.is_follow,
    });
  };

  switch (true) {
    case type === NotificationTypeEnum.FOLLOW:
      return (
        <ListItem disablePadding>
          <ListItemButton
            onClick={() =>
              onNavigateToUserProfile(notification.sender.username)
            }
            sx={{ py: { xs: 1.5, lg: 2.5 } }}
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              flex={1}
            >
              <Stack flexDirection="row" alignItems="center" gap={2}>
                <Avatar
                  sx={styles.avatar}
                  src={sender.avatar ?? ""}
                  alt={sender.fullname}
                />

                <Box>
                  <Typography
                    sx={{ fontWeight: 600, fontSize: { xs: 15, lg: 17 } }}
                  >
                    {sender.fullname}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    a început să te urmărească
                  </Typography>
                </Box>
              </Stack>

              <Button
                variant={sender.is_follow ? "outlined" : "contained"}
                color={sender.is_follow ? "secondary" : "primary"}
                disableElevation
                onClick={handleFollow}
                onMouseDown={(e) => e.stopPropagation()}
                sx={styles.followButton}
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
}

const styles = {
  avatar: { width: 55, height: 55, border: 1, borderColor: "divider" },
  followButton: {
    py: { xs: 0.35, lg: 0.5 },
    px: { xs: 1.25, lg: 1.5 },
    fontSize: { xs: "0.875rem", sm: "0.9rem" },
  },
};
