"use client";

import React from "react";
import NotificationsModule from "./NotificationsModule";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const NotificationsWrapper = () => {
  const router = useRouter();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Box
      ref={scrollRef}
      sx={{ height: "100vh", overflowY: "auto", width: "100%" }}
    >
      <NotificationsModule
        scrollRootRef={scrollRef}
        onNavigateToUserProfile={(username) =>
          router.push(`/profile/${username}`)
        }
      />
    </Box>
  );
};

export default NotificationsWrapper;
