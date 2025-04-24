import CustomStack from "@/components/core/CustomStack/CustomStack";
import { Avatar, Box, ListItemButton, Stack, Typography } from "@mui/material";
import React from "react";
import { Check } from "@mui/icons-material";

type UserListItemProps = {
	username: string;
	name: string;
	isSelected?: boolean;
	onClick: () => void;
};

export default function UserListItem({
	username,
	name,
	isSelected = false,
	onClick,
}: UserListItemProps) {
	return (
		<ListItemButton sx={{ p: 0 }} onClick={onClick}>
			<CustomStack sx={{ width: "100%" }}>
				<Stack flexDirection="row" sx={{ p: 2.5 }}>
					<Avatar sx={{ width: 50, height: 50 }} />
					<Box sx={{ ml: 1.5 }}>
						<Typography fontWeight={600}>@{username}</Typography>
						<Typography>{name}</Typography>
					</Box>
				</Stack>
				{isSelected && <Check color="success" sx={{ mr: 2.5 }} />}
			</CustomStack>
		</ListItemButton>
	);
}
