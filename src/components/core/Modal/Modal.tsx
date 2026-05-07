import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogProps,
  IconButton,
  Typography,
  DialogActions,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ActionButtonType } from "../ActionButton/ActionButton";
import ActionButton from "../ActionButton/ActionButton";
import { isEmpty } from "lodash";

type ModalPropsType = DialogProps & {
  handleClose: () => void;
  actions?: ActionButtonType[];
  dividers?: boolean;
  align?: "center" | "left";
};

type ModalTitlePropsType = {
  title?: string;
  onClose: () => void;
  fullScreen?: boolean;
  align?: "center" | "left";
};

const ModalTitle = ({
  title,
  onClose,
  fullScreen = false,
  align = "left",
  ...other
}: ModalTitlePropsType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DialogTitle component="div" {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        {align === "center" && (
          <IconButton
            aria-label="close"
            size={isMobile ? "medium" : "large"}
            disabled={true}
          >
            <CloseIcon
              fontSize={isMobile ? "medium" : "large"}
              sx={{ color: "transparent" }}
            />
          </IconButton>
        )}
        <Typography
          variant="h5"
          fontWeight={600}
          sx={align === "center" ? { flex: 1, textAlign: "center" } : {}}
        >
          {title}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          size={isMobile ? "medium" : "large"}
        >
          <CloseIcon fontSize={isMobile ? "medium" : "large"} />
        </IconButton>
      </Stack>
    </DialogTitle>
  );
};

const ModalFooter = ({ actions }: { actions: ActionButtonType[] }) => (
  <DialogActions sx={{ p: 3, pt: 2 }}>
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
  fullScreen,
  align = "left",
  ...others
}: ModalPropsType) {
  const showFooter = actions.length > 0;

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog"
      open={open}
      maxWidth="lg"
      fullScreen={fullScreen ?? false}
      {...others}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 10,
          transition: "border-radius 0.2s ease-in-out",
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
