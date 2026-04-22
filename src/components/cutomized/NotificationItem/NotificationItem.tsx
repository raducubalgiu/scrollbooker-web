"use client";

import {
  Avatar,
  Badge,
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
import { formatRating } from "@/utils/formatters";
import StarIcon from "@mui/icons-material/Star";

type NotificationItemProps = {
  notification: Notification;
} & ListItemProps;

export default function NotificationItem({
  notification,
}: NotificationItemProps) {
  const { type, sender } = notification || {};

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
    avatar: { width: 55, height: 55, border: 1, borderColor: "divider" },
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
                    a început să te urmărească
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
}
