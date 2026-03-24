import React, { memo, useCallback, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import localeData from "dayjs/plugin/localeData";
import { Box, Typography } from "@mui/material";
import CalendarHeader, { CalendarActionTypeEnum } from "./CalendarHeader";

dayjs.extend(localeData);

type Props = {
	value: Dayjs | null;
	onChange: (date: Dayjs) => void;
};

const CustomCalendar: React.FC<Props> = ({ value, onChange }) => {
	const today = dayjs().startOf("day");
	const maxDate = today.add(6, "month").endOf("day");
	const localeConfig = dayjs.localeData();
	const firstDayOfWeek = localeConfig.firstDayOfWeek();
	const weekDays = useMemo(() => {
		const localizedWeekDays = localeConfig.weekdaysMin();
		return [
			...localizedWeekDays.slice(firstDayOfWeek),
			...localizedWeekDays.slice(0, firstDayOfWeek),
		];
	}, [localeConfig, firstDayOfWeek]);

	const [viewMonth, setViewMonth] = useState<Dayjs>(today.startOf("month"));

	const canGoPrev = viewMonth.isAfter(today.startOf("month"));
	const canGoNext = viewMonth.isBefore(maxDate.startOf("month"));

	const startOfMonth = viewMonth.startOf("month");
	const endOfMonth = viewMonth.endOf("month");

	const startOffset = (startOfMonth.day() - firstDayOfWeek + 7) % 7;

	const days: (Dayjs | null)[] = [];
	for (let i = 0; i < startOffset; i++) days.push(null);
	for (let d = 0; d < endOfMonth.date(); d++) {
		days.push(startOfMonth.add(d, "day"));
	}
	while (days.length % 7 !== 0) days.push(null);

	const handleNavigate = useCallback(
		(action: CalendarActionTypeEnum) => {
			if (action === CalendarActionTypeEnum.GO_PREV && canGoPrev)
				setViewMonth(m => m.subtract(1, "month"));
			else if (action === CalendarActionTypeEnum.GO_NEXT && canGoNext)
				setViewMonth(m => m.add(1, "month"));
		},
		[canGoPrev, canGoNext],
	);

	return (
		<Box>
			<CalendarHeader
				canGoPrev={canGoPrev}
				canGoNext={canGoNext}
				title={viewMonth.format("MMMM YYYY")}
				onSetTitle={handleNavigate}
			/>

			<Box display="grid" gridTemplateColumns="repeat(7, 1fr)" mb={0.5}>
				{weekDays.map(d => (
					<Typography
						key={d}
						variant="caption"
						align="center"
						color="text.secondary"
						fontWeight={600}
						py={0.75}
					>
						{d}
					</Typography>
				))}
			</Box>

			<Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={0.5}>
				{days.map((day, i) => {
					if (!day) return <Box key={i} />;

					const isPast = day.isBefore(today);
					const isAfterMax = day.isAfter(maxDate);
					const isDisabled = isPast || isAfterMax;
					const isSelected = value ? day.isSame(value, "day") : false;
					const isToday = day.isSame(today, "day");

					return (
						<Box
							key={i}
							onClick={() => !isDisabled && onChange(day)}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								aspectRatio: "1",
								borderRadius: "50%",
								cursor: isDisabled ? "default" : "pointer",
								bgcolor: isSelected ? "primary.main" : "transparent",
								color: isDisabled
									? "text.disabled"
									: isSelected
										? "#fff"
										: isToday
											? "primary.main"
											: "text.primary",
								fontWeight: isToday || isSelected ? 700 : 400,
								fontSize: "0.875rem",
								border:
									isToday && !isSelected
										? "1.5px solid"
										: "1.5px solid transparent",
								borderColor:
									isToday && !isSelected ? "primary.main" : "transparent",
								transition: "background-color 0.15s",
								"&:hover": !isDisabled
									? {
											bgcolor: isSelected ? "primary.dark" : "action.hover",
										}
									: {},
							}}
						>
							{day.date()}
						</Box>
					);
				})}
			</Box>
		</Box>
	);
};

export default memo(CustomCalendar);
