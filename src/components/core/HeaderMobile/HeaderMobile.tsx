import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type HeaderMobileProps = {
  title?: string;
};

const HeaderMobile = ({ title }: HeaderMobileProps) => {
  const { goBack } = useAppNavigation();

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={styles.container}
    >
      <IconButton onClick={() => goBack()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          color: "text.primary",
        }}
      >
        {title}
      </Typography>
      <IconButton onClick={() => {}} disabled>
        <ArrowBackIcon sx={{ color: "transparent" }} />
      </IconButton>
    </Stack>
  );
};

export default HeaderMobile;

const styles = {
  container: {
    height: 50,
    display: { xs: "flex", lg: "none" },
    flexShrink: 0,
    width: "100%",

    zIndex: 10,
    px: 1,
  },
};
