import {
  Avatar,
  Badge,
  Box,
  MenuItem,
  Stack,
  Select,
  Typography,
  FormControl,
  SelectChangeEvent,
  Button,
  alpha,
  AccordionSummary,
  Accordion,
  useTheme,
  AccordionDetails,
} from "@mui/material";
import React, { memo } from "react";
import StarIcon from "@mui/icons-material/Star";
import { formatRating } from "@/utils/formatters";
import { SelectedBookingItem } from "../../BookingModule";
import { ProductUtils } from "@/ts/models/booking/product/Product";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GroupIcon from "@mui/icons-material/Group";
import { formatPrice } from "@/utils/formatPrice";
import { BookingFlowUser } from "@/ts/models/booking/booking/BookingFlow";

type SpecialistsProps = {
  selectedItems: SelectedBookingItem[];
  employees: BookingFlowUser[];
  selectedEmployeeId: number | null;
  onChangeSelectedEmployeeId: (event: SelectChangeEvent<number>) => void;
};

const Specialists = ({
  selectedItems,
  employees,
  selectedEmployeeId,
  onChangeSelectedEmployeeId,
}: SpecialistsProps) => {
  const theme = useTheme();

  const getSelectedOffering = (item: SelectedBookingItem) => {
    return item.offerings.find((o) => o.user.id === selectedEmployeeId);
  };

  const renderSpecialistItem = (
    specialist: BookingFlowUser,
    isSelected = false
  ) => (
    <Stack flexDirection="row" alignItems="center" gap={2} sx={{ py: 0.5 }}>
      <Badge
        invisible={isSelected}
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={styles.badgeContent}
          >
            <StarIcon sx={{ fontSize: 18, mr: 0.5 }} color="primary" />
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {formatRating(specialist.ratings_average)}
            </Typography>
          </Stack>
        }
        sx={styles.badge}
      >
        <Avatar
          sx={{
            ...styles.avatar,
            width: isSelected ? 50 : styles.avatar.width,
            height: isSelected ? 50 : styles.avatar.height,
          }}
          src={specialist.avatar ?? ""}
        />
      </Badge>
      <Box>
        <Typography variant="body1" fontWeight={600} lineHeight={1.2}>
          {specialist.fullname}
        </Typography>
        {!isSelected && (
          <Typography variant="caption" color="text.secondary">
            Specialist
          </Typography>
        )}
      </Box>
    </Stack>
  );

  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography fontWeight={800} fontSize={47.5} mt={3} mb={2}>
        Selectează specialistul
      </Typography>

      <FormControl fullWidth sx={{ mb: 2.5 }}>
        <Select
          value={selectedEmployeeId || ""}
          onChange={onChangeSelectedEmployeeId}
          displayEmpty
          variant="outlined"
          sx={{
            borderRadius: "100px",
            backgroundColor: "transparent",
            transition: "all 0.2s ease-in-out",
            p: 0,

            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "100px",
              border: 1,
              borderColor: "divider",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
              borderWidth: "1px",
            },

            "& .MuiSelect-select": {
              py: 1,
              px: 2,
              display: "flex",
              alignItems: "center",
              backgroundColor: "transparent !important",
            },
          }}
          renderValue={(value) => {
            if (!value) {
              return (
                <Stack flexDirection="row" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "primary.main",
                    }}
                  >
                    <GroupIcon />
                  </Avatar>
                  <Typography color="text.secondary">
                    Selectează un specialist
                  </Typography>
                </Stack>
              );
            }
            const selected = employees.find((s) => s.id === value);
            return selected ? renderSpecialistItem(selected, true) : null;
          }}
        >
          {employees.map((specialist) => (
            <MenuItem
              key={specialist.id}
              value={specialist.id}
              sx={{ borderRadius: "12px", mx: 1, my: 1 }}
            >
              {renderSpecialistItem(specialist)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h5" fontWeight={700} my={3}>
        Verificare servicii
      </Typography>

      {!selectedEmployeeId ? (
        <Box
          sx={{
            p: 6,
            borderRadius: 4,
            border: "2px dashed",
            borderColor: "divider",
            textAlign: "center",
            bgcolor: alpha(theme.palette.action.hover, 0.02),
          }}
        >
          <Typography color="text.secondary" fontWeight={500}>
            Selectează un specialist din lista de mai sus pentru a verifica
            disponibilitatea serviciilor.
          </Typography>
        </Box>
      ) : (
        selectedItems.map((item) => {
          const currentOffering = getSelectedOffering(item);
          const hasOffering = !!currentOffering;

          const offerings = item.offerings || [];
          const prices = offerings.map((o) => o.price_with_discount);
          const hasPriceVariance =
            offerings.length > 1 && new Set(prices).size > 1;

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
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="text.secondary"
                    >
                      Preturile difera in functie de specialist
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Stack spacing={1.5}>
                      {employees.map((emp) => {
                        const offering = item.offerings.find(
                          (o) => o.user.id === emp.id
                        );
                        const isCurrentlySelected =
                          emp.id === selectedEmployeeId;

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
                            <Stack
                              direction="row"
                              alignItems="center"
                              gap={1.5}
                            >
                              <Avatar
                                src={emp.avatar ?? ""}
                                sx={{ width: 28, height: 28 }}
                              />
                              <Typography
                                fontSize={14}
                                fontWeight={isCurrentlySelected ? 700 : 500}
                              >
                                {emp.fullname}{" "}
                                {isCurrentlySelected && "(Selectat)"}
                              </Typography>
                            </Stack>
                            <Typography fontSize={14} fontWeight={700}>
                              {offering
                                ? `${offering.price_with_discount} RON`
                                : "N/A"}
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
        })
      )}
    </Box>
  );
};

export default memo(Specialists);

const styles = {
  badge: {
    "& .MuiBadge-badge": {
      right: "auto",
      left: "50%",
      transform: `translate(-50%, 100%)`,
    },
  },
  badgeContent: {
    backgroundColor: "background.paper",
    px: { xs: 1, lg: 1.5 },
    py: { xs: 0.2, lg: 0.5 },
    borderRadius: 50,
    boxShadow: 1,
  },
  avatar: {
    width: { xs: 50, lg: 65 },
    height: { xs: 50, lg: 65 },
    border: 1,
    borderColor: "divider",
  },
};
