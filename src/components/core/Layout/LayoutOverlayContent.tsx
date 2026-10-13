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
	switch (activeView) {
		case "appointments":
			return (
				<AppointmentsModule
					scrollRootRef={overlayScrollRef}
					onNavigate={onClose}
				/>
			);
		case "notifications":
			return (
				<NotificationsModule
					scrollRootRef={overlayScrollRef}
					onNavigate={onClose}
				/>
			);
		case "search":
			return <SearchUsersModule onNavigate={onClose} />;
		default:
			return null;
	}
}
