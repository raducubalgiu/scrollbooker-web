import { useState, useCallback, useEffect } from "react";
import { SlotType } from "./calendar-utils/calendar-types";
import dayjs from "dayjs";
import { filter } from "lodash";

export enum DensityEnum {
	COMPACT = 1,
	COMFORTABLE = 1.2,
	SPACIOUS = 1.5,
}

export enum BlockedSlotActionEnum {
	CREATE = "create",
	DELETE = "delete",
}

const densityValues = Object.values(DensityEnum).filter(
	v => typeof v === "number"
) as number[];

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
	const [blockedSlots, setBlockedSlots] = useState<SlotType[]>([]);

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
		const currentIndex = densityValues.indexOf(density);
		const nextIndex = (currentIndex + 1) % densityValues.length;
		setDensity(densityValues[nextIndex]);
	};

	const handleBlockSlots = (
		slots: SlotType[],
		action: BlockedSlotActionEnum
	) => {
		const filteredSlots = filter(slots, { is_booked: false });

		if (action === BlockedSlotActionEnum.CREATE) {
			setBlockedSlots([...blockedSlots, ...filteredSlots]);
		} else {
			filteredSlots.map(slot => {
				setBlockedSlots(blockedSlots =>
					blockedSlots.filter(
						blockedSlot =>
							blockedSlot.start_date_locale !== slot.start_date_locale
					)
				);
			});
		}
	};

	const clearBlockedSlots = () => setBlockedSlots([]);

	const totalMinutes = dayjs(`1900-01-01T${maxTime}`).diff(
		dayjs(`1900-01-01T${minTime}`),
		"minute"
	);

	return {
		blockedSlots,
		slotDuration,
		density,
		timeSlots,
		totalMinutes,
		handleDensity,
		handleBlockSlots,
		clearBlockedSlots,
	};
}
