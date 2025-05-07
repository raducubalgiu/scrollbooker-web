import React from "react";
import { IconButton, IconButtonProps, Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";

type EditChangeIconButtonProps = {
	title: string;
	isEdit: boolean;
	onClick: () => void;
} & IconButtonProps;

export default function EditChangeIconButton({
	title,
	isEdit,
	onClick,
	...props
}: EditChangeIconButtonProps) {
	return (
		<IconButton
			onClick={onClick}
			size="large"
			sx={{
				ml: 2.5,
				bgcolor: "primary.main",
				"&:hover": { backgroundColor: "primary.main", opacity: 0.8 },
			}}
			{...props}
		>
			{isEdit ? (
				<Tooltip title={title}>
					<GradingOutlinedIcon />
				</Tooltip>
			) : (
				<Tooltip title="Editează">
					<EditOutlinedIcon />
				</Tooltip>
			)}
		</IconButton>
	);
}
