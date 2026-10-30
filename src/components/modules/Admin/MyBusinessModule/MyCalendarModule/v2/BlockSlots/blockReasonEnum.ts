export enum BlockReasonEnum {
  VACATION = "vacation",
  MEDICAL_LEAVE = "medical_leave",
  DOCTOR_APPOINTMENT = "doctor_appointment",
  LEGAL_DAY_OFF = "legal_day_off",
  DO_NOT_WANT_TO_SAY = "do_not_want_to_say",
  OTHER = "other",
}

export const BLOCK_REASON_LABELS: Record<BlockReasonEnum, string> = {
  [BlockReasonEnum.VACATION]: "Concediu de odihnă",
  [BlockReasonEnum.MEDICAL_LEAVE]: "Concediu medical",
  [BlockReasonEnum.DOCTOR_APPOINTMENT]: "Programare la medic",
  [BlockReasonEnum.LEGAL_DAY_OFF]: "Zi legală liberă",
  [BlockReasonEnum.DO_NOT_WANT_TO_SAY]: "Nu vreau să spun",
  [BlockReasonEnum.OTHER]: "Alt motiv",
};

export const BLOCK_REASON_OPTIONS = Object.values(BlockReasonEnum);
