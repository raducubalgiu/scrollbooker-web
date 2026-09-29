import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { SearchUsername } from "@/ts/models/user/SearchUsername";
import { SearchUser } from "@/ts/models/search/SearchUser";

const MIN_USERNAME_LENGTH = 3;

export const useCheckUsernameAvailability = (username: string) => {
  const normalized = username.replace(/\s+/g, "");

  return useQuery({
    queryKey: ["search", "username-availability", normalized],
    queryFn: async () => {
      const response = await axios.get<SearchUsername>(
        "/api/protected/users/available-username",
        { params: { username: normalized } }
      );
      return response.data;
    },
    enabled: normalized.length >= MIN_USERNAME_LENGTH,
    staleTime: 1000 * 60,
  });
};

type UseSearchUsersParams = {
  query: string;
  roleClient?: boolean;
};

export const useSearchUsers = ({ query, roleClient }: UseSearchUsersParams) => {
  const trimmed = query.trim();

  return useQuery({
    queryKey: ["search", "users", trimmed, roleClient ?? null],
    queryFn: async () => {
      const response = await axios.get<SearchUser[]>(
        "/api/protected/search/users",
        {
          params: {
            query: trimmed,
            ...(roleClient !== undefined ? { role_client: roleClient } : {}),
          },
        }
      );
      return response.data;
    },
    enabled: trimmed.length > 0,
    staleTime: 1000 * 60,
  });
};
