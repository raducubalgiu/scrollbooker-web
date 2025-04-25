import React from "react";
import {
	AppBar,
	Toolbar,
	Box,
	IconButton,
	Badge,
	ListItemButton,
	Paper,
	Typography,
} from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CustomStack from "../CustomStack/CustomStack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import LayoutSearch from "./LayoutSearch";
import { useCustomTheme } from "../../../providers/ThemeContext";
import Menu from "@mui/material/Menu";
import NotificationItem from "@/components/cutomized/NotificationItem/NotificationItem";
import { NotificationType } from "@/models/NotificationType";
import { PaginatedData } from "../Table/Table";
import { useCustomQuery } from "@/hooks/useHttp";
import NotificationSkeleton from "@/components/cutomized/Skeletons/NotificationSkeleton";
import { useRouter } from "next/navigation";
import { isEmpty } from "lodash";

type LayoutAppBarProps = {
	onDrawerToggle: () => void;
	drawerWidth: number;
};

export default function LayoutAppBar({
	onDrawerToggle,
	drawerWidth,
}: LayoutAppBarProps) {
	const { mode, toggleTheme } = useCustomTheme();
	const router = useRouter();

	const styles = {
		appBar: {
			width: { sm: `calc(100% - ${drawerWidth}px)` },
			ml: { sm: `${drawerWidth}px` },
		},
		badge: {
			"& .MuiBadge-dot": {
				width: 10,
				height: 10,
				borderRadius: "50%",
			},
		},
	};

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
	});

	return (
		<AppBar position="fixed" sx={styles.appBar}>
			<Toolbar>
				<CustomStack sx={{ width: "100%", flex: 1 }}>
					<Box>
						<IconButton
							color="default"
							edge="start"
							onClick={onDrawerToggle}
							sx={{ mr: 2, display: { sm: "none" } }}
						>
							<MenuIcon />
						</IconButton>
					</Box>
					<LayoutSearch />
					<CustomStack>
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
							slotProps={{
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
							}}
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
						<IconButton onClick={() => toggleTheme()}>
							{mode == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
						</IconButton>
					</CustomStack>
				</CustomStack>
			</Toolbar>
		</AppBar>
	);
}
