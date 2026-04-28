import { useMutate } from "@/hooks/useHttp";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const GENDERS = [
  {
    label: "Bărbați",
    value: "male",
  },
  {
    label: "Femei",
    value: "female",
  },
  {
    label: "Prefer să nu spun",
    value: "other",
  },
];

const CollectGenderStep = () => {
  const { update } = useSession();
  const router = useRouter();
  const [gender, setGender] = React.useState("other");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const { mutate: handleSaveGender, isPending } = useMutate({
    key: ["collect-client-gender"],
    url: "/api/onboarding/collect-gender",
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
      sx={{ minHeight: "100vh" }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight={700}>
              Alege genul tău
            </Typography>

            <Typography color="text.secondary">
              Ne ajută să îți oferim servicii relevante pentru tine
            </Typography>
          </Stack>

          <FormControl>
            <RadioGroup
              aria-labelledby="radio-buttons-group"
              name="radio-buttons-group"
              value={gender}
              onChange={handleChange}
            >
              {GENDERS.map((gender) => (
                <FormControlLabel
                  key={gender.value}
                  value={gender.value}
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 32.5,
                        },
                      }}
                    />
                  }
                  label={gender.label}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            size="large"
            fullWidth
            loading={isPending}
            onClick={() => handleSaveGender({ gender })}
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

export default CollectGenderStep;
