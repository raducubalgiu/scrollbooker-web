import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { get } from "@/utils/requests";
import React from "react";
import { UserProfile } from "@/ts/models/user/UserProfile";

interface Props {
  params: { username: string };
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await Promise.resolve(params);

  if (!username) {
    return <ProfileModule profile={null} />;
  }

  const profile = (
    await get<UserProfile | null>({
      url: `/users/${username}/user-profile`,
    })
  ).data;

  return <ProfileModule profile={profile} />;
}
