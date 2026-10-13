"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Home", icon: "ti-home", exact: true },
  { href: "/themen", label: "Themen", icon: "ti-list", exact: false },
  { href: "/gemerkt", label: "Gemerkt", icon: "ti-bookmark", exact: false },
  { href: "/suche", label: "Suche", icon: "ti-search", exact: false },
] as const;

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="bottom-tab-bar">
      {TABS.map((tab) => {
        const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`bottom-tab ${active ? "active" : ""}`}
          >
            <i className={`ti ${tab.icon} bottom-tab-icon`} aria-hidden="true" />
            <span className="bottom-tab-label">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
