import React from "react";
import { AppBar, Toolbar, Box, IconButton, Badge } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import CustomStack from "../CustomStack/CustomStack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import LayoutSearch from "./LayoutSearch";
import { useCustomTheme } from "../../../providers/ThemeContext";

type LayoutAppBarProps = {
	onDrawerToggle: () => void;
	drawerWidth: number;
};

export default function LayoutAppBar({
	onDrawerToggle,
	drawerWidth,
}: LayoutAppBarProps) {
	const { mode, toggleTheme } = useCustomTheme();

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
						<IconButton>
							<Badge color="secondary" variant="dot" sx={styles.badge}>
								<NotificationsNoneOutlinedIcon sx={{ width: 30, height: 30 }} />
							</Badge>
						</IconButton>
						<IconButton onClick={() => toggleTheme()}>
							{mode == "dark" ? <DarkModeIcon /> : <LightModeIcon />}
						</IconButton>
					</CustomStack>
				</CustomStack>
			</Toolbar>
		</AppBar>
	);
}
