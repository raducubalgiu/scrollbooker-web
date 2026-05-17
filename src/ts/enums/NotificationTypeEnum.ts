export enum NotificationTypeEnum {
  // ── Social ────────────────────────────────────────────────
  FOLLOW = "follow",
  LIKE_POST = "like_post",
  COMMENT_POST = "comment_post",
  REPOST = "repost",
  MENTION_POST = "mention_post",

  // ── Booking ───────────────────────────────────────────────
  APPOINTMENT_BOOKED = "appointment_booked",
  APPOINTMENT_CANCELED = "appointment_canceled",
  APPOINTMENT_RESCHEDULED = "appointment_rescheduled",
  APPOINTMENT_REMINDER = "appointment_reminder",
  APPOINTMENT_REVIEWED = "appointment_reviewed",

  // ── Administrative ────────────────────────────────────────
  EMPLOYMENT_REQUEST = "employment_request",
  EMPLOYMENT_REQUEST_ACCEPTED = "employment_request_accepted",
  EMPLOYMENT_REQUEST_DENIED = "employment_request_denied",

  // ── App-level ─────────────────────────────────────────────
  BUSINESS_VALIDATION = "business_validation",
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
