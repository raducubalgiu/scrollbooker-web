import { UserInfoType } from "./UserInfoType";

export type NotificationType = {
	type: string;
	sender_id: number;
	receiver_id: number;
	data: unknown;
	message: null;
	is_read: false;
	is_deleted: false;
	sender: UserInfoType;
};
