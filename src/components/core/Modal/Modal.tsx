import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogProps,
  IconButton,
  Typography,
  DialogActions,
  Stack,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ActionButtonType } from "../ActionButton/ActionButton";
import ActionButton from "../ActionButton/ActionButton";
import { isEmpty } from "lodash";

type ModalPropsType = DialogProps & {
  handleClose: () => void;
  actions?: ActionButtonType[];
  dividers?: boolean;
  showFooter?: boolean;
  align?: "center" | "left";
};

type ModalTitlePropsType = {
  title?: string;
  onClose: () => void;
  align?: "center" | "left";
};

const ModalTitle = ({
  title,
  onClose,
  align = "left",
  ...other
}: ModalTitlePropsType) => {
  return (
    <DialogTitle component="div" {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <IconButton aria-label="close" size="large" disabled={true}>
          <CloseIcon fontSize="large" sx={{ color: "transparent" }} />
        </IconButton>
        <Typography
          variant="h5"
          fontWeight={600}
          sx={align === "center" ? { flex: 1, textAlign: "center" } : {}}
        >
          {title}
        </Typography>
        <IconButton aria-label="close" onClick={onClose} size="large">
          <CloseIcon fontSize="large" />
        </IconButton>
      </Stack>
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
  title = "",
  children,
  open,
  actions = [],
  dividers = true,
  showFooter = true,
  align = "left",
  ...others
}: ModalPropsType) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog"
      open={open}
      maxWidth="lg"
      {...others}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 10,
        },
      }}
    >
      <ModalTitle title={title} onClose={handleClose} align={align} />
      <DialogContent
        dividers={dividers}
        sx={{ pb: showFooter ? undefined : 0 }}
      >
        {children}
      </DialogContent>
      {showFooter && <ModalFooter actions={actions} />}
    </Dialog>
  );
}
