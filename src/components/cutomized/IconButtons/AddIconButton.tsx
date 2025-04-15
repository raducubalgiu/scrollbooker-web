import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type AddIconButtonProps = { onClick: () => void };

export default function AddIconButton({ onClick }: AddIconButtonProps) {
	return (
		<Tooltip title="Adaugă">
			<IconButton onClick={onClick}>
				<AddCircleIcon />
			</IconButton>
		</Tooltip>
	);
}
