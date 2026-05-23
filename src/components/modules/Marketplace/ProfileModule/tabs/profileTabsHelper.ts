export enum ProfileTabEnum {
  POSTS,
  PRODUCTS,
  EMPLOYEES,
  BOOKMARKS,
  INFO,
}

export const tabEnumToParamMap: Record<ProfileTabEnum, string> = {
  [ProfileTabEnum.POSTS]: "posts",
  [ProfileTabEnum.PRODUCTS]: "products",
  [ProfileTabEnum.EMPLOYEES]: "employees",
  [ProfileTabEnum.BOOKMARKS]: "bookmarks",
  [ProfileTabEnum.INFO]: "info",
};

export const getProfileUrl = (
  username: string,
  tab: ProfileTabEnum = ProfileTabEnum.POSTS
) => {
  const tabParam = tabEnumToParamMap[tab];
  return `/profile/${username}?tab=${tabParam}`;
};
