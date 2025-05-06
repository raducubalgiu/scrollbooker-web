"use client";

import React, { useState, useCallback } from "react";
import {
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
	Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AdminPanelPlaylistAddCheckOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo/UserInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import { signOut } from "next-auth/react";
import Protected from "@/components/cutomized/Protected/Protected";
import { useCustomQuery } from "@/hooks/useHttp";
import { UserInfoType } from "@/models/UserInfoType";

export default function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [openNomenclatures, setOpenNomenclatures] = useState(false);
	const [openMyBusiness, setOpenMyBusiness] = useState(true);

	const {
		data: user,
		isLoading: isLoadingUser,
		refetch: refetchUser,
	} = useCustomQuery<UserInfoType>({
		key: ["user-info"],
		url: "/api/auth/user-info",
	});

	const handleOpenNomenclatures = () => setOpenNomenclatures(open => !open);
	const handleOpenMyBusiness = () => setOpenMyBusiness(open => !open);

	const isLinkSelected = useCallback(
		(href: string) => {
			if (pathname && href !== "/") return pathname.startsWith(href);

			return pathname === href;
		},
		[pathname]
	);

	const dashboardRoutes = [
		{
			label: "Dashboard",
			route: "/",
			icon: <DashboardOutlinedIcon />,
			permission: "NO_PROTECTION",
		},
	];

	const settingsRoutes = [
		{
			label: "Notificări",
			route: "/notifications",
			icon: <NotificationsNoneOutlinedIcon />,
			permission: "NO_PROTECTION",
		},
		{
			label: "Setări",
			route: "/settings",
			icon: <ManageAccountsOutlinedIcon />,
			permission: "NO_PROTECTION",
		},
	];

	const myBusinessRoutes = [
		{
			label: "Locație și servicii",
			route: "/my-business",
			icon: <PlaceOutlinedIcon />,
			permission: "MY_BUSINESS_VIEW",
		},
		{
			label: "Calendar",
			route: "/calendar",
			icon: <CalendarMonthIcon />,
			permission: "CALENDAR_VIEW",
		},
		{
			label: "Programul de lucru",
			route: "/schedules",
			icon: <ScheduleIcon />,
			permission: "SCHEDULES_VIEW",
		},
		{
			label: "Produse",
			route: "/products",
			icon: <ShoppingBagOutlinedIcon />,
			permission: "PRODUCTS_VIEW",
		},
		{
			label: "Angajați",
			route: "/employees",
			icon: <PeopleAltOutlinedIcon />,
			permission: "EMPLOYEES_VIEW",
		},
		{
			label: "Cereri de angajare",
			route: "/employment-requests",
			icon: <ScheduleSendOutlinedIcon />,
			permission: "EMPLOYMENT_REQUESTS_VIEW",
		},
	];

	const superAdminRoutes = [
		{
			label: "Domeniu Business",
			route: "/nomenclatures/business-domains",
		},
		{
			label: "Tip Business",
			route: "/nomenclatures/business-types",
		},
		{
			label: "Domeniu Serviciu",
			route: "/nomenclatures/service-domains",
		},
		{
			label: "Servicii",
			route: "/nomenclatures/services",
		},
		{
			label: "Filtre",
			route: "/nomenclatures/filters",
		},
		{
			label: "Monede",
			route: "/nomenclatures/currencies",
		},
		{
			label: "Roluri și permisiuni",
			route: "/nomenclatures/roles-and-permissions",
		},
	];

	return (
		<Box sx={{ height: "100%" }}>
			<UserInfo
				user={user}
				isLoadingUser={isLoadingUser}
				refetchUser={refetchUser}
			/>
			<Divider sx={{ mb: 0.5 }} />
			<List sx={{ pb: 5 }}>
				{dashboardRoutes?.map((userRoute, i) => (
					<Protected key={i} permission={userRoute.permission} showSkeleton>
						<ListItem disablePadding sx={{ px: 2.5 }}>
							<ListItemButton
								onClick={() => router.push(userRoute.route)}
								selected={isLinkSelected(userRoute.route)}
							>
								<ListItemIcon>{userRoute.icon}</ListItemIcon>
								<ListItemText>{userRoute.label}</ListItemText>
							</ListItemButton>
						</ListItem>
					</Protected>
				))}
				<Protected permission="MY_BUSINESS_ROUTES_VIEW">
					<Divider sx={{ my: 1.5 }} />
					<ListItemButton onClick={handleOpenMyBusiness} sx={{ mb: 1.5 }}>
						<ListItemIcon>
							<ShoppingBagOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Afacerea mea" />
						{openMyBusiness ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse
						in={openMyBusiness}
						timeout="auto"
						unmountOnExit
						sx={{ px: 2.5 }}
					>
						<List component="div" disablePadding>
							{myBusinessRoutes.map((businessRoute, i) => (
								<Protected key={i} permission={businessRoute.permission}>
									<ListItemButton
										sx={{ pl: 4, mb: 0.5 }}
										onClick={() => router.push(businessRoute.route)}
										selected={isLinkSelected(businessRoute.route)}
									>
										<ListItemIcon>{businessRoute.icon}</ListItemIcon>
										<ListItemText primary={businessRoute.label} />
									</ListItemButton>
								</Protected>
							))}
						</List>
					</Collapse>
					<Divider sx={{ my: 1.5 }} />
				</Protected>
				{settingsRoutes?.map((userRoute, i) => (
					<Protected key={i} permission={userRoute.permission} showSkeleton>
						<ListItem disablePadding sx={{ px: 2.5 }}>
							<ListItemButton
								onClick={() => router.push(userRoute.route)}
								selected={isLinkSelected(userRoute.route)}
								sx={{ mb: 0.5 }}
							>
								<ListItemIcon>{userRoute.icon}</ListItemIcon>
								<ListItemText>{userRoute.label}</ListItemText>
							</ListItemButton>
						</ListItem>
					</Protected>
				))}
				<Divider sx={{ my: 1.5 }} />
				<ListItemButton onClick={() => signOut()} sx={{ mb: 1.5, px: 2.5 }}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText primary="Log Out" />
				</ListItemButton>
				<Protected permission="NOMENCLATURES_VIEW">
					<Divider sx={{ mb: 1.5 }} />
					<ListItemButton
						onClick={handleOpenNomenclatures}
						sx={{ mb: 1.5, px: 2.5 }}
					>
						<ListItemIcon>
							<AdminPanelPlaylistAddCheckOutlinedIcon />
						</ListItemIcon>
						<ListItemText primary="Super Admin" />
						{openNomenclatures ? <ExpandLess /> : <ExpandMore />}
					</ListItemButton>
					<Collapse
						in={openNomenclatures}
						timeout="auto"
						unmountOnExit
						sx={{ px: 2.5 }}
					>
						<List component="div" disablePadding>
							{superAdminRoutes.map((superAdmin, i) => (
								<ListItemButton
									key={i}
									sx={{ pl: 4, mb: 0.5 }}
									onClick={() => router.push(superAdmin.route)}
									selected={isLinkSelected(superAdmin.route)}
								>
									<ListItemIcon>
										<PlaylistAddCheckOutlinedIcon />
									</ListItemIcon>
									<ListItemText primary={superAdmin.label} />
								</ListItemButton>
							))}
						</List>
					</Collapse>
				</Protected>
			</List>
		</Box>
	);
}
