import React from "react";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { Skeleton, Box } from "@mui/material";

type UserListItemSkeletons = { count?: number };

export default function UserListItemSkeletons({
	count = 5,
}: UserListItemSkeletons) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<CustomStack key={i} sx={{ p: 2.5 }} justifyContent="flex-start">
					<Skeleton variant="circular" width={50} height={50} />
					<Box sx={{ ml: 1.5 }}>
						<Skeleton variant="text" width={200} />
						<Skeleton variant="text" width={200} />
					</Box>
				</CustomStack>
			))}
		</>
	);
}
