import { AppointmentChannelEnum } from "@/ts/enums/AppointmentChannelEnum";
import { CurrencyType } from "../nomenclatures/CurrencyType";

export type AppointmentCustomerType = {
	id: number | undefined;
	fullname: string;
	username: undefined;
	avatar: string | undefined;
} | null;

export type CalendarEventsProductType = {
	product_name: string;
	product_full_price: number;
	product_price_with_discount: number;
	product_discount: number;
};

export type CalendarEventsInfoType = {
	channel: AppointmentChannelEnum;
	service_name: string | undefined;
	product: CalendarEventsProductType;
	currency: CurrencyType | null;
	customer: AppointmentCustomerType;
	message: string | undefined;
};

export type CalendarEventsSlotType = {
	id: number | null;
	start_date_locale: string;
	end_date_locale: string;
	start_date_utc: string;
	end_date_utc: string;
	is_booked: boolean;
	is_closed: boolean;
	is_blocked: boolean;
	info: CalendarEventsInfoType | null;
};

export type CalendarEventsDayType = {
	day: string;
	is_closed: boolean;
	is_blocked: boolean;
	slots: CalendarEventsSlotType[];
};

export type CalendarEventsType = {
	min_slot_time: string;
	max_slot_time: string;
	days: CalendarEventsDayType[];
};
