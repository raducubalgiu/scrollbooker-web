"use client";

import React from "react";
import {
	Badge,
	Box,
	IconButton,
	ListItemButton,
	Menu,
	Paper,
	Typography,
} from "@mui/material";
import { useCustomQuery } from "@/hooks/useHttp";
import { PaginatedData } from "../Table/Table";
import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeletons";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { NotificationType } from "@/ts/models/Notification/NotificationType";

export default function LayoutNotificationsMenu() {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const {
		data: notifications,
		isLoading,
		refetch,
	} = useCustomQuery<PaginatedData<NotificationType>>({
		key: ["get-notifications"],
		url: "/api/notifications",
		params: { page: 1, limit: 5 },
		options: {
			enabled: open,
		},
	});

	const styles = {
		badge: {
			"& .MuiBadge-dot": {
				width: 10,
				height: 10,
				borderRadius: "50%",
			},
		},
		paper: {
			elevation: 0,
			sx: {
				overflow: "visible",
				filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
				mt: 1.5,
				"&::before": {
					content: '""',
					display: "block",
					position: "absolute",
					top: 0,
					right: 14,
					width: 10,
					height: 10,
					bgcolor: "background.paper",
					transform: "translateY(-50%) rotate(45deg)",
					zIndex: 0,
				},
			},
		},
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<Badge color="secondary" variant="dot" sx={styles.badge}>
					<NotificationsNoneOutlinedIcon sx={{ width: 30, height: 30 }} />
				</Badge>
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				slotProps={{ paper: { ...styles.paper } }}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<Box sx={{ p: 2.5 }}>
					{isLoading && <NotificationSkeleton />}
					{!isLoading &&
						notifications?.results.map((notification, i) => (
							<NotificationItem
								key={i}
								notification={notification}
								refetchNotifications={refetch}
								sx={{ mb: 0 }}
							/>
						))}
					{!isLoading && isEmpty(notifications?.results) && (
						<Typography>Nu au fost găsite notificări</Typography>
					)}
				</Box>
				{!isEmpty(notifications?.results) && (
					<Paper>
						<ListItemButton
							onClick={() => router.push("/notifications")}
							sx={{ justifyContent: "center" }}
							color="primary"
						>
							Vezi toate notificările
						</ListItemButton>
					</Paper>
				)}
			</Menu>
		</>
	);
}
