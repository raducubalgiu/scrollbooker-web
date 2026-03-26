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
      py: 2,
      minHeight: "auto",
      textAlign: "center",
      maxWidth: 200,
    },
    title: {
      color: "text.secondary",
      fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
    },
    counter: {
      fontWeight: 600,
      fontSize: { xs: 16, sm: 20, md: 25, lg: 30, xl: 35 },
    },
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%" }}
    >
      <ListItemButton
        sx={styles.button}
        onClick={() => onClick(SocialTabEnum.REVIEWS)}
      >
        <Stack alignItems="center" spacing={1}>
          <Typography sx={styles.title}>Recenzii</Typography>
          <Typography sx={styles.counter}>{ratings_count}</Typography>
        </Stack>
      </ListItemButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ height: 40, alignSelf: "center" }}
      />

      <ListItemButton
        sx={styles.button}
        onClick={() => onClick(SocialTabEnum.FOLLOWERS)}
      >
        <Stack alignItems="center" spacing={1}>
          <Typography sx={styles.title}>Urmaritori</Typography>
          <Typography sx={styles.counter}>{followers_count}</Typography>
        </Stack>
      </ListItemButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ height: 40, alignSelf: "center" }}
      />

      <ListItemButton
        sx={styles.button}
        onClick={() => onClick(SocialTabEnum.FOLLOWINGS)}
      >
        <Stack alignItems="center" spacing={1}>
          <Typography sx={styles.title}>Urmaresti</Typography>
          <Typography sx={styles.counter}>{followings_count}</Typography>
        </Stack>
      </ListItemButton>
    </Stack>
  );
};

export default ProfileCounters;
