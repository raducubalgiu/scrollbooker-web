"use client";

//import CustomTabs from "@/components/core/CustomTabs/CustomTabs";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import {
	Box,
	Button,
	Chip,
	Container,
	Divider,
	Paper,
	Stack,
	Tab,
	Tabs,
	Typography,
} from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import TextsmsIcon from "@mui/icons-material/Textsms";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const SERVICES = [
	{
		name: "Tuns + barba",
		duration: "45 min",
		price: "de la 90 RON",
		highlight: true,
	},
	{
		name: "Fade premium",
		duration: "60 min",
		price: "120 RON",
	},
	{
		name: "Pachet styling event",
		duration: "75 min",
		price: "160 RON",
	},
];

const PRODUCTS = [
	{
		name: "Matte clay",
		type: "Styling",
		price: "69 RON",
	},
	{
		name: "Beard oil kit",
		type: "Aftercare",
		price: "84 RON",
	},
	{
		name: "Texture powder",
		type: "Finish",
		price: "58 RON",
	},
];

const REVIEWS = [
	{
		name: "Alex M.",
		rating: "5.0",
		text: "Am venit pentru clip, am rămas pentru cât de clar era tot fluxul de booking.",
	},
	{
		name: "Radu P.",
		rating: "4.9",
		text: "Disponibilitatea era exact cum apărea în feed. Foarte puține click-uri până la rezervare.",
	},
	{
		name: "Bianca T.",
		rating: "5.0",
		text: "Mi-a plăcut că am putut compara rapid serviciile fără să ies din video.",
	},
];

const COMMENTS = [
	{
		name: "cris.style",
		text: "Culoarea din clip e exact ce căutam. Se poate face booking și pentru sâmbătă?",
	},
	{
		name: "maria.looks",
		text: "Arată bine că disponibilitatea e lângă video. Nu mai trebuie să intru pe profil.",
	},
	{
		name: "vlad.cut",
		text: "Aș apăsa direct pe Rezervă dacă văd și durata serviciului în panou.",
	},
];

enum ExploreInfoTab {
	PRODUCTS,
	REVIEWS,
	COMMENTS,
}

export default function ExploreModule() {
	//const [currentTab, setCurrentTab] = React.useState(0);
	const [infoTab, setInfoTab] = React.useState(ExploreInfoTab.PRODUCTS);

	const renderRightRailContent = () => {
		switch (infoTab) {
			case ExploreInfoTab.PRODUCTS:
				return (
					<Stack spacing={1.25}>
						{PRODUCTS.map(product => (
							<Paper
								key={product.name}
								variant="outlined"
								sx={{
									p: 1.5,
									borderColor: "divider",
									bgcolor: "background.paper",
								}}
							>
								<Stack
									direction="row"
									justifyContent="space-between"
									spacing={2}
								>
									<Box>
										<Typography fontWeight={700}>{product.name}</Typography>
										<Typography variant="body2" color="text.secondary">
											{product.type}
										</Typography>
									</Box>
									<Typography fontWeight={700}>{product.price}</Typography>
								</Stack>
							</Paper>
						))}
					</Stack>
				);
			case ExploreInfoTab.REVIEWS:
				return (
					<Stack spacing={1.25}>
						{REVIEWS.map(review => (
							<Paper
								key={review.name}
								variant="outlined"
								sx={{
									p: 1.5,
									borderColor: "divider",
									bgcolor: "background.paper",
								}}
							>
								<Stack
									direction="row"
									justifyContent="space-between"
									alignItems="center"
								>
									<Typography fontWeight={700}>{review.name}</Typography>
									<Stack direction="row" spacing={0.5} alignItems="center">
										<StarRoundedIcon
											sx={{ fontSize: 18, color: "primary.main" }}
										/>
										<Typography variant="body2" fontWeight={700}>
											{review.rating}
										</Typography>
									</Stack>
								</Stack>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mt: 1 }}
								>
									{review.text}
								</Typography>
							</Paper>
						))}
					</Stack>
				);
			case ExploreInfoTab.COMMENTS:
				return (
					<Stack spacing={1.25}>
						{COMMENTS.map(comment => (
							<Paper
								key={comment.name}
								variant="outlined"
								sx={{
									p: 1.5,
									borderColor: "divider",
									bgcolor: "background.paper",
								}}
							>
								<Typography fontWeight={700}>{comment.name}</Typography>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mt: 0.75 }}
								>
									{comment.text}
								</Typography>
							</Paper>
						))}
					</Stack>
				);
			default:
				return null;
		}
	};

	return (
		<>
			{/* <CustomTabs
				tabs={[
					{ label: "Explore", key: 0 },
					{ label: "Urmaresti", key: 1 },
				]}
				currentTab={currentTab}
				setValue={setCurrentTab}
			/> */}

			<Container
				sx={{
					py: { xs: 2, md: 3, lg: 0 },
					display: "flex",
					justifyContent: "center",
					px: { xs: 2, md: 3 },
					height: { lg: "calc(100dvh - 40px)" },
					maxHeight: { lg: "calc(100dvh - 40px)" },
					overflow: "hidden",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: { xs: "flex-end", lg: "stretch" },
						gap: { xs: 1.5, lg: 3 },
						flexDirection: { xs: "row", lg: "row" },
						width: "100%",
						maxWidth: 1280,
						justifyContent: "center",
						height: "100%",
						overflow: "hidden",
					}}
				>
					<Stack
						sx={{
							width: { xs: "100%", lg: "auto" },
							maxWidth: { xs: 340, sm: 370, md: 420, lg: "none" },
							flexShrink: 0,
							height: { lg: "100%" },
							minHeight: 0,
						}}
					>
						<Box
							sx={{
								position: "relative",
								/* height-driven: lățimea se calculează din height × 9/16 */
								height: { xs: "auto", lg: "100%" },
								width: { xs: "100%", lg: "auto" },
								aspectRatio: "9 / 16",
								borderRadius: 6,
								overflow: "hidden",
								bgcolor: "secondary.main",
								boxShadow: "0 28px 60px rgba(15, 23, 42, 0.28)",
								display: "flex",
								alignItems: "stretch",
							}}
						>
							<Box
								sx={{
									position: "absolute",
									inset: 0,
									background:
										"radial-gradient(circle at top, rgba(255,255,255,0.14), transparent 35%), linear-gradient(180deg, rgba(15,23,42,0.12) 0%, rgba(15,23,42,0.65) 100%)",
								}}
							/>

							<Stack
								spacing={1.5}
								sx={{
									position: "absolute",
									left: 20,
									right: 20,
									bottom: 20,
									zIndex: 1,
									color: "common.white",
								}}
							>
								<Stack direction="row" spacing={1.25} alignItems="center">
									<Box>
										<Typography variant="subtitle1" fontWeight={800}>
											Frizeria Figaro
										</Typography>
										<Typography
											variant="body2"
											color="primary"
											sx={{ opacity: 0.92, fontWeight: 600 }}
										>
											Frizerie
										</Typography>
									</Box>
								</Stack>

								<Typography
									variant="body2"
									sx={{ opacity: 0.9, maxWidth: 320 }}
								>
									Un video trebuie să convingă vizual. Panoul din dreapta
									trebuie să închidă rapid decizia de rezervare.
								</Typography>

								<Button
									variant="contained"
									size="large"
									endIcon={<ArrowForwardRoundedIcon />}
									sx={{
										display: { xs: "inline-flex", lg: "none" },
										alignSelf: "flex-start",
										px: 2.5,
									}}
								>
									Rezervă
								</Button>
							</Stack>
						</Box>
					</Stack>

					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 1,
							pb: 1,
							alignSelf: { xs: "flex-end", lg: "flex-end" },
						}}
					>
						{[
							{
								key: "like",
								icon: <FavoriteIcon fontSize="large" />,
							},
							{
								key: "comments",
								icon: <TextsmsIcon fontSize="large" />,
							},
							{
								key: "save",
								icon: <BookmarkIcon fontSize="large" />,
							},
							{ key: "share", icon: <ShareRoundedIcon fontSize="large" /> },
						].map(action => (
							<Box
								key={action.key}
								sx={{
									width: 60,
									height: 60,
									borderRadius: "50%",
									bgcolor: "rgba(15,23,42,0.72)",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "common.white",
									cursor: "pointer",
									boxShadow: "0 10px 20px rgba(15,23,42,0.16)",
								}}
							>
								{action.icon}
							</Box>
						))}
					</Box>

					<Paper
						elevation={0}
						sx={{
							display: { xs: "none", lg: "flex" },
							flexDirection: "column",
							width: 420,
							height: "100%",
							minHeight: 0,
							borderRadius: 6,
							border: theme => `1px solid ${theme.palette.divider}`,
							bgcolor: "background.default",
							overflow: "hidden",
							boxShadow: "0 28px 60px rgba(15, 23, 42, 0.08)",
						}}
					>
						<Box
							sx={{
								p: 2,
								background:
									"linear-gradient(180deg, rgba(255,111,0,0.10) 0%, rgba(255,111,0,0) 100%)",
							}}
						>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="flex-start"
								spacing={2}
							>
								<Box>
									<Typography
										variant="overline"
										color="primary.main"
										fontWeight={800}
									>
										BOOKING PANEL
									</Typography>
									<Typography variant="h6" fontWeight={800} sx={{ mt: 0.5 }}>
										Rezervă fără să părăsești feed-ul
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mt: 0.5 }}
									>
										Toate informațiile esențiale pentru decizie sunt lângă
										video: servicii, durată, preț și primul slot disponibil.
									</Typography>
								</Box>
								<Chip label="4.9" color="primary" icon={<StarRoundedIcon />} />
							</Stack>

							<Stack
								direction="row"
								spacing={1}
								flexWrap="wrap"
								useFlexGap
								sx={{ mt: 1.5 }}
							>
								<Chip
									icon={<PlaceRoundedIcon />}
									label="Piața Romană, București"
								/>
								<Chip
									icon={<AccessTimeRoundedIcon />}
									label="Azi, 17:30 disponibil"
								/>
								<Chip label="de la 90 RON" />
							</Stack>
						</Box>

						<Box sx={{ px: 2, pb: 2 }}>
							<Paper
								variant="outlined"
								sx={{
									p: 1.5,
									borderRadius: 4,
									borderColor: "divider",
									bgcolor: "background.paper",
								}}
							>
								<Stack spacing={1.25}>
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
									>
										<Typography fontWeight={800}>
											Pasul 1 • Alege serviciile
										</Typography>
										<Typography variant="body2" color="text.secondary">
											2 din 3 pași rămași
										</Typography>
									</Stack>

									<Stack spacing={1}>
										{SERVICES.map(service => (
											<Paper
												key={service.name}
												variant="outlined"
												sx={{
													p: 1.25,
													borderRadius: 3,
													borderColor: service.highlight
														? "primary.main"
														: "divider",
													bgcolor: service.highlight
														? "rgba(255,111,0,0.06)"
														: "background.paper",
												}}
											>
												<Stack
													direction="row"
													justifyContent="space-between"
													spacing={2}
												>
													<Box>
														<Typography fontWeight={700}>
															{service.name}
														</Typography>
														<Typography
															variant="body2"
															color="text.secondary"
															sx={{ mt: 0.4 }}
														>
															{service.duration}
														</Typography>
													</Box>
													<Box sx={{ textAlign: "right" }}>
														<Typography fontWeight={800}>
															{service.price}
														</Typography>
														{service.highlight ? (
															<Typography
																variant="caption"
																color="primary.main"
																fontWeight={700}
															>
																Selectat în mock
															</Typography>
														) : null}
													</Box>
												</Stack>
											</Paper>
										))}
									</Stack>

									<Paper
										variant="outlined"
										sx={{
											p: 1.25,
											borderRadius: 3,
											borderColor: "divider",
											bgcolor: "background.default",
										}}
									>
										<Stack direction="row" justifyContent="space-between">
											<Box>
												<Typography variant="body2" color="text.secondary">
													Selecție curentă
												</Typography>
												<Typography fontWeight={800}>Tuns + barba</Typography>
											</Box>
											<Box sx={{ textAlign: "right" }}>
												<Typography fontWeight={800}>90 RON</Typography>
												<Typography variant="body2" color="text.secondary">
													45 min
												</Typography>
											</Box>
										</Stack>
									</Paper>

									<Stack direction="row" spacing={1}>
										<Button
											fullWidth
											variant="contained"
											size="medium"
											endIcon={<ArrowForwardRoundedIcon />}
										>
											Alege disponibilitatea
										</Button>
										<Button fullWidth variant="outlined" size="medium">
											Confirmă pașii
										</Button>
									</Stack>
								</Stack>
							</Paper>
						</Box>

						<Divider />

						<Box sx={{ px: 1.25, pt: 1.25 }}>
							<Tabs
								value={infoTab}
								onChange={(_, value) => setInfoTab(value)}
								variant="fullWidth"
								sx={{
									minHeight: 44,
									"& .MuiTabs-indicator": { height: 3, borderRadius: 3 },
									"& .MuiTab-root": {
										textTransform: "none",
										minHeight: 44,
										fontWeight: 700,
									},
								}}
							>
								<Tab value={ExploreInfoTab.PRODUCTS} label="Produse" />
								<Tab value={ExploreInfoTab.REVIEWS} label="Recenzii" />
								<Tab value={ExploreInfoTab.COMMENTS} label="Comentarii" />
							</Tabs>
						</Box>

						<Box
							sx={{ flex: 1, minHeight: 0, p: 2, pt: 1.5, overflowY: "auto" }}
						>
							{renderRightRailContent()}
						</Box>

						<Box
							sx={{
								mt: "auto",
								p: 1.5,
								borderTop: theme => `1px solid ${theme.palette.divider}`,
								bgcolor: "background.paper",
							}}
						>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								spacing={2}
							>
								<Box>
									<Typography variant="body2" color="text.secondary">
										Rezervare selectată
									</Typography>
									<Typography fontWeight={800}>
										Tuns + barba • azi 17:30
									</Typography>
								</Box>
								<Button variant="contained" size="medium">
									Rezervă acum
								</Button>
							</Stack>
						</Box>
					</Paper>
				</Box>
			</Container>
		</>
	);
}
