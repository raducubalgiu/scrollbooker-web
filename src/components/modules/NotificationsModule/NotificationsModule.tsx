"use client";

import { PaginatedData } from "@/components/core/Table/Table";
import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeleton";
import { useCustomQuery } from "@/hooks/useHttp";
import { NotificationType } from "@/models/NotificationType";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import React, { useState } from "react";
import { Button, Paper, Stack, Typography } from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { isEmpty } from "lodash";

export default function NotificationsModule() {
	const [page, setPage] = useState(0);

	const {
		data: notifications,
		isLoading,
		refetch,
	} = useCustomQuery<PaginatedData<NotificationType>>({
		key: ["get-notifications"],
		url: "/api/notifications",
		params: { page: page + 1, limit: 10 },
	});

	const count = notifications?.count ?? 0;
	const resultsCount = notifications?.results.length ?? 0;
	const displayLoadMore = resultsCount < count;

	const handlePage = () => setPage(page => page + 1);

	return (
		<MainLayout title="Notificări" hideAction>
			{isLoading && <NotificationSkeleton />}
			{!isLoading &&
				notifications?.results.map((notication, i) => (
					<NotificationItem
						key={i}
						notification={notication}
						refetchNotifications={refetch}
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
			{!isLoading && isEmpty(notifications?.results) && (
				<Paper sx={{ p: 2.5 }}>
					<Typography sx={{ textAlign: "center" }}>
						Nu au fost găsite notificări
					</Typography>
				</Paper>
			)}
		</MainLayout>
	);
}
