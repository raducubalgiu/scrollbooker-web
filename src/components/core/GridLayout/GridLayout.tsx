"use client";

import Grid from "@mui/material/Grid2";
import { Grid2Props } from "@mui/material/Grid2";
import { ReactNode } from "react";
import { useBreakpoints } from "../../../hooks/useBreakpoints";

type GridLayoutProps = Grid2Props & { columns: number; children: ReactNode[] };

export default function GridLayout({
	columns,
	spacing = 3,
	children,
	...other
}: GridLayoutProps) {
	let size = 12 / columns;

	const { isPhone, isTablet } = useBreakpoints();

	switch (true) {
		case isPhone:
			size = 12;
			break;
		case isTablet:
			size = 6;
			break;
		default:
			size = 12 / columns;
	}

	return (
		<Grid container spacing={spacing} {...other}>
			{children.map(
				(child, i) =>
					child && (
						<Grid key={i} size={size}>
							{child}
						</Grid>
					)
			)}
		</Grid>
	);
}
