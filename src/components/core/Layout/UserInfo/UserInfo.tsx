"use client";

import React, { useState } from "react";
import {
  Divider,
  Skeleton,
  Stack,
  Typography,
  Collapse,
  Box,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import CustomStack from "../../CustomStack/CustomStack";
import UserInfoCounter from "./UserInfoCounter";
import UserAvatar from "./UserAvatar";
import UserInfoEditModal from "./UserInfoEditModal";
import { UseQueryResult } from "@tanstack/react-query";
import { UserProfileType } from "@/ts/models/user/UserProfileType";

const styles = { username: { mt: 2.5, fontSize: 18, fontWeight: "700" } };

type UserInfoProps = {
  user: UserProfileType | undefined;
  isLoadingUser: boolean;
  refetchUser: () => Promise<UseQueryResult<UserProfileType, unknown>>;
  collapsed?: boolean;
};

export default function UserInfo({
  user,
  isLoadingUser,
  refetchUser,
  collapsed,
}: UserInfoProps) {
  const [openModal, setOpenModal] = useState(false);
  const { profession, counters, avatar, fullname, is_business_or_employee } =
    user ?? {};

  const userProfession = (
    <>
      <Typography sx={{ fontSize: 16 }}>{profession}</Typography>
      {is_business_or_employee && (
        <>
          <GradeIcon color="primary" sx={{ ml: 1.5, mr: 0.5 }} />
          <Typography sx={{ fontWeight: "600" }}>
            {counters?.ratings_average}
          </Typography>
        </>
      )}
    </>
  );

  return (
    <>
      <UserInfoEditModal
        user={user}
        open={openModal}
        handleClose={() => setOpenModal(false)}
        refetchUserData={refetchUser}
      />
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{ my: 5, py: collapsed ? 2 : undefined }}
      >
        <UserAvatar
          isBusinessOrEmployee={is_business_or_employee}
          url={avatar}
          onOpenModal={() => setOpenModal(true)}
          small={collapsed}
        />

        <Collapse
          in={!collapsed}
          mountOnEnter
          unmountOnExit
          collapsedSize={0}
          timeout={200}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: (theme) =>
                theme.transitions.create(["opacity", "transform"], {
                  duration: 200,
                }),
            }}
          >
            <Typography sx={styles.username}>
              {isLoadingUser ? <Skeleton width={100} /> : `${fullname}`}
            </Typography>

            <CustomStack sx={{ mt: 1 }}>
              {isLoadingUser ? <Skeleton width={150} /> : userProfession}
            </CustomStack>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 5, gap: 2 }}
            >
              <UserInfoCounter
                label="Urmărești"
                counter={counters?.followings_count}
                isLoading={isLoadingUser}
              />

              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: 20, mx: 0.25, alignSelf: "center" }}
              />

              <UserInfoCounter
                label="Urmăritori"
                counter={counters?.followers_count}
                isLoading={isLoadingUser}
              />

              <Divider
                orientation="vertical"
                flexItem
                sx={{ height: 20, mx: 0.25, alignSelf: "center" }}
              />

              <UserInfoCounter
                label="Recenzii"
                counter={counters?.ratings_count}
                isLoading={isLoadingUser}
              />
            </Stack>
          </Box>
        </Collapse>
      </Stack>
    </>
  );
}
