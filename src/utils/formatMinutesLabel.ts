export const formatMinutesLabel = (minutes: number): string => {
	if (minutes < 60) {
		if (minutes === 1) return "1 minut";
		if (minutes % 10 === 0) return `${minutes} de minute`;

		return `${minutes} minute`;
	}

	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;

	const hourLabel = hours === 1 ? "1 oră" : `${hours} ore`;
	const minuteLabel =
		rest === 0
			? ""
			: rest % 10 === 0
				? ` și ${rest} minute`
				: ` și ${rest} minute`;

	return hourLabel + minuteLabel;
};
