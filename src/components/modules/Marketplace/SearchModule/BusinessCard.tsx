import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Image from "next/image";
import { formatRating } from "@/utils/formatters";
import StarIcon from "@mui/icons-material/Star";
import BusinessProductCard from "./BusinessProductCard";
import { BusinessSheetType } from "@/ts/models/booking/business/search/BusinessSheet";

type BusinessCardProps = { business: BusinessSheetType };

const BusinessCard = ({ business }: BusinessCardProps) => {
	const { owner, media_files, address, products } = business;
	const { fullname, ratings_average, ratings_count, profession } = owner;

	const url = !!media_files?.[0]?.thumbnail_url
		? media_files[0].thumbnail_url
		: "https://media.scrollbooker.ro/some-image.jpg";

	return (
		<Box sx={{ overflow: "hidden", borderRadius: 2 }}>
			<Box
				sx={{
					position: "relative",
					width: "100%",
					height: 280,
				}}
			>
				<Image
					src={url}
					alt={fullname}
					fill
					sizes="(max-width: 600px) 100vw, 50vw"
					style={{
						objectFit: "cover",
						borderRadius: 20,
						backgroundColor: "#eee",
					}}
				/>
			</Box>

			<Stack
				flexDirection="row"
				justifyContent="space-between"
				alignItems="flex-start"
				mt={1.5}
			>
				<Box>
					<Typography variant="h6" sx={{ fontWeight: 600 }}>
						{fullname}
					</Typography>
				</Box>

				<Stack flexDirection="row" alignItems="center" gap={1}>
					<StarIcon fontSize="small" color="primary" />
					<Typography variant="h6" fontWeight={600}>
						{formatRating(ratings_average)}
					</Typography>
					<Typography color="text.secondary" fontWeight={400}>
						({ratings_count})
					</Typography>
				</Stack>
			</Stack>

			<Typography color="text.secondary">{profession}</Typography>

			<Typography color="text.secondary" fontWeight={400} mt={1.5} mb={2.5}>
				{address}
			</Typography>

			{products.map(prod => (
				<BusinessProductCard key={prod.id} product={prod} />
			))}
		</Box>
	);
};

export default BusinessCard;
