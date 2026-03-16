"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false }) as any;

type FormJoditEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function FormJoditEditor({
  value = "",
  onChange,
  placeholder,
}: FormJoditEditorProps) {
  const theme = useTheme();
  const isDarkTheme = theme.palette.mode === "dark";
  const containerColor = theme.palette.background.paper;
  const contentColor = theme.palette.text.primary;
  const fontFamily = theme.typography.fontFamily;

  const config = React.useMemo(
    () => ({
      theme: isDarkTheme ? "dark" : "default",
      style: {
        backgroundColor: containerColor,
        color: contentColor,
        fontFamily: fontFamily,
      },
      readonly: false,
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
    [placeholder]
  );

  return (
    <div>
      <JoditEditor value={value} config={config} onChange={onChange} />
    </div>
  );
}
