"use client";

import { useState } from "react";
import {
	Box,
	Button,
	Collapse,
	Divider,
	Paper,
	Rating,
	Stack,
	Typography,
} from "@mui/material";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { BusinessProfile } from "@/ts/models/booking/business/BusinessProfile";
import UserAvatar from "@/components/core/Avatar/UserAvatar";
import SchedulesSection from "@/components/cutomized/SchedulesSection/SchedulesSection";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";
import { formatOpeningStatus, formatRating } from "@/utils/formatters";
import { AppRoutes } from "@/utils/routes";
import { BookingSourceEnum } from "@/ts/enums/BookingSourceEnum";

type BusinessStickyCardProps = {
	business: BusinessProfile;
};

export default function BusinessStickyCard({
	business,
}: BusinessStickyCardProps) {
	const router = useRouter();
	const [isScheduleOpen, setIsScheduleOpen] = useState(true);
	const { fullname } = business.owner;
	const { ratings_average, ratings_count } = business.owner.counters;
	const mapsUrl = getGoogleMapsDirectionsUrl(business.location.coordinates);
	const openingStatus = formatOpeningStatus(business.opening_hours);

	return (
		<Box
			sx={{
				mt: 5,
				position: "sticky",
				top: 88,
			}}
		>
			<Paper
				elevation={0}
				sx={{
					p: 4,
					borderRadius: 6,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Stack direction="row" alignItems="center" gap={2} mb={3.5}>
					<UserAvatar
						isBusinessOrEmployee={true}
						openNow={true}
						url={business.owner.avatar ?? ""}
						alt={business.owner.fullname}
						size="lg"
					/>

					<Box sx={{ minWidth: 0 }}>
						<Stack spacing={0.75}>
							<Typography
								variant="h4"
								sx={{
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{fullname}
							</Typography>

							<Stack
								direction="row"
								alignItems="center"
								gap={1}
								flexWrap="wrap"
							>
								<Typography variant="subtitle1">
									{formatRating(ratings_average)}
								</Typography>
								<Rating
									value={ratings_average || 0}
									precision={0.5}
									readOnly
									size="medium"
								/>
								<Typography variant="subtitle2" color="text.secondary">
									({ratings_count || 0})
								</Typography>
							</Stack>
						</Stack>
					</Box>
				</Stack>

				<Button
					variant="contained"
					fullWidth
					disableElevation
					size="large"
					sx={{ py: 1.75, fontSize: "1rem" }}
					onClick={() =>
						router.push(
							AppRoutes.booking(
								business.id,
								business.owner.id,
								business.owner.id,
								BookingSourceEnum.SEARCH_BUSINESS_PROFILE,
								null,
							),
						)
					}
				>
					Rezervă acum
				</Button>

				<Divider sx={{ my: 3 }} />

				<Stack spacing={3}>
					<Box>
						<Stack
							direction="row"
							alignItems="center"
							gap={1.5}
							onClick={() => setIsScheduleOpen((prev) => !prev)}
							sx={{
								cursor: "pointer",
								borderRadius: 3,
								mx: -1.5,
								px: 1.5,
								py: 0.75,
								"&:hover": { backgroundColor: "action.hover" },
							}}
						>
							<AccessTimeOutlinedIcon
								sx={{ fontSize: 24, color: "text.secondary" }}
							/>
							<Typography
								variant="body1"
								sx={{ flexGrow: 1, fontWeight: 500 }}
							>
								{openingStatus ?? "Program indisponibil"}
							</Typography>
							<KeyboardArrowDownOutlinedIcon
								sx={{
									color: "text.secondary",
									transition: "transform 0.2s ease",
									transform: isScheduleOpen
										? "rotate(180deg)"
										: "rotate(0deg)",
								}}
							/>
						</Stack>

						<Collapse in={isScheduleOpen} timeout={250}>
							<Box
								sx={{
									mt: 2,
									p: 2.5,
									borderRadius: 4,
									backgroundColor: "background.default",
									border: "1px solid",
									borderColor: "divider",
								}}
							>
								<SchedulesSection schedules={business.schedules} />
							</Box>
						</Collapse>
					</Box>

					<Stack direction="row" gap={1.5}>
						<FmdGoodOutlinedIcon
							sx={{ fontSize: 24, color: "text.secondary", mt: 0.2 }}
						/>
						<Box sx={{ minWidth: 0 }}>
							<Typography
								variant="body1"
								sx={{ fontWeight: 500, lineHeight: 1.4 }}
							>
								{business.location.formatted_address}
							</Typography>
							<Link
								href={mapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								style={{ textDecoration: "none" }}
								prefetch={false}
							>
								<Typography
									variant="body2"
									sx={{
										fontWeight: 600,
										color: "primary.main",
										display: "inline-block",
										mt: 0.5,
										"&:hover": { textDecoration: "underline" },
									}}
								>
									Obține indicații de orientare
								</Typography>
							</Link>
						</Box>
					</Stack>
				</Stack>
			</Paper>
		</Box>
	);
}
