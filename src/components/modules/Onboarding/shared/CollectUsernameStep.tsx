import {
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { debounce } from "lodash";
import { useCheckUsernameAvailability } from "@/controllers/search/search.controller";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCollectUsernameMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";
import { onboardingTitleSx } from "../onboarding.styles";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";

const CollectUsernameStep = () => {
  const t = useTranslations("onboarding.username");
  const [username, setUsername] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const { update } = useSession();
  const router = useRouter();

  const debouncedSetValue = useMemo(
    () => debounce((value: string) => setDebouncedValue(value), 400),
    []
  );

  useEffect(() => {
    debouncedSetValue(username);
    return () => debouncedSetValue.cancel();
  }, [username, debouncedSetValue]);

  const { data, isLoading, isFetching } =
    useCheckUsernameAvailability(debouncedValue);

  const { mutate: handleSaveUsername, isPending: isLoadingSave } =
    useCollectUsernameMutation();

  const isLoadingSearch = isLoading || isFetching;

  const endAdornment = (() => {
    if (!debouncedValue || debouncedValue.trim().length < 2) return null;

    if (isLoadingSearch) {
      return <CircularProgress size={20} />;
    }

    if (data?.available === true) {
      return <CheckIcon color="success" />;
    }

    if (data?.available === false) {
      return <CloseIcon color="error" />;
    }

    return null;
  })();

  return (
    <Stack
      alignItems="center"
      justifyContent={{ xs: "flex-start", md: "center" }}
      sx={{ minHeight: "100%", mt: { xs: 7.5, md: 0 } }}
    >
      <Container maxWidth="sm">
        <Stack mb={2} gap={0.5}>
          <Typography variant="h4" sx={onboardingTitleSx}>
            {t("title")}
          </Typography>

          <Typography color="text.secondary">{t("subtitle")}</Typography>
        </Stack>

        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 1.5 }}
          size="medium"
          placeholder={t("placeholder")}
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmailIcon />
                </InputAdornment>
              ),
              endAdornment: endAdornment ? (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ) : undefined,
            },
          }}
        />

        <AuthGradientButton
          fullWidth
          loading={isLoadingSave || isLoadingSearch}
          disabled={isLoadingSearch || !data?.available}
          onClick={() =>
            handleSaveUsername(
              { username },
              {
                onSuccess: async (data) => {
                  await update({
                    username,
                    is_validated: data.is_validated,
                    registration_step: data.registration_step,
                  });

                  router.refresh();
                },
              }
            )
          }
          disableElevation
          sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
        >
          {t("save")}
        </AuthGradientButton>
      </Container>
    </Stack>
  );
};

export default CollectUsernameStep;
