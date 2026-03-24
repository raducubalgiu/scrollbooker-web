import { Box, ButtonGroup, IconButton } from "@mui/material";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

type MapActionsProps = {
	onMapExpandToggle: () => void;
	onZoomIn: () => void;
	onZoomOut: () => void;
	isMapExpanded: boolean;
};

export default function MapActions({
	onMapExpandToggle,
	onZoomIn,
	onZoomOut,
	isMapExpanded,
}: MapActionsProps) {
	const styles = {
		container: {
			position: "absolute",
			top: 12,
			right: 12,
			zIndex: 2,
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			gap: 1,
		},
	};

	return (
		<Box sx={styles.container}>
			<IconButton
				size="large"
				sx={{
					bgcolor: "background.paper",
					boxShadow: 2,
				}}
				onClick={onMapExpandToggle}
				aria-label={isMapExpanded ? "Minimizează" : "Maximizează"}
			>
				{isMapExpanded ? <CloseOutlinedIcon /> : <OpenInFullOutlinedIcon />}
			</IconButton>
			<ButtonGroup
				orientation="vertical"
				variant="contained"
				size="large"
				sx={{
					mt: 1,
					boxShadow: 2,
					bgcolor: "background.paper",
					borderRadius: 20,
				}}
			>
				<IconButton size="large" onClick={onZoomIn} aria-label="Zoom in">
					<AddIcon />
				</IconButton>

				<IconButton size="large" aria-label="Zoom out" onClick={onZoomOut}>
					<RemoveIcon />
				</IconButton>
			</ButtonGroup>
		</Box>
	);
}
