import {
  alpha,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Theme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { memo } from "react";
import BusinessOnboardingSectionLayout from "../../../BusinessOnboardingSectionLayout";
import { useTranslations } from "next-intl";
import { useGetAllBusinessTypes } from "@/controllers/nomenclature/business-type.controller";

type CollectBusinessTypeProps = {
  businessTypeId: number | null;
  onHandleBusinessTypeId: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CollectBusinessType = ({
  businessTypeId,
  onHandleBusinessTypeId,
}: CollectBusinessTypeProps) => {
  const t = useTranslations("onboarding.business.type");
  const { data: businessTypes, isLoading } = useGetAllBusinessTypes();

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      onClick={() => {}}
      isLoading={false}
      isDisabled={false}
      displayButton={false}
    >
      <TextField
        autoFocus={false}
        placeholder={t("search")}
        variant="outlined"
        fullWidth
        sx={{ ...styles.search, mb: 2 }}
        disabled={isLoading}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={styles.searchFieldIcon} />
              </InputAdornment>
            ),
          },
        }}
      />

      {isLoading && (
        <Stack justifyContent="center" alignItems="center" p={2.5}>
          <CircularProgress />
        </Stack>
      )}

      <FormControl fullWidth>
        <RadioGroup
          name="business_type"
          value={businessTypeId ?? ""}
          onChange={onHandleBusinessTypeId}
        >
          {!isLoading &&
            businessTypes?.map((businessType) => (
              <FormControlLabel
                key={businessType.id}
                value={businessType.id}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 32.5,
                      },
                    }}
                  />
                }
                label={businessType.name}
                labelPlacement="start"
                sx={{
                  justifyContent: "space-between",
                  m: 0,
                  py: 1.5,
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              />
            ))}
        </RadioGroup>
      </FormControl>
    </BusinessOnboardingSectionLayout>
  );
};

export default memo(CollectBusinessType);

const styles = {
  search: {
    "& .MuiOutlinedInput-root": {
      minHeight: 56,
      borderRadius: "999px",
      bgcolor: (theme: Theme) => alpha(theme.palette.action.hover, 0.05),
      "& fieldset": {
        borderColor: "divider",
      },
      "&:hover fieldset": {
        borderColor: "action.disabled",
      },
      "&.Mui-focused": {
        bgcolor: "background.paper",
      },
      "& input": {
        fontSize: 18,
        py: 1.6,
      },
      "& input::placeholder": {
        fontSize: 18,
        opacity: 0.8,
        color: (theme: Theme) => alpha(theme.palette.text.disabled, 0.5),
      },
    },
  },
  searchFieldIcon: {
    color: "text.secondary",
    ml: 0.5,
    fontSize: 24,
  },
};
