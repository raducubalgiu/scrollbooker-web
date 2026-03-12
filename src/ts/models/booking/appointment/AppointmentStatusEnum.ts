export enum AppointmentStatusEnum {
  FINISHED = "finished",
  CONFIRMED = "confirmed",
  CANCELLED = "cancelled",
}

export function fromKey(key: string): AppointmentStatusEnum | null {
  return Object.values(AppointmentStatusEnum).includes(
    key as AppointmentStatusEnum
  )
    ? (key as AppointmentStatusEnum)
    : null;
}

export function fromKeys(keys: string[]): AppointmentStatusEnum[] {
  return keys
    .map(fromKey)
    .filter((key): key is AppointmentStatusEnum => key != null);
}

export function getAppointmentStatusLabel(
  status: AppointmentStatusEnum | string | null | undefined
): string {
  const key = (status ?? "").toString().toLowerCase();
  switch (key) {
    case AppointmentStatusEnum.FINISHED:
      return "Finalizat";
    case AppointmentStatusEnum.CONFIRMED:
      return "Confirmat";
    case AppointmentStatusEnum.CANCELLED:
      return "Anulat";
    default:
      return key ? key.charAt(0).toUpperCase() + key.slice(1) : "";
  }
}
