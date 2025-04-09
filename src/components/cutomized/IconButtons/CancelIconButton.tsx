import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type CancelIconButtonProps = { onClick: () => void };

export default function CancelIconButton({ onClick }: CancelIconButtonProps) {
	return (
		<Tooltip title="Renunta">
			<IconButton onClick={onClick}>
				<CloseIcon />
			</IconButton>
		</Tooltip>
	);
}
