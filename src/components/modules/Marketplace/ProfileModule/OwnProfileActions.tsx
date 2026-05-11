import { Button } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import React from "react";
import { useRouter } from "next/navigation";

type OwnProfileActionsProps = {
  is_business_or_employee: boolean;
  onOpenEditModal: () => void;
};

const OwnProfileActions = ({
  is_business_or_employee,
  onOpenEditModal,
}: OwnProfileActionsProps) => {
  const router = useRouter();

  const buttonSx = {
    textTransform: "none",
    flex: { xs: 1, sm: "none" },
    whiteSpace: "nowrap",
    minWidth: "max-content",
    py: { xs: 1, lg: 1.5 },
    px: { xs: 2.5, lg: 2 },
    color: "text.primary",
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
          onClick={() => router.push("/admin/calendar")}
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
          onClick={() => {}}
          size="large"
          startIcon={<IosShareIcon />}
          sx={buttonSx}
          disableElevation
        >
          Distribuie
        </Button>
      )}
    </>
  );
};

export default OwnProfileActions;
