import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useRouter } from "next/navigation";

type ProfileHeaderMobileProps = {
  username: string;
  isOwnProfile: boolean;
  onSetIsMenuOpen: () => void;
};

const ProfileHeaderMobile = ({
  username,
  isOwnProfile,
  onSetIsMenuOpen,
}: ProfileHeaderMobileProps) => {
  const router = useRouter();

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={styles.container}
    >
      <IconButton onClick={() => router.back()} disabled={isOwnProfile}>
        <ArrowBackIcon
          sx={{
            fontSize: 27.5,
            color: isOwnProfile ? "transparent" : "text.primary",
          }}
        />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "text.primary",
          textTransform: "lowercase",
        }}
      >
        @{username}
      </Typography>
      <IconButton
        size="large"
        onClick={onSetIsMenuOpen}
        disabled={!isOwnProfile}
      >
        <MenuIcon
          sx={{
            fontSize: 27.5,
            color: isOwnProfile ? "text.primary" : "transparent",
          }}
        />
      </IconButton>
    </Stack>
  );
};

export default ProfileHeaderMobile;

const styles = {
  container: {
    height: 50,
    display: { xs: "flex", lg: "none" },
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "background.paper",
    px: 1,
    borderBottom: 1,
    borderColor: "divider",
  },
};
