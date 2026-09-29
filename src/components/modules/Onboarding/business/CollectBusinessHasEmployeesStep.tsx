import React, { useState } from "react";
import BusinessOnboardingSectionLayout from "../BusinessOnboardingSectionLayout";
import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCollectBusinessHasEmployeesMutation } from "@/controllers/onboarding/onboarding.controller";
import { useTranslations } from "next-intl";

const CollectBusinessHasEmployeesStep = () => {
  const t = useTranslations("onboarding.hasEmployees");
  const { update } = useSession();
  const router = useRouter();

  const [hasEmployees, setHasEmployees] = useState(false);

  const { mutate: handleSave, isPending: isLoadingSave } =
    useCollectBusinessHasEmployeesMutation();

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      isLoading={isLoadingSave}
      isDisabled={isLoadingSave}
      onClick={() =>
        handleSave(
          { has_employees: hasEmployees },
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

      <RadioGroup
        name="has_employees"
        value={hasEmployees?.toString() ?? ""}
        onChange={(e) => setHasEmployees(e.target.value === "true")}
      >
        <FormControlLabel
          value="true"
          control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 32.5 } }} />}
          label={t("yes")}
          labelPlacement="start"
          sx={styles.formControl}
        />

        <FormControlLabel
          value="false"
          control={<Radio sx={{ "& .MuiSvgIcon-root": { fontSize: 32.5 } }} />}
          label={t("no")}
          labelPlacement="start"
          sx={styles.formControl}
        />
      </RadioGroup>
    </BusinessOnboardingSectionLayout>
  );
};

export default CollectBusinessHasEmployeesStep;

const styles = {
  formControl: {
    justifyContent: "space-between",
    m: 0,
    py: 2.5,
    borderBottom: "1px solid",
    borderColor: "divider",
  },
};
