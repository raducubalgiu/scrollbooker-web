import {
  ProfileTabEnum,
  tabEnumToParamMap,
} from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";
import { useRouter } from "next/navigation";
import { makeProfessionSlug } from "./make-profession-slug";

export type AppRouteValues = ReturnType<
  (typeof AppRoutes)[keyof typeof AppRoutes]
>;

export const AppRoutes = {
  home: () => "/",
  notifications: () => "/notifications",
  search: () => "/search",

  appointments: () => "/appointments",
  appointmentDetails: (appointmentId: number) =>
    `/appointments/${appointmentId}`,

  uploadVideo: () => "/upload-video",
  more: () => "/more",

  profile: (
    username: string,
    profession: string,
    tab: ProfileTabEnum = ProfileTabEnum.POSTS
  ) => {
    const professionSlug = makeProfessionSlug(profession);
    const baseUrl = `/user/${username}/${professionSlug}`;

    const tabParam = tabEnumToParamMap[tab];

    return `${baseUrl}?tab=${tabParam}`;
  },

  // profile: (
  //   username: string,
  //   profession: string,
  //   tab?: ProfileTabEnum | string
  // ) => {
  //   const professionSlug = makeProfessionSlug(profession);
  //   const baseUrl = `/user/${username}/profession/${professionSlug}`;

  //   if (!tab) {
  //     return `${baseUrl}?tab=posts`;
  //   }

  //   const tabParam = typeof tab === "number" ? tabEnumToParamMap[tab] : tab;

  //   return `${baseUrl}?tab=${tabParam}`;
  // },

  postDetail: (
    username: string,
    profession: string,
    postId: number,
    tab?: ProfileTabEnum
  ) => {
    const professionSlug = makeProfessionSlug(profession);
    const baseUrl = `/user/${username}/${professionSlug}/post/${postId}`;

    if (tab === undefined) {
      return baseUrl;
    }

    const tabParam = tabEnumToParamMap[tab];
    return `${baseUrl}?tab=${tabParam}`;
  },

  // Auth
  login: () => "/auth/login",
  register: () => "/auth/register",

  // Admin
  calendar: () => "/admin/calendar",

  // Nomenclatures
} as const;

export type AppRouteType = typeof AppRoutes;

export const useAppNavigation = () => {
  const router = useRouter();

  const navigateTo = (
    routeUrl: string,
    options?: { replace?: boolean; scroll?: boolean }
  ) => {
    if (options?.replace) {
      router.replace(routeUrl, { scroll: options.scroll ?? false });
    } else {
      router.push(routeUrl, { scroll: options?.scroll ?? false });
    }
  };

  const goBack = () => router.back();

  return { navigateTo, goBack };
};
