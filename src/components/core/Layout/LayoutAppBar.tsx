import React from "react";
import {
	AppBar,
	Toolbar,
	Box,
	IconButton,
	Badge,
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

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
							<Typography>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
								doloremque veniam ad suscipit deserunt a ut fuga quos
								cupiditate, consectetur doloribus voluptatem nisi omnis quam
								odit quaerat. Id, eligendi necessitatibus!
							</Typography>
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
