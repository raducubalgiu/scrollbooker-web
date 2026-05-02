import { RegistrationStepEnum } from "@/ts/enums/RegistrationStepEnum";

export interface OnboardingResponse {
  is_validated: boolean;
  registration_step: RegistrationStepEnum;
}

export interface BusinessHasEmployeesUpdate {
  has_employees: boolean;
}
