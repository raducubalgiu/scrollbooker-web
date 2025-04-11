import React from "react";
import Accordion from "../../core/Accordion/Accordion";
import Grid from "@mui/material/Grid2";
import Map from "@/components/core/Map/Map";
import { Typography } from "@mui/material";

export default function MyBusinessDetails() {
	return (
		<Accordion title="Location Details" sx={{ pb: 2.5 }}>
			<Grid container spacing={3}>
				<Grid size={8}>
					<Typography fontWeight={600} fontSize={18} mb={1.5}>
						House of Barbers
					</Typography>
					<Typography mb={1.5}>
						Descriere: Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Pariatur, porro! Sit similique quaerat laborum repudiandae iusto rem
						totam reprehenderit, aut cupiditate assumenda quod? Eos provident
						modi dolor, optio nihil impedit!
					</Typography>
					<Typography>Adresa: Strada Rezervelor, nr 93, bloc B</Typography>
				</Grid>
				<Grid size={4}>
					<Map coordinates={[25.98734, 44.442778]} />
				</Grid>
			</Grid>
		</Accordion>
	);
}
