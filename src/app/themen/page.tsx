import Link from "next/link";
import { CONTENT } from "@/data/content";
import { categoryIconClass } from "@/lib/categoryIcons";

export default function ThemenPage() {
  return (
    <section>
      <div className="page-eyebrow">Kategorie wählen</div>
      <h1 className="page-heading">Welcher Themenschwerpunkt interessiert dich?</h1>
      <p className="page-sub">
        Leitlinien-Podcasts, Schaubilder und Quizfragen für die urologische Weiterbildung.
      </p>

      <div className="big-grid">
        {CONTENT.categories.map((cat) => {
          const content = (
            <>
              <div className="big-btn-icon">
                <i className={`ti ${categoryIconClass(cat.id)}`} aria-hidden="true" />
              </div>
              <div className="big-btn-name">{cat.name}</div>
              <div className="big-btn-desc">{cat.description}</div>
              <div className="big-btn-status">
                {cat.available ? "Verfügbar" : "Kommt bald"}
              </div>
            </>
          );

          return cat.available ? (
            <Link key={cat.id} href={`/${cat.id}`} className="big-btn">
              {content}
            </Link>
          ) : (
            <div key={cat.id} className="big-btn locked" aria-disabled="true">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
