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
  searchUsers: () => "/search-users",

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

  dashboard: () => "/dashboard",
  settings: () => "/settings",

  // Auth
  login: () => "/auth/login",
  register: () => "/auth/register",

  // My Business
  myBusiness: () => "/admin/my-business",
  myBusinessDetails: () => "/admin/my-business/business-details",
  mySchedules: () => "/admin/my-business/schedules",
  myServices: () => "/admin/my-business/services",
  myProducts: () => "/admin/my-business/products",
  myEmployees: () => "/admin/my-business/employees",
  calendar: () => "/admin/calendar",

  approve: () => "/admin/businesses/approve",

  // Nomenclatures
  rolesAndPermissions: () => "/admin/nomenclatures/roles-and-permissions",
  businessDomains: () => "/admin/nomenclatures/business-domains",
  businessTypes: () => "/admin/nomenclatures/business-types",
  serviceDomains: () => "/admin/nomenclatures/service-domains",
  services: () => "/admin/nomenclatures/services",
  filters: () => "/admin/nomenclatures/filters",
  professions: () => "/admin/nomenclatures/professions",
  currencies: () => "/admin/nomenclatures/currencies",
  consents: () => "/admin/nomenclatures/consents",
} as const;

export type AppRouteType = typeof AppRoutes;
