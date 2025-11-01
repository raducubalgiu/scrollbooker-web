import React from "react";
import { Stack, StackProps, Typography, Skeleton } from "@mui/material";

type UserInfoCounterProps = {
	label: string;
	counter: number | undefined;
	isLoading: boolean;
} & StackProps;

export default function UserInfoCounter({
	label,
	counter,
	isLoading,
	...props
}: UserInfoCounterProps) {
	return (
		<Stack alignItems="center" {...props}>
			<Typography sx={{ mb: 1.5 }}>{label}</Typography>
			<Typography sx={{ fontWeight: "600" }}>
				{isLoading ? (
					<Skeleton width={12.5} height={10} sx={{ py: 1 }} />
				) : (
					counter
				)}
			</Typography>
		</Stack>
	);
}
