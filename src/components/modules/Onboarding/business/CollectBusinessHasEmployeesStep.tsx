import React, { useState } from "react";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useMutate } from "@/hooks/useHttp";
import { OnboardingResponse } from "@/ts/models/onboarding/Onboarding";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CollectBusinessHasEmployeesStep = () => {
  const { update } = useSession();
  const router = useRouter();
  const [hasEmployees, setHasEmployees] = useState(false);

  const { mutate: handleSave, isPending } = useMutate({
    key: ["collect-business-has-employees"],
    url: "/api/onboarding/collect-business-has-employees",
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
    <BusinessOnboardingSectionLayout
      title="Echipa ta primește programări?"
      description="Alege „Da” dacă ai colegi care lucrează în paralel. Fiecare va primi
            un calendar individual pentru a-și gestiona propriile servicii și
            clienți. Dacă lucrezi singur, totul va fi centralizat într-un singur
            calendar business."
      isLoading={isPending}
      isDisabled={isPending}
      onClick={() => handleSave({ has_employees: hasEmployees })}
    >
      <Divider sx={{ mt: 5, mb: 2.5 }} />

      <RadioGroup
        name="has_employees"
        value={hasEmployees?.toString() ?? ""}
        onChange={(e) => setHasEmployees(e.target.value === "true")}
      >
        <FormControlLabel
          value="true"
          control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 32.5 } }} />}
          label="DA, am angajați care primesc programari"
          labelPlacement="start"
          sx={{
            justifyContent: "space-between",
            m: 0,
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />

        <FormControlLabel
          value="false"
          control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 32.5 } }} />}
          label="NU am angajati care primesc programari"
          labelPlacement="start"
          sx={{
            justifyContent: "space-between",
            m: 0,
            py: 2.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        />
      </RadioGroup>
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessHasEmployeesStep;
