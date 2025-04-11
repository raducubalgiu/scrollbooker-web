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
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo/UserInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "next-auth/react";

export default function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();
	const [openSuperAdmin, setOpenSuperAdmin] = useState(false);

	const handleClick = () => setOpenSuperAdmin(open => !open);

	const isLinkSelected = useCallback(
		(href: string) => {
			if (pathname && href !== "/") return pathname.startsWith(href);

			return pathname === href;
		},
		[pathname]
	);

	const userRoutes = [
		{
			label: "Dashboard",
			route: "/",
			icon: <DashboardOutlinedIcon />,
		},
		{
			label: "Calendar",
			route: "/calendar",
			icon: <CalendarMonthIcon />,
		},
		{
			label: "My Business",
			route: "/my-business",
			icon: <PlaceOutlinedIcon />,
		},
		{
			label: "Work Schedule",
			route: "/schedules",
			icon: <ScheduleIcon />,
		},
		{
			label: "Products",
			route: "/products",
			icon: <ShoppingBagOutlinedIcon />,
		},
		{
			label: "Employees",
			route: "/employees",
			icon: <PeopleAltOutlinedIcon />,
		},
	];

	const superAdminRoutes = [
		{ label: "Business Domains", route: "/business-domains" },
		{ label: "Business Types", route: "/business-types" },
		{ label: "Service Domains", route: "/service-domains" },
		{ label: "Services", route: "/services" },
		{ label: "Filters", route: "/filters" },
		{ label: "Roles and Permissions", route: "/roles-and-permissions" },
	];

	return (
		<Box sx={{ height: "100%" }}>
			<UserInfo />
			<Divider sx={{ mb: 1.5 }} />
			<List sx={{ pb: 5 }}>
				{userRoutes.map((user, i) => (
					<ListItem disablePadding key={i} sx={{ px: 2.5 }}>
						<ListItemButton
							onClick={() => router.push(user.route)}
							selected={isLinkSelected(user.route)}
							sx={{ mb: 0.5 }}
						>
							<ListItemIcon>{user.icon}</ListItemIcon>
							<ListItemText>{user.label}</ListItemText>
						</ListItemButton>
					</ListItem>
				))}
				<ListItemButton onClick={() => signOut()} sx={{ mb: 1.5, px: 2.5 }}>
					<ListItemIcon>
						<LogoutIcon />
					</ListItemIcon>
					<ListItemText primary="Log Out" />
				</ListItemButton>
				<Divider sx={{ mb: 1.5 }} />
				<ListItemButton onClick={handleClick} sx={{ mb: 1.5, px: 2.5 }}>
					<ListItemIcon>
						<AdminPanelPlaylistAddCheckOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary="Super Admin" />
					{openSuperAdmin ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
				<Collapse in={openSuperAdmin} timeout="auto" unmountOnExit>
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
			</List>
		</Box>
	);
}
