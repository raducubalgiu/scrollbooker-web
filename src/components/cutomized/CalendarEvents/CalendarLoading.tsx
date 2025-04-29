import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Paper, Skeleton, Stack } from "@mui/material";

export default function CalendarLoading() {
	return (
		<Paper sx={{ width: "100%", px: 2.5 }}>
			<Grid container>
				<Grid
					sx={{
						width: 80,
						borderBottom: "1px solid rgba(81, 81, 81, 1)",
					}}
				/>
				{Array.from({ length: 7 }).map((_, i) => (
					<Grid
						key={i}
						sx={{
							position: "relative",
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
							display: "flex",
							borderTop: "1px solid rgba(81, 81, 81, 1)",
							borderLeft: "1px solid rgba(81, 81, 81, 1)",
							borderBottom: "1px solid rgba(81, 81, 81, 1)",
							padding: 2.5,
						}}
					>
						<Stack justifyContent="center" alignItems="center">
							<Skeleton width={100} />
						</Stack>
					</Grid>
				))}
			</Grid>
			<Grid container>
				<Grid sx={{ width: 80 }}>
					{Array.from({ length: 8 }).map((_, i) => (
						<Box
							key={i}
							height={200}
							borderBottom="1px solid rgba(81, 81, 81, 1)"
							borderLeft="1px solid rgba(81, 81, 81, 1)"
							sx={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
							}}
						>
							<Skeleton width={50} />
						</Box>
					))}
				</Grid>

				{Array.from({ length: 7 }).map((_, i) => (
					<Grid
						key={i}
						sx={{
							position: "relative",
							borderLeft: "1px solid rgba(81, 81, 81, 1)",
							flex: 1,
						}}
					>
						{Array.from({ length: 8 }).map((_, i) => (
							<Box
								key={i}
								height={200}
								borderBottom="1px solid rgba(81, 81, 81, 1)"
								p={2.5}
							>
								<Skeleton width={150} sx={{ mt: 1.5 }} />
								<Skeleton width={50} />
							</Box>
						))}
					</Grid>
				))}
			</Grid>
		</Paper>
	);
}
