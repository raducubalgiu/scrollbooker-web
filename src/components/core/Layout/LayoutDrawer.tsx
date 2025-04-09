import React from "react";
import { Box, Drawer } from "@mui/material";
import Sidebar from "./Sidebar";

type LayoutDrawerProps = {
	mobileOpen: boolean;
	onCloseDrawer: () => void;
	onTransitionDrawerEnd: () => void;
	drawerWidth: number;
};

export default function LayoutDrawer({
	mobileOpen,
	onCloseDrawer,
	onTransitionDrawerEnd,
	drawerWidth,
}: LayoutDrawerProps) {
	const styles = {
		drawerDesktop: {
			display: { xs: "none", sm: "block" },
			"& .MuiDrawer-paper": {
				boxSizing: "border-box",
				width: drawerWidth,
			},
		},
		drawerMobile: {
			display: { xs: "block", sm: "none" },
			"& .MuiDrawer-paper": {
				boxSizing: "border-box",
				width: drawerWidth,
			},
		},
	};

	return (
		<Box
			component="nav"
			sx={{
				width: { sm: drawerWidth },
				flexShrink: { sm: 0 },
			}}
		>
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onTransitionEnd={onTransitionDrawerEnd}
				onClose={onCloseDrawer}
				sx={styles.drawerMobile}
				slotProps={{ root: { keepMounted: true } }}
			>
				<Sidebar />
			</Drawer>
			<Drawer variant="permanent" sx={styles.drawerDesktop} open>
				<Sidebar />
			</Drawer>
		</Box>
	);
}
