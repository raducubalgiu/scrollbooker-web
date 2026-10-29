import React, { useState } from "react";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { useTranslations } from "next-intl";
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { useCollectBusinessInstantBookingMutation } from "@/controllers/onboarding/onboarding.controller";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CollectBusinessInstantBookingStep = () => {
  const t = useTranslations("onboarding.instantBooking");
  const [instantBooking, setInstantBooking] = useState(true);
  const { update } = useSession();
  const router = useRouter();

  const { mutate: handleSave, isPending: isLoadingSave } =
    useCollectBusinessInstantBookingMutation();

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isLoadingSave}
      isDisabled={isLoadingSave}
      onClick={() =>
        handleSave(
          { instant_booking: instantBooking },
          {
            onSuccess: async (data) => {
              await update({
                is_validated: data.is_validated,
                registration_step: data.registration_step,
              });

              router.refresh();
            },
          }
        )
      }
    >
      <Divider sx={{ mt: 5, mb: 2.5 }} />

      <Stack spacing={2.5}>
        <Stack flexDirection="row" alignItems="center" gap={2.5}>
          <CalendarMonthIcon color="primary" />

          <Stack spacing={0.5}>
            <Typography fontWeight={600}>{t("calendarInfoTitle")}</Typography>
            <Typography variant="body2">
              {t("calendarInfoDescription")}
            </Typography>
          </Stack>
        </Stack>

        <Stack flexDirection="row" alignItems="center" gap={2.5}>
          <BarChartOutlinedIcon color="primary" />

          <Stack spacing={0.5}>
            <Typography fontWeight={600}>{t("dashboardTitle")}</Typography>
            <Typography variant="body2">{t("dashboardDescription")}</Typography>
          </Stack>
        </Stack>

        <Stack flexDirection="row" alignItems="center" gap={2.5}>
          <ElectricBoltOutlinedIcon color="primary" />

          <Stack spacing={0.5}>
            <Typography fontWeight={600}>{t("bookingsTitle")}</Typography>
            <Typography variant="body2">{t("bookingsDescription")}</Typography>
          </Stack>
        </Stack>

        <RadioGroup
          name="instantBooking"
          value={instantBooking}
          onChange={(e) => setInstantBooking(e.target.value === "true")}
        >
          <FormControlLabel
            value="true"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 32.5 } }} />
            }
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {t("yes")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("yesDescription")}
                </Typography>
              </Box>
            }
            labelPlacement="start"
            sx={styles.formControl}
          />

          <FormControlLabel
            value="false"
            control={
              <Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 32.5 } }} />
            }
            label={
              <Box sx={{ ml: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 700 }}>
                  {t("no")}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {t("noDescription")}
                </Typography>
              </Box>
            }
            labelPlacement="start"
            sx={styles.formControl}
          />
        </RadioGroup>
      </Stack>
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessInstantBookingStep;

const styles = {
  formControl: {
    justifyContent: "space-between",
    m: 0,
    py: 2.5,
    borderBottom: "1px solid",
    borderColor: "divider",
  },
};
