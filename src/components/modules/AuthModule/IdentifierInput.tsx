"use client";

import { Box, InputAdornment, MenuItem, TextField } from "@mui/material";
import Input from "@/components/core/Input/Input";
import { required } from "@/utils/validation-rules";

export type AuthIdentifierType = "email" | "username" | "phone";

export type IdentifierOption = {
  value: AuthIdentifierType;
  label: string;
  placeholder: string;
};

type IdentifierInputProps = {
  name: string;
  options: IdentifierOption[];
  identifierType: AuthIdentifierType;
  onIdentifierTypeChange: (type: AuthIdentifierType) => void;
};

export default function IdentifierInput({
  name,
  options,
  identifierType,
  onIdentifierTypeChange,
}: IdentifierInputProps) {
  const isRequired = required();
  const activePlaceholder =
    options.find((option) => option.value === identifierType)?.placeholder ??
    "";

  if (options.length <= 1) {
    return (
      <Input
        name={name}
        rules={isRequired}
        placeholder={activePlaceholder}
        type={identifierType === "email" ? "email" : "text"}
        size="medium"
        fullWidth
      />
    );
  }

  return (
    <Input
      name={name}
      rules={isRequired}
      placeholder={activePlaceholder}
      type={identifierType === "email" ? "email" : "text"}
      size="medium"
      fullWidth
      slotProps={{
        input: {
          sx: { pl: 1.5 },
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{ margin: 0, marginRight: 1.5 }}
            >
              <TextField
                select
                size="small"
                variant="standard"
                value={identifierType}
                onChange={(event) =>
                  onIdentifierTypeChange(
                    event.target.value as AuthIdentifierType
                  )
                }
                slotProps={{
                  select: {
                    disableUnderline: true,
                    sx: {
                      py: 0.5,
                      fontWeight: 500,
                      color: "text.secondary",
                      minWidth: "auto",
                      "&:focus": {
                        backgroundColor: "transparent",
                      },
                    },
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  width: "1px",
                  height: "24px",
                  bgcolor: "divider",
                  ml: 1,
                }}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
