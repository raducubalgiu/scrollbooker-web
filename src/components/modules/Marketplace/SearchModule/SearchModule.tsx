"use client";

import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import SearchHeader from "./SearchHeader/SearchHeader";
import { busineses_for_map, markers } from "./searchMockData";
import BusinessCard from "./BusinessCard";
import { BusinessMarkerType } from "@/ts/models/booking/business/BusinessMarker";
import FiltersModal from "./FiltersModal";
import { BusinessDomainType } from "@/ts/models/nomenclatures/businessDomain/BusinessDomainType";
import MapActions from "./MapActions";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAPBOX_STYLE_LIGHT = process.env.NEXT_PUBLIC_MAPBOX_STYLE_LIGHT ?? "";
const MAPBOX_STYLE_DARK = process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK ?? "";

export default function SearchModule() {
	const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
	const mapRef = React.useRef<mapboxgl.Map | null>(null);
	const theme = useTheme();
	const mapStyle =
		theme.palette.mode === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT;
	const mainPagePadding = theme.spacing(2.5);
	const mapTopGap = theme.spacing(0.5);
	const mapBottomGap = theme.spacing(2.5);

	const [selectedBusinessDomain, setSelectedBusinessDomain] =
		React.useState<BusinessDomainType>({
			id: 0,
			name: "Toate",
			short_name: "Toate",
			active: false,
			service_domains: [],
		});
	const [isMapVisible, setIsMapVisible] = React.useState(true);
	const [isMapExpanded, setIsMapExpanded] = React.useState(false);
	const [openFilters, setOpenFilters] = React.useState(false);
	const [searchHeaderHeight, setSearchHeaderHeight] = React.useState(0);

	const mapTopOffset = `calc(${searchHeaderHeight}px + ${mapTopGap})`;
	const mapHeight = `calc(100dvh - ${searchHeaderHeight}px - ${mapTopGap} - ${mainPagePadding} - ${mapBottomGap})`;
	const leftGridSize = isMapVisible ? 7 : 12;

	React.useEffect(() => {
		if (!isMapVisible) return;

		if (!mapContainerRef.current || mapRef.current || !MAPBOX_TOKEN) {
			return;
		}

		mapboxgl.accessToken = MAPBOX_TOKEN;

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: mapStyle,
			center: [26.1025, 44.4268],
			zoom: 12,
		});

		// we'll add markers only after the style has loaded to avoid race conditions
		const createdMarkers: mapboxgl.Marker[] = [];

		const onLoad = () => {
			// static center marker (only after load)
			const centerMarker = new mapboxgl.Marker({ color: "#ef4444" })
				.setLngLat([26.1025, 44.4268])
				.addTo(map);
			createdMarkers.push(centerMarker);

			const markerItems = markers?.results ?? [];
			if (Array.isArray(markerItems)) {
				markerItems.forEach((m: BusinessMarkerType) => {
					const lat = m?.coordinates?.lat ?? null;
					const lng = m?.coordinates?.lng ?? null;
					if (lat == null || lng == null) return;

					const marker = new mapboxgl.Marker({ color: "#1976d2" })
						.setLngLat([lng, lat])
						.addTo(map);

					createdMarkers.push(marker);
				});
			}
		};

		map.on("load", onLoad);
		mapRef.current = map;

		return () => {
			try {
				map.off("load", onLoad);
			} catch (e) {
				if (e instanceof Error) {
					// ignore if map already destroyed
				}
			}
			createdMarkers.forEach(mk => mk.remove());
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, [mapStyle, isMapVisible]);

	React.useEffect(() => {
		if (!isMapVisible || !mapRef.current) return;

		mapRef.current.resize();
	}, [isMapVisible, mapHeight, mapTopOffset]);

	const map = React.useMemo(() => {
		return (
			<Grid size={5}>
				<Box
					sx={{
						position: "sticky",
						top: mapTopOffset,
						height: mapHeight,
						bgcolor: "background.default",
						borderRadius: 5,
						overflow: "hidden",
					}}
				>
					<Box
						sx={{
							position: "relative",
							width: "100%",
							height: "100%",
							borderRadius: 5,
						}}
					>
						<Box
							ref={mapContainerRef}
							sx={{ width: "100%", height: "100%", borderRadius: 5 }}
						/>
						<MapActions
							onMapExpandToggle={() => setIsMapExpanded(prev => !prev)}
							onZoomIn={() => {
								if (mapRef.current) {
									mapRef.current.zoomTo(mapRef.current.getZoom() + 1, {
										duration: 300,
									});
								}
							}}
							onZoomOut={() => {
								if (mapRef.current) {
									mapRef.current.zoomTo(mapRef.current.getZoom() - 1, {
										duration: 300,
									});
								}
							}}
							isMapExpanded={isMapExpanded}
						/>
					</Box>
				</Box>
			</Grid>
		);
	}, [mapContainerRef, mapHeight, mapTopOffset, isMapExpanded]);

	return (
		<Box>
			<FiltersModal open={openFilters} onClose={() => setOpenFilters(false)} />

			<SearchHeader
				isMapVisible={isMapVisible}
				onToggleMap={() => setIsMapVisible(prev => !prev)}
				onHeightChange={setSearchHeaderHeight}
				onOpenFilters={() => setOpenFilters(true)}
				mainPagePadding={mainPagePadding}
				selectedBusinessDomain={selectedBusinessDomain}
				onSetSelectedBusinessDomain={bDomain =>
					setSelectedBusinessDomain(bDomain)
				}
			/>

			<Grid container spacing={5}>
				<Grid size={leftGridSize}>
					<Typography color="text.secondary" my={2.5}>
						100 de rezultate in zona
					</Typography>

					<Box
						sx={{
							display: "grid",
							gridTemplateColumns: {
								xs: "1fr",
								sm: isMapVisible ? "1fr 1fr" : "repeat(3, 1fr)",
							},
							gap: 5,
							px: { xs: 1, md: 0 },
						}}
					>
						{busineses_for_map.results.map(b => (
							<BusinessCard key={b.id} business={b} />
						))}
					</Box>
				</Grid>
				{isMapVisible && map}
			</Grid>
		</Box>
	);
}
