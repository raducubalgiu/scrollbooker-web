"use client";

import React, { memo, useState } from "react";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { PostUser } from "@/ts/models/social/Post";
import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { getProfileUrl } from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";

type PostOverlayProps = {
  user: PostUser | undefined;
  description: string | null;
  isVideoReview: boolean | undefined;
  onOpenLinkedProducts: () => void;
};

const PostOverlay = ({
  user,
  description,
  isVideoReview,
  onOpenLinkedProducts,
}: PostOverlayProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDescription = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 25%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: { xs: 2, md: 3 },
          zIndex: 20,
          color: "common.white",
          pointerEvents: "none",
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          spacing={2}
          sx={{ pointerEvents: "auto", mb: { xs: 1, lg: 0 } }}
        >
          <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
            {isVideoReview && (
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.15)",
                  px: 1.5,
                  py: 1,
                  width: "fit-content",
                  borderRadius: 50,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Typography variant="body2" fontWeight={700}>
                  Recenzie Video
                </Typography>
              </Box>
            )}

            <Box onClick={(e) => e.stopPropagation()}>
              <Link
                href={user?.username ? getProfileUrl(user?.username) : "#"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={800}
                  sx={{ lineHeight: 1.2, mb: 0.5 }}
                >
                  {user?.fullname}
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                >
                  {user?.profession}
                </Typography>
              </Link>
            </Box>

            {description && description.length > 0 && (
              <Box onClick={handleToggleDescription} sx={{ cursor: "pointer" }}>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.95,
                    lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: isExpanded ? "unset" : 2,
                    overflow: isExpanded ? "unset" : "hidden",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {description}
                </Typography>
              </Box>
            )}

            <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLinkedProducts();
                }}
                variant="contained"
                fullWidth
                sx={{
                  display: { xs: "flex", lg: "none" },
                }}
              >
                Rezervă acum
              </Button>
            </Protected>
          </Stack>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <Box>Actions</Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default memo(PostOverlay);
