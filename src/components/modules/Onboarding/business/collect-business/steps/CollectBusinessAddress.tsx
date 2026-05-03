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
import React, { ChangeEvent, memo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useCustomQuery } from "@/hooks/useHttp";
import BusinessOnboardingSectionLayout from "../../../BusinessOnboardingSectionLayout";

export type BusinessAdress = {
  place_id: string;
  description: string;
};

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
  const debouncedValue = useDebouncedValue(addressQuery, 400);

  const {
    data: addresses,
    isLoading,
    isFetching,
  } = useCustomQuery<BusinessAdress[]>({
    key: ["search-business-address", debouncedValue],
    url: "/api/businesses/address",
    params: {
      query: debouncedValue,
    },
    options: {
      enabled: debouncedValue.trim().length > 2,
      staleTime: 10000 * 60,
    },
  });

  const loading = isLoading || isFetching;

  return (
    <BusinessOnboardingSectionLayout
      title="Adresa locației"
      description="Adaugă adresa locației unde vei primi clienții"
      onClick={() => {}}
      isDisabled={false}
      isLoading={false}
      displayButton={false}
    >
      <TextField
        value={addressQuery}
        onChange={onSetQuery}
        autoFocus={false}
        placeholder="Caută"
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
                        fontSize: 32.5,
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
