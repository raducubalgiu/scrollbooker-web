import ProfileModule from "@/components/modules/Marketplace/ProfileModule/ProfileModule";
import { get } from "@/utils/requests";
import React from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import { UserProfile } from "@/ts/models/user/UserProfile";

interface UserProfilePageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ tab?: string | null }>;
}

export default async function UserProfilePage({
  params,
  searchParams,
}: UserProfilePageProps) {
  const { username } = await params;
  const { tab } = await searchParams;

  if (!username) {
    throw new Error("Username param was not provided");
  }

  const profileData = await get<UserProfile | null>({
    url: `/users/${username}/user-profile`,
  })
    .then((response) => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        notFound();
      }
      throw error;
    });

  if (!profileData) {
    throw new Error("An error occured when fetching profile data");
  }

  return <ProfileModule profile={profileData} tab={tab} />;
}
