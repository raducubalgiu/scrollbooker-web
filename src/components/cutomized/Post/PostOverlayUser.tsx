import { ProfileTabEnum } from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";
import { PostUser } from "@/ts/models/social/Post";
import { formatDistance } from "@/utils/formatters";
import { AppRoutes } from "@/utils/routes";
import { Box, Link, Typography } from "@mui/material";
import React from "react";

type PostOverlayUser = {
  user: PostUser | null;
  profession: string | undefined;
  distance: number | null;
};

const PostOverlayUser = ({ user, profession, distance }: PostOverlayUser) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Link
        href={
          user
            ? AppRoutes.profile(
                user?.username,
                user?.profession,
                ProfileTabEnum.POSTS
              )
            : ""
        }
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="body1" fontWeight={800} sx={styles.fullName}>
          {user?.fullname}
        </Typography>
        <Typography variant="caption" color="primary">
          {profession && (
            <Box component="span" sx={styles.profession}>
              {profession}
            </Box>
          )}
          {profession && distance && (
            <Box component="span" sx={{ color: "white", fontWeight: 600 }}>
              {" • "}
            </Box>
          )}
          {distance && (
            <Box component="span" sx={{ color: "white", fontWeight: 600 }}>
              {formatDistance(distance)}
            </Box>
          )}
        </Typography>
      </Link>
    </Box>
  );
};

export default PostOverlayUser;

const styles = {
  fullName: {
    lineHeight: 1.2,
    mb: 0.5,
  },
  profession: {
    fontWeight: 600,
  },
};
