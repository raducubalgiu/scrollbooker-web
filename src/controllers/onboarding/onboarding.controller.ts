import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BusinessCreate } from "@/ts/models/booking/business/Business";
import { ScheduleUpdate } from "@/ts/models/booking/schedule/Schedule";
import {
  BusinessHasEmployeesUpdate,
  OnboardingBusinessCreateResponse,
  OnboardingResponse,
} from "@/ts/models/onboarding/Onboarding";
import { authQueryKeys } from "@/controllers/auth/auth.controller";

type UsernamePayload = { username: string };
type BirthdatePayload = { birthdate: string | null };
type GenderPayload = { gender: string };

// Fiecare mutație de onboarding schimbă `registration_step`/`is_validated`,
// ceea ce înseamnă că orice user-info cache-uit devine învechit — invalidăm
// query-ul de user-info după fiecare pas, ca restul aplicației (ex.
// middleware-ul de client, dacă va citi vreodată din cache) să vadă starea
// reală, nu una expirată.
function useInvalidateUserInfoOnSuccess() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: authQueryKeys.userInfo });
}

export const useCollectUsernameMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (data: UsernamePayload) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-username",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBirthdateMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (data: BirthdatePayload) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-birthdate",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectGenderMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (data: GenderPayload) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-gender",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectLocationPermissionMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-location-permission"
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBusinessMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (data: BusinessCreate) => {
      const response = await axios.post<OnboardingBusinessCreateResponse>(
        "/api/onboarding/collect-business",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBusinessGalleryMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (photos: File[]) => {
      const formData = new FormData();
      photos.forEach((photo) => formData.append("photos", photo));

      const response = await axios.post<OnboardingResponse>(
        "/api/onboarding/collect-business-gallery",
        formData
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBusinessServicesMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (serviceIds: number[]) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-business-services",
        serviceIds
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBusinessSchedulesMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (schedules: ScheduleUpdate[]) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-business-schedules",
        schedules
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBusinessHasEmployeesMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (data: BusinessHasEmployeesUpdate) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/onboarding/collect-business-has-employees",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};
