import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ScrollBooker",
    short_name: "ScrollBooker",
    description:
      "ScrollBooker — Video-First Booking pentru Beauty. Feed video, programări instant.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#FF6F00",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
