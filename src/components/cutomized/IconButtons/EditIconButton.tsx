import React from "react";
import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type EditIconButtonProps = { onClick: () => void };

export default function EditIconButton({ onClick }: EditIconButtonProps) {
	return (
		<Tooltip title="Renunta">
			<IconButton onClick={onClick}>
				<EditIcon />
			</IconButton>
		</Tooltip>
	);
}
