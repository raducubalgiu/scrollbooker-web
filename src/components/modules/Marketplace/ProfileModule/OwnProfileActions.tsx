import { Button } from "@mui/material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import React from "react";

type OwnProfileActionsProps = {
  is_business_or_employee: boolean;
};

const OwnProfileActions = ({
  is_business_or_employee,
}: OwnProfileActionsProps) => {
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {}}
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
          onClick={() => {}}
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
