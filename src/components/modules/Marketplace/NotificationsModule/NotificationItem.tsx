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
import {
  AppointmentBookedNotificationData,
  AppointmentCanceledNotificationData,
  AppointmentReminderNotificationData,
  AppointmentRescheduledNotificationData,
  AppointmentReviewedNotificationData,
  BusinessValidationNotificationData,
  CommentPostNotificationData,
  EmploymentRequestNotificationData,
  LikePostNotificationData,
  Notification,
  RepostNotificationData,
} from "@/ts/models/user/Notification";
import { NotificationTypeEnum } from "@/ts/enums/NotificationTypeEnum";
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from "@tanstack/react-query";
import axios from "axios";
import Badge from "@mui/material/Badge";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import RepeatIcon from "@mui/icons-material/Repeat";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import VerifiedIcon from "@mui/icons-material/Verified";
import dayjs from "@/lib/dayjs";

type NotificationItemProps = {
  notification: Notification;
  onNavigateToUserProfile: (username: string, profession: string) => void;
  onNavigateToEmploymentRequest: (e: number) => void;
  onNavigateToAppointmentDetails: (appointmentId: number) => void;
} & ListItemProps;

interface NotificationsQueryPage {
  results: Notification[];
  nextPage?: number;
}

export default function NotificationItem({
  notification,
  onNavigateToUserProfile,
  onNavigateToEmploymentRequest,
  onNavigateToAppointmentDetails,
  ...listItemProps
}: NotificationItemProps) {
  const { type, sender, data, is_read } = notification || {};
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

      const previousData =
        queryClient.getQueryData<InfiniteData<NotificationsQueryPage>>(
          queryKey
        );

      queryClient.setQueryData<InfiniteData<NotificationsQueryPage>>(
        queryKey,
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              results: page.results.map((notif) => {
                if (notif.sender?.id === targetUserId) {
                  return {
                    ...notif,
                    sender: {
                      ...notif.sender,
                      is_follow: !notif.sender.is_follow,
                    },
                  };
                }
                return notif;
              }),
            })),
          };
        }
      );

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
    if (sender?.id) {
      toggleFollow({
        targetUserId: sender.id,
        isFollow: !!sender.is_follow,
      });
    }
  };

  const renderNotificationContent = () => {
    switch (type) {
      // Implemented
      case NotificationTypeEnum.FOLLOW:
        return {
          text: "a început să te urmărească",
          action: (
            <Button
              variant={sender?.is_follow ? "outlined" : "contained"}
              color={sender?.is_follow ? "secondary" : "primary"}
              disableElevation
              onClick={handleFollow}
              onMouseDown={(e) => e.stopPropagation()}
              sx={styles.actionButton}
            >
              {sender?.is_follow ? "Urmărești" : "Urmărește"}
            </Button>
          ),
        };

      case NotificationTypeEnum.LIKE_POST: {
        const likeData = data as LikePostNotificationData;
        return {
          text: `a apreciat postarea ta ${
            likeData.total_count > 1
              ? `și încă ${likeData.total_count - 1} persoane`
              : ""
          }`,
          image: likeData.post_url,
        };
      }

      case NotificationTypeEnum.COMMENT_POST:
        const commentData = data as CommentPostNotificationData;

        return {
          text: "a lăsat un comentariu la postarea ta",
          image: commentData.post_url,
        };

      case NotificationTypeEnum.REPOST:
        const repostData = data as RepostNotificationData;

        return {
          text: "a distribuit postarea ta",
          image: repostData.post_url,
        };

      case NotificationTypeEnum.MENTION_POST:
        return {
          text: "te-a menționat într-o postare",
        };

      // Implemented
      case NotificationTypeEnum.APPOINTMENT_BOOKED: {
        const appointmentData = data as AppointmentBookedNotificationData;
        const formattedDate = dayjs(appointmentData.start_date).format(
          "DD-MM-YYYY HH:mm"
        );
        return {
          text: `A efectuat o programare pentru data de ${formattedDate}`,
          action: (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToAppointmentDetails(appointmentData.appointment_id);
              }}
              variant="contained"
              sx={styles.actionButton}
              disableElevation
            >
              Detalii
            </Button>
          ),
        };
      }

      // Implemented
      case NotificationTypeEnum.APPOINTMENT_CANCELED: {
        const cancelData = data as AppointmentCanceledNotificationData;
        return {
          text: `a anulat programarea. ${cancelData.canceled_reason ? `Motiv: ${cancelData.canceled_reason}` : ""}`,
          action: (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToAppointmentDetails(cancelData.appointment_id);
              }}
              variant="contained"
              disableElevation
              sx={styles.actionButton}
            >
              Detalii
            </Button>
          ),
        };
      }

      // Implemented
      case NotificationTypeEnum.APPOINTMENT_RESCHEDULED: {
        const rescheduleData = data as AppointmentRescheduledNotificationData;
        return {
          text: `Programarea a fost replanificată pe ${new Date(rescheduleData.new_start_date).toLocaleDateString("ro-RO")}`,
          action: (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToAppointmentDetails(rescheduleData.appointment_id);
              }}
              variant="outlined"
              sx={styles.actionButton}
              disableElevation
            >
              Verifică
            </Button>
          ),
        };
      }

      // Implemented
      case NotificationTypeEnum.APPOINTMENT_REMINDER:
        return { text: "Memento: Ai o programare stabilită în curând." };

      // Implemented
      case NotificationTypeEnum.APPOINTMENT_REVIEWED: {
        const reviewData = data as AppointmentReviewedNotificationData;
        return {
          text: `A lăsat o recenzie de ${reviewData.rating} stele pentru programarea finalizată.`,
          action: (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onNavigateToAppointmentDetails(reviewData.appointment_id);
              }}
              variant="contained"
              disableElevation
              sx={styles.actionButton}
            >
              Detalii
            </Button>
          ),
        };
      }

      // Implemented
      case NotificationTypeEnum.EMPLOYMENT_REQUEST: {
        const empRequest = data as EmploymentRequestNotificationData;

        return {
          text: `Ai primit o cerere de angajare pentru rolul de ${empRequest.profession_name || "Angajat"}.`,
          action: (
            <Stack direction="row" gap={1}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToEmploymentRequest(
                    empRequest.employment_request_id
                  );
                }}
                color="error"
                variant="contained"
                size="small"
                sx={styles.actionButton}
                disableElevation
              >
                Vezi mai mult
              </Button>
            </Stack>
          ),
        };
      }

      // Implemented
      case NotificationTypeEnum.EMPLOYMENT_REQUEST_ACCEPTED:
        return {
          text: "a acceptat cererea ta de angajare.",
        };

      // Implemented
      case NotificationTypeEnum.EMPLOYMENT_REQUEST_DENIED:
        return { text: "a respins cererea ta de angajare." };

      // Implemented
      case NotificationTypeEnum.BUSINESS_VALIDATION: {
        const validation = data as BusinessValidationNotificationData;
        return {
          text: validation.is_approved
            ? "Afacerea ta a fost validată cu succes de administratori!"
            : `Validarea afacerii a fost respinsă. Motiv: ${validation.reason || "Nespecificat"}`,
        };
      }

      default:
        return { text: "Notificare nouă primită." };
    }
  };

  const renderAvatarBadge = () => {
    const iconStyles = { fontSize: 12, color: "#fff" };

    switch (type) {
      case NotificationTypeEnum.LIKE_POST:
        return { icon: <FavoriteIcon sx={iconStyles} />, color: "#ff1744" }; // Roșu
      case NotificationTypeEnum.COMMENT_POST:
        return { icon: <ChatBubbleIcon sx={iconStyles} />, color: "#00b0ff" }; // Albastru deschis
      case NotificationTypeEnum.REPOST:
        return { icon: <RepeatIcon sx={iconStyles} />, color: "#00e676" }; // Verde
      case NotificationTypeEnum.MENTION_POST:
        return {
          icon: <AlternateEmailIcon sx={iconStyles} />,
          color: "#9c27b0",
        };

      case NotificationTypeEnum.APPOINTMENT_BOOKED:
        return {
          icon: <CalendarMonthIcon sx={iconStyles} />,
          color: "#2979ff",
        };

      case NotificationTypeEnum.APPOINTMENT_CANCELED:
        return {
          icon: <CalendarMonthIcon sx={iconStyles} />,
          color: "#ff1744",
        };

      case NotificationTypeEnum.APPOINTMENT_RESCHEDULED:
        return {
          icon: <CalendarMonthIcon sx={iconStyles} />,
          color: "#2979ff",
        };

      case NotificationTypeEnum.APPOINTMENT_REMINDER:
        return {
          icon: <CalendarMonthIcon sx={iconStyles} />,
          color: "#2979ff",
        };

      case NotificationTypeEnum.APPOINTMENT_REVIEWED:

      case NotificationTypeEnum.EMPLOYMENT_REQUEST:
        return { icon: <WorkIcon sx={iconStyles} />, color: "#ff9100" };
      case NotificationTypeEnum.EMPLOYMENT_REQUEST_ACCEPTED:
        return { icon: <WorkIcon sx={iconStyles} />, color: "#ff9100" };
      case NotificationTypeEnum.EMPLOYMENT_REQUEST_DENIED:
        return { icon: <WorkIcon sx={iconStyles} />, color: "#ff1744" };

      case NotificationTypeEnum.BUSINESS_VALIDATION:
        return { icon: <VerifiedIcon sx={iconStyles} />, color: "#4caf50" };

      default:
        return null;
    }
  };

  const badgeConfig = renderAvatarBadge();
  const content = renderNotificationContent();

  const handleNotificationClick = () => {
    switch (type) {
      case NotificationTypeEnum.APPOINTMENT_REVIEWED: {
        const appointmentReviewData =
          data as AppointmentReviewedNotificationData;
        onNavigateToAppointmentDetails(appointmentReviewData.appointment_id);
        break;
      }
      case NotificationTypeEnum.APPOINTMENT_BOOKED:
      case NotificationTypeEnum.APPOINTMENT_CANCELED:
      case NotificationTypeEnum.APPOINTMENT_RESCHEDULED:
      case NotificationTypeEnum.APPOINTMENT_REMINDER: {
        const appointmentData = data as AppointmentReminderNotificationData;
        onNavigateToAppointmentDetails(appointmentData.appointment_id);
        break;
      }

      case NotificationTypeEnum.LIKE_POST:
      case NotificationTypeEnum.COMMENT_POST:
      case NotificationTypeEnum.REPOST:
      case NotificationTypeEnum.MENTION_POST: {
        break;
      }

      default:
        if (sender?.username) {
          onNavigateToUserProfile(sender.username, sender.profession);
        }
        break;
    }
  };

  return (
    <ListItem
      disablePadding
      {...listItemProps}
      sx={{ bgcolor: is_read ? "transparent" : "action.hover" }}
    >
      <ListItemButton
        onClick={handleNotificationClick}
        sx={{ py: { xs: 1.5, lg: 2.5 } }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          gap={2}
        >
          <Stack direction="row" alignItems="center" gap={2} sx={{ flex: 1 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                badgeConfig ? (
                  <Box
                    sx={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      backgroundColor: badgeConfig.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #fff",
                      boxShadow: "0px 1px 3px rgba(0,0,0,0.15)",
                    }}
                  >
                    {badgeConfig.icon}
                  </Box>
                ) : null
              }
            >
              <Avatar
                sx={styles.avatar}
                src={sender?.avatar ?? ""}
                alt={sender?.fullname || "System"}
              />
            </Badge>

            <Box sx={{ flex: 1 }}>
              {sender?.fullname && (
                <Typography
                  sx={{ fontWeight: 600, fontSize: { xs: 15, lg: 17 } }}
                >
                  {sender.fullname}
                </Typography>
              )}
              <Typography
                color="text.secondary"
                sx={{
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  wordBreak: "break-word",
                }}
              >
                {content.text}
              </Typography>
            </Box>
          </Stack>

          {content.image ? (
            <Box
              component="img"
              src={content.image}
              alt="Preview conținut"
              sx={styles.postCover}
            />
          ) : content.action ? (
            <Box onMouseDown={(e) => e.stopPropagation()}>{content.action}</Box>
          ) : null}
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

const styles = {
  avatar: { width: 55, height: 55, border: 1, borderColor: "divider" },
  actionButton: {
    py: { xs: 0.5, lg: 0.75 },
    px: { xs: 1.25, lg: 2 },
    fontSize: { xs: "0.8125rem", sm: "0.875rem" },
    textTransform: "none",
    whiteSpace: "nowrap",
  },
  postCover: {
    width: { xs: 45, lg: 55 },
    height: { xs: 65, lg: 75 },
    borderRadius: 1,
    objectFit: "cover",
    border: "1px solid",
    borderColor: "divider",
  },
};
