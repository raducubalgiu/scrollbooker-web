import React from "react";
import { Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SwapHorizRoundedIcon from "@mui/icons-material/SwapHorizRounded";
import { BusinessEmployee } from "@/ts/models/booking/business/BusinessEmployee";
import CalendarAvatar from "../../CalendarAvatar";
import { useGetCalendarSettings } from "@/controllers/booking/calendarSettings.controller";

type CreateOwnClientEmployeeSectionProps = {
  step: number;
  selectedEmployee: BusinessEmployee | null;
  onOpenSelect: () => void;
};

const CreateOwnClientEmployeeSection = ({
  step,
  selectedEmployee,
  onOpenSelect,
}: CreateOwnClientEmployeeSectionProps) => {
  const { data: employeeSettings } = useGetCalendarSettings(selectedEmployee?.id);

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          {step}. Angajat
        </Typography>

        {selectedEmployee && (
          <Button
            size="small"
            startIcon={<SwapHorizRoundedIcon />}
            onClick={onOpenSelect}
          >
            Schimbă
          </Button>
        )}
      </Stack>

      {selectedEmployee ? (
        <Stack direction="row" alignItems="center" spacing={1.5} sx={styles.card}>
          <CalendarAvatar
            src={selectedEmployee.avatar}
            name={selectedEmployee.fullname}
            calendarColor={employeeSettings?.calendar_color ?? null}
            sx={styles.avatar}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography fontSize={16} fontWeight={600} noWrap>
              {selectedEmployee.fullname}
            </Typography>
            {selectedEmployee.job && (
              <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.2 }}>
                {selectedEmployee.job}
              </Typography>
            )}
          </Box>
        </Stack>
      ) : (
        <ButtonBase onClick={onOpenSelect} sx={styles.trigger}>
          <BadgeOutlinedIcon sx={{ color: "text.secondary", flexShrink: 0 }} />
          <Typography color="text.secondary" noWrap sx={{ flex: 1, minWidth: 0, textAlign: "left" }}>
            Alege angajatul
          </Typography>
          <ChevronRightIcon sx={{ color: "action.active" }} />
        </ButtonBase>
      )}
    </Stack>
  );
};

export default CreateOwnClientEmployeeSection;

const styles = {
  card: {
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    bgcolor: "background.paper",
    px: 2,
    py: 1.5,
  },
  avatar: {
    width: 36,
    height: 36,
    fontSize: 15,
  },
  trigger: {
    display: "flex",
    alignItems: "center",
    gap: 1.5,
    width: "100%",
    border: 1,
    borderColor: "divider",
    borderRadius: 3,
    px: 2,
    py: 1.5,
  },
};
