"use client";

import Header from "./Header";
import Footer from "./Footer";
import { usePlayer } from "./PlayerProvider";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { track } = usePlayer();

  return (
    <div className={`app-shell ${track ? "has-mini-player" : ""}`}>
      <Header />
      <main className="app-main">{children}</main>
      <Footer />
    </div>
  );
}
