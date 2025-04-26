"use client";

import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeletons";
import { NotificationType } from "@/models/NotificationType";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import {
	Button,
	CircularProgress,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { isEmpty } from "lodash";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { PaginatedData } from "@/components/core/Table/Table";

const fetchNotifications = async ({ pageParam }: { pageParam: number }) => {
	const { data } = await axios.get<PaginatedData<NotificationType>>(
		`/api/notifications?page=${pageParam}&limit=5`
	);
	return {
		...data,
		page: pageParam,
	};
};

export default function NotificationsModule() {
	const {
		data,
		refetch,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["notifications"],
		queryFn: fetchNotifications,
		initialPageParam: 1,
		getNextPageParam: lastPage => {
			const { count, results, page } = lastPage;
			return (page - 1) * 5 + results.length < count ? page + 1 : undefined;
		},
	});

	const notifications = data?.pages.flatMap(p => p.results) ?? [];

	return (
		<MainLayout title="Notificări" hideAction>
			{isLoading && <NotificationSkeleton />}
			{!isLoading &&
				notifications?.map((notication, i) => (
					<NotificationItem
						key={i}
						notification={notication}
						refetchNotifications={refetch}
					/>
				))}
			{hasNextPage && (
				<Stack alignItems="center" mt={2.5}>
					<Button
						onClick={() => fetchNextPage()}
						sx={{
							textTransform: "capitalize",
							fontWeight: 600,
						}}
					>
						Încarcă mai mult
					</Button>
				</Stack>
			)}
			{!isLoading && isEmpty(notifications) && (
				<Paper sx={{ p: 2.5 }}>
					<Typography sx={{ textAlign: "center" }}>
						Nu au fost găsite notificări
					</Typography>
				</Paper>
			)}
			{isFetchingNextPage && (
				<Stack alignItems="center" justifyContent="center">
					<CircularProgress size={20} />
				</Stack>
			)}
		</MainLayout>
	);
}
