import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import CustomStack from "../../core/CustomStack/CustomStack";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import Grid from "@mui/material/Grid2";
import { DashboardSummaryType } from "@/ts/models/DashboardSummaryType";

type DashboardSummaryProps = {
	dashboardSummary: DashboardSummaryType | null;
	isLoading: boolean;
};

export default function DashboardCardSummary({
	dashboardSummary,
}: DashboardSummaryProps) {
	const { title, amount, trend, percentage, days_diff } =
		dashboardSummary || {};

	return (
		<Grid size={3}>
			<Paper sx={{ borderRadius: 1.5, padding: 2.5 }}>
				<Typography sx={{ color: "gray", fontWeight: "600", fontSize: 14 }}>
					{title}
				</Typography>
				<CustomStack sx={{ mt: 1.5 }}>
					<Typography sx={{ fontSize: 32.5, fontWeight: "700" }}>
						{amount}
					</Typography>
					<Box>
						<CustomStack justifyContent="center">
							{trend == "up" ? (
								<TrendingUpIcon color="success" />
							) : (
								<TrendingDownIcon color="secondary" />
							)}
							<Typography
								color={trend == "up" ? "success" : "secondary"}
								sx={{ fontWeight: "600", fontSize: 16, ml: 1 }}
							>
								{trend == "up" ? percentage : `- ${percentage}`}
							</Typography>
						</CustomStack>
						<Typography sx={{ color: "gray", fontSize: 14 }}>
							vs last {`${days_diff} days`}
						</Typography>
					</Box>
				</CustomStack>
			</Paper>
		</Grid>
	);
}
