import React from "react";
import { ListItemButton, Typography } from "@mui/material";
import { Check } from "@mui/icons-material";
import CustomStack from "@/components/core/CustomStack/CustomStack";

type ProfessionListItemProps = {
	name: string;
	isSelected: boolean;
	onClick: () => void;
};

export default function ProfessionListItem({
	name,
	isSelected,
	onClick,
}: ProfessionListItemProps) {
	return (
		<ListItemButton sx={{ p: 1.5 }} onClick={onClick}>
			<CustomStack flexGrow={1}>
				<Typography>{name}</Typography>
				{isSelected && <Check color="success" sx={{ mr: 2.5 }} />}
			</CustomStack>
		</ListItemButton>
	);
}
