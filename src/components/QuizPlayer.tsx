"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/data/types";

const LETTERS = ["A", "B", "C", "D", "E"];

export default function QuizPlayer({ questions }: { questions: QuizQuestion[] }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [tipOpen, setTipOpen] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-card">
        <p className="placeholder-box">Für diese Episode ist noch kein Quiz verfügbar.</p>
      </div>
    );
  }

  if (current >= questions.length) {
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
          <button
            className="quiz-restart-btn"
            onClick={() => {
              setCurrent(0);
              setScore(0);
              setSelected(null);
              setTipOpen(false);
            }}
          >
            Quiz wiederholen
          </button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const answered = selected !== null;
  const progress = Math.round((current / questions.length) * 100);
  const hasTip = Boolean(q.tip && q.tip.trim().length > 0);

  function answer(idx: number) {
    if (answered) return;
    setSelected(idx);
    if (idx === q.correct) setScore((s) => s + 1);
  }

  function next() {
    setCurrent((c) => c + 1);
    setSelected(null);
    setTipOpen(false);
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

      {answered && (
        <button className="quiz-next-btn" onClick={next}>
          {current + 1 < questions.length ? "Nächste Frage →" : "Ergebnis anzeigen →"}
        </button>
      )}
    </div>
  );
}
