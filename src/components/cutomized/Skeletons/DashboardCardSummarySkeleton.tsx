import React from "react";
import { Paper, Typography, Skeleton, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import CustomStack from "@/components/core/CustomStack/CustomStack";

type DashboardCardSummarySkeletonProps = { count?: number };

export default function DashboardCardSummarySkeleton({
	count = 4,
}: DashboardCardSummarySkeletonProps) {
	return (
		<>
			{Array.from({ length: count }).map((_, i) => (
				<Grid size={3} key={i}>
					<Paper sx={{ borderRadius: 1.5, padding: 2.5 }}>
						<Typography>
							<Skeleton />
						</Typography>
						<CustomStack sx={{ mt: 1.5 }}>
							<Skeleton sx={{ width: 100 }} />
							<Box>
								<Skeleton sx={{ width: 100 }} />
								<Skeleton sx={{ width: 100 }} />
							</Box>
						</CustomStack>
					</Paper>
				</Grid>
			))}
		</>
	);
}
