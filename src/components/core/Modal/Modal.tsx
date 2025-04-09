import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogProps,
	Tooltip,
	IconButton,
	Typography,
	DialogActions,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomStack from "../CustomStack/CustomStack";
import { ActionButtonType } from "../ActionButton/ActionButton";
import ActionButton from "../ActionButton/ActionButton";

type ModalPropsType = DialogProps & {
	handleClose: () => void;
	actions: ActionButtonType[];
};

type ModalTitlePropsType = {
	title?: string;
	onClose: () => void;
};

const ModalTitle = ({ title, onClose, ...other }: ModalTitlePropsType) => {
	return (
		<DialogTitle component="div" {...other}>
			<CustomStack>
				<Typography>{title}</Typography>
				<Tooltip title="Close">
					<IconButton aria-label="close" onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Tooltip>
			</CustomStack>
		</DialogTitle>
	);
};

const ModalFooter = ({ actions }: { actions: ActionButtonType[] }) => (
	<DialogActions>
		<ActionButton actions={actions} />
	</DialogActions>
);

export default function Modal({
	handleClose,
	title,
	children,
	open,
	actions,
	...others
}: ModalPropsType) {
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog"
			open={open}
			maxWidth="lg"
			{...others}
		>
			<ModalTitle title={title} onClose={handleClose} />
			<DialogContent dividers>{children}</DialogContent>
			<ModalFooter actions={actions} />
		</Dialog>
	);
}
