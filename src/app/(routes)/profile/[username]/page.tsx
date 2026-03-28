import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { get } from "@/utils/requests";
import React from "react";
import { UserProfile } from "@/ts/models/user/UserProfile";

interface Props {
  params: { username: string };
  searchParams: Promise<{ tab?: string | null }>;
}

export default async function UserProfilePage({ params, searchParams }: Props) {
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

  return <ProfileModule profile={profile} tab={tab} />;
}
