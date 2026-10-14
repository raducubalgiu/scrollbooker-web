import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Avatar,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SelectedBookingItem } from "../../BookingModule";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";

type SelectedItemPriceVarianceProps = {
  item: SelectedBookingItem;
  eligibleEmployees: BookingFlowUser[];
  selectedEmployeeId: number | null;
};

const SelectedItemPriceVariance = ({
  item,
  eligibleEmployees,
  selectedEmployeeId,
}: SelectedItemPriceVarianceProps) => {
  const theme = useTheme();

  return (
    <Accordion
      elevation={0}
      sx={{
        mt: 2,
        bgcolor: alpha(theme.palette.action.hover, 0.04),
        borderRadius: "12px !important",
        "&:before": { display: "none" },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}>
        <Typography fontSize={14} fontWeight={600} color="text.secondary">
          Preturile difera in functie de specialist
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Stack spacing={1.5}>
          {eligibleEmployees.map((emp) => {
            const offering = item.offerings.find((o) => o.user.id === emp.id);
            const isCurrentlySelected = emp.id === selectedEmployeeId;

            return (
              <Stack
                key={emp.id}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  opacity: offering ? 1 : 0.4,
                  bgcolor: isCurrentlySelected
                    ? alpha(theme.palette.primary.main, 0.08)
                    : "transparent",
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Avatar src={emp.avatar ?? ""} sx={{ width: 28, height: 28 }} />
                  <Typography
                    fontSize={14}
                    fontWeight={isCurrentlySelected ? 700 : 500}
                  >
                    {emp.fullname} {isCurrentlySelected && "(Selectat)"}
                  </Typography>
                </Stack>
                <Typography fontSize={14} fontWeight={700}>
                  {offering ? `${offering.price_with_discount} RON` : "N/A"}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default SelectedItemPriceVariance;
