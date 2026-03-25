"use client";

import React, { useState } from "react";
import { Skeleton, Stack, Typography, Collapse, Box } from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import CustomStack from "../../../CustomStack/CustomStack";
import UserAvatar from "./UserAvatar";
import UserInfoEditModal from "./UserInfoEditModal";
import { UseQueryResult } from "@tanstack/react-query";
import { UserProfile } from "@/ts/models/user/UserProfile";
import UserInfoCounters from "./UserInfoCounters";

const styles = { username: { mt: 2.5, fontSize: 18, fontWeight: "700" } };

type UserInfoProps = {
  user: UserProfile;
  isLoadingUser: boolean;
  refetchUser: () => Promise<UseQueryResult<UserProfile, unknown>>;
  collapsed: boolean;
};

export default function UserInfo({
  user,
  isLoadingUser,
  refetchUser,
  collapsed,
}: UserInfoProps) {
  const [openModal, setOpenModal] = useState(false);
  const {
    profession,
    counters,
    avatar,
    fullname,
    is_business_or_employee,
    opening_hours,
  } = user;
  const { open_now } = opening_hours;

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
          isBusinessOrEmployee={user?.is_business_or_employee}
          openNow={open_now}
          url={avatar}
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

            <UserInfoCounters counters={counters} isLoading={isLoadingUser} />
          </Box>
        </Collapse>
      </Stack>
    </>
  );
}
