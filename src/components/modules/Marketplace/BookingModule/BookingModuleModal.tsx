import {
  alpha,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import React from "react";

type BookingModuleModalProps = {
  open: boolean;
  onClose: () => void;
};

const BookingModuleModal = ({ open, onClose }: BookingModuleModalProps) => {
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog"
      open={open}
      fullScreen
    >
      <DialogTitle component="div">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          sx={{
            width: 65,
            height: 65,
            color: "text.primary",
            //border: 1,
            border: (theme) =>
              `1px solid ${alpha(theme.palette.text.primary, 0.2)}`,
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <ArrowBackRoundedIcon fontSize="large" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Container>
          <Typography>Booking</Typography>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModuleModal;
