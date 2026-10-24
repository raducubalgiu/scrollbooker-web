import { Divider, IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type HeaderMobileProps = {
  title?: string | undefined;
  customTitle?: React.ReactNode;
  customAction?: React.ReactNode;
  displayDivider?: boolean;
  onBack?: () => void;
};

const HeaderMobile = ({
  title,
  customTitle,
  customAction,
  displayDivider = true,
  onBack,
}: HeaderMobileProps) => {
  const { goBack } = useAppNavigation();

  return (
    <>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={styles.container}
      >
        <IconButton onClick={() => (onBack ? onBack() : goBack())}>
          <ArrowBackIcon />
        </IconButton>
        {customTitle ?? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
        )}
        {customAction ? (
          customAction
        ) : (
          <IconButton disabled>
            <ArrowBackIcon sx={{ color: "transparent" }} />
          </IconButton>
        )}
      </Stack>
      {displayDivider && <Divider />}
    </>
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
