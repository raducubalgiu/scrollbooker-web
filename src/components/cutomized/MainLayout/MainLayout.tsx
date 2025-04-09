import { Button, Typography } from "@mui/material";
import CustomStack from "../../core/CustomStack/CustomStack";

type MainLayoutProps = {
	title?: string;
	children: React.ReactNode;
	hideAction?: boolean;
	onOpenModal?: () => void;
};

export default function MainLayout({
	title,
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
						Adauga
					</Button>
				)}
			</CustomStack>
			{children}
		</>
	);
}
