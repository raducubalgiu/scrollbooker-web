"use client";

import {
	Box,
	Button,
	CircularProgress,
	Divider,
	Stack,
	Typography,
} from "@mui/material";
import React from "react";
import AppointmentCard from "./AppointmentCard/AppointmentCard";
import { useInfiniteAppointments } from "@/hooks/infiniteQuery/useInfiniteAppointments";
import { isEmpty } from "lodash";
import AppointmentCardSkeleton from "./AppointmentCardSkeleton";

type AppointmentsModuleProps = {
	scrollRootRef?: React.RefObject<HTMLDivElement | null>;
	onNavigateToAppointment: (appointmentId: number) => void;
};

const AppointmentsModule = ({
	scrollRootRef,
	onNavigateToAppointment,
}: AppointmentsModuleProps) => {
	const sentinelRef = React.useRef<HTMLDivElement | null>(null);
	const localListScrollRef = React.useRef<HTMLDivElement | null>(null);

	const { data, hasNextPage, isFetchingNextPage, fetchNextPage, isLoading } =
		useInfiniteAppointments();

	const appointments = React.useMemo(
		() => data?.pages.flatMap(p => p.results) ?? [],
		[data],
	);

	const isInsideOverlay = Boolean(scrollRootRef);
	const activeScrollContainerRef = scrollRootRef || localListScrollRef;

	React.useEffect(() => {
		const root = activeScrollContainerRef.current;
		const sentinel = sentinelRef.current;

		if (!root || !sentinel || !hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{
				root,
				threshold: 0.1,
				rootMargin: "0px 0px 80px 0px",
			},
		);

		observer.observe(sentinel);

		return () => {
			observer.disconnect();
		};
	}, [
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		activeScrollContainerRef,
	]);

	const renderListContent = () => (
		<>
			<Stack flexDirection="row" alignItems="center" gap={1} my={1.5}>
				<Button variant="contained" color="primary" disableElevation>
					Rezervări
				</Button>
				<Button variant="outlined" color="secondary" disableElevation>
					Abonamente
				</Button>
			</Stack>

			{isLoading && <AppointmentCardSkeleton />}

			{!isLoading &&
				appointments.map((appointment, index) => (
					<Box key={`${appointment.id}-${index}`}>
						<AppointmentCard
							appointment={appointment}
							navigateToAppointmentDetails={onNavigateToAppointment}
						/>
						{index < appointments.length - 1 && <Divider sx={{ my: 1.5 }} />}
					</Box>
				))}

			{hasNextPage && (
				<Box
					ref={sentinelRef}
					sx={{
						py: 4,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						minHeight: 60,
					}}
				>
					{isFetchingNextPage && <CircularProgress size={25} />}
				</Box>
			)}

			{!isLoading && !hasNextPage && !isEmpty(appointments) && (
				<Typography
					sx={{
						textAlign: "center",
						py: 5,
						color: "text.disabled",
						fontSize: 14,
					}}
				>
					Ai ajuns la sfârșitul listei
				</Typography>
			)}

			{!isLoading && isEmpty(appointments) && (
				<Typography sx={{ textAlign: "center", py: 3 }} color="text.secondary">
					Nu au fost găsite rezervări
				</Typography>
			)}
		</>
	);

	if (isInsideOverlay) {
		return (
			<>
				<Stack
					flexDirection="row"
					alignItems="center"
					justifyContent="center"
					sx={{
						display: { xs: "block", lg: "none" },
						position: "sticky",
						borderBottom: 1,
						borderColor: "divider",
						top: 0,
						zIndex: 10,
						backgroundColor: "background.paper",
						p: 1,
					}}
				>
					<Typography
						variant="h6"
						noWrap
						component="div"
						fontWeight={700}
						fontSize={{ xs: 17, lg: 25 }}
						sx={{ textAlign: { xs: "center", sm: "left" } }}
					>
						Rezervări și abonamente
					</Typography>
				</Stack>
				<Box
					sx={{
						display: { xs: "none", lg: "block" },
						position: "sticky",
						top: 0,
						zIndex: 10,
						backgroundColor: "background.paper",
						px: { xs: 1.5, sm: 3 },
						pt: { xs: 1, sm: 3 },
					}}
				>
					<Typography
						variant="h6"
						noWrap
						component="div"
						fontWeight={700}
						fontSize={{ xs: 17, lg: 25 }}
						sx={{ mb: { xs: 1.5, md: 2.5 } }}
					>
						Rezervări și abonamente
					</Typography>
					<Divider sx={{ mt: { xs: 2, md: 2.5 }, mb: 1.5 }} />
				</Box>
				{renderListContent()}
			</>
		);
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				height: "100%",
				width: "100%",
			}}
		>
			<Stack
				flexDirection="row"
				alignItems="center"
				justifyContent="center"
				sx={{
					display: { xs: "block", lg: "none" },
					flexShrink: 0,
					borderBottom: 1,
					borderColor: "divider",
					backgroundColor: "background.paper",
					p: 2,
				}}
			>
				<Typography
					variant="h6"
					noWrap
					component="div"
					fontWeight={700}
					fontSize={17}
					sx={{ textAlign: "center" }}
				>
					Rezervări și abonamente
				</Typography>
			</Stack>

			<Box
				sx={{
					display: { xs: "none", lg: "block" },
					flexShrink: 0,
					backgroundColor: "background.paper",
					px: 3,
					pt: 3,
				}}
			>
				<Typography
					variant="h6"
					noWrap
					component="div"
					fontWeight={700}
					fontSize={25}
					sx={{ mb: 2.5 }}
				>
					Rezervări și abonamente
				</Typography>
				<Divider sx={{ mt: 2.5, mb: 1.5 }} />
			</Box>

			<Box
				ref={localListScrollRef}
				sx={{
					flexGrow: 1,
					overflowY: "auto",
					WebkitOverflowScrolling: "touch",
					overscrollBehaviorY: "contain",
				}}
			>
				{renderListContent()}
			</Box>
		</Box>
	);
};

export default AppointmentsModule;
