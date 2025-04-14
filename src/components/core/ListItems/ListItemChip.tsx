import React from "react";
import { Chip, ChipProps } from "@mui/material";
import { styled } from "@mui/material/styles";

type ListItemChipProps = { onDelete: () => void; label: string } & ChipProps;

const ListItem = styled("li")(({ theme }) => ({
	margin: theme.spacing(1),
}));

export default function ListItemChip({
	onDelete,
	label,
	...props
}: ListItemChipProps) {
	const styles = {
		chip: {
			py: 2.5,
			px: 1,
			fontSize: 15.5,
			color: "white",
			fontWeight: "600",
		},
	};

	return (
		<ListItem>
			<Chip
				label={label}
				onDelete={onDelete}
				size="medium"
				sx={styles.chip}
				color="primary"
				{...props}
			/>
		</ListItem>
	);
}
