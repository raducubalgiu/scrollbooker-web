import { Button, Typography } from "@mui/material";
import CustomStack from "../../core/CustomStack/CustomStack";

type MainLayoutProps = {
	title?: string;
	actionTitle?: string;
	children: React.ReactNode;
	hideAction?: boolean;
	onOpenModal?: () => void;
};

export default function MainLayout({
	title,
	actionTitle,
	children,
	hideAction = false,
	onOpenModal,
}: MainLayoutProps) {
	return (
		<>
			<CustomStack sx={{ mb: 2.5 }}>
				<Typography sx={{ fontWeight: "600", fontSize: 20 }}>
					{title}
				</Typography>
				{!hideAction && (
					<Button onClick={onOpenModal} variant="contained">
						{!!actionTitle ? actionTitle : "Adaugă"}
					</Button>
				)}
			</CustomStack>
			{children}
		</>
	);
}
