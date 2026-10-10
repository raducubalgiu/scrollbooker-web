import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthTokens, UserInfo, UserRegister } from "@/ts/models/auth/auth";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { ActionMessageResponse } from "@/ts/models/auth/ActionMessageResponse";

type UpdateUserInfoPayload = Partial<
  Pick<UserInfo, "fullname" | "avatar" | "profession">
>;

const BACKEND_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

export const authQueryKeys = {
  userInfo: ["auth", "user-info"] as const,
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: authQueryKeys.userInfo,
    queryFn: async () => {
      const response = await axios.get<UserInfo>(
        "/api/protected/auth/user-info"
      );
      return response.data;
    },
  });
};

export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUserInfoPayload) => {
      const response = await axios.put<UserInfo>(
        "/api/protected/auth/update-user-info",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.userInfo });
    },
  });
};

export const useVerifyEmailMutation = () => {
  return useMutation({
    mutationFn: async (code: string) => {
      const response = await axios.post<OnboardingResponse>(
        "/api/protected/auth/verify-email",
        { code }
      );
      return response.data;
    },
  });
};

export const useResendVerificationEmailMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post<ActionMessageResponse>(
        "/api/protected/auth/resend-verification-email"
      );
      return response.data;
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: async (data: UserRegister) => {
      const response = await axios.post<AuthTokens>(
        `${BACKEND_URL}/auth/register`,
        data
      );
      return response.data;
    },
  });
};
