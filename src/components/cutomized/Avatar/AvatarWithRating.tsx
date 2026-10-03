import { formatRating } from "@/utils/formatters";
import { Avatar, Badge, Stack, Theme, Typography } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type AvatarWithRatingProps = {
  avatar: string | null | undefined;
  ratingsAverage: number | null;
  isBusinessOrEmployee?: boolean;
};

const AvatarWithRating = ({
  avatar,
  ratingsAverage,
  isBusinessOrEmployee = false,
}: AvatarWithRatingProps) => {
  if (!isBusinessOrEmployee) {
    return <Avatar sx={styles.avatar} src={avatar ?? ""} />;
  }

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
          <StarRoundedIcon sx={styles.ratingIcon} color="rating" />
          <Typography sx={styles.ratingsAverage}>
            {formatRating(ratingsAverage)}
          </Typography>
        </Stack>
      }
      sx={styles.badge}
    >
      <Avatar sx={styles.avatar} src={avatar ?? ""} />
    </Badge>
  );
};

export default AvatarWithRating;

const styles = {
  badge: {
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: (theme: Theme) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? "background.paper" : "background.default",
    px: { xs: 1, md: 1.5 },
    py: { xs: 0.25, md: 0.5 },
    borderRadius: 50,
    boxShadow: 1,
  }),
  ratingIcon: { fontSize: { xs: 16, md: 18 }, mr: 0.5 },
  ratingsAverage: {
    fontSize: { xs: 13, md: 16 },
    fontWeight: 600,
    color: "text.primary",
  },
  avatar: {
    width: { xs: 55, md: 70 },
    height: { xs: 55, md: 70 },
    border: 1,
    borderColor: "divider",
  },
};
