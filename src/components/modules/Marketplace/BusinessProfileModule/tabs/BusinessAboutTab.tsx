import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import Image from "next/image";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";

type BusinessAboutTabProps = {
	profile: BusinessProfile;
	id: string;
	innerRef: (element: HTMLDivElement | null) => void;
};

const BusinessAboutTab = ({ profile, id, innerRef }: BusinessAboutTabProps) => {
	const mapsUrl = getGoogleMapsDirectionsUrl(profile.location.coordinates);
	const hasMapImage = !!profile.location.map_url;

	return (
		<Box id={id} ref={innerRef} sx={{ minHeight: { xs: "auto", md: "500px" } }}>
			<Typography
				variant="h3"
				sx={{ fontSize: { xs: "1.75rem", md: "3rem" }, fontWeight: 600 }}
				gutterBottom
				mb={2.5}
			>
				Despre
			</Typography>

			<Typography
				mb={3}
				fontWeight={400}
				variant="body1"
				sx={{ fontSize: { xs: "1rem", md: "1.25rem" }, lineHeight: 1.6 }}
			>
				{profile.description}
			</Typography>

			{hasMapImage && (
				<Box
					component="a"
					href={mapsUrl}
					target="_blank"
					rel="noopener noreferrer"
					sx={{
						display: "block",
						position: "relative",
						width: "100%",
						aspectRatio: { xs: "4/3", sm: "2/1", md: "2.5/1" },
						borderRadius: 3,
						overflow: "hidden",
						bgcolor: "action.hover",
						border: "1px solid",
						borderColor: "divider",
					}}
				>
					<Image
						src={profile.location.map_url!}
						alt={`Hartă locație ${profile.owner.fullname}`}
						fill
						sizes="(max-width: 600px) 100vw, (max-width: 1200px) 74vw, 800px"
						style={{
							objectFit: "cover",
						}}
						priority={false}
					/>
				</Box>
			)}

			<Typography
				mt={2}
				mb={{ xs: 4, md: 5 }}
				sx={{ fontSize: { xs: 15, md: 18 }, color: "text.secondary" }}
			>
				{profile.location.formatted_address}
			</Typography>

			<Typography
				variant="h4"
				sx={{ fontSize: { xs: "1.25rem", md: "2.125rem" }, fontWeight: 600 }}
				mt={{ xs: 3, md: 5 }}
				mb={2.5}
			>
				Programul de lucru
			</Typography>

			<SchedulesSection schedules={profile.schedules} />
		</Box>
	);
};

export default memo(BusinessAboutTab);
