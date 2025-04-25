"use client";

import {
	Avatar,
	IconButton,
	ListItem,
	ListItemProps,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import CustomStack from "@/components/core/CustomStack/CustomStack";

type NotificationItemProps = {
	sender: string;
	type: string;
	is_read: boolean;
} & ListItemProps;

export default function NotificationItem({
	sender,
	type,
	is_read,
	...props
}: NotificationItemProps) {
	let constructedMessage = "";

	switch (true) {
		case type === "follow":
			constructedMessage = `started following you`;
			break;
		default:
			return null;
	}

	return (
		<ListItem sx={{ p: 0, mb: 2.5 }} {...props}>
			<Paper sx={{ flexGrow: 1 }}>
				<CustomStack p={2.5} flexGrow={1}>
					<CustomStack justifyContent="flex-start" maxWidth={400}>
						<Avatar sx={{ width: 45, height: 45, mr: 1.5 }} />
						<Stack flexWrap="wrap">
							<Typography fontWeight={600}>{sender}</Typography>
							<Typography
								color="neutral.900"
								fontWeight={is_read ? 600 : 500}
								mt={0.5}
							>
								{constructedMessage}
							</Typography>
						</Stack>
					</CustomStack>
					<IconButton>
						<CloseIcon />
					</IconButton>
				</CustomStack>
			</Paper>
		</ListItem>
	);
}
