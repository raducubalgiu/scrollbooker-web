import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const useTimeSlots = () => {
	return useMemo(() => {
		const slots = [];
		const startTime = dayjs.utc().startOf("day");
		const endTime = dayjs.utc().endOf("day");

		let currentTime = startTime;

		while (currentTime.isBefore(endTime)) {
			const value = currentTime.format("HH:mm:ss");
			const name = currentTime.format("HH:mm");

			slots.push({
				value,
				name,
			});

			currentTime = currentTime.add(30, "minutes");
		}

		return slots;
	}, []);
};
