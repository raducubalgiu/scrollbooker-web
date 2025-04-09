"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import LayoutDrawer from "./LayoutDrawer";
import LayoutAppBar from "./LayoutAppBar";

const DRAWER_WIDTH = 350;

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const styles = {
		main: {
			p: 3,
			width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
		},
		box: {
			display: "flex",
			minHeight: "100vh",
		},
	};

	return (
		<Box sx={styles.box}>
			<CssBaseline />
			<LayoutAppBar
				onDrawerToggle={handleDrawerToggle}
				drawerWidth={DRAWER_WIDTH}
			/>
			<LayoutDrawer
				mobileOpen={mobileOpen}
				onCloseDrawer={handleDrawerClose}
				onTransitionDrawerEnd={handleDrawerTransitionEnd}
				drawerWidth={DRAWER_WIDTH}
			/>
			<Box component="main" sx={styles.main}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
}
