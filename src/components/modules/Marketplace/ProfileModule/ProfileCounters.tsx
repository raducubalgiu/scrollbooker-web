import { Divider, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";
import { SocialTabEnum } from "./social/SocialTabEnum";
import { UserCounter } from "@/ts/models/user/UserProfile";

type ProfileCountersProps = {
  counters: UserCounter;
  onClick: (tab: SocialTabEnum) => void;
};

const ProfileCounters = ({ counters, onClick }: ProfileCountersProps) => {
  const { ratings_count, followers_count, followings_count } = counters;

  const styles = {
    button: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      px: 1,
      py: 1.5,
      minHeight: "auto",
      textAlign: "center",
      maxWidth: { xs: 100, sm: 150, md: 200 },
      borderRadius: 2,
    },
    title: {
      color: "text.secondary",
      fontSize: { xs: 15, md: 16, lg: 18, xl: 20 },
      fontWeight: 500,
    },
    counter: {
      fontWeight: 700,
      fontSize: { xs: 16, sm: 20, md: 25, lg: 30, xl: 35 },
    },
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        px: { xs: 2, sm: 4, md: 0 },
        mt: { xs: 1, md: 2 },
      }}
    >
      <ListItemButton
        sx={styles.button}
        onClick={() => onClick(SocialTabEnum.REVIEWS)}
      >
        <Stack alignItems="center" spacing={0.5}>
          <Typography sx={styles.title}>Recenzii</Typography>
          <Typography sx={styles.counter}>{ratings_count}</Typography>
        </Stack>
      </ListItemButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ height: 30, alignSelf: "center", opacity: 0.6 }}
      />

      <ListItemButton
        sx={styles.button}
        onClick={() => onClick(SocialTabEnum.FOLLOWERS)}
      >
        <Stack alignItems="center" spacing={0.5}>
          <Typography sx={styles.title}>Urmăritori</Typography>
          <Typography sx={styles.counter}>{followers_count}</Typography>
        </Stack>
      </ListItemButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ height: 30, alignSelf: "center", opacity: 0.6 }}
      />

      <ListItemButton
        sx={styles.button}
        onClick={() => onClick(SocialTabEnum.FOLLOWINGS)}
      >
        <Stack alignItems="center" spacing={0.5}>
          <Typography sx={styles.title}>Urmărești</Typography>
          <Typography sx={styles.counter}>{followings_count}</Typography>
        </Stack>
      </ListItemButton>
    </Stack>
  );
};

export default ProfileCounters;
