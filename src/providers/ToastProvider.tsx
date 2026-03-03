"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useThemeMode } from "./ThemeContext";
import { ThemeModeEnum } from "./ThemeModeEnum";

export default function ToastProvider() {
  const { mode, isSystemInDarkMode } = useThemeMode();

  const toastTheme =
    mode === ThemeModeEnum.DARK ||
    (mode === ThemeModeEnum.SYSTEM && isSystemInDarkMode)
      ? "dark"
      : "light";

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
      theme={toastTheme}
    />
  );
}
