import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { StaticImageData } from "next/image";

import PlayIconOutline from "@/assets/icons/ic_play_outline.svg";
import LikeIconOutline from "@/assets/icons/ic_heart_outlined.svg";
import CommentIconOutline from "@/assets/icons/ic_comment_outline.svg";
import ShareIcon from "@/assets/icons/ic_share_new.svg";
import BookmarkIconOutline from "@/assets/icons/ic_bookmark_outline.svg";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";
import { PostAnalyticsSummary } from "@/ts/models/social/PostAnalyticsSummary";
import { formatPrice } from "@/utils/formatPrice";
import { groupSourceBreakdown } from "./postAnalyticsSourceLabels";

type PostStatisticsContentProps = {
  summary: PostAnalyticsSummary;
};

const formatWatchTime = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
};

const PostStatisticsContent = ({ summary }: PostStatisticsContentProps) => {
  const quickStats: { key: string; icon: StaticImageData; value: number; label: string }[] = [
    { key: "views", icon: PlayIconOutline, value: summary.views_count, label: "Vizualizări" },
    { key: "likes", icon: LikeIconOutline, value: summary.like_count, label: "Aprecieri" },
    { key: "comments", icon: CommentIconOutline, value: summary.comment_count, label: "Comentarii" },
    { key: "shares", icon: ShareIcon, value: summary.share_count, label: "Distribuiri" },
    { key: "saves", icon: BookmarkIconOutline, value: summary.bookmark_count, label: "Salvări" },
  ];

  const summaryCards = [
    { label: "Vizualizări", value: String(summary.views_count) },
    { label: "Vizitatori unici", value: String(summary.unique_viewers_count) },
    { label: "Timp total", value: formatWatchTime(summary.watch_time_ms) },
    { label: "Medie vizualizare", value: formatWatchTime(summary.average_watch_time_ms) },
  ];

  const conversionCards = summary.instant_booking
    ? [
        { label: "Rezervări", value: String(summary.bookings_count) },
        { label: "Venit din rezervări", value: `${formatPrice(summary.bookings_revenue)} RON` },
      ]
    : [
        { label: "Click-uri WhatsApp", value: String(summary.whatsapp_clicks_count) },
        { label: "Click-uri telefon", value: String(summary.call_clicks_count) },
      ];

  const engagementCards = [
    ...conversionCards,
    { label: "Vizite din profil", value: String(summary.profile_visits_count) },
  ];

  const groupedSources = groupSourceBreakdown(summary.source_breakdown);
  const maxViews = Math.max(...groupedSources.map((g) => g.viewsCount), 1);

  return (
    <Stack spacing={2}>
      <Box sx={styles.thumbnailWrapper}>
        <Image
          src={summary.thumbnail_url || "/placeholder.jpg"}
          alt="Post thumbnail"
          fill
          sizes="130px"
          style={{ objectFit: "cover" }}
        />
      </Box>

      <Stack direction="row" sx={{ pb: 1 }}>
        {quickStats.map((stat) => (
          <Stack key={stat.key} alignItems="center" spacing={0.5} flex={1}>
            <CustomSvg
              src={stat.icon}
              size={20}
              sx={{ backgroundColor: "text.primary" }}
            />
            <Typography variant="subtitle2" fontWeight={700}>
              {stat.value}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
            >
              {stat.label}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Typography variant="subtitle2" fontWeight={700}>
        Rezumat
      </Typography>

      <Box sx={styles.cardsGrid}>
        {summaryCards.map((card) => (
          <Box key={card.label} sx={styles.card}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              noWrap
            >
              {card.label}
            </Typography>
            <Typography variant="h6" fontWeight={700} noWrap>
              {card.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="subtitle2" fontWeight={700} sx={{ pt: 1 }}>
        {summary.instant_booking ? "Conversii" : "Interes de contactare"}
      </Typography>

      <Box sx={styles.cardsGrid}>
        {engagementCards.map((card) => (
          <Box key={card.label} sx={styles.card}>
            <Typography
              variant="caption"
              fontWeight={700}
              color="text.secondary"
              noWrap
            >
              {card.label}
            </Typography>
            <Typography variant="h6" fontWeight={700} noWrap>
              {card.value}
            </Typography>
          </Box>
        ))}
      </Box>

      {summary.instant_booking && groupedSources.length > 0 && (
        <>
          <Typography variant="subtitle2" fontWeight={700} sx={{ pt: 1 }}>
            Surse de trafic
          </Typography>

          <Stack spacing={2}>
            {groupedSources.map((group) => (
              <Box key={group.label}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 0.5 }}
                >
                  <Typography variant="body2" fontWeight={500}>
                    {group.label}
                  </Typography>
                  <Typography variant="body2" fontWeight={700}>
                    {group.viewsCount}
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={(group.viewsCount / maxViews) * 100}
                  sx={styles.progressBar}
                />
              </Box>
            ))}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default PostStatisticsContent;

const styles = {
  thumbnailWrapper: {
    position: "relative",
    width: 130,
    aspectRatio: "9/12",
    borderRadius: 2,
    overflow: "hidden",
    bgcolor: "background.default",
    alignSelf: "center",
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 1.5,
  },
  card: {
    p: 1.5,
    borderRadius: 2,
    border: "1px solid",
    borderColor: "divider",
  },
  progressBar: {
    height: 8,
    borderRadius: 1,
    bgcolor: "action.hover",
    "& .MuiLinearProgress-bar": {
      borderRadius: 1,
    },
  },
};
