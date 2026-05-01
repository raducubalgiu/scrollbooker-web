import { useMutate } from "@/hooks/useHttp";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const CollectLocationPermission = () => {
  const { update } = useSession();
  const router = useRouter();

  const { mutate: handleSaveLocation, isPending } = useMutate({
    key: ["collect-location-permission"],
    url: "/api/onboarding/collect-location-permission",
    method: "PATCH",
    options: {
      onSuccess: async (data: OnboardingResponse) => {
        await update({
          is_validated: data.is_validated,
          registration_step: data.registration_step,
        });

        router.refresh();
      },
    },
  });

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              Permisiunea locației
            </Typography>

            <Typography color="text.secondary">
              Ne ajută să îți oferim servicii din apropiere și să îți
              personalizăm experiența
            </Typography>
          </Stack>

          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={isPending}
            onClick={() => handleSaveLocation({})}
            disableElevation
            sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
          >
            Salvează
          </Button>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CollectLocationPermission;
