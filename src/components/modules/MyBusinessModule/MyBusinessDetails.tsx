import React from "react";
import Accordion from "../../core/Accordion/Accordion";
import Grid from "@mui/material/Grid2";
import Map from "@/components/core/Map/Map";
import { Typography } from "@mui/material";
import CustomStack from "@/components/core/CustomStack/CustomStack";

type MyBusinessDetailsProps = {
	description: string;
	address: string;
	coordinates: [number, number];
};

export default function MyBusinessDetails({
	description,
	address,
	coordinates,
}: MyBusinessDetailsProps) {
	return (
		<Accordion title="Detalii despre locatie" sx={{ pb: 2.5 }}>
			<Grid container spacing={3}>
				<Grid size={8}>
					<Typography fontWeight={600} fontSize={19}>
						House of Barbers
					</Typography>
					<Typography color="textSecondary">@house_of_barbers</Typography>
					<CustomStack justifyContent="flex-start" sx={{ my: 1 }}>
						<Typography sx={{ fontWeight: "600", fontSize: 17, mr: 1.5 }}>
							Descriere:
						</Typography>
						<Typography>{description}</Typography>
					</CustomStack>
					<CustomStack justifyContent="flex-start">
						<Typography sx={{ fontWeight: "600", fontSize: 17, mr: 1.5 }}>
							Adresa:
						</Typography>
						<Typography>{address}</Typography>
					</CustomStack>
				</Grid>
				<Grid size={4}>
					<Map coordinates={coordinates} />
				</Grid>
			</Grid>
		</Accordion>
	);
}
