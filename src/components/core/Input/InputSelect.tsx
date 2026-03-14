import { TextFieldProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import Select from "./Select";
import { has, get } from "lodash";

export type SelectProps = {
  multiple?: boolean;
  options: { value: string; name: string }[];
  rules?: object;
} & TextFieldProps;

export default function InputSelect({
  name,
  disabled = false,
  rules = {},
  options,
  ...others
}: SelectProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

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
            value={value ?? ""}
            options={options ?? []}
            error={has(errors, name as string)}
            helperText={get(errors, String(name))?.message}
            inputRef={ref}
            disabled={disabled}
          />
        );
      }}
    />
  );
}
