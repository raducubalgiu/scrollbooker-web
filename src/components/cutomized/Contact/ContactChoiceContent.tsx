import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import { buildCallUrl, buildWhatsappUrl } from "@/utils/contact-utils";

type ContactChoiceContentProps = {
  phone: string;
  onClose: () => void;
};

const ContactChoiceContent = ({ phone, onClose }: ContactChoiceContentProps) => {
  const handleWhatsapp = () => {
    window.open(buildWhatsappUrl(phone), "_blank", "noopener,noreferrer");
    onClose();
  };

  const handleCall = () => {
    window.location.href = buildCallUrl(phone);
    onClose();
  };

  return (
    <List sx={{ py: 0 }}>
      <ListItem disablePadding>
        <ListItemButton onClick={handleWhatsapp} sx={styles.item}>
          <ListItemIcon sx={{ minWidth: 44, color: "whatsapp.main" }}>
            <WhatsAppIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Trimite mesaj pe WhatsApp"
            slotProps={{ primary: { fontWeight: 600 } }}
          />
        </ListItemButton>
      </ListItem>

      <ListItem disablePadding>
        <ListItemButton onClick={handleCall} sx={styles.item}>
          <ListItemIcon sx={{ minWidth: 44, color: "primary.main" }}>
            <CallIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText
            primary="Sună"
            slotProps={{ primary: { fontWeight: 600 } }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default ContactChoiceContent;

const styles = {
  item: {
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },
};
