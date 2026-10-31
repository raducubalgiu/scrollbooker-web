import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { signOut, SignOutParams } from "next-auth/react";
import {
  AuthTokens,
  PhoneVerificationSendRequest,
  PhoneVerificationSendResponse,
  UnfinishedRegistration,
  UserInfo,
  UserRegister,
} from "@/ts/models/auth/auth";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { ActionMessageResponse } from "@/ts/models/auth/ActionMessageResponse";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  AccountInfo,
  AccountPhoneVerificationCheckRequest,
  AccountPhoneVerificationResponse,
} from "@/ts/models/user/AccountInfo";
import { UserSession } from "@/ts/models/auth/UserSession";

type UpdateUserInfoPayload = Partial<
  Pick<UserInfo, "fullname" | "avatar" | "profession">
>;

const BACKEND_URL = process.env.NEXT_PUBLIC_BE_BASE_ENDPOINT;

export const authQueryKeys = {
  userInfo: ["auth", "user-info"] as const,
  accountInfo: ["account-info"] as const,
  sessions: ["auth", "sessions"] as const,
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
    meta: { skipErrorToast: true },
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

type GetUnfinishedRegistrationsParams = {
  page: number;
  limit: number;
};

export const useUnfinishedRegistrations = ({
  page,
  limit,
}: GetUnfinishedRegistrationsParams) => {
  const doRequest = () =>
    axios
      .get<
        PaginatedData<UnfinishedRegistration>
      >(`/api/protected/auth/unfinished-registrations?page=${page}&limit=${limit}`)
      .then((response) => response.data);

  return useQuery({
    queryKey: ["unfinished-registrations", page, limit],
    queryFn: doRequest,
  });
};

export const useDeleteUnfinishedRegistration = () => {
  const queryClient = useQueryClient();

  const doRequest = (userId: number): Promise<ActionMessageResponse> =>
    axios
      .delete<ActionMessageResponse>(
        `/api/protected/auth/unfinished-registrations/${userId}`
      )
      .then((response) => response.data);

  return useMutation<ActionMessageResponse, Error, number>({
    mutationFn: doRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unfinished-registrations"] });
    },
  });
};

export const useSendPhoneVerificationCode = () => {
  return useMutation({
    mutationFn: async (data: PhoneVerificationSendRequest) => {
      const response = await axios.post<PhoneVerificationSendResponse>(
        `/api/protected/users/user-info/phone/send-verification`,
        data
      );
      return response.data;
    },
  });
};

export const useAccountInfo = () => {
  return useQuery({
    queryKey: authQueryKeys.accountInfo,
    queryFn: async () => {
      const response = await axios.get<AccountInfo>(
        "/api/protected/auth/user-info/account"
      );
      return response.data;
    },
  });
};

export const useVerifyAccountPhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AccountPhoneVerificationCheckRequest) => {
      const response = await axios.post<AccountPhoneVerificationResponse>(
        "/api/protected/auth/user-info/account-phone/verify",
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.accountInfo });
    },
    meta: { skipErrorToast: true },
  });
};

export const useDeactivateAccount = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post<ActionMessageResponse>(
        "/api/protected/auth/deactivate-account"
      );
      return response.data;
    },
    meta: { skipErrorToast: true },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axios.post<ActionMessageResponse>(
        "/api/protected/auth/delete-account"
      );
      return response.data;
    },
    meta: { skipErrorToast: true },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const response = await axios.post<ActionMessageResponse>(
        `${BACKEND_URL}/auth/forgot-password`,
        { email }
      );
      return response.data;
    },
    meta: { skipErrorToast: true },
  });
};

export type ResetPasswordPayload = {
  email: string;
  code: string;
  new_password: string;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const response = await axios.post<ActionMessageResponse>(
        `${BACKEND_URL}/auth/reset-password`,
        payload
      );
      return response.data;
    },
    meta: { skipErrorToast: true },
  });
};

export type ChangePasswordPayload = {
  current_password: string;
  new_password: string;
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const response = await axios.post<ActionMessageResponse>(
        "/api/protected/auth/change-password",
        payload
      );
      return response.data;
    },
    meta: { skipErrorToast: true },
  });
};

export const logout = async (options?: SignOutParams<true>) => {
  await axios.post("/api/protected/auth/logout").catch(() => undefined);
  await signOut(options);
};

export const useUserSessions = () => {
  return useQuery({
    queryKey: authQueryKeys.sessions,
    queryFn: async () => {
      const response = await axios.get<UserSession[]>(
        "/api/protected/auth/sessions"
      );
      return response.data;
    },
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      await axios.delete(`/api/protected/auth/sessions/${sessionId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
};

export const useRevokeOtherSessions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await axios.delete("/api/protected/auth/sessions");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
};
