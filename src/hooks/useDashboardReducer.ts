import { useReducer } from "react";
import dayjs from "dayjs";

enum PeriodEnum {
	DAILY = "daily",
	WEEKLY = "weekly",
	MONTHLY = "monthly",
}

type StateType = {
	type: PeriodEnum;
	startDate: string;
	endDate: string;
};

const now = dayjs();
const startPeriod = now.format("YYYY-MM-DD");
const yesterday = now.subtract(1, "days").format("YYYY-MM-DD");
const lastWeek = now.subtract(1, "weeks").format("YYYY-MM-DD");
const lastMonth = now.subtract(1, "months").format("YYYY-MM-DD");

const reducer = (state: StateType, action: { type: PeriodEnum }) => {
	switch (action.type) {
		case PeriodEnum.DAILY:
			return {
				...state,
				type: PeriodEnum.DAILY,
				startDate: yesterday,
				endDate: startPeriod,
			};
		case PeriodEnum.WEEKLY:
			return {
				...state,
				type: PeriodEnum.WEEKLY,
				startDate: lastWeek,
				endDate: startPeriod,
			};
		case PeriodEnum.MONTHLY:
			return {
				...state,
				type: PeriodEnum.MONTHLY,
				startDate: lastMonth,
				endDate: startPeriod,
			};
		default:
			return state;
	}
};

export const useDashboardReducer = () => {
	const [filters, dispatch] = useReducer(reducer, {
		type: PeriodEnum.DAILY,
		startDate: dayjs().subtract(1, "days").format("YYYY-MM-DD"),
		endDate: dayjs().format("YYYY-MM-DD"),
	});

	const handleDaily = () => dispatch({ type: PeriodEnum.DAILY });

	const handleWeekly = () => dispatch({ type: PeriodEnum.WEEKLY });

	const handleMonthly = () => dispatch({ type: PeriodEnum.MONTHLY });

	return {
		filters,
		handleDaily,
		handleWeekly,
		handleMonthly,
		PeriodEnum,
	};
};
