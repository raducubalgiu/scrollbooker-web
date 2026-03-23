import {
	Button,
	Chip,
	Divider,
	Fade,
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
import SearchIcon from "@mui/icons-material/Search";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MyLocationIcon from "@mui/icons-material/MyLocation";

type ActiveSection = "services" | "location" | "datetime" | null;

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

	const toggle = (section: ActiveSection) => {
		setActiveSection(prev => (prev === section ? null : section));
	};

	// Measure only the sticky container height (pill + bottom bar).
	// The floating panel is position:absolute so it never affects this.
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

	// Close on click outside the sticky header
	React.useEffect(() => {
		const handleMouseDown = (e: MouseEvent) => {
			if (
				containerRef.current?.contains(e.target as Node) ||
				popperRef.current?.contains(e.target as Node)
			)
				return;
			setActiveSection(null);
		};
		document.addEventListener("mousedown", handleMouseDown);
		return () => document.removeEventListener("mousedown", handleMouseDown);
	}, []);

	const getButtonSx = (section: ActiveSection) => ({
		minWidth: 220,
		bgcolor: activeSection === section ? "action.selected" : "transparent",
		textTransform: "none" as const,
		borderRadius: 3,
		py: 1,
		px: 2,
		alignItems: "flex-start",
		transition: "background-color 0.2s ease",
		"&:hover": { bgcolor: "action.hover" },
	});

	return (
		<>
			{/* Backdrop — portalled to <body> so it escapes every parent stacking context */}
			<Portal>
				<Fade in={isExpanded} timeout={200} unmountOnExit>
					<Box
						onClick={() => setActiveSection(null)}
						sx={{
							position: "fixed",
							inset: 0,
							/* drawer = 1200; backdrop covers sidebar + sticky pill */
							zIndex: theme => theme.zIndex.drawer + 1,
							bgcolor: "rgba(0,0,0,0.28)",
						}}
					/>
				</Fade>
			</Portal>

			<Box
				ref={containerRef}
				sx={{
					position: "sticky",
					top: 0,
					mt: `calc(-1 * ${mainPagePadding})`,
					/* drawer+2 = above backdrop (drawer+1) so pill+bar remain visible when panel open */
					zIndex: theme => theme.zIndex.drawer + 2,
					backgroundColor: isExpanded ? "transparent" : "background.paper",
					transition: "background-color 0.2s ease",
					pt: theme => `calc(${mainPagePadding} + ${theme.spacing(1)})`,
					pb: 2.5,
				}}
			>
				{/* pill row — position:relative so floating panel anchors here */}
				<Stack direction="row" justifyContent="center" alignItems="flex-start">
					<Box ref={pillRef} sx={{ position: "relative" }}>
						{/* Search pill */}
						<Paper
							sx={{
								p: 1,
								borderRadius: 16,
								boxShadow: isExpanded
									? "0 20px 60px rgba(2,6,23,0.18), 0 4px 16px rgba(2,6,23,0.06)"
									: "0 10px 30px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.04)",
								border: theme =>
									`1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
								backdropFilter: "saturate(140%) blur(6px)",
								backgroundColor: theme =>
									theme.palette.mode === "dark"
										? "rgba(18,18,18,0.6)"
										: "rgba(255,255,255,0.8)",
								transition: "box-shadow 0.3s ease",
							}}
						>
							<Stack direction="row" spacing={0.5} alignItems="center">
								<Button
									sx={getButtonSx("services")}
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

								<Divider orientation="vertical" sx={{ height: 28, mx: 0.5 }} />

								<Button
									sx={getButtonSx("location")}
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

								<Divider orientation="vertical" sx={{ height: 28, mx: 0.5 }} />

								<Button
									sx={getButtonSx("datetime")}
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

						{/* Floating panel — Popper portal, outside any stacking context */}
						<Popper
							open={isExpanded}
							anchorEl={pillRef.current}
							placement="bottom"
							transition
							modifiers={[{ name: "offset", options: { offset: [0, 12] } }]}
							sx={{ zIndex: theme => theme.zIndex.drawer + 3 }}
						>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={220}>
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
													{[
														"Azi",
														"Mâine",
														"Weekend",
														"Săptămâna aceasta",
														"Oricând",
													].map(opt => (
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
								</Fade>
							)}
						</Popper>
					</Box>
				</Stack>

				{/* Bottom bar — fades out but keeps its height so header size stays stable */}
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
