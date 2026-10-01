import Modal from "@/components/core/Modal/Modal";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import { useGetSchedulesByUserId } from "@/controllers/booking/schedule.controller";
import { Box } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

type ScheduleModalProps = {
  open: boolean;
  userId: number;
  handleClose: () => void;
};

const ScheduleModal = ({ userId, open, handleClose }: ScheduleModalProps) => {
  const t = useTranslations("scheduleModal");
  const { data, isLoading } = useGetSchedulesByUserId(String(userId), {
    enabled: open,
  });

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={t("title")}
      maxWidth="sm"
      fullWidth
    >
      <Box sx={{ p: 2 }}>
        {isLoading ? <p>{t("loading")}</p> : <SchedulesSection schedules={data} />}
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
