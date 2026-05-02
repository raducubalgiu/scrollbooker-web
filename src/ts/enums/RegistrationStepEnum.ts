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

export const displayStepLabel = (step: RegistrationStepEnum) => {
  switch (step) {
    // Shared
    case RegistrationStepEnum.COLLECT_USER_EMAIL_VALIDATION:
      return "Validare Email";
    case RegistrationStepEnum.COLLECT_USER_USERNAME:
      return "Username";
    case RegistrationStepEnum.COLLECT_USER_PHONE_HUMBER:
      return "Phone Number";

    // Client
    case RegistrationStepEnum.COLLECT_CLIENT_BIRTHDATE:
      return "Birthdate";
    case RegistrationStepEnum.COLLECT_CLIENT_GENDER:
      return "Gender";
    case RegistrationStepEnum.COLLECT_CLIENT_LOCATION_PERMISSION:
      return "Location Permission";

    // Business
    case RegistrationStepEnum.COLLECT_BUSINESS:
      return "Detalii Locatie";
    case RegistrationStepEnum.COLLECT_BUSINESS_SERVICES:
      return "Servicii";
    case RegistrationStepEnum.COLLECT_BUSINESS_SCHEDULES:
      return "Programul locatiei";
    case RegistrationStepEnum.COLLECT_BUSINESS_HAS_EMPLOYEES:
      return "Angajati";
    case RegistrationStepEnum.COLLECT_BUSINESS_VALIDATION:
      return "Validare";
    default:
      return null;
  }
};
