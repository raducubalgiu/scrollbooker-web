export enum AppointmentStatusEnum {
  FINISHED = "finished",
  IN_PROGRESS = "in_progress",
  CANCELED = "canceled",
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
    case AppointmentStatusEnum.IN_PROGRESS:
      return "Confirmat";
    case AppointmentStatusEnum.CANCELED:
      return "Anulat";
    default:
      return key ? key.charAt(0).toUpperCase() + key.slice(1) : "";
  }
}

export namespace AppointmentStatusEnum {
  export const all: AppointmentStatusEnum[] = Object.values(
    AppointmentStatusEnum
  ).filter((v): v is AppointmentStatusEnum => typeof v === "string");
}
