import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";

enum DensityEnum {
	COMPACT = 0.8,
	COMFORTABLE = 1,
	SPACIOUS = 1.2,
}

type useCalendarEventsProps = {
	minTime: string | undefined;
	maxTime: string | undefined;
	slotDuration: number;
};

export default function useCalendarEvents({
	minTime,
	maxTime,
	slotDuration,
}: useCalendarEventsProps) {
	const [density, setDensity] = useState(DensityEnum.COMFORTABLE);
	const [timeSlots, setTimeSlots] = useState<string[]>([]);

	const generateSlots = useCallback(() => {
		const slots = [];
		let current = dayjs(`2025-04-21T${minTime}`);
		const end = dayjs(`2025-04-21T${maxTime}`);

		while (current.isBefore(end)) {
			slots.push(current.format("HH:mm"));
			current = current.add(slotDuration, "minute");
		}

		setTimeSlots(slots);
	}, [maxTime, minTime, slotDuration]);

	useEffect(() => {
		generateSlots();
	}, [generateSlots]);

	const handleDensity = () => {
		setDensity(DensityEnum.SPACIOUS);
	};

	const totalMinutes = dayjs(`1900-01-01T${maxTime}`).diff(
		dayjs(`1900-01-01T${minTime}`),
		"minute"
	);

	return {
		slotDuration,
		density,
		timeSlots,
		totalMinutes,
		handleDensity,
	};
}
