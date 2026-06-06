import { TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Select from "./Select";
import { has, get } from "lodash";

export type SelectOptionType = { value: string; name: string };

export type SelectProps = {
  multiple?: boolean;
  options: SelectOptionType[];
  rules?: object;
  isLoading?: boolean;
} & TextFieldProps;

export default function InputSelect({
  name,
  disabled = false,
  rules = {},
  options,
  isLoading = false,
  ...others
}: SelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, String(name));

  return (
    <Controller
      control={control}
      name={name as string}
      rules={rules}
      render={({ field }) => {
        const { ref, value, ...fieldProps } = field as any;
        return (
          <Select
            {...fieldProps}
            {...others}
            required={Object.prototype.hasOwnProperty.call(rules, "required")}
            fullWidth
            value={value ?? (others.multiple ? [] : "")}
            options={options ?? []}
            error={has(errors, name as string)}
            helperText={fieldError?.message || ""}
            inputRef={ref}
            disabled={disabled}
            loading={isLoading}
            slotProps={{
              select: {
                MenuProps: {
                  disableScrollLock: true,
                },
              },
            }}
          />
        );
      }}
    />
  );
}
