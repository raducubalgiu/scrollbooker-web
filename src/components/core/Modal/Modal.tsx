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
import { isEmpty } from "lodash";

type ModalPropsType = DialogProps & {
  handleClose: () => void;
  actions?: ActionButtonType[];
  dividers?: boolean;
  showFooter?: boolean;
};

type ModalTitlePropsType = {
  title?: string;
  onClose: () => void;
};

const ModalTitle = ({ title, onClose, ...other }: ModalTitlePropsType) => {
  return (
    <DialogTitle component="div" {...other}>
      <CustomStack>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Tooltip title="Close">
          <IconButton aria-label="close" onClick={onClose} size="large">
            <CloseIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </CustomStack>
    </DialogTitle>
  );
};

const ModalFooter = ({ actions }: { actions: ActionButtonType[] }) => (
  <DialogActions>
    {!isEmpty(actions) && <ActionButton actions={actions} />}
  </DialogActions>
);

export default function Modal({
  handleClose,
  title,
  children,
  open,
  actions = [],
  dividers = true,
  showFooter = true,
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
      <DialogContent
        dividers={dividers}
        sx={{
          pb: showFooter ? undefined : 0,
        }}
      >
        {children}
      </DialogContent>
      {showFooter && <ModalFooter actions={actions} />}
    </Dialog>
  );
}
