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
  SxProps,
  Theme,
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
  customFooter?: React.ReactNode;
  headerPadding?: SxProps<Theme> | undefined;
};

type ModalTitlePropsType = {
  title?: string;
  onClose: () => void;
  fullScreen?: boolean;
  align?: "center" | "left";
  headerPadding?: SxProps<Theme> | undefined;
};

const ModalTitle = ({
  title,
  onClose,
  fullScreen = false,
  align = "left",
  headerPadding,
  ...other
}: ModalTitlePropsType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DialogTitle
      component="div"
      sx={{
        p: { xs: 1, md: 3 },
        ...headerPadding,
      }}
      {...other}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={align === "center" ? "center" : "space-between"}
        position="relative"
        width="100%"
        minHeight={40}
      >
        <Typography
          fontSize={{ xs: 16, lg: 22 }}
          fontWeight={700}
          sx={{
            textAlign: align,
            width: align === "center" ? "100%" : "auto",
            px: align === "center" ? 4 : 0,
          }}
        >
          {title}
        </Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          size={isMobile ? "medium" : "large"}
          sx={{
            position: align === "center" ? "absolute" : "relative",
            right: align === "center" ? 0 : undefined,
          }}
        >
          <CloseIcon sx={{ fontSize: { xs: 27.5, lg: 35 } }} />
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
  customFooter,
  headerPadding,
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
      disableScrollLock={false}
      {...others}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: fullScreen ? 0 : 10,
          transition: "border-radius 0.2s ease-in-out",
          display: "flex",
          flexDirection: "column",
          maxHeight: fullScreen ? "100vh" : "calc(100vh - 64px)",
        },
      }}
    >
      <ModalTitle
        title={title}
        onClose={handleClose}
        align={align}
        headerPadding={headerPadding}
      />

      <DialogContent
        dividers={dividers}
        sx={{
          pb: showFooter ? undefined : 0,
          p: { xs: 0, lg: 3 },
          flexGrow: 1,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </DialogContent>

      {showFooter && <ModalFooter actions={actions} />}
      {customFooter && (
        <DialogActions sx={{ p: 3, pt: 0 }}>{customFooter}</DialogActions>
      )}
    </Dialog>
  );
}
