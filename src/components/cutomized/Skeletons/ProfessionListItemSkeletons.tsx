import { Box, Skeleton } from "@mui/material";
import React from "react";
import CustomStack from "@/components/core/CustomStack/CustomStack";

type ProfessionListItemSkeletonsProps = { count?: number };

export default function ProfessionListItemSkeletons({
	count = 5,
}: ProfessionListItemSkeletonsProps) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<Box key={i} sx={{ p: 1.5 }}>
					<CustomStack>
						<Skeleton sx={{ width: 200 }} />
						<Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
					</CustomStack>
				</Box>
			))}
		</>
	);
}
