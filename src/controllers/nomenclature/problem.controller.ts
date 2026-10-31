import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { PaginatedData } from "@/components/core/Table/Table";
import {
  AdminProblem,
  Problem,
  ProblemPlatform,
  ProblemStatus,
} from "@/ts/models/nomenclature/Problem";

const PROBLEMS_PATH = "/api/protected/problems";
const PAGE_SIZE = 20;

export const PROBLEM_TEXT_MIN_LENGTH = 20;
export const PROBLEM_TEXT_MAX_LENGTH = 500;
export const PROBLEM_ADMIN_MESSAGE_MAX_LENGTH = 500;
export const PROBLEM_MAX_PHOTOS = 3;
export const PROBLEM_MAX_PHOTO_BYTES = 8 * 1024 * 1024;
export const PROBLEM_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

export const problemQueryKeys = {
  all: ["problems"] as const,
  admin: (status: ProblemStatus | null, platform: ProblemPlatform | null) =>
    ["problems", "admin", status, platform] as const,
  mine: ["problems", "me"] as const,
};

type ReportProblemPayload = {
  text: string;
  photos: File[];
};

const nextPage = <T>(lastPage: PaginatedData<T>, pages: PaginatedData<T>[]) => {
  const totalFetched = pages.flatMap((page) => page.results).length;
  return totalFetched < lastPage.count ? pages.length + 1 : undefined;
};

export const useReportProblem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ text, photos }: ReportProblemPayload) => {
      const formData = new FormData();
      formData.append("text", text);
      photos.forEach((photo) => formData.append("photos", photo));

      const response = await axios.post<Problem>(PROBLEMS_PATH, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: problemQueryKeys.mine });
    },
    meta: { skipErrorToast: true },
  });
};

export const useInfiniteMyProblems = () => {
  return useInfiniteQuery({
    queryKey: problemQueryKeys.mine,
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get<PaginatedData<Problem>>(
        `${PROBLEMS_PATH}/me`,
        { params: { page: pageParam, limit: PAGE_SIZE } },
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: nextPage,
  });
};

type AdminProblemsFilters = {
  status: ProblemStatus | null;
  platform: ProblemPlatform | null;
};

export const useInfiniteAdminProblems = ({
  status,
  platform,
}: AdminProblemsFilters) => {
  return useInfiniteQuery({
    queryKey: problemQueryKeys.admin(status, platform),
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get<PaginatedData<AdminProblem>>(
        PROBLEMS_PATH,
        {
          params: {
            page: pageParam,
            limit: PAGE_SIZE,
            status: status ?? undefined,
            platform: platform ?? undefined,
          },
        },
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: nextPage,
  });
};

type UpdateProblemStatusPayload = {
  problemId: number;
  status: ProblemStatus;
  message: string | null;
};

export const useUpdateProblemStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      problemId,
      status,
      message,
    }: UpdateProblemStatusPayload) => {
      const { data } = await axios.patch<AdminProblem>(
        `${PROBLEMS_PATH}/${problemId}/status`,
        { status, message },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: problemQueryKeys.all });
    },
    meta: { skipErrorToast: true },
  });
};
