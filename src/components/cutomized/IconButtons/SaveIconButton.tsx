import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

type SaveIconButtonProps = { onClick: () => void };

export default function SaveIconButton({ onClick }: SaveIconButtonProps) {
	return (
		<Tooltip title="Renunta">
			<IconButton onClick={onClick}>
				<CheckIcon />
			</IconButton>
		</Tooltip>
	);
}
