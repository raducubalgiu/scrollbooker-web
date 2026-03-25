import { Divider, Stack } from "@mui/material";
import React from "react";
import UserInfoCounter from "./UserInfoCounter";
import { UserCounter } from "@/ts/models/user/UserProfile";

type UserInfoCountersProps = {
  counters: UserCounter;
  isLoading: boolean;
};

const UserInfoCounters = ({ counters, isLoading }: UserInfoCountersProps) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 5, gap: 2 }}
    >
      <UserInfoCounter
        label="Urmărești"
        counter={counters?.followings_count}
        isLoading={isLoading}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{ height: 20, mx: 0.25, alignSelf: "center" }}
      />

      <UserInfoCounter
        label="Urmăritori"
        counter={counters?.followers_count}
        isLoading={isLoading}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{ height: 20, mx: 0.25, alignSelf: "center" }}
      />

      <UserInfoCounter
        label="Recenzii"
        counter={counters?.ratings_count}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default UserInfoCounters;
