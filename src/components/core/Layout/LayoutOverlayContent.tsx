import { AppRoutes, useAppNavigation } from "@/utils/routes";
import { ActiveView } from "./Layout";
import AppointmentsModule from "@/components/modules/Marketplace/AppointmentsModule/AppointmentsModule";
import NotificationsModule from "@/components/modules/Marketplace/NotificationsModule/NotificationsModule";
import SearchUsersModule from "@/components/modules/Marketplace/SearchUsersModule/SearchUsersModule";

type LayoutOverlayContentProps = {
  activeView: ActiveView;
  overlayScrollRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
};

export default function LayoutOverlayContent({
  activeView,
  overlayScrollRef,
  onClose,
}: LayoutOverlayContentProps) {
  const { navigateTo } = useAppNavigation();

  switch (activeView) {
    case "appointments":
      return (
        <AppointmentsModule
          scrollRootRef={overlayScrollRef}
          onNavigateToAppointment={(appointmentId) => {
            onClose();
            navigateTo(AppRoutes.appointmentDetails(appointmentId));
          }}
        />
      );
    case "notifications":
      return (
        <NotificationsModule
          scrollRootRef={overlayScrollRef}
          onNavigateToUserProfile={(username, profession) => {
            onClose();
            navigateTo(AppRoutes.profile(username, profession));
          }}
          onNavigateToEmploymentRequest={(employmentRequestId) => {
            onClose();
            navigateTo(AppRoutes.employmentRequest(employmentRequestId));
          }}
          onNavigateToAppointmentDetails={(appointmentId) => {
            onClose();
            navigateTo(AppRoutes.appointmentDetails(appointmentId));
          }}
        />
      );
    case "search":
      return (
        <SearchUsersModule
          onNavigateToUserProfile={(username, profession) => {
            onClose();
            navigateTo(AppRoutes.profile(username, profession));
          }}
        />
      );
    default:
      return null;
  }
}
