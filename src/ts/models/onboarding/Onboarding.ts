import { RegistrationStepEnum } from "@/ts/enums/RegistrationStepEnum";

export interface OnboardingResponse {
  is_validated: boolean;
  registration_step: RegistrationStepEnum;
}

export interface OnboardingBusinessCreateResponse {
  business_id: number;
  business_type_id: number;
  onboarding_state: OnboardingResponse;
}

export interface BusinessHasEmployeesUpdate {
  has_employees: boolean;
}
