import { Button, Container, Stack, Typography } from "@mui/material";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useCollectLocationPermissionMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";
import { useUserLocation } from "@/hooks/useUserLocation";

const CollectLocationPermission = () => {
  const t = useTranslations("onboarding.locationPermission");
  const { update } = useSession();
  const router = useRouter();

  const { requestLocation } = useUserLocation({ autoRequest: false });
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);

  const { mutate: handleSaveLocation, isPending } =
    useCollectLocationPermissionMutation();

  const proceed = () => {
    handleSaveLocation(undefined, {
      onSuccess: async (data) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
    });
  };

  const handleAllow = async () => {
    setIsRequestingLocation(true);
    await requestLocation();
    setIsRequestingLocation(false);

    proceed();
  };

  const handleSkip = () => {
    proceed();
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100%" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack alignItems="center" sx={{ mb: 1 }}>
            <LocationOnRoundedIcon color="primary" sx={{ fontSize: 90 }} />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              {t("title")}
            </Typography>

            <Typography color="text.secondary">{t("subtitle")}</Typography>
          </Stack>

          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={isRequestingLocation || isPending}
            onClick={handleAllow}
            disableElevation
            sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
          >
            {t("allow")}
          </Button>

          <Button
            variant="text"
            fullWidth
            disabled={isRequestingLocation || isPending}
            onClick={handleSkip}
            sx={{ fontWeight: 600, color: "text.secondary" }}
          >
            {t("notNow")}
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CollectLocationPermission;
