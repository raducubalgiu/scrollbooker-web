import { Button, ButtonProps, SxProps } from "@mui/material";
import React from "react";

type CButtonProps = {
  onClick: () => void;
  label: string;
} & ButtonProps;

const CButton = ({ onClick, label, ...props }: CButtonProps) => {
  return (
    <Button
      variant="contained"
      size="large"
      fullWidth
      sx={{ fontWeight: 700, ...props.sx }}
      onClick={onClick}
      disableElevation
      {...props}
    >
      {label}
    </Button>
  );
};

export default CButton;
