import { IconButton, Stack, Typography } from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import NextLink from "next/link";
import { AppRoutes } from "@/utils/routes";

type MyProfileHeaderMobileProps = {
  username: string;
  isBusinessOrEmployee: boolean;
  onOpenMenu: () => void;
};

const MyProfileHeaderMobile = ({
  username,
  isBusinessOrEmployee,
  onOpenMenu,
}: MyProfileHeaderMobileProps) => {
  return (
    <Stack sx={styles.container}>
      <Typography variant="h6" sx={styles.username}>
        @{username}
      </Typography>

      <Stack direction="row" alignItems="center" sx={styles.rightActions}>
        {isBusinessOrEmployee && (
          <IconButton component={NextLink} href={AppRoutes.uploadVideo()}>
            <ControlPointOutlinedIcon
              sx={{ fontSize: 27.5, color: "text.primary" }}
            />
          </IconButton>
        )}

        <IconButton size="large" onClick={onOpenMenu}>
          <MenuIcon sx={{ fontSize: 27.5, color: "text.primary" }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default MyProfileHeaderMobile;

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
  rightActions: {
    position: "absolute" as const,
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
  },
};
