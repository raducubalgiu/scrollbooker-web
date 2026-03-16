"use client";

import React from "react";
import { TextareaAutosize, TextareaAutosizeProps, styled } from "@mui/material";

type FormTextareaProps = TextareaAutosizeProps & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
};

const StyledTextarea = styled(TextareaAutosize)(({ theme }) => ({
  width: "100%",
  minHeight: 120,
  padding: "12px 16px",
  borderRadius: 8,
  background: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  border: "none",
  outline: "none",
  boxSizing: "border-box",
  resize: "vertical",
}));

export default function FormTextarea(props: FormTextareaProps) {
  return <StyledTextarea {...props} />;
}
