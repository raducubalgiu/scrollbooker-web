import {
	Button,
	Divider,
	Paper,
	Stack,
	Typography,
	IconButton,
	Tooltip,
	Box,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";

type SearchHeaderProps = {
	isMapVisible: boolean;
	onToggleMap: () => void;
	onHeightChange?: (height: number) => void;
};

const SearchHeader = ({
	isMapVisible,
	onToggleMap,
	onHeightChange,
}: SearchHeaderProps) => {
	const containerRef = React.useRef<HTMLDivElement | null>(null);

	React.useEffect(() => {
		const element = containerRef.current;
		if (!element || !onHeightChange) return;

		const notifyHeight = () => {
			onHeightChange(element.getBoundingClientRect().height);
		};

		notifyHeight();

		const resizeObserver = new ResizeObserver(() => {
			notifyHeight();
		});

		resizeObserver.observe(element);

		return () => {
			resizeObserver.disconnect();
		};
	}, [onHeightChange]);

	return (
		<Box
			ref={containerRef}
			sx={{
				position: "sticky",
				top: 0,
				zIndex: theme => theme.zIndex.appBar - 1,
				backgroundColor: "background.paper",
				pt: 1,
				pb: 2.5,
			}}
		>
			<Stack
				direction="row"
				justifyContent="center"
				alignItems="center"
				gap={2}
			>
				<Paper
					sx={{
						p: 1,
						borderRadius: 16,
						boxShadow:
							"0 10px 30px rgba(2,6,23,0.08), 0 2px 6px rgba(2,6,23,0.04)",
						border: theme =>
							`1px solid ${theme.palette.mode === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)"}`,
						backdropFilter: "saturate(140%) blur(6px)",
						backgroundColor: theme =>
							theme.palette.mode === "dark"
								? "rgba(18,18,18,0.6)"
								: "rgba(255,255,255,0.8)",
					}}
				>
					<Stack direction={"row"} spacing={1} alignItems="center">
						<Button
							sx={{
								minWidth: 260,
								bgcolor: "transparent",
								textTransform: "none",
								borderRadius: 2,
							}}
							color="secondary"
						>
							<Typography sx={{ color: "text.primary" }} variant="h6">
								Toate serviciile
							</Typography>
						</Button>

						<Divider
							orientation="vertical"
							sx={{ height: 28, color: "divider" }}
						/>

						<Button
							sx={{
								minWidth: 260,
								bgcolor: "transparent",
								textTransform: "none",
								borderRadius: 2,
							}}
							color="secondary"
						>
							<Typography sx={{ color: "text.primary" }} variant="h6">
								In apropiere
							</Typography>
						</Button>

						<Divider
							orientation="vertical"
							sx={{ height: 28, color: "divider" }}
						/>

						<Button
							sx={{
								minWidth: 260,
								bgcolor: "transparent",
								textTransform: "none",
								borderRadius: 2,
							}}
							color="secondary"
						>
							<Typography sx={{ color: "text.primary" }} variant="h6">
								Oricand
							</Typography>
						</Button>
						<Tooltip title="Caută" arrow>
							<IconButton
								onClick={() => {}}
								size="large"
								aria-label="Caută"
								sx={{
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
			</Stack>

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
	);
};

export default SearchHeader;
