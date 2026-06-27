"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { PostUser } from "@/ts/models/social/Post";
import { Box, Button, Collapse, Stack, Typography } from "@mui/material";
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

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const [showButton, setShowButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const isOverflowing = element.scrollHeight > element.clientHeight;
      setShowButton(isOverflowing);
    }
  }, [description]);

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
        }}
      >
        <Stack direction="row" alignItems="flex-end" spacing={2}>
          <Stack spacing={1.5} sx={{ flex: 1, minWidth: 0 }}>
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
                  sx={{ lineHeight: 1.2 }}
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

            <Box sx={{ position: "relative" }}>
              {description && description?.length && (
                <Collapse in={isExpanded} collapsedSize={40}>
                  <Typography
                    ref={textRef}
                    variant="body2"
                    sx={{
                      opacity: 0.95,
                      lineHeight: 1.4,
                      ...(!isExpanded && {
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }),
                    }}
                  >
                    {description}
                  </Typography>
                </Collapse>
              )}

              {(showButton || isExpanded) && (
                <Typography
                  component="span"
                  onClick={handleToggle}
                  sx={{
                    cursor: "pointer",
                    fontWeight: 800,
                    fontSize: "0.875rem",
                    mt: 0.5,
                    display: "block",
                  }}
                >
                  {isExpanded ? "Mai puțin" : "Mai mult"}
                </Typography>
              )}
            </Box>

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

          <Box
            sx={{ display: { xs: "block", md: "none" }, pb: { xs: 1, md: 0 } }}
          >
            <Box>Actions</Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default memo(PostOverlay);
