export enum NotificationTypeEnum {
  FOLLOW = "follow",
  EMPLOYMENT_REQUEST = "employment_request",
  EMPLOYMENT_REQUEST_ACCEPT = "employment_request_accept",
  EMPLOYMENT_REQUEST_DENIED = "employment_request_denied",
}

export function notificationTypefromKey(
  key: string
): NotificationTypeEnum | null {
  return Object.values(NotificationTypeEnum).includes(
    key as NotificationTypeEnum
  )
    ? (key as NotificationTypeEnum)
    : null;
}
