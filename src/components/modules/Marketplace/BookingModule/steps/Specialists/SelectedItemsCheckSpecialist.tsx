import React from "react";
import { SelectedBookingItem } from "../../BookingModule";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  alpha,
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import { formatPrice } from "@/utils/formatPrice";

type SelectedItemsCheckSpecialistProps = {
  item: SelectedBookingItem;
  eligibleEmployees: BookingFlowUser[];
  selectedEmployeeId: number | null;
};

const SelectedItemsCheckSpecialist = ({
  item,
  eligibleEmployees,
  selectedEmployeeId,
}: SelectedItemsCheckSpecialistProps) => {
  const theme = useTheme();

  const currentOffering = item.offerings.find(
    (o) => o.user.id === selectedEmployeeId
  );
  const hasOffering = !!currentOffering;

  const offerings = item.offerings || [];
  const prices = offerings.map((o) => o.price_with_discount);
  const hasPriceVariance = offerings.length > 1 && new Set(prices).size > 1;

  return (
    <Box
      key={item.productId}
      sx={{
        p: 3,
        mb: 2.5,
        borderRadius: 4,
        border: 1.5,
        borderColor: hasOffering ? "divider" : "error.light",
        bgcolor: hasOffering
          ? "transparent"
          : alpha(theme.palette.error.main, 0.02),
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography fontSize={20} fontWeight={700}>
            {item.productName}
          </Typography>
          <Typography color="text.secondary" fontWeight={500}>
            {item.variantName} •{" "}
            {ProductUtils.getDurationText(item.variantDuration)}
          </Typography>
        </Box>

        {hasOffering && (
          <Typography variant="h6" fontWeight={700}>
            {formatPrice(currentOffering.price_with_discount)} RON
          </Typography>
        )}
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mt={3}
      >
        <Stack direction="row" alignItems="center" gap={1.5}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              bgcolor: hasOffering ? "success.main" : "error.main",
              boxShadow: `0 0 0 4px ${hasOffering ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.error.main, 0.1)}`,
            }}
          />
          <Typography
            fontWeight={600}
            color={hasOffering ? "success.main" : "error.main"}
            fontSize={15}
          >
            {hasOffering
              ? "Disponibil la acest specialist"
              : "Nu oferă acest serviciu"}
          </Typography>
        </Stack>

        {!hasOffering && (
          <Button
            color="error"
            variant="text"
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => {}}
            sx={{ fontWeight: 700, textTransform: "none" }}
          >
            Elimină
          </Button>
        )}
      </Stack>

      {hasPriceVariance && (
        <Accordion
          elevation={0}
          sx={{
            mt: 2,
            bgcolor: alpha(theme.palette.action.hover, 0.04),
            borderRadius: "12px !important",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: 20 }} />}
          >
            <Typography fontSize={14} fontWeight={600} color="text.secondary">
              Preturile difera in functie de specialist
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 0 }}>
            <Stack spacing={1.5}>
              {eligibleEmployees.map((emp) => {
                const offering = item.offerings.find(
                  (o) => o.user.id === emp.id
                );
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
                      <Avatar
                        src={emp.avatar ?? ""}
                        sx={{ width: 28, height: 28 }}
                      />
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
      )}
    </Box>
  );
};

export default SelectedItemsCheckSpecialist;
