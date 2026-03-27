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

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={onOpenEditModal}
        size="large"
        disableElevation
        sx={{ mr: 1.5, textTransform: "capitalize" }}
      >
        Editează profilul
      </Button>
      {is_business_or_employee && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => router.push("/admin/calendar")}
          size="large"
          disableElevation
          startIcon={<DateRangeOutlinedIcon />}
          sx={{ textTransform: "capitalize" }}
        >
          Calendar
        </Button>
      )}
      {!is_business_or_employee && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {}}
          size="large"
          disableElevation
          startIcon={<DateRangeOutlinedIcon />}
          sx={{ textTransform: "capitalize" }}
        >
          Distribuie profilul
        </Button>
      )}
    </>
  );
};

export default OwnProfileActions;
