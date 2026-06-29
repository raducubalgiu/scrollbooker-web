import dayjs from "@/lib/dayjs";
import { reviewLabelText } from "@/ts/enums/ReviewLabel";
import {
	BusinessOwnerProfile,
	BusinessProfileReviews,
} from "@/ts/models/booking/business/BusinessProfile";
import { formatRating } from "@/utils/formatters";
import { Avatar, Box, Rating, Stack, Typography } from "@mui/material";
import React, { memo } from "react";

type BusinessReviewsTabProps = {
	id: string;
	innerRef: (element: HTMLDivElement | null) => void;
	owner: BusinessOwnerProfile;
	reviews: BusinessProfileReviews;
};

const BusinessReviewsTab = ({
	id,
	innerRef,
	owner,
	reviews,
}: BusinessReviewsTabProps) => {
	const { counters } = owner;
	const { ratings_average, ratings_count } = counters;

	return (
		<Box id={id} ref={innerRef}>
			<Typography
				variant="h4"
				sx={{ fontSize: { xs: "1.75rem", md: "3rem" }, fontWeight: 600 }}
				gutterBottom
			>
				Recenzii
			</Typography>

			<Box mb={{ xs: 3, md: 5 }}>
				<Stack
					flexDirection={{ xs: "column", sm: "row" }}
					alignItems={{ xs: "flex-start", sm: "center" }}
					gap={1.5}
				>
					<Stack flexDirection="row" alignItems="center" gap={1}>
						<Typography
							variant="h4"
							sx={{
								fontWeight: 600,
								fontSize: { xs: "1.5rem", md: "2.125rem" },
							}}
						>
							{formatRating(ratings_average)}
						</Typography>
						<Rating
							readOnly
							size="large"
							precision={0.5}
							value={ratings_average}
						/>
					</Stack>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 600,
							fontSize: { xs: "1.1rem", md: "2.125rem" },
							color: "text.secondary",
						}}
					>
						({ratings_count} {ratings_count === 1 ? "recenzie" : "recenzii"})
					</Typography>
				</Stack>
			</Box>

			{reviews.total === 0 && (
				<Typography sx={{ color: "text.secondary" }}>
					Momentan nu au fost adăugate recenzii
				</Typography>
			)}

			{reviews.total > 0 && (
				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: {
							xs: "1fr",
							md: "repeat(2, 1fr)",
						},
						gap: {
							xs: 4,
							md: 4,
							lg: 8,
						},
					}}
				>
					{reviews.data.map(r => {
						return (
							<Box key={r.id} sx={{ pb: { xs: 1, md: 0 } }}>
								<Stack flexDirection="row" alignItems="center" gap={2}>
									<Avatar
										src={r.reviewer.avatar ?? ""}
										alt={r.reviewer.fullname}
										sx={{
											width: { xs: 56, md: 85 },
											height: { xs: 56, md: 85 },
										}}
									/>

									<Stack>
										<Typography
											variant="h6"
											sx={{
												fontWeight: 600,
												fontSize: { xs: "1rem", md: "1.25rem" },
											}}
										>
											{r.reviewer.fullname}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{dayjs(r.created_at).format("DD-MM-YYYY HH:mm")}
										</Typography>
									</Stack>
								</Stack>

								<Typography
									fontWeight={600}
									sx={{ my: { xs: 1.5, md: 2.5 } }}
									variant="h6"
									fontSize={{ xs: "1rem", md: "1.25rem" }}
								>
									{reviewLabelText(r.rating)}
								</Typography>

								<Stack flexDirection="row" alignItems="center" gap={1.5}>
									<Rating
										readOnly
										value={r.rating}
										size="medium"
										precision={0.5}
									/>
									<Typography variant="body2" color="text.secondary">
										{r.rating} din 5
									</Typography>
								</Stack>

								<Typography
									mt={1.5}
									variant="body1"
									sx={{ color: "text.primary", lineHeight: 1.6 }}
								>
									{r.review}
								</Typography>
							</Box>
						);
					})}
				</Box>
			)}
		</Box>
	);
};

export default memo(BusinessReviewsTab);
