"use client";

import { useEffect, useState } from "react";
import { CONTENT } from "@/data/content";
import { categoryIconClass } from "@/lib/categoryIcons";
import { flattenQuestions, type FlatQuestion } from "@/lib/trainerCatalog";
import { isAnswered, onAnswersChange } from "@/lib/quizAnswers";
import QuizPlayer from "@/components/QuizPlayer";

type GuidelineChoice = "all" | { categoryId: string; id: string; name: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TrainerPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | "all" | null>(null);
  const [selectedGuideline, setSelectedGuideline] = useState<GuidelineChoice | null>(null);
  const [session, setSession] = useState<FlatQuestion[] | null>(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => onAnswersChange(() => forceUpdate((n) => n + 1)), []);

  const availableCategories = CONTENT.categories.filter((c) => c.available);

  function candidatesFor(categoryId: string | "all", guideline: GuidelineChoice): FlatQuestion[] {
    return flattenQuestions().filter((fq) => {
      if (categoryId !== "all" && fq.categoryId !== categoryId) return false;
      if (guideline !== "all" && (fq.categoryId !== guideline.categoryId || fq.guidelineId !== guideline.id))
        return false;
      return isAnswered(fq.key);
    });
  }

  function reset() {
    setSelectedCategory(null);
    setSelectedGuideline(null);
    setSession(null);
  }

  function startSession(categoryId: string | "all", guideline: GuidelineChoice) {
    const candidates = candidatesFor(categoryId, guideline);
    setSession(shuffle(candidates));
  }

  // ── Schritt 3: Trainer-Session läuft ──────────────────────────────
  if (session) {
    const scopeLabel =
      selectedGuideline === "all"
        ? selectedCategory === "all"
          ? "Alle Themen"
          : CONTENT.categories.find((c) => c.id === selectedCategory)?.name ?? ""
        : selectedGuideline?.name ?? "";

    return (
      <section>
        <button type="button" className="crumb-back" onClick={reset}>
          ← Neue Auswahl
        </button>
        <div className="page-eyebrow">Trainer · {scopeLabel}</div>
        <h1 className="page-heading">Wiederholung ({session.length} Fragen)</h1>
        <QuizPlayer
          key={session.map((s) => s.key).join(",")}
          questions={session.map((s) => s.question)}
          questionKeys={session.map((s) => s.key)}
        />
      </section>
    );
  }

  // ── Schritt 2: Krankheitsbild wählen ──────────────────────────────
  if (selectedCategory !== null) {
    const categoriesInScope =
      selectedCategory === "all"
        ? availableCategories
        : availableCategories.filter((c) => c.id === selectedCategory);

    const guidelineEntries: { categoryId: string; id: string; name: string; count: number }[] = [];
    for (const cat of categoriesInScope) {
      for (const gl of cat.guidelines) {
        if (!gl.available) continue;
        const count = candidatesFor(selectedCategory, { categoryId: cat.id, id: gl.id, name: gl.name }).length;
        guidelineEntries.push({
          categoryId: cat.id,
          id: gl.id,
          name: selectedCategory === "all" ? `${cat.name} · ${gl.name}` : gl.name,
          count,
        });
      }
    }

    const allCount = candidatesFor(selectedCategory, "all").length;

    return (
      <section>
        <button type="button" className="crumb-back" onClick={reset}>
          ← Andere Themenauswahl
        </button>
        <div className="page-eyebrow">Trainer</div>
        <h1 className="page-heading">Krankheitsbild wählen</h1>
        <p className="page-sub">
          Es werden nur Fragen gezeigt, die du in den Folgen-Quizzen bereits einmal beantwortet hast.
        </p>

        <div className="big-grid">
          <button
            type="button"
            className="big-btn"
            onClick={() => {
              setSelectedGuideline("all");
              startSession(selectedCategory, "all");
            }}
          >
            <div className="big-btn-icon">
              <i className="ti ti-apps" aria-hidden="true" />
            </div>
            <div className="big-btn-name">Alle Krankheitsbilder</div>
            <div className="big-btn-status">{allCount} beantwortete Fragen</div>
          </button>

          {guidelineEntries.map((gl) => (
            <button
              key={`${gl.categoryId}/${gl.id}`}
              type="button"
              className={`big-btn ${gl.count === 0 ? "locked" : ""}`}
              onClick={() => {
                const choice: GuidelineChoice = { categoryId: gl.categoryId, id: gl.id, name: gl.name };
                setSelectedGuideline(choice);
                startSession(selectedCategory, choice);
              }}
            >
              <div className="big-btn-name">{gl.name}</div>
              <div className="big-btn-status">
                {gl.count > 0 ? `${gl.count} beantwortete Fragen` : "Noch keine Fragen beantwortet"}
              </div>
            </button>
          ))}
        </div>
      </section>
    );
  }

  // ── Schritt 1: Themengebiet wählen ────────────────────────────────
  return (
    <section>
      <div className="page-eyebrow">Trainer</div>
      <h1 className="page-heading">Welches Themengebiet möchtest du wiederholen?</h1>
      <p className="page-sub">
        Der Trainer stellt dir zufällig Fragen, die du in den Folgen-Quizzen bereits beantwortet hast.
      </p>

      <div className="big-grid">
        <button type="button" className="big-btn" onClick={() => setSelectedCategory("all")}>
          <div className="big-btn-icon">
            <i className="ti ti-apps" aria-hidden="true" />
          </div>
          <div className="big-btn-name">Alle Themen</div>
        </button>

        {availableCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            className="big-btn"
            onClick={() => setSelectedCategory(cat.id)}
          >
            <div className="big-btn-icon">
              <i className={`ti ${categoryIconClass(cat.id)}`} aria-hidden="true" />
            </div>
            <div className="big-btn-name">{cat.name}</div>
          </button>
        ))}
      </div>
    </section>
  );
}
