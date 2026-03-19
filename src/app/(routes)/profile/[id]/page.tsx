import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import { get } from "@/utils/requests";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function UserProfile({ params }: Props) {
  const { id } = params;

  const profile = (
    await get<UserProfileType | undefined>({
      url: `/users/${id}/user-profile`,
    })
  ).data;

  return <ProfileModule profile={profile} />;
}
