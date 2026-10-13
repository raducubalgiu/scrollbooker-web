import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { Filter } from "@/ts/models/nomenclatures/filter/FilterType";

type ServiceFilterSelectProps = {
  filter: Filter;
  value: number | "";
  disabled: boolean;
  onChange: (subFilterId: number) => void;
};

const ServiceFilterSelect = ({
  filter,
  value,
  disabled,
  onChange,
}: ServiceFilterSelectProps) => {
  const labelId = `service-filter-select-${filter.id}`;

  return (
    <FormControl fullWidth>
      <InputLabel
        id={labelId}
        sx={{
          color: "text.secondary",
          "&.Mui-focused": { color: "primary.main" },
        }}
      >
        {filter.name}
      </InputLabel>

      <Select
        size="medium"
        labelId={labelId}
        value={value}
        label={filter.name}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
        MenuProps={{ disableScrollLock: true }}
        sx={{
          bgcolor: "background.default",
          borderRadius: "12px",
          "& .MuiSelect-select": {
            bgcolor: "background.default",
            borderRadius: "12px",
          },
        }}
      >
        {filter.sub_filters.map((subFilter) => (
          <MenuItem key={subFilter.id} value={subFilter.id}>
            {subFilter.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ServiceFilterSelect;
