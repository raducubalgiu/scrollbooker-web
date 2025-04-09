import { Button, ButtonProps, SxProps, Stack } from "@mui/material";

export type ActionButtonType = {
	title: string;
	props?: ButtonProps;
	hidden?: boolean;
};

type ActionButtonProps = {
	actions: ActionButtonType[];
	sx?: SxProps;
};

const ActionButton = ({ actions, sx }: ActionButtonProps) => {
	return (
		<Stack flexDirection="row" alignItems="center" sx={sx}>
			{actions.map((btn, index) => (
				<Button
					key={index}
					variant="contained"
					sx={{
						ml: 2,
						mt: 2,
						fontWeight: 600,
						"&:nth-child(1)": { ml: 0 },
						display: btn.hidden ? "none" : "block",
					}}
					{...btn.props}
				>
					{btn.title}
				</Button>
			))}
		</Stack>
	);
};

export default ActionButton;
