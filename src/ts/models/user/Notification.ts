import { NotificationTypeEnum } from "@/ts/enums/NotificationTypeEnum";
import { UserMini } from "./UserMini";

export type FollowNotificationData = Record<string, never>;

export interface LikePostNotificationData {
  post_id: number;
  actor_ids: number[];
  post_url: string | null;
  total_count: number;
}

export interface CommentPostNotificationData {
  post_id: number;
  actor_ids: number[];
  post_url: string | null;
  total_count: number;
}

export interface RepostNotificationData {
  post_id: number;
  actor_ids: number[];
  post_url: string | null;
  total_count: number;
}

export interface MentionPostNotificationData {
  post_id: number;
  comment_id: number | null;
}

export interface AppointmentBookedNotificationData {
  appointment_id: number;
  customer_id: number;
  start_date: string; // ISO-8601
  customer_fullname: string;
}

export interface AppointmentCanceledNotificationData {
  appointment_id: number;
  canceled_by_user_id: number;
  canceled_reason: string | null;
}

export interface AppointmentRescheduledNotificationData {
  appointment_id: number;
  old_start_date: string; // ISO-8601
  new_start_date: string; // ISO-8601
}

export interface AppointmentReminderNotificationData {
  appointment_id: number;
  start_date: string; // ISO-8601
}

export interface AppointmentReviewedNotificationData {
  appointment_id: number;
  review_id: number;
  rating: number;
}

export interface EmploymentRequestNotificationData {
  employment_request_id: number;
  profession_id: number;
  profession_name: string;
  business_id: number;
}

export interface EmploymentRequestAcceptedNotificationData {
  employment_request_id: number;
  business_id: number;
}

export interface EmploymentRequestDeniedNotificationData {
  employment_request_id: number;
  business_id: number;
}

export interface BusinessValidationNotificationData {
  business_id: number;
  is_approved: boolean;
  reason: string | null;
}

export type NotificationDataMap = {
  [NotificationTypeEnum.FOLLOW]: FollowNotificationData;
  [NotificationTypeEnum.LIKE_POST]: LikePostNotificationData;
  [NotificationTypeEnum.COMMENT_POST]: CommentPostNotificationData;
  [NotificationTypeEnum.REPOST]: RepostNotificationData;
  [NotificationTypeEnum.MENTION_POST]: MentionPostNotificationData;
  [NotificationTypeEnum.APPOINTMENT_BOOKED]: AppointmentBookedNotificationData;
  [NotificationTypeEnum.APPOINTMENT_CANCELED]: AppointmentCanceledNotificationData;
  [NotificationTypeEnum.APPOINTMENT_RESCHEDULED]: AppointmentRescheduledNotificationData;
  [NotificationTypeEnum.APPOINTMENT_REMINDER]: AppointmentReminderNotificationData;
  [NotificationTypeEnum.APPOINTMENT_REVIEWED]: AppointmentReviewedNotificationData;
  [NotificationTypeEnum.EMPLOYMENT_REQUEST]: EmploymentRequestNotificationData;
  [NotificationTypeEnum.EMPLOYMENT_REQUEST_ACCEPTED]: EmploymentRequestAcceptedNotificationData;
  [NotificationTypeEnum.EMPLOYMENT_REQUEST_DENIED]: EmploymentRequestDeniedNotificationData;
  [NotificationTypeEnum.BUSINESS_VALIDATION]: BusinessValidationNotificationData;
};

type NotificationByType<T extends NotificationTypeEnum> = {
  id: number;
  type: T;
  sender_id: number | null;
  receiver_id: number;
  data: NotificationDataMap[T];
  is_read: boolean;
  is_deleted: boolean;
  sender: UserMini | null;
  is_follow: boolean;
};

export type Notification = {
  [K in NotificationTypeEnum]: NotificationByType<K>;
}[NotificationTypeEnum];
