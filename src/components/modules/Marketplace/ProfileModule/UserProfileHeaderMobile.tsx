import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IosShareIcon from "@mui/icons-material/IosShare";
import React from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type UserProfileHeaderMobileProps = {
  username: string;
  onShare: () => void;
};

const UserProfileHeaderMobile = ({
  username,
  onShare,
}: UserProfileHeaderMobileProps) => {
  const { goBack } = useAppNavigation();

  return (
    <Stack sx={styles.container}>
      <IconButton onClick={() => goBack()} sx={styles.leftAction}>
        <ArrowBackIcon sx={{ fontSize: 27.5, color: "text.primary" }} />
      </IconButton>

      <Typography variant="h6" sx={styles.username}>
        @{username}
      </Typography>

      <IconButton onClick={onShare} sx={styles.rightAction}>
        <IosShareIcon sx={{ fontSize: 24, color: "text.primary" }} />
      </IconButton>
    </Stack>
  );
};

export default UserProfileHeaderMobile;

const styles = {
  container: {
    position: "relative" as const,
    display: { xs: "flex", lg: "none" },
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
    flexShrink: 0,
    zIndex: 10,
    px: 1,
  },
  username: {
    fontWeight: "bold" as const,
    color: "text.primary",
    textTransform: "lowercase" as const,
  },
  leftAction: {
    position: "absolute" as const,
    left: 8,
    top: "50%",
    transform: "translateY(-50%)",
  },
  rightAction: {
    position: "absolute" as const,
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
  },
};
