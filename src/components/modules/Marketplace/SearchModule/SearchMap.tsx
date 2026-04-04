import { Box } from "@mui/material";
import React, { memo, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapActions from "./MapActions";
import { useThemeMode } from "@/providers/ThemeContext";
import {
  MAPBOX_STYLE_DARK,
  MAPBOX_STYLE_LIGHT,
  MAPBOX_TOKEN,
} from "./search-utils";
import { BusinessMarker } from "@/ts/models/booking/business/search/BusinessMarker";
import { useTheme } from "@mui/material/styles";

type SearchMapProps = {
  markers: BusinessMarker[];
  isMapVisible: boolean;
  onMapExpandToggle: () => void;
  isMapExpanded: boolean;
  searchHeaderHeight: number;
  mainPagePadding: string;
  isLoadingMarkers: boolean;
  isRefetchingMarkers: boolean;
};

const SearchMap = ({
  markers,
  isMapVisible,
  onMapExpandToggle,
  isMapExpanded,
  searchHeaderHeight,
  mainPagePadding,
  isLoadingMarkers,
  isRefetchingMarkers,
}: SearchMapProps) => {
  const theme = useTheme();
  const mapTopGap = theme.spacing(0.5);
  const mapBottomGap = theme.spacing(2.5);

  const mapTopOffset = `calc(${searchHeaderHeight}px + ${mapTopGap})`;
  const mapHeight = `calc(100dvh - ${searchHeaderHeight}px - ${mapTopGap} - ${mainPagePadding} - ${mapBottomGap})`;

  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const { mode } = useThemeMode();

  const mapStyle = React.useMemo(
    () => (mode === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT),
    [mode]
  );

  React.useEffect(() => {
    if (!isMapVisible || !mapRef.current) return;

    mapRef.current.resize();
  }, [isMapVisible, mapHeight, mapTopOffset]);

  React.useEffect(() => {
    if (!markers) return;

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

    const createdMarkers: mapboxgl.Marker[] = [];

    const onLoad = () => {
      const centerMarker = new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([26.1025, 44.4268])
        .addTo(map);
      createdMarkers.push(centerMarker);

      if (Array.isArray(markers)) {
        markers.forEach((m: BusinessMarker) => {
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
      createdMarkers.forEach((mk) => mk.remove());
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [mapStyle, isMapVisible, markers]);

  const handleZoomIn = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.zoomTo(mapRef.current.getZoom() + 1, {
        duration: 300,
      });
    }
  }, [mapRef]);

  const handleZoomOut = useCallback(() => {
    if (mapRef.current) {
      mapRef.current.zoomTo(mapRef.current.getZoom() - 1, {
        duration: 300,
      });
    }
  }, [mapRef]);

  React.useEffect(() => {
    if (mapRef.current) {
      setTimeout(() => {
        mapRef.current?.resize();
      }, 0);
    }
  }, [isMapExpanded]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: mapTopOffset,
        height: mapHeight,
        width: "100%",
        minWidth: 0,
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
          onMapExpandToggle={onMapExpandToggle}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          isMapExpanded={isMapExpanded}
        />
      </Box>
    </Box>
  );
};

export default memo(SearchMap);
