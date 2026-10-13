import Link from "next/link";

export const metadata = {
  title: "Impressum — GeSRU Guideline Podcast",
};

export default function ImpressumPage() {
  return (
    <section>
      <Link href="/" className="crumb-back">
        ← Zurück
      </Link>
      <div className="page-eyebrow">Rechtliches</div>
      <h1 className="page-heading">Impressum</h1>

      <div className="disclaimer-page">
        <p>
          <strong>Diensteanbieter gemäß § 5 DDG</strong>
          <br />
          German Society of Residents in Urology (GeSRU) e. V.
          <br />
          Germeringer Str. 32
          <br />
          82152 Planegg
        </p>

        <p>
          <strong>Vertretungsberechtigter Vorstand</strong>
          <br />
          Anna Heinrichs (Vorsitzende)
          <br />
          Lucie Telemann (Stellvertretende Vorsitzende)
          <br />
          Anna-Sophie Strauß (Stellvertretende Vorsitzende)
          <br />
          Tobias Hauser (Schriftführer)
          <br />
          Musa Aldabbag (Schatzmeister)
        </p>

        <p>
          <strong>Kontakt</strong>
          <br />
          Telefon: +49-8452-3064814
          <br />
          Telefax: +49-8452-3064799
          <br />
          E-Mail: <a href="mailto:info@gesru.de">info@gesru.de</a>
          <br />
          Internet:{" "}
          <a href="https://www.gesru.de" target="_blank" rel="noreferrer">
            www.gesru.de
          </a>
        </p>

        <p>
          <strong>Registereintrag</strong>
          <br />
          Eingetragen im Vereinsregister.
          <br />
          Registergericht: Amtsgericht Ulm
          <br />
          Registernummer: VR 1710
        </p>

        <p>
          <strong>Umsatzsteuer-ID</strong>
          <br />
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: DE88043/10506
        </p>

        <p>
          <strong>Haftung für Inhalte</strong>
          <br />
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
          Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir
          als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
          rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer
          konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
          Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
        </p>

        <p>
          <strong>Haftung für Links</strong>
          <br />
          Unser Angebot enthält Links zu externen Webseiten Dritter (u. a. zum
          AWMF-Leitlinienregister), auf deren Inhalte wir keinen Einfluss haben. Deshalb können
          wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
          verantwortlich. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
          Rechtsverletzungen werden wir derartige Links umgehend entfernen.
        </p>

        <p>
          <strong>Urheberrecht</strong>
          <br />
          Die durch die Betreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
          Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Weitere Hinweise zu
          Inhalten, KI-Erstellung und Haftung finden sich auf der{" "}
          <Link href="/ueber">Hinweis-zu-Inhalten-Seite</Link>.
        </p>
      </div>
    </section>
  );
}
