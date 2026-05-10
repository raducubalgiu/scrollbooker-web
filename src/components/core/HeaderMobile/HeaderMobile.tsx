import { IconButton, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { useRouter } from "next/navigation";

type HeaderMobileProps = {
  title?: string;
};

const HeaderMobile = ({ title }: HeaderMobileProps) => {
  const router = useRouter();

  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        display: {
          xs: "flex",
          lg: "none",
        },
        width: "100%",
        position: "sticky",
        borderBottom: 1,
        borderColor: "divider",
        top: 0,
        zIndex: 10,
        backgroundColor: "background.paper",
        p: 1,
      }}
    >
      <IconButton onClick={() => router.back()}>
        <ArrowBackIcon />
      </IconButton>
      <Typography>{title}</Typography>
      <IconButton onClick={() => {}} disabled>
        <ArrowBackIcon sx={{ color: "transparent" }} />
      </IconButton>
    </Stack>
  );
};

export default HeaderMobile;
