import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { memo, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useSearchBusinessAddress } from "@/controllers/booking/business.controller";
import BusinessOnboardingSectionLayout from "../../../BusinessOnboardingSectionLayout";
import { useTranslations } from "next-intl";
import SearchBar from "@/components/core/Input/SearchBar";

type CollectBusinessAdressProps = {
  addressQuery: string;
  onSetQuery: (val: string) => void;
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
      <SearchBar
        placeholder="Caută"
        value={addressQuery}
        onChange={onSetQuery}
        onReset={() => onSetQuery("")}
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
