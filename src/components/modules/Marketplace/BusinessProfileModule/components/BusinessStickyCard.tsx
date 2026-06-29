"use client";

import {
	Box,
	Button,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getGoogleMapsDirectionsUrl } from "@/utils/get-google-maps-directions";
import { formatRating } from "@/utils/formatters";

type BusinessStickyCardProps = {
	business: BusinessProfile;
};

export default function BusinessStickyCard({
	business,
}: BusinessStickyCardProps) {
	const router = useRouter();
	const { fullname } = business.owner;
	const { ratings_average, ratings_count } = business.owner.counters;
	const mapsUrl = getGoogleMapsDirectionsUrl(business.location.coordinates);

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
					p: 3.5,
					borderRadius: 6,
					border: "1px solid",
					borderColor: "divider",
				}}
			>
				<Stack direction="row" alignItems="center" gap={2} mb={3}>
					<UserAvatar
						isBusinessOrEmployee={true}
						openNow={true}
						url={business.owner.avatar ?? ""}
						alt={business.owner.fullname}
						size="lg"
					/>

					<Box sx={{ minWidth: 0 }}>
						<Stack spacing={0.5}>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 600,
									fontSize: { lg: "1.25rem", xl: "1.5rem" },
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
								gap={0.8}
								flexWrap="wrap"
							>
								<Typography
									variant="body1"
									sx={{ fontWeight: 700, fontSize: { lg: 15, xl: 16 } }}
								>
									{formatRating(ratings_average)}
								</Typography>
								<Rating
									value={ratings_average || 0}
									precision={0.5}
									readOnly
									size="small"
								/>
								<Typography
									variant="body2"
									sx={{ fontWeight: 600, color: "text.secondary" }}
								>
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
					sx={{
						py: 1.5,
						textTransform: "none",
						fontWeight: 700,
						fontSize: 16,
						borderRadius: 3,
					}}
					onClick={() =>
						router.push(
							`/booking/${business.id}?businessOwnerId=${business.owner.id}`,
						)
					}
				>
					Rezervă acum
				</Button>

				<Divider sx={{ my: 2.5 }} />

				<Stack spacing={2.5}>
					<Stack direction="row" alignItems="center" gap={1.5}>
						<AccessTimeOutlinedIcon
							sx={{ fontSize: 24, color: "text.secondary" }}
						/>
						<Typography
							color="text.primary"
							fontSize={15}
							fontWeight={500}
							sx={{ flexGrow: 1 }}
						>
							Deschis până la 12:00
						</Typography>
						<KeyboardArrowDownOutlinedIcon
							fontSize="small"
							sx={{ color: "text.secondary" }}
						/>
					</Stack>

					<Stack direction="row" gap={1.5}>
						<FmdGoodOutlinedIcon
							sx={{ fontSize: 24, color: "text.secondary", mt: 0.2 }}
						/>
						<Box sx={{ minWidth: 0 }}>
							<Typography
								color="text.primary"
								fontSize={15}
								fontWeight={500}
								sx={{ lineHeight: 1.4 }}
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
									fontWeight={600}
									fontSize={14}
									sx={{
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
