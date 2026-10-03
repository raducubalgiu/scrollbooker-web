import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import IosShareIcon from "@mui/icons-material/IosShare";
import React from "react";
import { AppRoutes } from "@/utils/routes";
import { useAppNavigation } from "@/hooks/useAppNavigation";
import ProfileActionButton from "./ProfileActionButton";

type MyProfileActionsProps = {
  is_business_or_employee: boolean;
  onOpenEditModal: () => void;
  onShare: () => void;
};

const MyProfileActions = ({
  is_business_or_employee,
  onOpenEditModal,
  onShare,
}: MyProfileActionsProps) => {
  const { navigateTo } = useAppNavigation();

  return (
    <>
      <ProfileActionButton
        color="secondary"
        title="Editează"
        onClick={onOpenEditModal}
      />

      {is_business_or_employee ? (
        <ProfileActionButton
          color="secondary"
          title="Calendar"
          onClick={() => navigateTo(AppRoutes.calendar())}
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
