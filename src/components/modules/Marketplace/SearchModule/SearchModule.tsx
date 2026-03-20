"use client";

import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

export default function SearchModule() {
	const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
	const mapRef = React.useRef<mapboxgl.Map | null>(null);

	React.useEffect(() => {
		if (!mapContainerRef.current || mapRef.current || !MAPBOX_TOKEN) {
			return;
		}

		mapboxgl.accessToken = MAPBOX_TOKEN;

		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			style: "",
			center: [26.1025, 44.4268],
			zoom: 10,
		});

		map.addControl(new mapboxgl.NavigationControl(), "top-right");

		new mapboxgl.Marker({ color: "#ef4444" })
			.setLngLat([26.1025, 44.4268])
			.addTo(map);

		mapRef.current = map;

		return () => {
			mapRef.current?.remove();
			mapRef.current = null;
		};
	}, []);

	return (
		<div style={{ width: "100%" }}>
			{!MAPBOX_TOKEN && (
				<div style={{ marginBottom: "12px", color: "#b91c1c" }}>
					Seteaza NEXT_PUBLIC_MAPBOX_TOKEN pentru a afisa harta.
				</div>
			)}
			<div
				ref={mapContainerRef}
				style={{ width: "100%", height: "500px", borderRadius: "12px" }}
			/>
		</div>
	);
}
