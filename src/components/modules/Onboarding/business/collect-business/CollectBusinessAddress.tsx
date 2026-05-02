import {
  alpha,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useCustomQuery } from "@/hooks/useHttp";

export type BusinessAdress = {
  place_id: string;
  description: string;
};

type CollectBusinessAdressProps = {
  selectedPlaceId: string | null;
  onSelectPlaceId: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSetStep: () => void;
};

const CollectBusinessAddress = ({
  selectedPlaceId,
  onSelectPlaceId,
  onSetStep,
}: CollectBusinessAdressProps) => {
  const [query, setQuery] = useState("");
  const debouncedValue = useDebouncedValue(query, 400);

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
      staleTime: 1000 * 60,
    },
  });

  const loading = isLoading || isFetching;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box sx={{ flexShrink: 0 }}>
        <Stack mb={2} gap={0.5}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Adresa locației
          </Typography>
          <Typography color="text.secondary">
            Adaugă adresa locației unde vei primi clienții
          </Typography>
        </Stack>

        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          minHeight: 0,
          py: 1,
          pr: 1,
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: (theme) => theme.palette.divider,
            borderRadius: "10px",
            "&:hover": {
              backgroundColor: (theme) => theme.palette.text.secondary,
            },
          },
          scrollbarWidth: "thin",
          scrollbarColor: (theme) => `${theme.palette.divider} transparent`,
        }}
      >
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
      </Box>

      <Box sx={{ flexShrink: 0, pt: 2.5 }}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          disableElevation
          disabled={!selectedPlaceId}
          onClick={onSetStep}
        >
          Next
        </Button>
      </Box>
    </Box>
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
