import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

type UserProfileActionsProps = {
  is_business_or_employee: boolean;
  is_follow: boolean;
};

const UserProfileActions = ({
  is_business_or_employee,
  is_follow,
}: UserProfileActionsProps) => {
  return (
    <>
      {is_business_or_employee && (
        <Button
          variant="contained"
          onClick={() => {}}
          size="large"
          disableElevation
          sx={{ mr: 1.5, textTransform: "capitalize" }}
        >
          Rezervă
        </Button>
      )}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {}}
        size="large"
        disableElevation
        sx={{ mr: 1.5, textTransform: "capitalize" }}
        endIcon={is_follow ? <CheckIcon color="primary" /> : null}
      >
        {is_follow ? "Urmărești" : "Urmărește"}
      </Button>
    </>
  );
};

export default UserProfileActions;
