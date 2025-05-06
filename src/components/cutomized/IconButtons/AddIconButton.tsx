import React from "react";
import { Tooltip, IconButton, IconButtonProps } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

type AddIconButtonProps = { onClick: () => void } & IconButtonProps;

export default function AddIconButton({
	onClick,
	...props
}: AddIconButtonProps) {
	return (
		<Tooltip title="Adaugă">
			<IconButton onClick={onClick} {...props}>
				<AddCircleIcon />
			</IconButton>
		</Tooltip>
	);
}
