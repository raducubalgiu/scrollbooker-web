"use client";

import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCustomTheme } from "./ThemeContext";
import { Slide } from "react-toastify";

export default function ToastProvider() {
	const { mode } = useCustomTheme();

	return (
		<ToastContainer
			position="bottom-center"
			autoClose={3000}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable={false}
			pauseOnHover
			transition={Slide}
			theme={mode == "dark" ? "dark" : "light"}
		/>
	);
}
