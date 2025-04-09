import React from "react";
import { Badge, IconButton, Avatar } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

type UserAvatarProps = { url: string | undefined; onOpenModal: () => void };

export default function UserAvatar({ url, onOpenModal }: UserAvatarProps) {
	const badgeContent = (
		<IconButton
			size="small"
			sx={{ bgcolor: "white" }}
			color="primary"
			onClick={onOpenModal}
		>
			<EditIcon />
		</IconButton>
	);

	return (
		<Badge
			overlap="circular"
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			badgeContent={badgeContent}
		>
			<Avatar sx={{ width: 90, height: 90 }} alt="" src={url} />
		</Badge>
	);
}
