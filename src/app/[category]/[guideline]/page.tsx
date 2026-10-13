import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideline } from "@/data/content";
import GuidelineEpisodeList from "@/components/GuidelineEpisodeList";

export default async function GuidelinePage({
  params,
}: {
  params: Promise<{ category: string; guideline: string }>;
}) {
  const { category: categoryId, guideline: guidelineId } = await params;
  const { category, guideline } = getGuideline(categoryId, guidelineId);
  if (!category || !guideline || !guideline.available) notFound();

  return (
    <section>
      <Link href={`/${category.id}`} className="crumb-back">
        ← Zurück
      </Link>
      <div className="page-eyebrow">
        {category.name} {guideline.badge ? `· ${guideline.badge}` : ""}
      </div>
      <h1 className="page-heading">{guideline.name}</h1>
      <p className="page-sub">{guideline.description}</p>

      <GuidelineEpisodeList
        categoryId={category.id}
        guidelineId={guideline.id}
        episodes={guideline.episodes}
      />
    </section>
  );
}
