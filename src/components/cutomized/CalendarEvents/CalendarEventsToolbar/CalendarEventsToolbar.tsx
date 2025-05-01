import React, { useCallback, useMemo } from "react";
import {
	Stack,
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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useCalendarEventsContext } from "@/providers/CalendarEventsProvider";
import dayjs from "dayjs";
import { DensityEnum } from "@/providers/CalendarEventsProvider";

type CalendarEventsHeaderProps = {
	density: DensityEnum;
	slotDuration: number | undefined;
	durationOptions: { value: number; label: string }[];
	onHandleSlotDuration: (e: SelectChangeEvent<number>) => void;
	onHandleDensity: () => void;
	isLoading: boolean;
};

export default function CalendarEventsToolbar({
	onHandleDensity,
	onHandleSlotDuration,
	slotDuration,
	durationOptions,
	density,
	isLoading,
}: CalendarEventsHeaderProps) {
	const {
		startDate,
		endDate,
		fullScreen,
		handleFullScreen,
		handleNextWeek,
		handlePreviousWeek,
		handleToday,
	} = useCalendarEventsContext();
	const period = `${dayjs(startDate).format("D MMMM")} - ${dayjs(endDate).format("D MMM YYYY")}`;

	const displayTodayBgColor = useMemo(() => {
		return () => {
			const isTodayAfterStart = dayjs().isAfter(dayjs(startDate));
			const isTodayBeforeEnd = dayjs().isBefore(dayjs(endDate));

			if (isTodayAfterStart && isTodayBeforeEnd) {
				return "inherit";
			} else {
				return "primary";
			}
		};
	}, [startDate, endDate]);

	const getDensityIcon = useCallback(() => {
		switch (density) {
			case DensityEnum.COMPACT:
				return <DensitySmallOutlinedIcon />;
			case DensityEnum.SPACIOUS:
				return <DensityLargeOutlinedIcon />;
			default:
				return <DensityMediumOutlinedIcon />;
		}
	}, [density]);

	const styles = {
		container: {
			position: "sticky",
			top: 0,
			zIndex: 3,
			height: 100,
			bgcolor: "surface.200",
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
			<Stack
				flexDirection="row"
				justifyContent="flex-start"
				alignItems="center"
				flexGrow={1}
			>
				<FormControl fullWidth sx={{ maxWidth: 200 }} disabled={isLoading}>
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
				<Tooltip
					title="Lista 'Durată Slot' este afișată în funcție de durata produselor tale"
					sx={{ mx: 2.5 }}
				>
					<InfoOutlinedIcon color="inherit" />
				</Tooltip>
				<Button variant="contained" disabled={isLoading}>
					Rezervă mai multe sloturi
				</Button>
			</Stack>
			<Stack flexDirection="row" alignItems="center">
				<Typography fontWeight={600} fontSize={18} mr={2.5}>
					{period}
				</Typography>
				<Tooltip title="Săptămâna anterioară">
					<IconButton onClick={handlePreviousWeek} disabled={isLoading}>
						<NavigateBeforeIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Următoarea săptămână">
					<IconButton onClick={handleNextWeek} disabled={isLoading}>
						<NavigateNextIcon />
					</IconButton>
				</Tooltip>
				<Button
					sx={{ mx: 2.5 }}
					variant="contained"
					onClick={handleToday}
					color={displayTodayBgColor()}
					disabled={isLoading}
				>
					Astăzi
				</Button>
				<Tooltip title="Schimbă densitatea">
					<IconButton onClick={onHandleDensity} disabled={isLoading}>
						{getDensityIcon()}
					</IconButton>
				</Tooltip>
				<Tooltip
					title={
						fullScreen ? "Ieși din ecran complet" : "Schimbă pe ecran complet"
					}
				>
					<IconButton onClick={handleFullScreen} disabled={isLoading}>
						{fullScreen ? <FullscreenExitIcon /> : <FullscreenOutlinedIcon />}
					</IconButton>
				</Tooltip>
				<Tooltip title="Setări">
					<IconButton onClick={() => {}} disabled={isLoading}>
						<SettingsOutlinedIcon />
					</IconButton>
				</Tooltip>
			</Stack>
		</Stack>
	);
}
