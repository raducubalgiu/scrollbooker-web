import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { Dayjs } from "dayjs";
import CustomCalendar from "../../../../cutomized/CustomCalendar/CustomCalendar";

const SearchDateTimeSection = () => {
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

	return (
		<Box>
			<Typography variant="subtitle1" fontWeight={700} mb={2}>
				Când?
			</Typography>
			<CustomCalendar value={selectedDate} onChange={setSelectedDate} />
		</Box>
	);
};

export default SearchDateTimeSection;
