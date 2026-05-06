import { Button } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
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
    textTransform: "capitalize",
    flex: { xs: 1, sm: "none" },
    whiteSpace: "nowrap",
    minWidth: "max-content",
  };

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onOpenEditModal}
        size="large"
        sx={buttonSx}
      >
        Editează
      </Button>

      {is_business_or_employee ? (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/admin/calendar")}
          size="large"
          startIcon={<DateRangeOutlinedIcon />}
          sx={buttonSx}
        >
          Calendar
        </Button>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          startIcon={<DateRangeOutlinedIcon />}
          sx={buttonSx}
        >
          Distribuie
        </Button>
      )}
    </>
  );
};

export default OwnProfileActions;
