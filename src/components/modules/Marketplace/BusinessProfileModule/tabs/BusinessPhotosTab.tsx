import React, { memo } from "react";
import BusinessProfileGallery from "../components/BusinessGallery";
import { Box, Button, Rating, Stack, Typography } from "@mui/material";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import IosShareIcon from "@mui/icons-material/IosShare";
import { BusinessOwnerProfile } from "@/ts/models/booking/business/BusinessProfile";
import { formatRating } from "@/utils/formatters";

type BusinessPhotosTabProps = {
	id: string;
	innerRef: (element: HTMLDivElement | null) => void;
	owner: BusinessOwnerProfile;
	mediaFiles?: BusinessMediaFile[];
	onFollow: () => void;
	onShare: () => void;
};

const BusinessPhotosTab = ({
	id,
	innerRef,
	owner,
	mediaFiles,
	onFollow,
	onShare,
}: BusinessPhotosTabProps) => {
	const { fullname, counters, is_follow } = owner;
	const { ratings_average, ratings_count } = counters;

	return (
		<Box id={id} ref={innerRef} sx={{ pt: { xs: 2, md: 0 } }}>
			<Stack mb={3}>
				<Stack
					flexDirection={{ xs: "column", md: "row" }}
					alignItems={{ xs: "flex-start", md: "center" }}
					justifyContent="space-between"
					gap={2.5}
				>
					<Stack spacing={0.5} sx={{ width: "100%", minWidth: 0 }}>
						<Typography
							variant="h4"
							sx={{
								fontWeight: 700,
								textTransform: "uppercase",
								fontSize: {
									xs: "1.5rem",
									sm: "2rem",
									md: "2.5rem",
									lg: "3rem",
								},
								lineHeight: 1.2,
								wordBreak: "break-word",
							}}
						>
							{fullname}
						</Typography>

						<Stack
							flexDirection="row"
							alignItems="center"
							gap={1}
							flexWrap="wrap"
						>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 600,
									fontSize: { xs: "1.25rem", md: "1.75rem" },
								}}
							>
								{formatRating(ratings_average)}
							</Typography>
							<Rating
								value={ratings_average || 0}
								precision={0.5}
								readOnly
								size={"large"}
								sx={{ fontSize: { xs: "1.5rem", md: "2.125rem" } }}
							/>
							<Typography
								variant="h4"
								sx={{
									fontWeight: 600,
									fontSize: { xs: "1.1rem", md: "1.75rem" },
									color: "text.secondary",
								}}
							>
								({ratings_count || 0})
							</Typography>
						</Stack>
					</Stack>

					<Stack
						flexDirection="row"
						alignItems="center"
						gap={1.5}
						sx={{
							width: { xs: "100%", md: "auto" },
							justifyContent: { xs: "stretch", md: "flex-end" },
						}}
					>
						<Button
							onClick={onFollow}
							variant={is_follow ? "outlined" : "contained"}
							color={is_follow ? "secondary" : "primary"}
							size="large"
							disableElevation
							sx={{
								flexGrow: { xs: 1, md: 0 },
								py: { xs: 1.2, md: 1.5 },
								fontSize: { xs: 14, md: 16 },
								textTransform: "none",
								fontWeight: 600,
								whiteSpace: "nowrap",
							}}
						>
							{is_follow ? "Urmărești" : "Urmărește"}
						</Button>

						<Button
							onClick={onShare}
							startIcon={
								<IosShareIcon
									sx={{ width: { xs: 20, md: 24 }, height: { xs: 20, md: 24 } }}
								/>
							}
							variant="outlined"
							color="secondary"
							size="large"
							sx={{
								flexGrow: { xs: 1, md: 0 },
								py: { xs: 1.2, md: 1.5 },
								fontSize: { xs: 14, md: 16 },
								textTransform: "none",
								fontWeight: 600,
								whiteSpace: "nowrap",
							}}
						>
							Distribuie
						</Button>
					</Stack>
				</Stack>
			</Stack>

			<BusinessProfileGallery mediaFiles={mediaFiles || []} />
		</Box>
	);
};

export default memo(BusinessPhotosTab);
