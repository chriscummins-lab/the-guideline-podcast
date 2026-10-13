import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import AppShell from "@/components/AppShell";
import PlayerProvider from "@/components/PlayerProvider";
import MiniPlayer from "@/components/MiniPlayer";
import BottomTabBar from "@/components/BottomTabBar";
import QueuePanel from "@/components/QueuePanel";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "GeSRU Guideline Podcast — Urologie Fortbildung",
  description:
    "Leitlinien als Podcast, Schaubild und Quiz für ÄrztInnen in Weiterbildung im Fach Urologie.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={nunitoSans.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.42.0/dist/tabler-icons.min.css"
        />
      </head>
      <body>
        <PlayerProvider>
          <AppShell>{children}</AppShell>
          <MiniPlayer />
          <QueuePanel />
          <BottomTabBar />
        </PlayerProvider>
        <Analytics />
      </body>
    </html>
  );
}
