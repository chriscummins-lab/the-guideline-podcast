import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GeSRU Guideline Podcast",
    short_name: "GL Podcast",
    description:
      "Leitlinien als Podcast, Schaubild und Quiz für ÄrztInnen in Weiterbildung im Fach Urologie.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#06bc5c",
    lang: "de",
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
