import React from "react";
import { TextField, MenuItem, CircularProgress, Box } from "@mui/material";
import { TextFieldProps } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";

const SelectLoadingIcon = () => (
  <CircularProgress size={16} color="inherit" sx={{ mr: 1.5 }} />
);

export type SelectProps = {
  multiple?: boolean;
  loading?: boolean;
  options: { value: string; name: string }[];
  rules?: object;
} & TextFieldProps;

export default function Select({
  multiple = false,
  options,
  loading = false,
  disabled,
  value,
  ...props
}: SelectProps) {
  const isOptionSelected = (optionValue: string) => {
    if (!multiple) return value === optionValue;
    if (Array.isArray(value)) {
      return value.includes(optionValue);
    }
    return false;
  };

  const handleRenderValue = (selected: unknown): React.ReactNode => {
    if (multiple && Array.isArray(selected)) {
      const selectedIds = selected as string[];
      return options
        .filter((opt) => selectedIds.includes(opt.value))
        .map((opt) => opt.name)
        .join(", ");
    }

    const selectedOpt = options.find((opt) => opt.value === String(selected));
    return selectedOpt ? selectedOpt.name : String(selected ?? "");
  };

  return (
    <TextField
      select
      id={`select-${props.name}`}
      defaultValue={multiple ? [] : ""}
      disabled={disabled || loading}
      value={value}
      {...props}
      slotProps={{
        select: {
          multiple,
          renderValue: handleRenderValue,
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
      {options?.map((option, i) => {
        const isSelected = isOptionSelected(option.value);

        return (
          <MenuItem
            key={`${option.value}-${i}`}
            id={option?.value}
            value={option?.value}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>{option?.name}</span>

              {multiple && isSelected && (
                <CheckIcon color="primary" fontSize="small" sx={{ ml: 2 }} />
              )}
            </Box>
          </MenuItem>
        );
      })}
    </TextField>
  );
}
