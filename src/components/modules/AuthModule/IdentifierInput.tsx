"use client";

import { MenuItem, Stack, TextField } from "@mui/material";
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
    <Stack direction="row">
      <TextField
        select
        size="medium"
        value={identifierType}
        onChange={(event) =>
          onIdentifierTypeChange(event.target.value as AuthIdentifierType)
        }
        sx={{
          minWidth: 132,
          "& .MuiOutlinedInput-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Input
        name={name}
        rules={isRequired}
        placeholder={activePlaceholder}
        type={identifierType === "email" ? "email" : "text"}
        size="medium"
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            marginLeft: "-1px",
          },
        }}
      />
    </Stack>
  );
}
