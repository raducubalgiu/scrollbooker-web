import React from "react";
import { Box } from "@mui/material";
import NotificationsModule from "./NotificationsModule";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";

const NotificationsWrapper = () => {
	const { navigateTo } = useAppNavigation();

	return (
		<Box sx={{ height: "100%", width: "100%" }}>
			<NotificationsModule
				onNavigateToUserProfile={(username, profession) =>
					navigateTo(AppRoutes.profile(username, profession))
				}
				onNavigateToEmploymentRequest={employmentRequestId =>
					navigateTo(AppRoutes.employmentRequest(employmentRequestId))
				}
				onNavigateToAppointmentDetails={appointmentId => {
					navigateTo(AppRoutes.appointmentDetails(appointmentId));
				}}
			/>
		</Box>
	);
};

export default NotificationsWrapper;
