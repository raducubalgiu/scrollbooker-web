import { UserProfileUpdateResponse } from "@/ts/models/user/UserProfile";
import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";

export type UpdateProfilePayload = {
  name: string;
  username: string;
  bio: string | null;
  avatar: File | string | null;
};

interface MutationError {
  error: string;
}

const updateProfileRequest = async (
  payload: UpdateProfilePayload
): Promise<UserProfileUpdateResponse> => {
  const formData = new FormData();
  formData.append("fullname", payload.name);
  formData.append("username", payload.username);
  formData.append("bio", payload.bio || "");

  if (payload.avatar instanceof File) {
    formData.append("avatar", payload.avatar);
  }

  const response = await fetch("/api/profile/edit", {
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    const errorData: MutationError = await response.json().catch(() => ({
      error: "Eroare la actualizarea profilului.",
    }));
    throw new Error(errorData.error);
  }

  return response.json();
};

export const useUpdateProfileMutation = (
  onSuccessCallback?: (data: UserProfileUpdateResponse) => void
): UseMutationResult<
  UserProfileUpdateResponse,
  Error,
  UpdateProfilePayload,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    UserProfileUpdateResponse,
    Error,
    UpdateProfilePayload,
    unknown
  >({
    mutationFn: updateProfileRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      onSuccessCallback?.(data);
    },
    onError: (error) => {
      console.error("Eroare Mutation în UI:", error.message);
    },
  });
};
