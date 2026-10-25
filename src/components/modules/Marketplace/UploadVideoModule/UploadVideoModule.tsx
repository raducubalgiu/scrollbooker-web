"use client";

import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import UploadVideoDesktopModule from "./UploadVideoDesktopModule";
import UploadVideoMobileModule from "./UploadVideoMobileModule";

const UploadVideoModule = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? <UploadVideoMobileModule /> : <UploadVideoDesktopModule />;
};

export default UploadVideoModule;
