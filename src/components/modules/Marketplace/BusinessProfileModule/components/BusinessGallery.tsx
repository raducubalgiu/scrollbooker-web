"use client";

import Image from "next/image";
import { Box, Typography, ButtonBase, SxProps, Theme } from "@mui/material";
import { BusinessMediaFile } from "@/ts/models/booking/business/BusinessMediaFile";
import { useRef, useState } from "react";

type BusinessProfileGalleryProps = {
	mediaFiles: BusinessMediaFile[];
	businessName?: string;
	onOpenGallery?: (initialIndex?: number) => void;
};

export default function BusinessProfileGallery({
	mediaFiles,
	businessName = "Business",
	onOpenGallery,
}: BusinessProfileGalleryProps) {
	const allImages = mediaFiles.filter(Boolean);
	const safeImages = allImages.slice(0, 5);
	const totalCount = allImages.length;

	const [activeMobileIndex, setActiveMobileIndex] = useState(0);
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const handleMobileScroll = () => {
		if (!scrollContainerRef.current) return;
		const { scrollLeft, clientWidth } = scrollContainerRef.current;
		if (clientWidth === 0) return;
		const newIndex = Math.round(scrollLeft / clientWidth);
		if (newIndex !== activeMobileIndex) {
			setActiveMobileIndex(newIndex);
		}
	};

	if (totalCount === 0) {
		return (
			<Box
				sx={{
					width: "100%",
					aspectRatio: { xs: "1.2/1", md: "2/1" },
					borderRadius: 3,
					bgcolor: "action.hover",
				}}
			/>
		);
	}

	const heroImage = safeImages[0]?.url;
	const gridImages = safeImages.slice(1, 5);
	const remainingCount = totalCount - safeImages.length;

	return (
		<Box sx={{ width: "100%", position: "relative" }}>
			<Box
				ref={scrollContainerRef}
				onScroll={handleMobileScroll}
				sx={{
					display: { xs: "flex", md: "none" },
					overflowX: "auto",
					scrollSnapType: "x mandatory",
					scrollBehavior: "smooth",
					WebkitOverflowScrolling: "touch",
					width: "100vw",
					marginLeft: { xs: "-16px", sm: "-24px" },
					marginRight: { xs: "-16px", sm: "-24px" },
					aspectRatio: "1.1/1",
					"&::-webkit-scrollbar": { display: "none" },
				}}
			>
				{allImages.map((file, index) => (
					<Box
						key={`mobile-slide-${file.order_index || index}`}
						onClick={() => onOpenGallery?.(index)}
						sx={{
							flexShrink: 0,
							width: "100vw",
							height: "100%",
							scrollSnapAlign: "start",
							position: "relative",
							cursor: "pointer",
						}}
					>
						<Image
							src={file.url || file.thumbnail_url || "/placeholder.jpg"}
							alt={`${businessName} imagine mobil ${index + 1}`}
							fill
							priority={index === 0}
							sizes="100vw"
							style={{ objectFit: "cover" }}
						/>
					</Box>
				))}

				<Typography
					sx={{
						position: "absolute",
						bottom: 16,
						right: 16,
						zIndex: 10,
						px: 1.5,
						py: 0.5,
						borderRadius: 999,
						bgcolor: "rgba(0, 0, 0, 0.7)",
						color: "#fff",
						fontSize: 13,
						fontWeight: 600,
						letterSpacing: 0.5,
						pointerEvents: "none",
					}}
				>
					{activeMobileIndex + 1} / {totalCount}
				</Typography>
			</Box>

			<Box
				sx={{
					display: { xs: "none", md: "grid" },
					gridTemplateColumns: "1fr 1fr",
					gap: 1,
					width: "100%",
					borderRadius: 3,
					overflow: "hidden",
				}}
			>
				<GalleryTile
					src={heroImage ?? ""}
					alt={`${businessName} imagine hero`}
					priority
					onClick={() => onOpenGallery?.(0)}
					sx={{ aspectRatio: "1.55/1" }}
				/>

				<Box
					sx={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gridTemplateRows: "1fr 1fr",
						gap: 1,
						height: "100%",
					}}
				>
					{Array.from({ length: 4 }).map((_, index) => {
						const file = gridImages[index];
						const imageIndex = index + 1;
						const isLast = index === 3;

						if (!file) return <EmptyTile key={index} />;

						return (
							<GalleryTile
								key={index}
								src={file.thumbnail_url || file.url || ""}
								alt={`${businessName} imagine secundară ${imageIndex + 1}`}
								onClick={() => onOpenGallery?.(imageIndex)}
								sx={{ height: "100%" }}
								overlay={
									isLast && remainingCount > 0 ? (
										<OverlayButton onClick={() => onOpenGallery?.(imageIndex)}>
											Vezi toate
										</OverlayButton>
									) : undefined
								}
								extraOverlay={
									isLast && remainingCount > 0 ? (
										<Typography
											sx={{
												position: "absolute",
												top: 12,
												right: 12,
												zIndex: 2,
												px: 1,
												py: 0.35,
												borderRadius: 999,
												bgcolor: "rgba(0,0,0,0.65)",
												color: "#fff",
												fontSize: 12,
												fontWeight: 700,
											}}
										>
											+{remainingCount}
										</Typography>
									) : undefined
								}
							/>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}

type GalleryTileProps = {
	src: string;
	alt: string;
	onClick?: () => void;
	priority?: boolean;
	overlay?: React.ReactNode;
	extraOverlay?: React.ReactNode;
	sx?: SxProps<Theme>;
};

function GalleryTile({
	src,
	alt,
	onClick,
	priority = false,
	overlay,
	extraOverlay,
	sx,
}: GalleryTileProps) {
	return (
		<ButtonBase
			onClick={onClick}
			sx={{
				position: "relative",
				display: "block",
				width: "100%",
				overflow: "hidden",
				textAlign: "initial",
				"&:hover img": {
					transform: "scale(1.02)",
				},
				...sx,
			}}
		>
			<Image
				src={src}
				alt={alt}
				fill
				priority={priority}
				sizes="50vw"
				style={{
					objectFit: "cover",
					transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
				}}
			/>
			{extraOverlay}
			{overlay}
			{!overlay && (
				<Box
					sx={{
						position: "absolute",
						inset: 0,
						background: "rgba(0,0,0,0)",
						transition: "background-color 0.2s ease",
						"&:hover": {
							bgcolor: "rgba(0,0,0,0.03)",
						},
						pointerEvents: "none",
					}}
				/>
			)}
		</ButtonBase>
	);
}

function EmptyTile() {
	return (
		<Box sx={{ width: "100%", height: "100%", bgcolor: "action.hover" }} />
	);
}

function OverlayButton({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) {
	return (
		<Box
			onClick={e => {
				e.stopPropagation();
				onClick?.();
			}}
			sx={{
				position: "absolute",
				inset: 0,
				zIndex: 1,
				display: "flex",
				alignItems: "flex-end",
				justifyContent: "flex-end",
				p: 2.5,
				background:
					"linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 50%)",
			}}
		>
			<Box
				sx={{
					px: 2.5,
					py: 1,
					borderRadius: 2,
					bgcolor: "#ffffff",
					color: "#222222",
					fontSize: 14,
					fontWeight: 600,
					lineHeight: 1,
					boxShadow: "0px 2px 8px rgba(0,0,0,0.12)",
					border: "1px solid #222222",
					cursor: "pointer",
					"&:hover": { bgcolor: "#f7f7f7" },
				}}
			>
				{children}
			</Box>
		</Box>
	);
}
