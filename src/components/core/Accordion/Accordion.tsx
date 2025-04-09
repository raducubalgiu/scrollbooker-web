"use client";

import React, { useState } from "react";
import {
	Accordion as MUIAccordion,
	AccordionSummary,
	Typography,
	AccordionDetails,
	AccordionProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type MUIAccordionProps = {
	children: React.ReactNode;
	title: string;
} & AccordionProps;

export default function Accordion({
	title,
	children,
	...props
}: MUIAccordionProps) {
	const [expanded, setExpanded] = useState(true);
	return (
		<MUIAccordion
			expanded={expanded}
			onChange={() => setExpanded(expanded => !expanded)}
			{...props}
		>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1-content"
				id="panel1-header"
			>
				<Typography component="span" sx={{ fontWeight: "600" }}>
					{title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>{children}</AccordionDetails>
		</MUIAccordion>
	);
}
