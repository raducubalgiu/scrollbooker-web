"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";

type JoditEditorComponentProps = {
  value: string;
  config: object;
  onChange: (value: string) => void;
};

const JoditEditor = dynamic<JoditEditorComponentProps>(
  () => import("jodit-react"),
  { ssr: false }
);

type FormJoditEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  isDisabled?: boolean;
};

export default function FormJoditEditor({
  value = "",
  onChange,
  placeholder,
  isDisabled = false,
}: FormJoditEditorProps) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const containerColor = theme.palette.background.paper;
  const contentColor = isDisabled
    ? theme.palette.text.disabled
    : theme.palette.text.primary;
  const fontFamily = theme.typography.fontFamily;

  const config = React.useMemo(
    () => ({
      theme: isDarkTheme ? "dark" : "default",
      style: {
        backgroundColor: containerColor,
        color: contentColor,
        fontFamily: fontFamily,
      },
      readonly: isDisabled,
      height: 260,
      toolbarSticky: false,
      placeholder: placeholder || "",
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "align",
        "|",
        "undo",
        "redo",
      ],
    }),
    [
      placeholder,
      isDarkTheme,
      containerColor,
      contentColor,
      isDisabled,
      fontFamily,
    ]
  );

  const handleChange = React.useCallback(
    (v: string) => {
      if (onChange) onChange(v);
    },
    [onChange]
  );

  return (
    <div>
      <JoditEditor value={value} config={config} onChange={handleChange} />
    </div>
  );
}
