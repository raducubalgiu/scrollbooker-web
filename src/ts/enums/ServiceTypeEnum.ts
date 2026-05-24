export enum ServiceTypeEnum {
  APPOINTMENT = "appointment",
  CLASS = "class",
}

// Conversion from String
export function serviceTypefromKey(key: string): ServiceTypeEnum | null {
  return Object.values(ServiceTypeEnum).includes(key as ServiceTypeEnum)
    ? (key as ServiceTypeEnum)
    : null;
}

export const serviceTypeLabels: Record<ServiceType, string> = {
  [ServiceTypeEnum.APPOINTMENT]: "APPOINTMENT",
  [ServiceTypeEnum.CLASS]: "CLASS",
};

export type ServiceType =
  (typeof ServiceTypeEnum)[keyof typeof ServiceTypeEnum];
export const allServiceTypeEnums: ServiceType[] =
  Object.values(ServiceTypeEnum);
