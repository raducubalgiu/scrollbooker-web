import { Controller, useFormContext, get } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { has } from "lodash";

export type InputProps = {
  rules?: object;
} & TextFieldProps;

export default function Input({
  name,
  label,
  rules = {},
  ...props
}: InputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<{ [x: string]: string }>();

  const fieldError = get(errors, name as string);

  return (
    <Controller
      control={control}
      name={name as string}
      rules={rules}
      render={({
        field: { value, onChange, onBlur, ref, name: fieldName },
      }) => (
        <TextField
          fullWidth
          label={label}
          name={fieldName || (name as string) || ""}
          value={value ?? ""}
          onChange={onChange}
          onBlur={onBlur}
          inputRef={ref}
          {...props}
          error={!!fieldError}
          helperText={fieldError?.message}
          required={has(rules, "required") || has(rules, "validate")}
        />
      )}
    />
  );
}
