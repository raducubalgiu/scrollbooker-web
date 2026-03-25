import { UserCountersType } from "@/ts/models/user/UserProfile";
import { Divider, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";
import { SocialTabEnum } from "./social/SocialTabEnum";

type ProfileCountersProps = {
  counters: UserCountersType;
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
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Recenzii
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {ratings_count}
          </Typography>
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
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Urmaritori
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {followers_count}
          </Typography>
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
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Urmaresti
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {followings_count}
          </Typography>
        </Stack>
      </ListItemButton>
    </Stack>
  );
};

export default ProfileCounters;
