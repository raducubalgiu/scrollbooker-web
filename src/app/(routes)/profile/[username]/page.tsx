import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import { get } from "@/utils/requests";
import React from "react";

interface Props {
  params: { username: string };
}

export default async function UserProfile({ params }: Props) {
  const { username } = params;

  const profile = (
    await get<UserProfileType | undefined>({
      url: `/users/${username}/user-profile`,
    })
  ).data;

  return <ProfileModule profile={profile} />;
}
