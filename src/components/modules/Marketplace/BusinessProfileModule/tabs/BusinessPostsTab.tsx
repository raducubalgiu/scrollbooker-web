import { Box, Stack, Typography } from "@mui/material";
import React, { memo } from "react";
import Image from "next/image";
import { formatViews } from "@/components/cutomized/PostGrid/PostGrid";
import Link from "next/link";
import { isEmpty } from "lodash";
import { BusinessProfilePost } from "@/ts/models/booking/business/BusinessProfile";
import PlayIcon from "@/assets/icons/ic_play_outline.svg";
import { AppRoutes } from "@/utils/routes";
import CustomSvg from "@/components/core/CustomSvg/CustomSvg";

type BusinessPostsTabProps = {
	id: string;
	innerRef: (element: HTMLDivElement | null) => void;
	posts: BusinessProfilePost[];
};

const BusinessPostsTab = ({ id, innerRef, posts }: BusinessPostsTabProps) => {
	return (
		<Box
			id={id}
			ref={innerRef}
			sx={{
				width: "100%",
			}}
		>
			<Typography
				variant="h3"
				sx={{ fontSize: { xs: "1.75rem", md: "3rem" }, fontWeight: 600 }}
				gutterBottom
			>
				Postări video
			</Typography>

			{isEmpty(posts) && (
				<Typography sx={{ color: "text.secondary" }}>
					Momentan nu au fost adăugate postări video
				</Typography>
			)}

			<Box sx={styles.container}>
				<Box sx={styles.grid}>
					{posts.map(post => (
						<Box
							component={Link}
							key={post.id}
							href={AppRoutes.postDetail(
								post.user.username,
								post.user.profession,
								post.id,
							)}
							sx={{ width: "100%", display: "block" }}
						>
							<Box
								sx={{
									position: "relative",
									width: "100%",
									borderRadius: 2,
									overflow: "hidden",
									backgroundColor: "background.default",
									aspectRatio: "9/12",
								}}
							>
								<Image
									src={post.media_files[0]?.thumbnail_url || "/placeholder.jpg"}
									alt="Post thumbnail"
									fill
									sizes="(max-width: 600px) 50vw, (max-width: 1200px) 33vw, 25vw"
									style={{
										objectFit: "cover",
									}}
								/>

								<Box
									sx={{
										position: "absolute",
										inset: 0,
										background:
											"linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0) 60%)",
										pointerEvents: "none",
									}}
								/>

								<Box
									sx={{
										position: "absolute",
										bottom: { xs: 8, sm: 12 },
										left: { xs: 8, sm: 12 },
										display: "flex",
										alignItems: "center",
										gap: 0.5,
										pointerEvents: "none",
									}}
								>
									<Stack direction="row" alignItems="center" spacing={0.5}>
										<CustomSvg
											src={PlayIcon}
											size={24}
											sx={{ backgroundColor: "common.white" }}
										/>
										<Typography
											sx={{
												color: "common.white",
												fontWeight: 600,
												fontSize: { xs: 13, sm: 16 },
												textShadow: "0 1px 3px rgba(0, 0, 0, 0.7)",
											}}
										>
											{formatViews(post.views_count)}
										</Typography>
									</Stack>
								</Box>
							</Box>
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default memo(BusinessPostsTab);

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		gap: {
			xs: 2,
			md: 3,
		},
		pt: {
			xs: 1,
			md: 2,
		},
	},
	grid: {
		display: "grid",
		// Soluția principală: definirea corectă a numărului de coloane în funcție de ecran
		gridTemplateColumns: {
			xs: "repeat(2, 1fr)", // 2 coloane pe mobil (imaginile vor fi mari și lizibile)
			sm: "repeat(3, 1fr)", // 3 coloane pe tablete
			lg: "repeat(4, 1fr)", // 4 coloane pe desktop
		},
		gap: {
			xs: "8px", // Am mărit distanța pe mobil pentru că 2px era mult prea lipit
			sm: "12px",
			md: 2,
			lg: 2.5,
		},
	},
};
