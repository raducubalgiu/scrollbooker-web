import { Avatar, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";

type NotificationItemProps = {
	sender: string;
	message: string;
	is_read: boolean;
};

export default function NotificationItem({
	sender,
	message,
	is_read,
}: NotificationItemProps) {
	return (
		<ListItemButton sx={{ p: 0 }}>
			<Stack flexDirection="row" p={2.5} alignItems="center" maxWidth={400}>
				<Avatar sx={{ width: 40, height: 40, mr: 1.5 }} />
				<Stack flexWrap="wrap">
					<Typography fontWeight={600}>@{sender}</Typography>
					<Typography color="neutral.900" fontWeight={is_read ? 600 : 500}>
						{message}
					</Typography>
				</Stack>
			</Stack>
		</ListItemButton>
	);
}
