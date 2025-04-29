import React from "react";
import {
	Stack,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
	SelectChangeEvent,
	Button,
	Typography,
} from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

type CalendarEventsHeaderProps = {
	slotDuration: number;
	durationOptions: { value: number; label: string }[];
	onHandleSlotDuration: (e: SelectChangeEvent<number>) => void;
	onHandleDensity: () => void;
	onHandlePreviousWeek: () => void;
	onHandleNextWeek: () => void;
	onHandleToday: () => void;
	period: string;
};

export default function CalendarEventsToolbar({
	onHandleDensity,
	onHandlePreviousWeek,
	onHandleNextWeek,
	onHandleSlotDuration,
	slotDuration,
	durationOptions,
	onHandleToday,
	period,
}: CalendarEventsHeaderProps) {
	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			p={2.5}
			sx={{
				position: "sticky",
				top: 0,
				zIndex: 3,
				height: 100,
				bgcolor: "#212121",
			}}
		>
			<Stack flexDirection="row" justifyContent="center" alignItems="center">
				<FormControl fullWidth sx={{ mr: 2.5, minWidth: 200 }}>
					<InputLabel id="slot-label">Durată</InputLabel>
					<Select
						labelId="slot-label"
						id="slot-select"
						value={slotDuration}
						label="Durata"
						onChange={onHandleSlotDuration}
						size="small"
					>
						{durationOptions.map(dur => (
							<MenuItem key={dur.value} value={dur.value}>
								{dur.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button variant="contained" fullWidth>
					Adaugă programare
				</Button>
			</Stack>
			<Box></Box>
			<Stack flexDirection="row" alignItems="center">
				<Typography fontWeight={600} fontSize={18} mr={2.5}>
					{period}
				</Typography>
				<Tooltip title="Săptămâna anterioară">
					<IconButton onClick={onHandlePreviousWeek}>
						<NavigateBeforeIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Următoarea săptămână">
					<IconButton onClick={onHandleNextWeek}>
						<NavigateNextIcon />
					</IconButton>
				</Tooltip>
				<Button
					sx={{ mx: 2.5 }}
					variant="contained"
					onClick={onHandleToday}
					color="inherit"
				>
					Astazi
				</Button>
				<Tooltip title="Măreste densitatea">
					<IconButton onClick={onHandleDensity}>
						<DensityMediumIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Măreste densitatea">
					<IconButton onClick={onHandleDensity}>
						<FullscreenOutlinedIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Setări">
					<IconButton onClick={() => {}}>
						<SettingsOutlinedIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Stack>
	);
}
