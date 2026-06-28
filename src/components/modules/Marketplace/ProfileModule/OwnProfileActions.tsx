import { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import React from "react";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";

type OwnProfileActionsProps = {
  is_business_or_employee: boolean;
  onOpenEditModal: () => void;
};

const OwnProfileActions = ({
  is_business_or_employee,
  onOpenEditModal,
}: OwnProfileActionsProps) => {
  const { navigateTo } = useAppNavigation();
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const buttonSx = {
    textTransform: "none",
    flex: { xs: 1, sm: "none" },
    whiteSpace: "nowrap",
    minWidth: "max-content",
    py: { xs: 1, lg: 1.5 },
    px: { xs: 2.5, lg: 2 },
    color: "text.primary",
  };

  const handleShare = async () => {
    const shareData = {
      title: "Profilul meu",
      text: "Aruncă o privire peste profilul meu!",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Utilizatorul a anulat partajarea.");
          return;
        }
        console.error("Eroare reală la partajare:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Eroare la copiere:", error);
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={onOpenEditModal}
        size="large"
        sx={buttonSx}
        disableElevation
      >
        Editează
      </Button>

      {is_business_or_employee ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigateTo(AppRoutes.calendar())}
          size="large"
          startIcon={<DateRangeOutlinedIcon />}
          sx={buttonSx}
          disableElevation
        >
          Calendar
        </Button>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleShare}
          size="large"
          startIcon={<IosShareIcon />}
          sx={buttonSx}
          disableElevation
        >
          Distribuie
        </Button>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          Link-ul a fost copiat în clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default OwnProfileActions;
