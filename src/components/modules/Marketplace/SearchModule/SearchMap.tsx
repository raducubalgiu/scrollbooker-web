import { Box } from "@mui/material";
import React, { memo, useCallback } from "react";
import mapboxgl, { LngLatBounds } from "mapbox-gl";
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
import MapLoadingIndicator from "./SearchLoadingIndicator";

type SearchMapProps = {
  markers: BusinessMarker[];
  isMapVisible: boolean;
  onMapExpandToggle: () => void;
  isMapExpanded: boolean;
  searchHeaderHeight: number;
  mainPagePadding: string;
  isLoadingMarkers: boolean;
  isRefetchingMarkers: boolean;
  refetchData: (bounds: LngLatBounds, zoom: number) => void;
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
  refetchData,
}: SearchMapProps) => {
  const theme = useTheme();
  const mapTopGap = theme.spacing(0.5);
  const mapBottomGap = theme.spacing(2.5);

  const mapTopOffset = `calc(${searchHeaderHeight}px + ${mapTopGap})`;
  const mapHeight = `calc(100dvh - ${searchHeaderHeight}px - ${mapTopGap} - ${mainPagePadding} - ${mapBottomGap})`;

  const mapContainerRef = React.useRef<HTMLDivElement | null>(null);
  const mapRef = React.useRef<mapboxgl.Map | null>(null);
  const markersRef = React.useRef<Map<number, mapboxgl.Marker>>(new Map());
  const lastCameraRef = React.useRef<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);
  const debounceTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  const { mode } = useThemeMode();

  const mapStyle = React.useMemo(
    () => (mode === "dark" ? MAPBOX_STYLE_DARK : MAPBOX_STYLE_LIGHT),
    [mode]
  );

  const initialBounds: [number, number, number, number] = [
    25.961395, 44.202274, 26.243607, 44.650467,
  ];

  const refetchRef = React.useRef(refetchData);
  React.useEffect(() => {
    refetchRef.current = refetchData;
  }, [refetchData]);

  React.useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      bounds: initialBounds,
      fitBoundsOptions: {
        padding: 20,
      },
      trackResize: false,
    });

    map.on("moveend", () => {
      const center = map.getCenter();
      const zoom = map.getZoom();

      const currentCamera = { lat: center.lat, lng: center.lng, zoom };
      const lastCamera = lastCameraRef.current;

      const MIN_ZOOM_DELTA = 0.5;
      const MIN_MOVE_METERS = 10000;

      let shouldRequest = false;

      if (!lastCamera) {
        shouldRequest = true;
      } else {
        const zoomDiff = Math.abs(currentCamera.zoom - lastCamera.zoom);
        const distance = getDistanceInMeters(
          lastCamera.lat,
          lastCamera.lng,
          center.lat,
          center.lng
        );
        if (zoomDiff >= MIN_ZOOM_DELTA || distance >= MIN_MOVE_METERS)
          shouldRequest = true;
      }
      if (shouldRequest) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          // 1. Extragem datele proaspete de la instanța hărții
          const bounds = map.getBounds();
          const zoom = map.getZoom();

          // 2. TYPE GUARD: Verificăm dacă bounds există (nu este null)
          if (bounds && typeof zoom === "number") {
            lastCameraRef.current = {
              lat: map.getCenter().lat,
              lng: map.getCenter().lng,
              zoom,
            };

            refetchRef.current(bounds, zoom);
          }
        }, 500);
      }
    });

    mapRef.current = map;

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const businessDomainMap = new Map<string, string>([
    ["Beauty", "#9B4A55"],
    ["Medical", "#36CFC9"],
    ["Auto", "#3A86FF"],
  ]);

  // 2. EFECT PENTRU ACTUALIZARE MARKERI (Rulează la fiecare schimbare de date)
  React.useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapVisible || !Array.isArray(markers)) return;

    if (!(markersRef.current instanceof Map)) {
      markersRef.current = new Map();
    }

    const currentMarkersMap = markersRef.current;
    const newMarkerIds = new Set(markers.map((m) => m.id));

    currentMarkersMap.forEach((marker, id) => {
      if (!newMarkerIds.has(id)) {
        marker.remove();
        currentMarkersMap.delete(id); // Acum va merge garantat
      }
    });

    markers.forEach((m) => {
      if (!currentMarkersMap.has(m.id)) {
        const lat = m?.coordinates?.lat;
        const lng = m?.coordinates?.lng;
        if (lat == null || lng == null) return;

        const domainColor =
          businessDomainMap.get(m.business_short_domain) || "#000";
        const el = document.createElement("div");

        el.style.borderRadius = "50%";
        el.style.cursor = "pointer";
        el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
        el.style.display = "block";

        if (m.is_primary) {
          const size = "60px";
          el.style.width = size;
          el.style.height = size;
          el.style.border = `3px solid ${domainColor}`;
          el.style.backgroundImage = `url(${m.media_files?.[0]?.url || "/default-avatar.png"})`;
          el.style.backgroundSize = "cover";
          el.style.backgroundPosition = "center";
          el.style.zIndex = "20";
        } else {
          const size = "15px";
          el.style.width = size;
          el.style.height = size;
          el.style.backgroundColor = domainColor;
          el.style.border = "2px solid white";
          el.style.zIndex = "10";
        }

        const marker = new mapboxgl.Marker({
          element: el,
          anchor: "center",
        })
          .setLngLat([lng, lat])
          .addTo(map);

        currentMarkersMap.set(m.id, marker);
      }
    });
  }, [markers, isMapVisible]);

  // 3. EFECT PENTRU SCHIMBARE STIL (Dark/Light) fără recreare
  React.useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setStyle(mapStyle);
    }
  }, [mapStyle]);

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

  // 4. RESIZE UNIFICAT
  React.useEffect(() => {
    if (!mapRef.current || !isMapVisible) return;
    const animId = requestAnimationFrame(() => {
      mapRef.current?.resize();
    });
    return () => cancelAnimationFrame(animId);
  }, [isMapVisible, isMapExpanded, mapHeight, mapTopOffset]);

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
        <MapLoadingIndicator show={isLoadingMarkers || isRefetchingMarkers} />

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

const getDistanceInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // Raza Pământului în metri
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};
