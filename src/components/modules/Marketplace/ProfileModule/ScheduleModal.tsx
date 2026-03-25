import Modal from "@/components/core/Modal/Modal";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import { useCustomQuery } from "@/hooks/useHttp";
import { Schedule } from "@/ts/models/booking/schedule/Schedule";
import { Box } from "@mui/material";
import React from "react";

type ScheduleModalProps = {
  open: boolean;
  userId: number;
  handleClose: () => void;
};

const ScheduleModal = ({ userId, open, handleClose }: ScheduleModalProps) => {
  const { data, isLoading } = useCustomQuery<Schedule[]>({
    url: `/api/schedules?userId=${userId}`,
    key: ["user-schedule", userId],
    options: {
      enabled: open,
    },
  });

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title="Programul de lucru"
      maxWidth="sm"
      fullWidth
    >
      <Box sx={{ p: 2 }}>
        {isLoading ? <p>Loading...</p> : <SchedulesSection schedules={data} />}
      </Box>
    </Modal>
  );
};

export default ScheduleModal;
