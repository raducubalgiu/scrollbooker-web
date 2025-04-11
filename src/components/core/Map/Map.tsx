"use client";

import React, { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike } from "maplibre-gl";
import { Box } from "@mui/material";

type MapProps = { coordinates: LngLatLike };

export default function Map({ coordinates }: MapProps) {
	const mapContainerRef = useRef(null);

	useEffect(() => {
		const map = new maplibregl.Map({
			container: mapContainerRef.current!,
			style: {
				version: 8,
				name: "OSM Streets",
				sources: {
					osm: {
						type: "raster",
						tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
						tileSize: 256,
					},
				},
				layers: [
					{
						id: "osm",
						type: "raster",
						source: "osm",
						minzoom: 0,
						maxzoom: 18,
					},
				],
			},
			center: coordinates,
			zoom: 17,
			maxZoom: 17.9,
		});

		map.addControl(new maplibregl.NavigationControl(), "top-right");

		new maplibregl.Marker({ color: "#FF6F00" })
			.setLngLat(coordinates)
			.addTo(map);

		return () => map.remove();
	}, [coordinates]);

	return (
		<Box
			sx={{ borderRadius: 2.5 }}
			ref={mapContainerRef}
			style={{ width: "100%", height: "200px" }}
		/>
	);
}
