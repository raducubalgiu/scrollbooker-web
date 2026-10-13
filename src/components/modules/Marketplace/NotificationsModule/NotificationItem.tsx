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
import NextLink from "next/link";
import { AppRoutes } from "@/utils/routes";
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
import { useQueryClient } from "@tanstack/react-query";
import { useFollow, useUnfollow } from "@/controllers/social/follow.controller";
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
  onNavigate?: () => void;
} & ListItemProps;

export default function NotificationItem({
  notification,
  onNavigate = () => {},
  ...listItemProps
}: NotificationItemProps) {
  const { type, sender, data, is_read } = notification || {};
  const queryClient = useQueryClient();

  const { mutate: follow } = useFollow();
  const { mutate: unfollow } = useUnfollow();

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!sender?.id) return;

    const mutate = sender.is_follow ? unfollow : follow;
    mutate(sender.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
    });
  };

  const renderNotificationContent = () => {
    switch (type) {
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
              size="small"
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

      case NotificationTypeEnum.APPOINTMENT_BOOKED: {
        const appointmentData = data as AppointmentBookedNotificationData;
        const formattedDate = dayjs(appointmentData.start_date).format(
          "DD-MM-YYYY HH:mm"
        );
        return {
          text: `A efectuat o programare pentru data de ${formattedDate}`,
          action: (
            <Button
              component={NextLink}
              href={AppRoutes.appointmentDetails(
                appointmentData.appointment_id
              )}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate?.();
              }}
              variant="contained"
              sx={styles.actionButton}
              disableElevation
              size="small"
            >
              Vezi Detalii
            </Button>
          ),
        };
      }

      case NotificationTypeEnum.APPOINTMENT_CANCELED: {
        const cancelData = data as AppointmentCanceledNotificationData;
        return {
          text: `a anulat programarea. ${cancelData.canceled_reason ? `Motiv: ${cancelData.canceled_reason}` : ""}`,
          action: (
            <Button
              component={NextLink}
              href={AppRoutes.appointmentDetails(cancelData.appointment_id)}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate?.();
              }}
              variant="contained"
              disableElevation
              sx={styles.actionButton}
              size="small"
            >
              Vezi Detalii
            </Button>
          ),
        };
      }

      case NotificationTypeEnum.APPOINTMENT_RESCHEDULED: {
        const rescheduleData = data as AppointmentRescheduledNotificationData;
        return {
          text: `Programarea a fost replanificată pe ${new Date(rescheduleData.new_start_date).toLocaleDateString("ro-RO")}`,
          action: (
            <Button
              component={NextLink}
              href={AppRoutes.appointmentDetails(
                rescheduleData.appointment_id
              )}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate?.();
              }}
              variant="outlined"
              sx={styles.actionButton}
              disableElevation
              size="small"
            >
              Verifică
            </Button>
          ),
        };
      }

      case NotificationTypeEnum.APPOINTMENT_REMINDER:
        return { text: "Memento: Ai o programare stabilită în curând." };

      case NotificationTypeEnum.APPOINTMENT_REVIEWED: {
        const reviewData = data as AppointmentReviewedNotificationData;
        return {
          text: `A lăsat o recenzie de ${reviewData.rating} stele pentru programarea finalizată.`,
          action: (
            <Button
              component={NextLink}
              href={AppRoutes.appointmentDetails(reviewData.appointment_id)}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate?.();
              }}
              variant="contained"
              disableElevation
              sx={styles.actionButton}
              size="small"
            >
              Vezi Detalii
            </Button>
          ),
        };
      }

      case NotificationTypeEnum.EMPLOYMENT_REQUEST: {
        const empRequest = data as EmploymentRequestNotificationData;

        return {
          text: `Ai primit o cerere de angajare pentru rolul de ${empRequest.profession_name || "Angajat"}.`,
          action: (
            <Stack direction="row" gap={1}>
              <Button
                component={NextLink}
                href={AppRoutes.employmentRequest(
                  empRequest.employment_request_id
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate?.();
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

      case NotificationTypeEnum.EMPLOYMENT_REQUEST_ACCEPTED:
        return {
          text: "a acceptat cererea ta de angajare.",
        };

      case NotificationTypeEnum.EMPLOYMENT_REQUEST_DENIED:
        return { text: "a respins cererea ta de angajare." };

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

  const getTargetHref = (): string | null => {
    switch (type) {
      case NotificationTypeEnum.APPOINTMENT_REVIEWED: {
        const appointmentReviewData =
          data as AppointmentReviewedNotificationData;
        return AppRoutes.appointmentDetails(
          appointmentReviewData.appointment_id
        );
      }
      case NotificationTypeEnum.APPOINTMENT_BOOKED:
      case NotificationTypeEnum.APPOINTMENT_CANCELED:
      case NotificationTypeEnum.APPOINTMENT_RESCHEDULED:
      case NotificationTypeEnum.APPOINTMENT_REMINDER: {
        const appointmentData = data as AppointmentReminderNotificationData;
        return AppRoutes.appointmentDetails(appointmentData.appointment_id);
      }

      case NotificationTypeEnum.LIKE_POST:
      case NotificationTypeEnum.COMMENT_POST:
      case NotificationTypeEnum.REPOST:
      case NotificationTypeEnum.MENTION_POST:
        return null;

      default:
        return sender?.username
          ? AppRoutes.profile(sender.username, sender.profession)
          : null;
    }
  };

  const targetHref = getTargetHref();

  const itemContent = (
    <>
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
    </>
  );

  return (
    <ListItem
      disablePadding
      {...listItemProps}
      sx={{ bgcolor: is_read ? "transparent" : "action.hover" }}
    >
      {targetHref ? (
        <ListItemButton
          component={NextLink}
          href={targetHref}
          onClick={onNavigate}
          sx={{ py: { xs: 1.5, lg: 2.5 } }}
        >
          {itemContent}
        </ListItemButton>
      ) : (
        <ListItemButton sx={{ py: { xs: 1.5, lg: 2.5 } }}>
          {itemContent}
        </ListItemButton>
      )}
    </ListItem>
  );
}

const styles = {
  avatar: { width: 55, height: 55, border: 1, borderColor: "divider" },
  actionButton: {
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
