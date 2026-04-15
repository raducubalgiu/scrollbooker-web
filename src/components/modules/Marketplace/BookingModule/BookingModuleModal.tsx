import {
  alpha,
  Box,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
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
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
              },
              gap: 10,
            }}
          >
            <Box sx={{ border: 1, borderColor: "divider" }}>Left</Box>
            <Box sx={{ border: 1, borderColor: "divider" }}>Right</Box>
          </Box>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModuleModal;
