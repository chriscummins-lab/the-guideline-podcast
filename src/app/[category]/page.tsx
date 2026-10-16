import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/data/content";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = getCategory(categoryId);
  if (!category || !category.available) notFound();

  return (
    <section>
      <Link href="/" className="crumb-back">
        ← Zurück
      </Link>
      <div className="page-eyebrow">{category.name}</div>
      <h1 className="page-heading">Guideline wählen</h1>
      <p className="page-sub">{category.description}</p>

      <div className="big-grid">
        {category.guidelines.map((gl) => {
          const content = (
            <>
              {(gl.badge || gl.year) && (
                <span className="big-btn-badge">
                  {gl.badge}
                  {gl.badge && gl.year ? " · " : ""}
                  {gl.year}
                </span>
              )}
              <div className="big-btn-icon">{category.icon}</div>
              <div className="big-btn-name">{gl.name}</div>
              <div className="big-btn-desc">{gl.description}</div>
              <div className="big-btn-status">
                {gl.available ? `${gl.episodes.length} Episoden` : "Kommt bald"}
              </div>
            </>
          );

          return gl.available ? (
            <Link key={gl.id} href={`/${category.id}/${gl.id}`} className="big-btn">
              {content}
            </Link>
          ) : (
            <div key={gl.id} className="big-btn locked" aria-disabled="true">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
