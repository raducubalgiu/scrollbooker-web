import CustomStack from "@/components/core/CustomStack/CustomStack";
import MainLayout from "@/components/cutomized/MainLayout/MainLayout";
import { Paper, Switch, Typography } from "@mui/material";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import React from "react";

export default async function Settings() {
	return (
		<MainLayout title="Setări" hideAction>
			<Paper sx={{ p: 2.5 }}>
				<Typography mb={2.5} fontWeight={600}>
					Setări generale
				</Typography>
				<CustomStack sx={{ mb: 2.5 }}>
					<CustomStack>
						<TranslateOutlinedIcon />
						<Typography sx={{ ml: 2.5 }}>Limba aplicației</Typography>
					</CustomStack>
					<CustomStack>
						<Typography>Română</Typography>
						<Switch defaultChecked />
					</CustomStack>
				</CustomStack>
				<CustomStack>
					<CustomStack>
						<NotificationsActiveOutlinedIcon />
						<Typography sx={{ ml: 2.5 }}>Notificări</Typography>
					</CustomStack>
					<CustomStack>
						<Typography>Activat</Typography>
						<Switch defaultChecked />
					</CustomStack>
				</CustomStack>
			</Paper>
		</MainLayout>
	);
}
