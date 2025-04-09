import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

type DeleteIconButtonProps = { onClick: () => void };

export default function DeleteIconButton({ onClick }: DeleteIconButtonProps) {
	return (
		<Tooltip title="Renunta">
			<IconButton onClick={onClick}>
				<RemoveCircleOutlineIcon />
			</IconButton>
		</Tooltip>
	);
}
