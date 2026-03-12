export enum AppointmentChannelEnum {
  SCROLL_BOOKER = "scroll_booker",
  OWN_CLIENT = "own_client",
}

export function fromKey(key: string): AppointmentChannelEnum | null {
  return Object.values(AppointmentChannelEnum).includes(
    key as AppointmentChannelEnum
  )
    ? (key as AppointmentChannelEnum)
    : null;
}

export function fromKeys(keys: string[]): AppointmentChannelEnum[] {
  return keys
    .map(fromKey)
    .filter((key): key is AppointmentChannelEnum => key != null);
}

export function getAppointmentChannelLabel(
  channel: AppointmentChannelEnum | string | null | undefined
): string {
  const key = (channel ?? "").toString().toLowerCase();
  switch (key) {
    case AppointmentChannelEnum.SCROLL_BOOKER:
      return "Scroll Booker";
    case AppointmentChannelEnum.OWN_CLIENT:
      return "Client propriu";
    default:
      return key ? key.charAt(0).toUpperCase() + key.slice(1) : "";
  }
}
