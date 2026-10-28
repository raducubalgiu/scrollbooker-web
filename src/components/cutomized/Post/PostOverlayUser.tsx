import { ProfileTabEnum } from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";
import { PostUser } from "@/ts/models/social/Post";
import { formatDistance } from "@/utils/formatters";
import { AppRoutes } from "@/utils/routes";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import React from "react";

type PostOverlayUser = {
  user: PostUser | null;
  profession: string | undefined;
  distance: number | null;
  onNavigateToUser: () => void;
};

const PostOverlayUser = ({
  user,
  profession,
  distance,
  onNavigateToUser,
}: PostOverlayUser) => {
  return (
    <Box onClick={(e) => e.stopPropagation()}>
      <Link
        component={NextLink}
        href={
          user
            ? AppRoutes.profile(
                user?.username,
                user?.profession,
                ProfileTabEnum.POSTS
              )
            : ""
        }
        onClick={onNavigateToUser}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Typography variant="body1" fontWeight={600} sx={styles.fullName}>
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
