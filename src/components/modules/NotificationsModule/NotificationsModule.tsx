"use client";

import { PaginatedData } from "@/components/core/Table/Table";
import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeleton";
import { useCustomQuery } from "@/hooks/useHttp";
import { NotificationType } from "@/models/NotificationType";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";

export default function NotificationsModule() {
	const [page, setPage] = useState(0);

	const { data: notifications, isLoading } = useCustomQuery<
		PaginatedData<NotificationType>
	>({
		key: ["get-notifications"],
		url: "/api/notifications",
		params: { page: page + 1, limit: 10 },
	});

	const count = notifications?.count ?? 0;
	const resultsCount = notifications?.results.length ?? 0;
	const displayLoadMore = resultsCount < count;

	const handlePage = () => setPage(page => page + 1);

	return (
		<Box>
			{isLoading && <NotificationSkeleton />}
			{!isLoading &&
				notifications?.results.map((not, i) => (
					<NotificationItem
						key={i}
						sender={not.sender.username}
						type={not.type}
						is_read={not.is_read}
					/>
				))}
			{displayLoadMore && (
				<Stack alignItems="center" mt={2.5}>
					<Button
						onClick={handlePage}
						sx={{
							textTransform: "capitalize",
							fontWeight: 600,
						}}
					>
						Încarcă mai mult
					</Button>
				</Stack>
			)}
		</Box>
	);
}
