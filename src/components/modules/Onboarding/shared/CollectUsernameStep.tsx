import {
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useCustomQuery, useMutate } from "@/hooks/useHttp";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { SearchUsername } from "@/ts/models/user/SearchUsername";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";

const CollectUsernameStep = () => {
  const [username, setUsername] = useState("");
  const { update } = useSession();
  const router = useRouter();

  const debouncedValue = useDebouncedValue(username, 400);

  const { data, isLoading, isFetching } = useCustomQuery<SearchUsername>({
    key: ["search-users", debouncedValue],
    url: "/api/user/search-username",
    params: {
      query: debouncedValue,
    },
    options: {
      enabled: debouncedValue.trim().length > 2,
      staleTime: 1000 * 60,
    },
  });

  const { mutate: handleSaveUsername, isPending: isLoadingSave } = useMutate({
    key: ["collect-username"],
    url: "/api/onboarding/collect-username",
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
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", bgcolor: "background.paper" }}
    >
      <Container maxWidth="sm">
        <Stack mb={2} gap={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Nume de utilizator
          </Typography>

          <Typography color="text.secondary">
            Alege un nume unic pentru profilul tău. Poți alege orice variantă
            disponibilă
          </Typography>
        </Stack>

        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 1.5 }}
          size="medium"
          placeholder="Username"
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

        <Button
          variant="contained"
          size="large"
          fullWidth
          loading={isLoadingSave}
          disabled={isLoadingSearch || !data?.available}
          onClick={() => handleSaveUsername({ username })}
          disableElevation
          sx={{ fontWeight: 600, p: 1.5, fontSize: 17 }}
        >
          Salvează
        </Button>
      </Container>
    </Stack>
  );
};

export default CollectUsernameStep;
