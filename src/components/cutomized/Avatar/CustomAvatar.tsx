import { formatRating } from "@/utils/formatters";
import { Avatar, Badge, Stack, Typography } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import React from "react";
import { ResponsiveStyleValue } from "@mui/system";

type CustomAvatarProps = {
  avatar: string | null | undefined;
  ratingsAverage: number | null | undefined;
  showBadge?: boolean;
  size?: ResponsiveStyleValue<number>;
};

const CustomAvatar = ({
  avatar,
  ratingsAverage,
  showBadge = true,
  size = 70,
}: CustomAvatarProps) => {
  const styles = {
    badge: {
      flexShrink: 0,
      "& .MuiBadge-badge": {
        right: "auto",
        left: "50%",
        transform: `translate(-50%, 85%)`,
        height: "auto",
      },
    },
    badgeContent: {
      backgroundColor: "background.paper",
      px: { xs: 0.8, md: 1.2 },
      py: { xs: 0.2, md: 0.4 },
      borderRadius: 50,
      boxShadow: 2,
      border: 1,
      borderColor: "divider",
      whiteSpace: "nowrap",
    },
    avatar: {
      width: size,
      height: size,
      border: 1,
      borderColor: "divider",
    },
    star: {
      fontSize: { xs: 16, md: 20, lg: 22 },
      color: "rating.main",
    },
    ratingText: {
      fontSize: { xs: 12, md: 14, lg: 16 },
      fontWeight: 700,
    },
  };

  const content = <Avatar sx={styles.avatar} src={avatar ?? ""} />;

  if (!showBadge) return content;

  return (
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
          <StarRateRoundedIcon sx={styles.star} />
          <Typography sx={styles.ratingText}>
            {ratingsAverage ? formatRating(ratingsAverage) : "-"}
          </Typography>
        </Stack>
      }
      sx={styles.badge}
    >
      {content}
    </Badge>
  );
};

export default CustomAvatar;
