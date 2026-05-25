"use client";

import React from "react";
import NotificationsModule from "./NotificationsModule";
import { Box } from "@mui/material";
import { AppRoutes, useAppNavigation } from "@/utils/routes";

const NotificationsWrapper = () => {
  const { navigateTo } = useAppNavigation();
  const scrollRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <Box ref={scrollRef} sx={{ height: "100vh", width: "100%" }}>
      <NotificationsModule
        scrollRootRef={scrollRef}
        onNavigateToUserProfile={(username, profession) =>
          navigateTo(AppRoutes.profile(username, profession))
        }
        onNavigateToEmploymentRequest={(employmentRequestId) =>
          navigateTo(AppRoutes.employmentRequest(employmentRequestId))
        }
      />
    </Box>
  );
};

export default NotificationsWrapper;
