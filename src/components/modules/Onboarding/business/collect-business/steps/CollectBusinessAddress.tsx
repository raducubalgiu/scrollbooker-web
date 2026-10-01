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
import React, { ChangeEvent, memo, useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "lodash";
import { useSearchBusinessAddress } from "@/controllers/booking/business.controller";
import BusinessOnboardingSectionLayout from "../../../BusinessOnboardingSectionLayout";
import { useTranslations } from "next-intl";

type CollectBusinessAdressProps = {
  addressQuery: string;
  onSetQuery: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedPlaceId: string | null;
  onSelectPlaceId: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const CollectBusinessAddress = ({
  addressQuery,
  onSetQuery,
  selectedPlaceId,
  onSelectPlaceId,
}: CollectBusinessAdressProps) => {
  const t = useTranslations("onboarding.business.address");
  const [debouncedValue, setDebouncedValue] = useState(addressQuery);

  const debouncedSetValue = useMemo(
    () => debounce((value: string) => setDebouncedValue(value), 400),
    []
  );

  useEffect(() => {
    debouncedSetValue(addressQuery);
    return () => debouncedSetValue.cancel();
  }, [addressQuery, debouncedSetValue]);

  const {
    data: addresses,
    isLoading,
    isFetching,
  } = useSearchBusinessAddress(debouncedValue);

  const loading = isLoading || isFetching;

  return (
    <BusinessOnboardingSectionLayout
      title={t("title")}
      description={t("subtitle")}
      onClick={() => {}}
      isDisabled={false}
      isLoading={false}
      displayButton={false}
    >
      <TextField
        value={addressQuery}
        onChange={onSetQuery}
        autoFocus={false}
        placeholder={t("search")}
        variant="outlined"
        fullWidth
        sx={{ ...styles.search, mb: 2 }}
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

      <FormControl fullWidth>
        <RadioGroup
          name="business_address"
          value={selectedPlaceId ?? ""}
          onChange={onSelectPlaceId}
        >
          {loading && (
            <Stack justifyContent="center" alignItems="center" p={2.5}>
              <CircularProgress />
            </Stack>
          )}
          {!loading &&
            addresses?.map((a) => (
              <FormControlLabel
                key={a.place_id}
                value={a.place_id}
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 30,
                      },
                    }}
                  />
                }
                label={a.description}
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

export default memo(CollectBusinessAddress);

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
