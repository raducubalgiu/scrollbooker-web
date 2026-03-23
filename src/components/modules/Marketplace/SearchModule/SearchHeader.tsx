import {
	Button,
	Chip,
	Divider,
	Grow,
	Paper,
	Popper,
	Portal,
	Stack,
	Typography,
	IconButton,
	Tooltip,
	Box,
	TextField,
	InputAdornment,
} from "@mui/material";
import React from "react";
import { Theme } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MyLocationIcon from "@mui/icons-material/MyLocation";

type ActiveSection = "services" | "location" | "datetime" | null;
type SearchSection = Exclude<ActiveSection, null>;

type SearchHeaderProps = {
	isMapVisible: boolean;
	onOpenFilters: () => void;
	onToggleMap: () => void;
	onHeightChange?: (height: number) => void;
	mainPagePadding?: number | string;
};

const SERVICE_CATEGORIES = [
	"Beauty",
	"Medical",
	"Auto",
	"Fitness",
	"Wellness",
	"Educație",
	"Pet Care",
];

const DATETIME_OPTIONS = [
	"Azi",
	"Mâine",
	"Weekend",
	"Săptămâna aceasta",
	"Oricând",
];

const POPPER_MODIFIERS = [{ name: "offset", options: { offset: [0, 12] } }];

const SearchHeader = ({
	isMapVisible,
	onOpenFilters,
	onToggleMap,
	onHeightChange,
	mainPagePadding = 0,
}: SearchHeaderProps) => {
	const containerRef = React.useRef<HTMLDivElement | null>(null);
	const pillRef = React.useRef<HTMLDivElement | null>(null);
	const popperRef = React.useRef<HTMLDivElement | null>(null);
	const [activeSection, setActiveSection] = React.useState<ActiveSection>(null);
	const isExpanded = activeSection !== null;
	const isExpandedRef = React.useRef(isExpanded);
	isExpandedRef.current = isExpanded;
	const searchButtonWidth = React.useMemo(
		() => (isExpanded ? 278 : 220),
		[isExpanded],
	);

	const closeSection = React.useCallback(() => setActiveSection(null), []);

	const toggle = React.useCallback((section: ActiveSection) => {
		setActiveSection(prev => (prev === section ? null : section));
	}, []);

	React.useEffect(() => {
		const element = containerRef.current;
		if (!element || !onHeightChange) return;

		const notifyHeight = () =>
			onHeightChange(element.getBoundingClientRect().height);

		notifyHeight();

		const ro = new ResizeObserver(notifyHeight);
		ro.observe(element);
		return () => ro.disconnect();
	}, [onHeightChange]);

	React.useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			if (!isExpandedRef.current) return;

			const targetNode = e.target as Node;
			if (popperRef.current?.contains(targetNode)) return;
			if (pillRef.current?.contains(targetNode)) return;

			setActiveSection(null);
		};
		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, []);

	const buttonBaseSx = React.useMemo(
		() => ({
			width: searchButtonWidth,
			flex: "0 0 auto",
			minWidth: 0,
			textTransform: "none" as const,
			borderRadius: 999,
			py: isExpanded ? 1.2 : 1,
			px: 2,
			justifyContent: "flex-start",
			alignItems: "flex-start",
			textAlign: "left",
			transition:
				"width 0.34s cubic-bezier(0.16, 1, 0.3, 1), padding 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
			overflow: "hidden",
		}),
		[isExpanded, searchButtonWidth],
	);

	const buttonSxBySection = React.useMemo<Record<SearchSection, object>>(
		() => ({
			services: {
				...buttonBaseSx,
				bgcolor:
					activeSection === "services" ? "background.paper" : "transparent",
				boxShadow:
					activeSection === "services" ? "0 2px 12px rgba(0,0,0,0.12)" : "none",
				"&:hover": {
					bgcolor:
						activeSection === "services" ? "background.paper" : "action.hover",
				},
			},
			location: {
				...buttonBaseSx,
				bgcolor:
					activeSection === "location" ? "background.paper" : "transparent",
				boxShadow:
					activeSection === "location" ? "0 2px 12px rgba(0,0,0,0.12)" : "none",
				"&:hover": {
					bgcolor:
						activeSection === "location" ? "background.paper" : "action.hover",
				},
			},
			datetime: {
				...buttonBaseSx,
				bgcolor:
					activeSection === "datetime" ? "background.paper" : "transparent",
				boxShadow:
					activeSection === "datetime" ? "0 2px 12px rgba(0,0,0,0.12)" : "none",
				"&:hover": {
					bgcolor:
						activeSection === "datetime" ? "background.paper" : "action.hover",
				},
			},
		}),
		[activeSection, buttonBaseSx],
	);

	const searchPaperSx = React.useMemo(
		() => ({
			"@keyframes searchBarExpandSnap": {
				"0%": { transform: "scale(1, 1)" },
				"68%": { transform: "scale(1, 1.02)" },
				"100%": { transform: "scale(1, 1.015)" },
			},
			position: "relative",
			isolation: "isolate",
			display: "inline-flex",
			maxWidth: "calc(100vw - 64px)",
			p: 1,
			borderRadius: 16,
			backgroundColor: "transparent",
			boxShadow: "none",
			"&::before": {
				content: '""',
				position: "absolute",
				inset: 0,
				zIndex: -1,
				borderRadius: "inherit",
				boxShadow: isExpanded
					? "0 20px 60px rgba(2,6,23,0.18), 0 4px 16px rgba(2,6,23,0.06)"
					: "0 10px 30px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.04)",
				border: (theme: Theme) =>
					`1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
				backdropFilter: "saturate(140%) blur(6px)",
				backgroundColor: (theme: Theme) =>
					theme.palette.mode === "dark"
						? "rgba(18,18,18,0.6)"
						: "rgba(255,255,255,0.8)",
				transform: isExpanded ? "scale(1, 1.015)" : "scale(1, 1)",
				transformOrigin: "center center",
				animation: isExpanded
					? "searchBarExpandSnap 360ms cubic-bezier(0.16, 1, 0.3, 1) both"
					: "none",
				transition: "transform 0.22s ease-out, box-shadow 0.3s ease",
			},
		}),
		[isExpanded],
	);

	return (
		<>
			<Portal>
				{isExpanded && (
					<Box
						onClick={closeSection}
						sx={{
							position: "fixed",
							inset: 0,
							zIndex: theme => theme.zIndex.drawer + 1,
							bgcolor: "rgba(0,0,0,0.28)",
						}}
					/>
				)}
			</Portal>

			<Box
				ref={containerRef}
				sx={{
					position: "sticky",
					top: 0,
					mt: `calc(-1 * ${mainPagePadding})`,
					zIndex: theme => theme.zIndex.drawer + 2,
					backgroundColor: isExpanded ? "transparent" : "background.paper",
					pt: theme => `calc(${mainPagePadding} + ${theme.spacing(1)})`,
					pb: 2.5,
				}}
			>
				<Stack direction="row" justifyContent="center" alignItems="flex-start">
					<Box ref={pillRef} sx={{ position: "relative" }}>
						<Paper sx={searchPaperSx}>
							<Stack
								direction="row"
								spacing={0.5}
								alignItems="center"
								sx={{ width: "fit-content" }}
							>
								<Button
									sx={buttonSxBySection.services}
									color="secondary"
									onClick={() => toggle("services")}
								>
									<Stack alignItems="flex-start">
										<Typography
											variant="caption"
											color="text.secondary"
											fontWeight={700}
											lineHeight={1.4}
										>
											Serviciu
										</Typography>
										<Typography
											variant="body1"
											color="text.primary"
											fontWeight={500}
										>
											Toate serviciile
										</Typography>
									</Stack>
								</Button>

								{!isExpanded && (
									<Divider
										orientation="vertical"
										sx={{ height: 28, mx: 0.5 }}
									/>
								)}

								<Button
									sx={buttonSxBySection.location}
									color="secondary"
									onClick={() => toggle("location")}
								>
									<Stack alignItems="flex-start">
										<Typography
											variant="caption"
											color="text.secondary"
											fontWeight={700}
											lineHeight={1.4}
										>
											Locație
										</Typography>
										<Typography
											variant="body1"
											color="text.primary"
											fontWeight={500}
										>
											În apropiere
										</Typography>
									</Stack>
								</Button>

								{!isExpanded && (
									<Divider
										orientation="vertical"
										sx={{ height: 28, mx: 0.5 }}
									/>
								)}

								<Button
									sx={buttonSxBySection.datetime}
									color="secondary"
									onClick={() => toggle("datetime")}
								>
									<Stack alignItems="flex-start">
										<Typography
											variant="caption"
											color="text.secondary"
											fontWeight={700}
											lineHeight={1.4}
										>
											Data & Ora
										</Typography>
										<Typography
											variant="body1"
											color="text.primary"
											fontWeight={500}
										>
											Oricând
										</Typography>
									</Stack>
								</Button>

								<Tooltip title="Caută" arrow>
									<IconButton
										onClick={() => {}}
										size="large"
										aria-label="Caută"
										sx={{
											ml: 0.5,
											bgcolor: theme => theme.palette.primary.main,
											color: theme => theme.palette.common.white,
											p: 1,
											borderRadius: "50%",
											"&:hover": {
												bgcolor: theme => theme.palette.primary.dark,
											},
										}}
									>
										<SearchIcon fontSize="large" />
									</IconButton>
								</Tooltip>
							</Stack>
						</Paper>

						<Popper
							open={isExpanded}
							anchorEl={pillRef.current}
							placement="bottom"
							transition
							modifiers={POPPER_MODIFIERS}
							sx={{ zIndex: theme => theme.zIndex.drawer + 3 }}
						>
							{({ TransitionProps }) => (
								<Grow
									{...TransitionProps}
									timeout={260}
									style={{ transformOrigin: "top center" }}
								>
									<Paper
										ref={popperRef}
										elevation={8}
										sx={{
											borderRadius: 5,
											p: 3,
											minHeight: 160,
											minWidth: 600,
										}}
									>
										{activeSection === "services" && (
											<Box>
												<Typography variant="subtitle1" fontWeight={700} mb={2}>
													Ce serviciu cauți?
												</Typography>
												<Stack direction="row" flexWrap="wrap" gap={1}>
													{SERVICE_CATEGORIES.map(cat => (
														<Chip
															key={cat}
															label={cat}
															clickable
															variant="outlined"
															sx={{ borderRadius: 3, fontWeight: 500 }}
														/>
													))}
												</Stack>
											</Box>
										)}

										{activeSection === "location" && (
											<Box>
												<Typography variant="subtitle1" fontWeight={700} mb={2}>
													Unde?
												</Typography>
												<TextField
													fullWidth
													placeholder="Caută un oraș, cartier sau adresă..."
													size="small"
													slotProps={{
														input: {
															startAdornment: (
																<InputAdornment position="start">
																	<LocationOnOutlinedIcon fontSize="small" />
																</InputAdornment>
															),
														},
													}}
													sx={{ mb: 2 }}
												/>
												<Button
													size="small"
													startIcon={<MyLocationIcon fontSize="small" />}
													color="secondary"
													sx={{ textTransform: "none" }}
												>
													Folosește locația mea curentă
												</Button>
											</Box>
										)}

										{activeSection === "datetime" && (
											<Box>
												<Typography variant="subtitle1" fontWeight={700} mb={2}>
													Când?
												</Typography>
												<Stack direction="row" gap={1} flexWrap="wrap">
													{DATETIME_OPTIONS.map(opt => (
														<Chip
															key={opt}
															label={opt}
															clickable
															variant="outlined"
															sx={{ borderRadius: 3, fontWeight: 500 }}
														/>
													))}
												</Stack>
											</Box>
										)}
									</Paper>
								</Grow>
							)}
						</Popper>
					</Box>
				</Stack>

				<Box
					sx={{
						transition: "opacity 0.2s ease",
						opacity: isExpanded ? 0 : 1,
						pointerEvents: isExpanded ? "none" : "auto",
					}}
				>
					<Stack
						flexDirection="row"
						alignItems="center"
						justifyContent="space-between"
						sx={{ mt: 2.5 }}
					>
						<Stack flexDirection="row" alignItems="center" gap={1}>
							<Button
								variant="contained"
								size="large"
								disableElevation
								sx={{ py: 1.5, px: 3 }}
							>
								Toate
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								size="large"
								disableElevation
								sx={{ py: 1.5, px: 3 }}
							>
								Beauty
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								size="large"
								disableElevation
								sx={{ py: 1.5, px: 3 }}
							>
								Medical
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								size="large"
								disableElevation
								sx={{ py: 1.5, px: 3 }}
							>
								Auto
							</Button>
						</Stack>
						<Stack
							flexDirection="row"
							alignItems="center"
							justifyContent="flex-end"
							gap={1}
						>
							<Button
								variant="outlined"
								color="secondary"
								size="large"
								disableElevation
								sx={{ py: 1.5, px: 3 }}
								startIcon={<TuneOutlinedIcon />}
								onClick={onOpenFilters}
							>
								Filtre
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								size="large"
								disableElevation
								sx={{ py: 1.5, px: 3 }}
								startIcon={<MapOutlinedIcon />}
								onClick={onToggleMap}
							>
								{isMapVisible ? "Ascunde harta" : "Arată harta"}
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</>
	);
};

export default SearchHeader;
