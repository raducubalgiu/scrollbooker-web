"use client";

import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTheme } from "@mui/material/styles";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";
const MAPBOX_STYLE_LIGHT = process.env.NEXT_PUBLIC_MAPBOX_STYLE_LIGHT ?? "";
const MAPBOX_STYLE_DARK = process.env.NEXT_PUBLIC_MAPBOX_STYLE_DARK ?? "";

export default function SearchModule() {
  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const theme = useTheme();
  const mapStyle =
    theme.palette.mode === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT;

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current || !MAPBOX_TOKEN) {
      return;
    }

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
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
  }, [mapStyle]);

  return (
    <div style={{ width: "100%" }}>
      {!MAPBOX_TOKEN && (
        <div style={{ marginBottom: "12px", color: "#b91c1c" }}>
          Seteaza MAPBOX_TOKEN pentru a afisa harta.
        </div>
      )}
      <div
        ref={mapContainerRef}
        style={{ width: "100%", height: "500px", borderRadius: "12px" }}
      />
    </div>
  );
}
