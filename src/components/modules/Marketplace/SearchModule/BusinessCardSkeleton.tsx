import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const BusinessCardSkeleton = () => {
	return (
		<Box>
			<Skeleton
				variant="rounded"
				width={"100%"}
				height={280}
				sx={{ borderRadius: 5 }}
			/>

			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="center"
				mt={2}
			>
				<Skeleton variant="rounded" width={100} height={22.5} sx={{ mb: 1 }} />
				<Skeleton variant="rounded" width={50} height={20} />
			</Stack>

			<Skeleton variant="rounded" width={200} height={15} />

			<Skeleton
				variant="rounded"
				width={"100%"}
				height={15}
				sx={{ mt: 2.5, mb: 2.5 }}
			/>

			<Skeleton
				variant="rounded"
				width={"100%"}
				height={75}
				sx={{ mt: 2.5, borderRadius: 4 }}
			/>

			<Skeleton
				variant="rounded"
				width={"100%"}
				height={75}
				sx={{ mt: 1.5, mb: 2.5, borderRadius: 4 }}
			/>

			<Skeleton
				variant="rounded"
				width={"100%"}
				height={75}
				sx={{ mb: 2.5, borderRadius: 4 }}
			/>
		</Box>
	);
};

export default BusinessCardSkeleton;
