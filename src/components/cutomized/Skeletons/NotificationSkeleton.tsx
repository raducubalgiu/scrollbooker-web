import React from "react";
import { ListItem, Paper } from "@mui/material";
import CustomStack from "@/components/core/CustomStack/CustomStack";
import { Stack, Skeleton } from "@mui/material";

export default function NotificationSkeletons() {
	return (
		<>
			{Array.from({ length: 5 }).map((_, i) => (
				<ListItem sx={{ p: 0, mb: 2.5 }} key={i}>
					<Paper sx={{ flexGrow: 1 }}>
						<CustomStack p={2.5} flexGrow={1}>
							<CustomStack justifyContent="flex-start" maxWidth={400}>
								<Skeleton
									variant="circular"
									sx={{ width: 45, height: 45, mr: 1.5 }}
								/>
								<Stack flexWrap="wrap">
									<Skeleton width={200} />
									<Skeleton width={200} />
								</Stack>
							</CustomStack>
							<Skeleton
								variant="circular"
								sx={{ width: 40, height: 40, mr: 1.5 }}
							/>
						</CustomStack>
					</Paper>
				</ListItem>
			))}
		</>
	);
}
