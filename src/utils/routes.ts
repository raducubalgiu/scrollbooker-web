import {
  ProfileTabEnum,
  tabEnumToParamMap,
} from "@/components/modules/Marketplace/ProfileModule/tabs/profileTabsHelper";
import { makeProfessionSlug } from "./make-profession-slug";

export type AppRouteValues = ReturnType<
  (typeof AppRoutes)[keyof typeof AppRoutes]
>;

export const AppRoutes = {
  home: () => "/",
  notifications: () => "/notifications",
  search: () => "/search",

  booking: (
    businessId: number,
    businessOwnerId: number,
    userId: number,
    source: string,
    selectedProductId: number | null
  ) =>
    `/booking/${businessId}/${businessOwnerId}/${userId}?product=${selectedProductId}&source=${source}`,

  appointments: () => "/appointments",
  appointmentDetails: (appointmentId: number) =>
    `/appointments/${appointmentId}`,

  employmentRequest: (employmentRequestId: number) => {
    return `/employment-request/${employmentRequestId}`;
  },

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

  settings: () => "/settings",

  login: () => "/auth/login",
  register: () => "/auth/register",

  myBusiness: () => "/admin/my-business",
  myBusinessDetails: () => "/admin/my-business/business-details",
  mySchedules: () => "/admin/my-business/schedules",
  myServices: () => "/admin/my-business/services",
  myProducts: () => "/admin/my-business/products",
  myEmployees: () => "/admin/my-business/employees",
  calendar: () => "/admin/calendar",
} as const;

export type AppRouteType = typeof AppRoutes;
