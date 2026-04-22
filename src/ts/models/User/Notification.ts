import { NotificationTypeEnum } from "@/ts/enums/NotificationTypeEnum";
import { UserMini } from "./UserMini";

export interface Notification {
  id: number;
  type: NotificationTypeEnum;
  sender_id: number;
  receiver_id: number;
  data: unknown;
  message: null;
  is_read: false;
  is_deleted: false;
  sender: UserMini;
}
