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

const paramToTabEnumMap = Object.entries(tabEnumToParamMap).reduce(
  (acc, [enumValue, stringValue]) => {
    acc[stringValue] = Number(enumValue) as ProfileTabEnum;
    return acc;
  },
  {} as Record<string, ProfileTabEnum>
);

export const getProfileRoute = (
  tabStr: string | null | undefined
): ProfileTabEnum => {
  if (!tabStr) return ProfileTabEnum.POSTS;

  const foundEnum = paramToTabEnumMap[tabStr];

  return foundEnum !== undefined ? foundEnum : ProfileTabEnum.POSTS;
};
