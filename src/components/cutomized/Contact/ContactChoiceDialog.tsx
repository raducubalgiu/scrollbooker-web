"use client";

import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/components/core/Modal/Modal";
import ContactChoiceContent from "./ContactChoiceContent";
import { ContactClickTypeEnum } from "@/ts/enums/ContactClickTypeEnum";

type ContactChoiceDialogProps = {
  open: boolean;
  phone: string;
  onClose: () => void;
  onTrackClick?: (clickType: ContactClickTypeEnum) => void;
};

const ContactChoiceDialog = ({
  open,
  phone,
  onClose,
  onTrackClick,
}: ContactChoiceDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        slotProps={{ paper: { sx: styles.drawer } }}
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          position="relative"
          mx={1.5}
          minHeight={35}
        >
          <Typography fontWeight={800}>Contactează</Typography>

          <IconButton
            onClick={onClose}
            size="small"
            sx={{ position: "absolute", right: 0 }}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        </Stack>

        <Box sx={{ px: 1.5, pb: 2, pt: 1 }}>
          <ContactChoiceContent
            phone={phone}
            onClose={onClose}
            onTrackClick={onTrackClick}
          />
        </Box>
      </Drawer>
    );
  }

  return (
    <Modal
      title="Contactează"
      open={open}
      handleClose={onClose}
      maxWidth="xs"
      fullWidth
      dividers={false}
    >
      <Box sx={{ p: { xs: 1.5, lg: 1.5 } }}>
        <ContactChoiceContent
          phone={phone}
          onClose={onClose}
          onTrackClick={onTrackClick}
        />
      </Box>
    </Modal>
  );
};

export default ContactChoiceDialog;

const styles = {
  drawer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    py: 1.5,
  },
};
