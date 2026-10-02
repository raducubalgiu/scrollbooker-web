import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserProfileAbout } from "@/ts/models/user/UserProfileAbout";

export const useGetUserProfileAbout = (userId: number) => {
  return useQuery({
    queryKey: ["user-profile-about", userId],
    queryFn: async () => {
      const response = await axios.get<UserProfileAbout>(
        `/api/protected/users/${userId}/about`
      );
      return response.data;
    },
    enabled: Boolean(userId),
  });
};
