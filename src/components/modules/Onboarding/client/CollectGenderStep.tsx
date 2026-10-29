import { useCollectGenderMutation } from "@/controllers/onboarding/onboarding.controller";
import {
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
import { useTranslations } from "next-intl";
import { onboardingTitleSx } from "../onboarding.styles";
import AuthGradientButton from "@/components/modules/AuthModule/AuthGradientButton";

const CollectGenderStep = () => {
  const t = useTranslations("onboarding.gender");
  const { update } = useSession();
  const router = useRouter();
  const [gender, setGender] = React.useState("other");

  const GENDERS = [
    { label: t("male"), value: "male" },
    { label: t("female"), value: "female" },
    { label: t("preferNotToSay"), value: "other" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const { mutate: handleSaveGender, isPending } = useCollectGenderMutation();

  return (
    <Stack
      alignItems="center"
      justifyContent={{ xs: "flex-start", md: "center" }}
      sx={{ minHeight: "100%", mt: { xs: 7.5, md: 0 } }}
    >
      <Container maxWidth="sm">
        <Stack spacing={3}>
          <Stack spacing={1}>
            <Typography variant="h4" sx={onboardingTitleSx}>
              {t("title")}
            </Typography>

            <Typography color="text.secondary">{t("subtitle")}</Typography>
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

          <AuthGradientButton
            fullWidth
            loading={isPending}
            onClick={() =>
              handleSaveGender(
                { gender },
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
            disableElevation
          >
            {t("save")}
          </AuthGradientButton>
        </Stack>
      </Container>
    </Stack>
  );
};

export default CollectGenderStep;
