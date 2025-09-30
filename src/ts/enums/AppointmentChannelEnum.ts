export enum AppointmentChannelEnum {
    SCROLL_BOOKER = "scroll_booker",
    OWN_CLIENT = "own_client"
}

// Conversion from String
export function fromKey(key: string): AppointmentChannelEnum | null {
    return Object.values(AppointmentChannelEnum).includes(key as AppointmentChannelEnum)
        ? (key as AppointmentChannelEnum) : null
}

// Conversion from List
export function fromKeys(keys: string[]): AppointmentChannelEnum[] {
    return keys
        .map(fromKey)
        .filter((key): key is AppointmentChannelEnum => key != null)
}