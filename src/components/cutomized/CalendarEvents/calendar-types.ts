export type AppointmentCustomerType = {
	id: number | undefined;
	fullname: string;
	username: undefined;
	avatar: string | undefined;
} | null;

export type AppointmentCurrencyType = {
	id: number;
	name: string;
};

export type AppointmentProductType = {
	product_name: string;
	product_full_price: number;
	product_price_with_discount: number;
	product_discount: number;
};

export type AppointmentInfoType = {
	channel: "scroll_booker" | "own_client";
	service_name: string | undefined;
	product: AppointmentProductType;
	currency: AppointmentCurrencyType | null;
	customer: AppointmentCustomerType;
	message: string | undefined;
};

export type SlotType = {
	id: number | null;
	start_date_locale: string;
	end_date_locale: string;
	start_date_utc: string;
	end_date_utc: string;
	is_booked: boolean;
	is_closed: boolean;
	is_blocked: boolean;
	info: AppointmentInfoType | null;
};

export type DayInfo = {
	day: string;
	is_closed: boolean;
	is_blocked: boolean;
	slots: SlotType[];
};

export type CalendarType = {
	min_slot_time: string;
	max_slot_time: string;
	days: DayInfo[];
};
