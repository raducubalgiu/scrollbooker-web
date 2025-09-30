export enum PermissionEnum {
    NOMENCLATURES_VIEW = "NOMENCLATURES_VIEW",
    EDIT_USER_PROFESSION = "EDIT_USER_PROFESSION",

    // My Business
    MY_BUSINESS_ROUTES_VIEW = "MY_BUSINESS_ROUTES_VIEW",

    MY_BUSINESS_LOCATION_VIEW = "MY_BUSINESS_LOCATION_VIEW",
    MY_SCHEDULES_VIEW = "MY_SCHEDULES_VIEW",

    MY_PRODUCTS_VIEW = "MY_PRODUCTS_VIEW",
    MY_SERVICES_VIEW = "MY_SERVICES_VIEW",

    MY_CALENDAR_VIEW = "MY_CALENDAR_VIEW",
    MY_CURRENCIES_VIEW = "MY_CURRENCIES_VIEW",

    MY_EMPLOYEES_VIEW = "MY_EMPLOYEES_VIEW",
    MY_EMPLOYMENT_REQUESTS_VIEW = "MY_EMPLOYMENT_REQUESTS_VIEW",

    // No Protection
    NO_PROTECTION = "NO_PROTECTION"
}

// Conversion from String
export function fromKey(key: string): PermissionEnum | null {
    return Object.values(PermissionEnum).includes(key as PermissionEnum)
        ? (key as PermissionEnum) : null
}

// Conversion from List
export function fromKeys(keys: string[]): PermissionEnum[] {
    return keys
        .map(fromKey)
        .filter((key): key is PermissionEnum => key != null)
}


