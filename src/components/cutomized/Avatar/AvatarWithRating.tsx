import { formatRating } from "@/utils/formatters";
import { Avatar, Badge, Stack, Theme, Typography } from "@mui/material";
import React from "react";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

type AvatarWithRatingProps = {
  avatar: string | null;
  ratingsAverage: number | null;
  isBusinessOrEmployee?: Boolean;
};

const AvatarWithRating = ({
  avatar,
  ratingsAverage,
  isBusinessOrEmployee = false,
}: AvatarWithRatingProps) => {
  return (
    <Stack flexDirection="row" alignItems="center">
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          isBusinessOrEmployee && (
            <Stack
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={styles.badgeContent}
            >
              <StarRoundedIcon sx={{ fontSize: 18, mr: 0.5 }} color="rating" />
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                {formatRating(ratingsAverage)}
              </Typography>
            </Stack>
          )
        }
        sx={styles.badge}
      >
        <Avatar sx={styles.avatar} src={avatar ?? ""} />
      </Badge>
    </Stack>
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
  avatar: {
    width: { xs: 55, md: 70 },
    height: { xs: 55, md: 70 },
    border: 1,
    borderColor: "divider",
  },
};
