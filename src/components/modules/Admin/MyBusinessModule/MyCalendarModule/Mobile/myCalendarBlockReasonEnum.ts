export enum MyCalendarBlockReasonEnum {
  VACATION = "vacation",
  MEDICAL_LEAVE = "medical_leave",
  DOCTOR_APPOINTMENT = "doctor_appointment",
  LEGAL_DAY_OFF = "legal_day_off",
  DO_NOT_WANT_TO_SAY = "do_not_want_to_say",
  OTHER = "other",
}

export const BLOCK_REASON_LABELS: Record<MyCalendarBlockReasonEnum, string> = {
  [MyCalendarBlockReasonEnum.VACATION]: "Concediu de odihnă",
  [MyCalendarBlockReasonEnum.MEDICAL_LEAVE]: "Concediu medical",
  [MyCalendarBlockReasonEnum.DOCTOR_APPOINTMENT]: "Programare la medic",
  [MyCalendarBlockReasonEnum.LEGAL_DAY_OFF]: "Zi legală liberă",
  [MyCalendarBlockReasonEnum.DO_NOT_WANT_TO_SAY]: "Nu vreau să spun",
  [MyCalendarBlockReasonEnum.OTHER]: "Alt motiv",
};

export const BLOCK_REASON_OPTIONS = Object.values(MyCalendarBlockReasonEnum);
