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
import DensityLargeOutlinedIcon from "@mui/icons-material/DensityLargeOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import DensitySmallOutlinedIcon from "@mui/icons-material/DensitySmallOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { DensityEnum } from "../useCalendarEvents";

type CalendarEventsHeaderProps = {
	density: DensityEnum;
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
	density,
}: CalendarEventsHeaderProps) {
	const getDensityIcon = () => {
		switch (density) {
			case DensityEnum.COMPACT:
				return <DensitySmallOutlinedIcon />;
			case DensityEnum.SPACIOUS:
				return <DensityLargeOutlinedIcon />;
			default:
				return <DensityMediumOutlinedIcon />;
		}
	};

	const styles = {
		container: {
			position: "sticky",
			top: 0,
			zIndex: 3,
			height: 100,
			bgcolor: "#212121",
		},
	};

	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			p={2.5}
			sx={styles.container}
		>
			<Stack flexDirection="row" justifyContent="center" alignItems="center">
				<FormControl fullWidth sx={{ mr: 2.5, minWidth: 200 }}>
					<InputLabel id="slot-label">Durată Slot</InputLabel>
					<Select
						labelId="slot-label"
						id="slot-select"
						value={slotDuration}
						label="Durată"
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
					Astăzi
				</Button>
				<Tooltip title="Schimbă densitatea">
					<IconButton onClick={onHandleDensity}>{getDensityIcon()}</IconButton>
				</Tooltip>
				<Tooltip title="Schimbă pe ecran complet">
					<IconButton onClick={() => {}}>
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
