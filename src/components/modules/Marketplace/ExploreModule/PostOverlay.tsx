"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import Protected from "@/components/cutomized/Protected/Protected";
import { PermissionEnum } from "@/ts/enums/PermissionsEnum";
import { PostUser } from "@/ts/models/social/Post";
import {
  alpha,
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type PostOverlayProps = {
  user: PostUser | undefined;
  description: string | null;
  isVideoReview: boolean | undefined;
};

const PostOverlay = ({
  user,
  description,
  isVideoReview,
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
          top: 0,
          left: 0,
          width: "100%",
          height: 100,
          background:
            "linear-gradient(to bottom, rgba(0, 0, 0, 0.2), transparent)",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            m: 2.5,
            zIndex: 11,
            pointerEvents: "auto",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <IconButton size="large" onClick={handleToggle}>
              <MenuIcon sx={{ color: "common.white", width: 30, height: 30 }} />
            </IconButton>

            <Button
              variant="contained"
              color="primary"
              disableElevation
              sx={{
                mr: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.7),
                "&:hover": {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              Explorează
            </Button>
            <Button sx={{ color: "common.white" }} disableElevation>
              Urmaresti
            </Button>
          </Stack>
        </Box>
      </Box>

      <Stack
        spacing={1.5}
        sx={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
          zIndex: 1,
          color: "common.white",
        }}
      >
        {isVideoReview && (
          <Box
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              px: 1.5,
              py: 1,
              width: "fit-content",
              borderRadius: 20,
            }}
          >
            <Typography fontWeight={600}>Recenzie video</Typography>
          </Box>
        )}

        <Stack direction="row" spacing={1.25} alignItems="center">
          <Box>
            <Typography fontWeight={800}>{user?.fullname}</Typography>
            <Typography color="primary" sx={{ opacity: 0.92, fontWeight: 600 }}>
              {user?.profession}
            </Typography>
          </Box>
        </Stack>

        <Box>
          <Stack
            flexDirection="row"
            alignItems="flex-end"
            justifyContent="space-between"
            gap={2}
          >
            <Box sx={{ flex: 1 }}>
              <Collapse in={isExpanded} collapsedSize={48} timeout="auto">
                <Typography
                  ref={textRef}
                  sx={{
                    opacity: 0.9,
                    ...(!isExpanded && {
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }),
                  }}
                >
                  {description || "..."}
                </Typography>
              </Collapse>
            </Box>

            {(showButton || isExpanded) && (
              <Button
                size="small"
                onClick={handleToggle}
                sx={{
                  minWidth: "fit-content",
                  textTransform: "none",
                  fontWeight: 700,
                  alignSelf: "flex-end",
                  color: "common.white",
                }}
              >
                {isExpanded ? "Mai puțin" : "Mai mult"}
              </Button>
            )}
          </Stack>
        </Box>

        <Protected permission={PermissionEnum.BOOK_BUTTON_VIEW}>
          <Button
            variant="contained"
            size="large"
            sx={{
              display: { xs: "inline-flex", lg: "none" },
              alignSelf: "flex-start",
              px: 2.5,
            }}
          >
            Rezervă acum
          </Button>
        </Protected>
      </Stack>

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0) 60%)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};

export default memo(PostOverlay);
