import React from "react";
import { Stack, StackProps } from "@mui/material";

type CustomStackProps = {
	children: React.ReactNode;
} & StackProps;

export default function CustomStack({ children, ...props }: CustomStackProps) {
	return (
		<Stack
			flexDirection="row"
			alignItems="center"
			justifyContent="space-between"
			{...props}
		>
			{children}
		</Stack>
	);
}
