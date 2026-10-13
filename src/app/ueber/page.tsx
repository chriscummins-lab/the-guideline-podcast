import Link from "next/link";

export const metadata = {
  title: "Über · Hinweis zu Inhalten und Haftung — GeSRU Guideline Podcast",
};

export default function UeberPage() {
  return (
    <section>
      <Link href="/" className="crumb-back">
        ← Zurück
      </Link>
      <div className="page-eyebrow">Über dieses Angebot</div>
      <h1 className="page-heading">Hinweis zu Inhalten und Haftung</h1>

      <div className="disclaimer-page">
        <p>
          Alle Podcast-Episoden, Grafiken und Quizfragen dieses Angebots werden mithilfe
          künstlicher Intelligenz erstellt und anschließend ärztlich geprüft. Trotz
          sorgfältiger Prüfung können Fehler, Vereinfachungen oder Auslassungen enthalten
          sein.
        </p>
        <p>
          Die Inhalte dienen ausschließlich der Fortbildung medizinischer Fachpersonen. Sie
          stellen keine offiziellen Publikationen der AWMF oder der beteiligten
          Fachgesellschaften dar und sind von diesen nicht autorisiert. Maßgeblich ist stets
          die aktuelle Originalfassung der jeweiligen Leitlinie im AWMF-Leitlinienregister.
        </p>
        <p>
          Die Inhalte ersetzen keine ärztliche Beratung und sind nicht für Patient:innen als
          Entscheidungsgrundlage gedacht.
        </p>
        <p>
          Rechteinhaber, die mit der Nutzung nicht einverstanden sind, erreichen uns unter{" "}
          <a href="mailto:christina.meisl@gesru.de">christina.meisl@gesru.de</a>. Inhalte
          werden auf Anfrage umgehend entfernt.
        </p>
      </div>
    </section>
  );
}
