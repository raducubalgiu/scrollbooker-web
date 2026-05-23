import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { get } from "@/utils/requests";
import React from "react";
import { UserProfile } from "@/ts/models/user/UserProfile";

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
    throw new Error("Username param was not provided");
  }

  const response = await get<UserProfile | null>({
    url: `/users/${username}/user-profile`,
  });

  const profileData = response.data;

  if (!profileData) {
    throw new Error("An error occured when fetching profile data");
  }

  return <ProfileModule profile={profileData} tab={tab} />;
}
