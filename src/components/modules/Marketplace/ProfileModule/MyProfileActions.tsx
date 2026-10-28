import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button } from "@mui/material";
import React from "react";
import NextLink from "next/link";
import { AppRoutes } from "@/utils/routes";
import ProfileActionButton from "./ProfileActionButton";

type MyProfileActionsProps = {
  isBusinessOrEmployee: boolean;
  instantBooking: boolean;
  onOpenEditModal: () => void;
  onShare: () => void;
};

const MyProfileActions = ({
  isBusinessOrEmployee,
  instantBooking,
  onOpenEditModal,
  onShare,
}: MyProfileActionsProps) => {
  return (
    <>
      <ProfileActionButton
        color="secondary"
        title="Editează profilul"
        onClick={onOpenEditModal}
      />

      {instantBooking && isBusinessOrEmployee ? (
        <ProfileActionButton
          color="secondary"
          title="Calendar"
          component={NextLink}
          href={AppRoutes.calendar()}
          startIcon={<DateRangeOutlinedIcon />}
        />
      ) : (
        <ProfileActionButton
          color="secondary"
          title="Distribuie"
          onClick={onShare}
          startIcon={<IosShareIcon />}
        />
      )}

      <Button
        component={NextLink}
        href={AppRoutes.settings()}
        variant="contained"
        color="secondary"
        disableElevation
        aria-label="Setări"
        sx={styles.settingsButton}
      >
        <SettingsOutlinedIcon fontSize="small" />
      </Button>
    </>
  );
};

export default MyProfileActions;

const styles = {
  settingsButton: {
    display: { xs: "none", lg: "inline-flex" },
    minWidth: 0,
    px: 1.25,
  },
};
