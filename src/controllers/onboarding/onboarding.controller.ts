import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
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

function useInvalidateUserInfoOnSuccess() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({ queryKey: authQueryKeys.userInfo });
}

export const useCollectUsernameMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();

  return useMutation({
    mutationFn: async (data: UsernamePayload) => {
      const response = await axios.patch<OnboardingResponse>(
        "/api/protected/onboarding/collect-user-username",
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
        "/api/protected/onboarding/collect-client-birthdate",
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
        "/api/protected/onboarding/collect-client-gender",
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
        "/api/protected/onboarding/collect-user-location-permission"
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
        "/api/protected/onboarding/collect-business",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};

export const useCollectBusinessGalleryMutation = () => {
  const invalidateUserInfo = useInvalidateUserInfoOnSuccess();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (photos: File[]) => {
      if (!session?.business_id) {
        throw new Error("Business ID lipsește din sesiune");
      }

      // Pasul e opțional (ca pe iOS, CollectBusinessGalleryViewModel) — fără
      // poze, nu blocăm trecerea la pasul următor, doar spunem backend-ului
      // să sară peste actualizarea galeriei.
      const skipUpdateGallery = photos.length === 0;
      const formData = new FormData();
      photos.forEach((photo) => formData.append("photos", photo));

      const response = await axios.patch<OnboardingResponse>(
        `/api/protected/onboarding/collect-business-gallery/${session.business_id}/update`,
        formData,
        { params: { skip_update_gallery: skipUpdateGallery } }
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
        "/api/protected/onboarding/collect-business-services",
        { service_ids: serviceIds }
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
        "/api/protected/onboarding/collect-business-schedules",
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
        "/api/protected/onboarding/collect-business-has-employees",
        data
      );
      return response.data;
    },
    onSuccess: invalidateUserInfo,
  });
};
