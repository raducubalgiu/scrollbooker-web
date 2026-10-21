import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
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
    </>
  );
};

export default MyProfileActions;
