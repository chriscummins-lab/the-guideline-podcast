import Link from "next/link";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          <Logo size={34} />
          <div className="brand-titles">
            <span className="brand-title">GeSRU Guideline Podcast</span>
            <span className="brand-sub">Urologie · Fortbildung · Guideline-basiert</span>
          </div>
        </Link>
        <span className="badge">Beta Version</span>
      </div>
    </header>
  );
}
