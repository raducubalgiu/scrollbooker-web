import React from "react";
import {
  TextField,
  MenuItem,
  CircularProgress,
  TextFieldProps,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export type SelectProps = {
  multiple?: boolean;
  loading?: boolean;
  options: { value: string; name: string }[];
  rules?: object;
} & TextFieldProps;

const SelectLoadingIcon = () => (
  <CircularProgress size={16} color="primary" sx={{ mr: 1.5 }} />
);

export default function Select({
  multiple = false,
  options,
  loading = false,
  disabled,
  ...props
}: SelectProps) {
  return (
    <TextField
      select
      id={`select-${props.name}`}
      defaultValue={multiple ? [] : ""}
      disabled={disabled || loading}
      {...props}
      slotProps={{
        select: {
          multiple,
          IconComponent: loading ? SelectLoadingIcon : ArrowDropDownIcon,
          sx: {
            "& .MuiSelect-icon": loading
              ? {
                  top: "calc(50% - 8px)",
                  right: 12,
                }
              : {},
          },
        },
      }}
    >
      {options?.map((option, i) => (
        <MenuItem
          key={`${option.value}-${i}`}
          id={option?.value}
          value={option?.value}
        >
          {option?.name}
        </MenuItem>
      ))}
    </TextField>
  );
}
