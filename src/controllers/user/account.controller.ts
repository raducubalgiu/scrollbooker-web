import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  AccountInfo,
  PrivatePhoneVerificationCheckRequest,
  PrivatePhoneVerificationResponse,
} from "@/ts/models/user/AccountInfo";
import { ActionMessageResponse } from "@/ts/models/auth/ActionMessageResponse";

const USER_INFO_PATH = "/api/protected/users/user-info";

export const accountQueryKeys = {
  accountInfo: ["account-info"] as const,
};

export const useAccountInfo = () => {
  return useQuery({
    queryKey: accountQueryKeys.accountInfo,
    queryFn: async () => {
      const response = await axios.get<AccountInfo>(
        `${USER_INFO_PATH}/account`
      );
      return response.data;
    },
  });
};

export const useVerifyPrivatePhoneNumber = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: PrivatePhoneVerificationCheckRequest) => {
      const response = await axios.post<PrivatePhoneVerificationResponse>(
        `${USER_INFO_PATH}/private-phone/verify`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: accountQueryKeys.accountInfo,
      });
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
