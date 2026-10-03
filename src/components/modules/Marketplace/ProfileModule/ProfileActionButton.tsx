import { Button, ButtonProps } from "@mui/material";
import React from "react";

type ProfileActionButtonProps = {
  title: string;
  onClick: () => void;
} & ButtonProps;

const ProfileActionButton = ({
  title,
  onClick,
  ...props
}: ProfileActionButtonProps) => {
  return (
    <Button
      onClick={onClick}
      sx={styles.container}
      size="medium"
      variant="contained"
      disableElevation
      {...props}
    >
      {title}
    </Button>
  );
};

export default ProfileActionButton;

const styles = {
  container: {
    textTransform: "none",
    flex: { xs: 1, sm: "none" },
    whiteSpace: "nowrap",
    minWidth: "max-content",
    color: "text.primary",
  },
};
