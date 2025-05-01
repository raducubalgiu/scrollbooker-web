import React from "react";
import Grid from "@mui/material/Grid2";
import { Box, Paper, Skeleton, Stack } from "@mui/material";

export default function CalendarLoading() {
	return (
		<Paper sx={{ width: "100%" }}>
			<Grid container>
				<Grid
					sx={{
						width: 80,
						borderBottom: "1px solid",
						borderColor: "border.main",
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
							borderTop: "1px solid",
							borderLeft: "1px solid",
							borderBottom: "1px solid",
							borderColor: "border.main",
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
							sx={{
								alignItems: "center",
								justifyContent: "center",
								display: "flex",
								borderBottom: "1px solid",
								borderLeft: "1px solid",
								borderColor: "border.main",
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
							borderLeft: "1px solid",
							borderColor: "border.main",
							backgroundColor: "background.default",
							flex: 1,
						}}
					>
						{Array.from({ length: 8 }).map((_, i) => (
							<Box
								key={i}
								sx={{
									height: 200,
									p: 2.5,
									borderBottom: "1px solid",
									borderColor: "border.main",
								}}
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
