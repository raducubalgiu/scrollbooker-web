type CustomerType = {
	id: number;
	username: string;
	fullname: string | null;
	avatar: string | null;
} | null;

export type Slot = {
	start_date_locale: string;
	end_date_locale: string;
	start_date_utc: string;
	end_date_utc: string;
	is_booked: boolean;
	channel: "closer_app" | "own_client";
	customer: CustomerType;
};

export type DayInfo = {
	date: string;
	is_closed: boolean;
	slots: Slot[];
};

export type CalendarType = {
	min_slot_time: string;
	max_slot_time: string;
	data: DayInfo[];
};
