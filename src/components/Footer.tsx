import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span>
          <strong>GeSRU Guideline Podcast</strong> · für ÄrztInnen in Weiterbildung im Fach Urologie
        </span>
        <span>Basierend auf AWMF Guidelines · Kein Ersatz für klinisches Urteil</span>
        <Link href="/ueber" className="footer-link">
          Hinweis zu Inhalten &amp; Haftung
        </Link>
        <Link href="/impressum" className="footer-link">
          Impressum
        </Link>
      </div>
    </footer>
  );
}
