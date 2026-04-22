import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { get } from "@/utils/requests";
import React from "react";
import { UserProfile } from "@/ts/models/user/UserProfile";
import { Box } from "@mui/material";

interface UserProfilePageProps {
  params: { username: string };
  searchParams: Promise<{ tab?: string | null }>;
}

export default async function UserProfilePage({
  params,
  searchParams,
}: UserProfilePageProps) {
  const { username } = await Promise.resolve(params);
  const { tab } = await Promise.resolve(searchParams);

  if (!username) {
    return <ProfileModule profile={null} tab={null} />;
  }

  const profile = (
    await get<UserProfile | null>({
      url: `/users/${username}/user-profile`,
    })
  ).data;

  return (
    <Box p={2.5}>
      <ProfileModule profile={profile} tab={tab} />
    </Box>
  );
}
