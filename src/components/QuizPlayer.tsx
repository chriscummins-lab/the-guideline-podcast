"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/types";
import { setQuizCompleted } from "@/lib/quizProgress";
import { markAnswered, questionKey } from "@/lib/quizAnswers";

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuizPlayer({
  questions,
  storageKey,
  questionKeys,
}: {
  questions: QuizQuestion[];
  storageKey?: string;
  questionKeys?: string[];
}) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() => Array(questions.length).fill(null));
  const [tipOpen, setTipOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-card">
        <p className="placeholder-box">Für diese Episode ist noch kein Quiz verfügbar.</p>
      </div>
    );
  }

  const score = answers.reduce<number>(
    (sum, a, i) => (a !== null && a === questions[i].correct ? sum + 1 : sum),
    0
  );

  function restart() {
    setCurrent(0);
    setAnswers(Array(questions.length).fill(null));
    setTipOpen(false);
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    let msg = "Weiter üben!";
    let sub = "Hör dir die Episode nochmal an und versuche es erneut.";
    if (pct >= 80) {
      msg = "Ausgezeichnet!";
      sub = "Sehr gutes Verständnis der Guideline-Inhalte.";
    } else if (pct >= 60) {
      msg = "Gut gemacht!";
      sub = "Einige Aspekte kannst du noch vertiefen.";
    }

    return (
      <div className="quiz-card">
        <div className="quiz-result">
          <div className="quiz-result-score">{pct}%</div>
          <div className="quiz-result-msg">{msg}</div>
          <div className="quiz-result-sub">
            {score} von {questions.length} Fragen richtig · {sub}
          </div>
          <div className="quiz-result-actions">
            <button
              className="quiz-back-btn"
              onClick={() => {
                setCurrent(questions.length - 1);
                setFinished(false);
              }}
            >
              ← Zurück zu den Fragen
            </button>
            <button className="quiz-restart-btn" onClick={restart}>
              Quiz wiederholen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const selected = answers[current];
  const answered = selected !== null;
  const progress = Math.round((current / questions.length) * 100);
  const hasTip = Boolean(q.tip && q.tip.trim().length > 0);

  function answer(idx: number) {
    if (answered) return;
    setAnswers((a) => a.map((v, i) => (i === current ? idx : v)));
    const key = questionKeys?.[current] ?? (storageKey ? questionKey(storageKey, current) : undefined);
    if (key) markAnswered(key, idx === q.correct);
  }

  function goBack() {
    if (current === 0) return;
    setCurrent((c) => c - 1);
    setTipOpen(false);
  }

  function goNext() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setTipOpen(false);
    } else {
      setFinished(true);
      if (storageKey && !questionKeys) setQuizCompleted(storageKey, true);
    }
  }

  return (
    <div className="quiz-card">
      <div className="quiz-progress">
        Frage {current + 1} von {questions.length}
      </div>
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="quiz-question">{q.question}</div>
      <div className="quiz-options">
        {q.options.map((opt, i) => {
          let cls = "quiz-option";
          if (answered && i === q.correct) cls += " correct";
          if (answered && i === selected && i !== q.correct) cls += " wrong";
          return (
            <button key={i} className={cls} disabled={answered} onClick={() => answer(i)}>
              <span className="quiz-option-letter">{LETTERS[i]}</span>
              {opt}
            </button>
          );
        })}
      </div>

      {hasTip && !answered && (
        <>
          <button className="quiz-tip-btn" onClick={() => setTipOpen((o) => !o)}>
            💡 {tipOpen ? "Tipp ausblenden" : "Tipp anzeigen"}
          </button>
          {tipOpen && <div className="quiz-tip-box">{q.tip}</div>}
        </>
      )}

      {answered && q.explanation && (
        <div className={`quiz-feedback ${selected === q.correct ? "correct-fb" : "wrong-fb"}`}>
          {q.explanation}
        </div>
      )}

      <div className="quiz-nav">
        {current > 0 && (
          <button className="quiz-back-btn" onClick={goBack}>
            ← Zurück
          </button>
        )}
        <button className="quiz-next-btn" onClick={goNext}>
          {current + 1 < questions.length ? "→ Nächste Frage" : "→ Ergebnis anzeigen"}
        </button>
      </div>
    </div>
  );
}
