export enum RegistrationStepEnum {
  // Shared
  COLLECT_USER_EMAIL_VALIDATION = "collect_user_email_validation",
  COLLECT_USER_USERNAME = "collect_user_username",
  COLLECT_USER_PHONE_HUMBER = "collect_user_phone_number",

  // Client
  COLLECT_CLIENT_BIRTHDATE = "collect_client_birthdate",
  COLLECT_CLIENT_GENDER = "collect_client_gender",
  COLLECT_CLIENT_LOCATION_PERMISSION = "collect_client_location_permission",

  // Business
  COLLECT_BUSINESS = "collect_business",
  COLLECT_BUSINESS_GALLERY = "collect_business_gallery",
  COLLECT_BUSINESS_SERVICES = "collect_business_services",
  COLLECT_BUSINESS_SCHEDULES = "collect_business_schedules",
  COLLECT_BUSINESS_HAS_EMPLOYEES = "collect_business_has_employees",
  COLLECT_BUSINESS_VALIDATION = "collect_business_validation",
}

export function RegistrationStepfromKey(
  key: string
): RegistrationStepEnum | null {
  return Object.values(RegistrationStepEnum).includes(
    key as RegistrationStepEnum
  )
    ? (key as RegistrationStepEnum)
    : null;
}

// `t` e legat la namespace-ul "onboarding" (vezi OnboardingModule.tsx) —
// funcția rămâne în afara componentei ca să poată fi apelată dintr-un
// switch simplu, dar depinde de un `t` transmis explicit, nu de
// useTranslations() direct (asta ar cere să fie ea însăși un hook/componentă).
export const displayStepLabel = (
  step: RegistrationStepEnum,
  t: (key: string) => string
) => {
  switch (step) {
    // Shared
    case RegistrationStepEnum.COLLECT_USER_EMAIL_VALIDATION:
      return t("steps.emailValidation");
    case RegistrationStepEnum.COLLECT_USER_USERNAME:
      return t("steps.username");
    case RegistrationStepEnum.COLLECT_USER_PHONE_HUMBER:
      return t("steps.phoneNumber");

    // Client
    case RegistrationStepEnum.COLLECT_CLIENT_BIRTHDATE:
      return t("steps.birthdate");
    case RegistrationStepEnum.COLLECT_CLIENT_GENDER:
      return t("steps.gender");
    case RegistrationStepEnum.COLLECT_CLIENT_LOCATION_PERMISSION:
      return t("steps.locationPermission");

    // Business
    case RegistrationStepEnum.COLLECT_BUSINESS:
      return t("steps.business");
    case RegistrationStepEnum.COLLECT_BUSINESS_GALLERY:
      return t("steps.businessGallery");
    case RegistrationStepEnum.COLLECT_BUSINESS_SERVICES:
      return t("steps.businessServices");
    case RegistrationStepEnum.COLLECT_BUSINESS_SCHEDULES:
      return t("steps.businessSchedules");
    case RegistrationStepEnum.COLLECT_BUSINESS_HAS_EMPLOYEES:
      return t("steps.businessHasEmployees");
    case RegistrationStepEnum.COLLECT_BUSINESS_VALIDATION:
      return t("steps.businessValidation");
    default:
      return null;
  }
};
