import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { getUserServerSession } from "@/lib/auth/get-user-server";
import { UserProfileType } from "@/ts/models/user/UserProfileType";
import { get } from "@/utils/requests";
import React from "react";

interface Props {
  params: { id: string };
}

export default async function UserProfile({ params }: Props) {
  const { id } = params;

  const { userId } = await getUserServerSession();

  const profile = (
    await get<UserProfileType>({
      url: `/users/${userId}/user-profile`,
    })
  ).data;

  return <ProfileModule userId={userId} profile={profile} />;
}
