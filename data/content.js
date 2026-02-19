// ============================================================
//  THE GUIDELINE PODCAST — CONTENT DATA
// ============================================================

const BASE_AUDIO= "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/01-uroonko/S3_PCA/";
const BASE_GRAPH = "https://pub-34bb84b0ee064a0cb1687fdd3d9c586e.r2.dev/01-uroonko/S3_PCA/";

const CONTENT = {

  categories: [

    // ══════════════════════════════════════════════
    //  1. ONKOLOGISCHE UROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "onkologie",
      name: "Onkologische Urologie",
      icon: "🔬",
      color: "#C47A5A",
      available: true,
      description: "S3-Leitlinien zu urologischen Tumorerkrankungen",
      guidelines: [

        {
          id: "prostatakarzinom",
          name: "Prostatakarzinom",
          badge: "S3",
          available: true,
          description: "S3-Leitlinie Prostatakarzinom",
          chapters: [

            // ── KAPITEL 0: NEUERUNGEN ──────────────────────
            {
              id: "pca-0",
              name: "Neuerungen in der S3-Leitlinie",
              duration: "ca. 15 min",
              audioUrl: BASE_AUDIO+ "Pod_S3_GL_PCA_Kap_0_Neuerungen.mp3",
              schaubildUrl: BASE_GRAPH + "Graph_S3_GL_PCA_Kap 0 Neuerungen.png",
              quiz: [
                {
                  question: "Was ist die wesentliche Neuerung in Kapitel 4.1 bezüglich der Früherkennung des Prostatakarzinoms in der Version 8.1 der S3-Leitlinie?",
                  options: ["Die DRU ist nur noch bei Patienten mit familiärer Vorbelastung obligatorisch.", "Männer sollen bereits ab dem 40. Lebensjahr routinemäßig eine DRU erhalten.", "Die DRU wird erst ab einem PSA-Wert von >4 ng/ml empfohlen.", "Die digital-rektale Untersuchung (DRU) soll nicht mehr zur Früherkennung eingesetzt werden."],
                  correct: 4,
                  tip: "Überlegen Sie, welches klassische Untersuchungsinstrument in der Primärprävention aufgrund geringer Detektionsraten gestrichen wurde.",
                  explanation: "Gemäß Empfehlung 4.4 führt ein PSA-Wert von ≤1,5 ng/ml zu einer Einordnung in die Niedrigrisikogruppe mit 5-jährlichen Kontrollen."
                },
                {
                  question: "Welches risikoadaptierte Intervall wird laut den Neuerungen für die Früherkennung empfohlen, wenn der PSA-Wert ≤1,5 ng/ml beträgt?",
                  options: ["Ein jährliches Intervall.", "Weitere Diagnostik mittels MRT ist sofort erforderlich.", "Ein Intervall von 5 Jahren.", "Ein Intervall von 2 Jahren."],
                  correct: 2,
                  tip: "Das Intervall ist für Männer mit sehr niedrigem Ausgangs-PSA-Wert deutlich länger als früher üblich.",
                  explanation: "Gemäß Empfehlung 4.4 führt ein PSA-Wert von ≤1,5 ng/ml zu einer Einordnung in die Niedrigrisikogruppe mit 5-jährlichen Kontrollen."
                },
                {
                  question: "Ab welchem bestätigten PSA-Schwellenwert soll laut Kapitel 4.2 nun vor einer Biopsie eine MRT der Prostata erfolgen?",
                  options: ["≥2 ng/ml", "≥4 ng/ml", ">10 ng/ml", ">3 ng/ml"],
                  correct: 3,
                  tip: "Die Grenze wurde im Vergleich zu älteren Standards gesenkt, um die diagnostische Genauigkeit der MRT früher zu nutzen.",
                  explanation: "Die Leitlinie (Empfehlung 4.12) stärkt die MRT in der Primärdiagnostik ab einem bestätigten PSA-Wert von über 3 ng/ml."
                },
                {
                  question: "Was ist die wesentliche Änderung bezüglich der Biopsieindikation bei Patienten mit unauffälligem MRT-Befund (PI-RADS 1 und 2)?",
                  options: ["Es muss eine systematische 12-fach Biopsie erfolgen.", "Es soll lediglich eine transrektale Tastuntersuchung zur Kontrolle erfolgen.", "Es soll keine Biopsie durchgeführt werden.", "Eine Biopsie ist nur bei einer PSA-Dichte >0,15 ng/ml"],
                  correct: 2,
                  tip: "Die Leitlinie zielt darauf ab, unnötige invasive Eingriffe bei sehr geringer Wahrscheinlichkeit für signifikante Tumoren zu vermeiden.",
                  explanation: "Eine wesentliche Neuerung der Empfehlung 4.23 ist, dass bei PI-RADS 1 und 2 Befunden auf eine Biopsie verzichtet werden soll."
                },
                {
                  question: "Welche Therapieform wird in Version 8.1 für das lokal begrenzte Prostatakarzinom des niedrigen Risikoprofils primär und ausschließlich empfohlen?",
                  options: ["Aktive Überwachung (Active Surveillance).", "Radikale Prostatektomie.", "Fokale Therapie mittels HIFU.", "Watchful Waiting."],
                  correct: 0,
                  tip: "Die Strategie hat sich von einer 'Gleichwertigkeit der Optionen' hin zu einer bevorzugten Beobachtungsstrategie verschoben.",
                  explanation: "Als wesentlichste Änderung in Kapitel 6 wird für das niedrige Risiko initial ausschließlich die Aktive Überwachung empfohlen."
                },
                {
                  question: "Welche Intensivierung der Therapie wird beim lymphknotenpositiven hormonsensitiven Prostatakarzinom (N1M0) empfohlen, wenn eine Bestrahlung erfolgt?",
                  options: ["Zusätzliche Gabe von 6 Zyklen Docetaxel.", "Kombination von GnRH-Analogon mit Enzalutamid für 2 Jahre.", "Hormonablative Therapie mit GnRH-Analogon (3 Jahre) plus Abirateron/Predniso(lo)n (2 Jahre).", "Alleinige Androgendeprivationstherapie ohne Bestrahlung der Lymphabflusswege."],
                  correct: 2,
                  tip: "Die Neuerung beinhaltet die Hinzunahme eines spezifischen CYP17-Inhibitors für einen Zeitraum von zwei Jahren.",
                  explanation: "Die Empfehlung 6.70 ergänzt aufgrund neuer Studiendaten (STAMPEDE) Abirateron für 2 Jahre zur Standard-ADT."
                },
                {
                  question: "Was ist laut Kapitel 5.1.3 neu bei der pathohistologischen Befundung von Gleason-Scores im Hinblick auf cribriforme Tumorkomponenten?",
                  options: ["Die Erwähnung ist nur bei Vorliegen von Fernmetastasen verpflichtend.", "Sie dürfen nur noch bei Gleason-Score 6 (ISUP 1) dokumentiert werden.", "Diese sollen nun auch bei einem Gleason-Score von 8 im Befund erwähnt werden.", "Cribriforme Komponenten führen automatisch zu einer Hochstufung in ISUP-Grad 5."],
                  correct: 2,
                  tip: "Die Anforderung an die Genauigkeit des pathologischen Berichts wurde auf eine weitere Risikogruppe (Gleason 8) ausgedehnt.",
                  explanation: "Neu sollen cribriforme Komponenten nicht nur bei Gleason 7, sondern auch bei Gleason 8 im histopathologischen Befund erwähnt werden (Empfehlung 5.9)."
                },
                {
                  question: "Welche Therapieoption wurde in Kapitel 7.2 neu für Patienten mit einem High-risk biochemischen Rezidiv ergänzt?",
                  options: ["Lutetium (", "Enzalutamid ± Androgendeprivationstherapie.", "Ausschließlich Bestrahlung der Beckenlymphknoten.", "Radikale Salvage-Prostatektomie als Standardtherapie."],
                  correct: 1,
                  tip: "Diese Empfehlung basiert auf der EMBARK-Studie und nutzt einen modernen Androgenrezeptor-Signalweg-Inhibitor.",
                  explanation: "Basierend auf der EMBARK-Studie wurde die Option Enzalutamid (als Mono- oder Kombinationstherapie) in Empfehlung 7.11 aufgenommen."
                },
                {
                  question: "Für welche Patientengruppe wird Lutetium ( ^177 Lu) Vipivotidtetraxetan in der neuen Leitlinienversion als Therapieoption ausgewiesen?",
                  options: ["Patienten mit neu diagnostiziertem oligometastasiertem Prostatakarzinom.", "Männer mit nachgewiesener BRCA2-Mutation im Stadium des PSA-Rezidivs.", "Patienten mit hormonsensitivem Prostatakarzinom (mHSPC) und hohem Volumen.", "Patienten mit mCRPC nach ARPI-Therapie, die keine Chemotherapie erhalten können."],
                  correct: 3,
                  tip: "Es handelt sich um eine Dritt- oder Viertlinienoption im fortgeschrittenen, nicht mehr auf Hormonentzug ansprechenden Stadium.",
                  explanation: "Die neue Empfehlung 7.51 sieht Lutetium für mCRPC-Patienten vor, die bereits mit Abirateron oder einem ARPI behandelt wurden und nicht für Chemo geeignet sind."
                },
                {
                 question: "Welche diagnostische Maßnahme wird im Rahmen einer Watchful Waiting-Strategie laut den neuen Empfehlungen (6.91) explizit nicht mehr routinemäßig empfohlen?",
                  options: ["Körperliche Untersuchungen zur Beurteilung der Gebrechlichkeit.", "Anlassfreie krebsspezifische Kontrolluntersuchungen wie PSA-Bestimmungen oder Bildgebung.", "Gespräche über die psychosoziale Situation des Patienten.", "Die Erhebung der gesundheitsbezogenen Lebensqualität."],
                  correct: 1,
                  tip: "Das Konzept unterscheidet sich von der Aktiven Überwachung dadurch, dass nicht mehr auf die Heilung oder die Überwachung des Tumorwachstums abgezielt wird.",
                  explanation: "Die Leitlinie besagt neu, dass bei WW keine anlassfreien Kontrollen erfolgen sollen, da das Ziel rein palliativ bei Symptomauftritt ist."
                },
              ]
            },

            // ── KAPITEL 1 ──────────────────────────────────
            {
              id: "pca-1",
              name: "Kapitel 1 – Informationen zu dieser Leitlinie",
              duration: "ca. 5 min",
              audioUrl: BASE_AUDIO+ "Pod_S3_GL_PCA_Kap_1_Informationen_zu_dieser_Leitlinie.mp3",
              schaubildUrl: BASE_GRAPH + "Graph_S3_GL_PCA_Kap 1 Informationen zu dieser Leitlinie.png",
              quiz: [{
                  question: "Welche Institutionen bilden zusammen das Leitlinienprogramm Onkologie, das diese S3-Leitlinie herausgibt?",
                  options: ["Die Weltgesundheitsorganisation (WHO)", "Nur die Deutsche Gesellschaft für Urologie (DGU)", "Deutsche Krebsgesellschaft, Deutsche Krebshilfe und AWMF", "Das Bundesministerium für Gesundheit und das Robert Koch-Institut"],
                  correct: 2,
                  tip: "",
                  explanation: "Diese drei Organisationen tragen gemeinsam das Leitlinienprogramm Onkologie zur Erstellung evidenzbasierter medizinischer Leitlinien."
                },
                {
                  question: "Wie lange ist die aktuelle Version der S3-Leitlinie bis zur nächsten planmäßigen Aktualisierung maximal gültig?",
                  options: ["Unbegrenzt, bis ein Veto eingelegt wird", "2 Jahre", "10 Jahre", "5 Jahre"],
                  correct: 3,
                  tip: "",
                  explanation: "Gemäß den Regularien des Leitlinienprogramms Onkologie beträgt die maximale Gültigkeitsdauer bis zur nächsten Überprüfung fünf Jahre."
                },
                {
                  question: "Wie wird in den Kopfzeilen der Empfehlungen die Aktualität der wissenschaftlichen Aussage gekennzeichnet?",
                  options: ["Ausschließlich durch die Angabe des Evidenzlevels", "Durch Vermerke wie 'geprüft', 'modifiziert' oder 'neu' inklusive Jahreszahl", "Durch die Unterschrift des jeweiligen Arbeitsgruppenleiters", "Durch ein Ampelsystem (Grün, Gelb, Rot)"],
                  correct: 1,
                  tip: "",
                  explanation: "Diese Kennzeichnung erlaubt es dem Leser, sofort zu erkennen, ob eine Empfehlung auf dem neuesten Stand von 2025 ist oder aus einer Vorversion übernommen wurde."
                },
                {
                  question: "Welche methodische Grundlage wurde für die Erarbeitung der Version 8 der Leitlinie genutzt?",
                  options: ["Systematische Recherche zu 28 vorab definierten Fragestellungen", "Die vollständige Übernahme der US-amerikanischen NCCN-Leitlinie", "Eine reine Expertenumfrage ohne Literaturrecherche", "Zufällige Sichtung neuer Fachartikel der letzten 12 Monate"],
                  correct: 0,
                  tip: "",
                  explanation: "Für die Aktualisierung wurde gezielt nach neuer Evidenz für eine festgelegte Anzahl wissenschaftlicher Kernfragen gesucht."
                },
                {
                  question: "Neben den Ärzten wird welche weitere Personengruppe explizit als Zielgruppe ('Adressaten') der Leitlinie genannt?",
                  options: ["Juristen für Haftungsfragen", "Ausschließlich Pharmaunternehmen", "Männer (Patienten und Ratsuchende)", "Krankenkassen zur Abrechnungskontrolle"],
                  correct: 2,
                  tip: "",
                  explanation: "Die Leitlinie dient als Entscheidungshilfe für beide Seiten im Arzt-Patienten-Gespräch."
                },
                {
                  question: "Was soll laut Kapitel 2.1.1 durch die Implementierung der Leitlinie mittel- und langfristig erreicht werden?",
                  options: ["Reduktion der Gesundheitskosten um mindestens 20%", "Senkung der Morbidität und Mortalität sowie Erhöhung der Lebensqualität", "Vollständige Ausrottung des Prostatakarzinoms in Deutschland", "Verpflichtung aller Ärzte zur Teilnahme an Vorsorgeuntersuchungen"],
                  correct: 1,
                  tip: "",
                  explanation: "Dies sind die zentralen klinischen Endpunkte, die durch eine qualitativ hochwertige, leitliniengerechte Therapie verbessert werden sollen."
                },
              ]
            },

            // ── KAPITEL 2 ──────────────────────────────────
            {
              id: "pca-2",
              name: "Kapitel 2 – Einführung",
              duration: "ca. 10 min",
              audioUrl: BASE_AUDIO+ "Pod_S3_GL_PCA_Kap_2_Einführung.mp3",
              schaubildUrl: BASE_GRAPH + "Graph_S3_GL_PCA_Kap 2 Einf\u00fchrung.png",
              quiz: [
                {
                  question: "Welches primäre Ziel verfolgt die S3-Leitlinie in Bezug auf die langfristige Patientenversorgung?",
                  options: ["Die ausschließliche Standardisierung chirurgischer Eingriffe zur Kostenreduktion im Gesundheitswesen.", "Die flächendeckende Durchführung von Früherkennungsmaßnahmen unabhängig von der Lebenserwartung.", "Die vollständige Beseitigung aller Nebenwirkungen wie erektile Dysfunktion durch neue Operationstechniken.", "Die Senkung der Morbidität und Mortalität bei gleichzeitiger Erhöhung der Lebensqualität."],
                  correct: 3,
                  tip: "Überlegen Sie, welche Parameter für den Patienten und das Gesundheitssystem langfristig den höchsten klinischen Wert darstellen.",
                  explanation: "Kapitel 2.1.1 beschreibt explizit, dass neben der angemessenen Versorgung die Senkung der Sterblichkeits- und Krankheitsrate sowie die Steigerung der Lebensqualität die Kernziele sind."
                },
                {
                  question: "Was wird mit dem Instrument \"Expanded prostate cancer index composite\" (EPIC-26) in der Leitlinie dokumentiert?",
                  options: ["Die genetische Prädisposition für ein Rezidiv nach radikaler Prostatektomie.", "Das international vergleichbare funktionelle Behandlungsergebnis der Patienten.", "Die histopathologische Differenzierung des Tumors nach dem Gleason-Score.", "Die exakte Einstufung der Evidenzgrade nach dem SIGN-System."],
                  correct: 1,
                  tip: "",
                  explanation: "Gemäß Kapitel 2.1.1 dient der EPIC-26 dazu, die Rate an Funktionsstörungen wie Inkontinenz oder Impotenz nach der Behandlung international vergleichbar zu erfassen."
                },
                {
                  question: "Wie ist die Kennzeichnung \"modifiziert\" in den Kopfzeilen der Empfehlungen innerhalb der Aktualisierung 2025 definiert?",
                  options: ["Es wurden inhaltliche Änderungen vorgenommen, die formal konsentiert wurden.", "Die Empfehlung wurde ohne inhaltliche Änderung auf ihre aktuelle Gültigkeit geprüft.", "Die Empfehlung wurde aufgrund mangelnder Evidenz in einen Expertenkonsens (EK) umgewandelt.", "Es handelt sich um eine gänzlich neu erstellte Empfehlung zu einem bisher nicht behandelten Thema."],
                  correct: 0,
                  tip: "",
                  explanation: "Laut Kapitel 2.1.3 bedeutet 'modifiziert', dass der Inhalt angepasst und im Konsensverfahren der Fachgruppen offiziell bestätigt wurde."
                },
                {
                  question: "Welche Institution ist laut Kapitel 2.2 für die methodische Evidenzrecherche und -bewertung der Leitlinie verantwortlich?",
                  options: ["Das Wissenstransferzentrum UroEvidence der Deutschen Gesellschaft für Urologie (DGU).", "Das Robert Koch-Institut (RKI) im Rahmen der Krebsregisterdaten.", "Ein unabhängiges Gremium der Krankenkassen zur Nutzenbewertung von Arzneimitteln.", "Die Arbeitsgemeinschaft der Wissenschaftlichen Medizinischen Fachgesellschaften (AWMF) zentral."],
                  correct: 0,
                  tip: "",
                  explanation: "Die methodische Grundlage wird durch das spezialisierte Zentrum UroEvidence sichergestellt, wie in der Einführung zur Methodik angegeben."
                },
                {
                  question: "Was charakterisiert eine Studie mit dem Evidenzgrad 2− nach dem in der Leitlinie verwendeten SIGN-System?",
                  options: ["Nicht-analytische Studien wie Fallberichte oder reine Fallserien.", "Hochwertige Metaanalysen von randomisierten kontrollierten Studien mit minimalem Bias.", "Hohes Risiko für systematische Verzerrungen und signifikantes Risiko, dass die Beziehung nicht ursächlich ist.", "Gut durchgeführte Fall-Kontroll- oder Kohortenstudien mit sehr geringem Risiko für Confounding."],
                  correct: 2,
                  tip: "",
                  explanation: "Das SIGN-System stuft Studien mit Grad 2− herab, wenn Confounding oder Bias so stark ausgeprägt sind, dass die Kausalität zweifelhaft bleibt."
                },
                {
                  question: "Wodurch zeichnen sich \"Statements\" innerhalb der Leitlinie methodisch aus?",
                  options: ["Sie stellen eine rechtlich bindende Verpflichtung für die klinische Durchführung dar.", "Sie dienen ausschließlich der Information von Patienten und werden nicht von Fachärzten genutzt.", "Sie enthalten keine unmittelbare Handlungsaufforderung und erläutern spezifische Sachverhalte.", "Sie müssen zwingend auf Evidenzgraden der Stufe 1 basieren, um gültig zu sein."],
                  correct: 2,
                  tip: "",
                  explanation: "Gemäß Kapitel 2.2.3 sind Statements darlegende Texte ohne direkten Befehlscharakter, die im Konsensusverfahren verabschiedet werden."
                },
                {
                  question: "Wann wird in dieser Leitlinie die Kategorie \"Expertenkonsens\" (EK) vergeben?",
                  options: ["Wenn sich die Leitliniengruppe trotz widersprüchlicher Studienlage auf eine Empfehlung einigt.", "Wenn eine Empfehlung den Evidenzgrad 1++ erreicht hat und einstimmig angenommen wurde.", "Ausschließlich bei palliativmedizinischen Fragestellungen, da hier Studien ethisch schwierig sind.", "Wenn keine systematische Literaturrecherche durchgeführt wurde oder keine Evidenz aus Studien vorliegt."],
                  correct: 3,
                  tip: "",
                  explanation: "Ein EK wird laut Methodenteil vergeben, wenn die Empfehlung auf der klinischen Erfahrung der Gruppe basiert, da keine qualitativ ausreichenden Studien existieren."
                },
                {
                  question: "Welche maximale Gültigkeitsdauer ist für die S3-Leitlinie Prostatakarzinom vorgesehen?",
                  options: ["Unbegrenzt, bis eine neue Therapiemethode durch die EMA zugelassen wird.", "10 Jahre, sofern keine wesentlichen Neuerungen im Bereich der Pathologie auftreten.", "Maximal 5 Jahre.", "Exakt 24 Monate nach Veröffentlichung der Langversion."],
                  correct: 2,
                  tip: "",
                  explanation: "Kapitel 2.1.3 legt fest, dass die Leitlinie bis zur nächsten Aktualisierung, längstens jedoch für fünf Jahre, gültig bleibt."
                },
                {
                  question: "Wer zählt laut Kapitel 2.1.2 zu den Adressaten der Leitlinie?",
                  options: ["Alle Betroffenen sowie alle Berufsgruppen der beteiligten Fachgesellschaften und Organisationen.", "Nur Patientenvertreter, die an der Erstellung der Patientenleitlinie mitwirken.", "Medizinische Gutachter des Medizinischen Dienstes zur Prüfung von Abrechnungen.", "Ausschließlich Fachärzte für Urologie und Strahlentherapie in zertifizierten Zentren."],
                  correct: 0,
                  tip: "",
                  explanation: "Die Leitlinie ist breit angelegt und richtet sich sowohl an das medizinische Personal als auch direkt an die Patienten (Betroffenen)."
                },
                {
                  question: "Welcher Evidenzgrad nach SIGN wird einer reinen Expertenmeinung ohne weitere Studiengrundlage zugeordnet?",
                  options: ["Expertenkonsens (EK).", "Evidenzlevel 4.", "Evidenzlevel 3.", "Evidenzlevel 0."],
                  correct: 1,
                  tip: "",
                  explanation: "Im Schema der Evidenzgraduierung in Kapitel 2.2.1 stellt Level 4 die niedrigste Stufe dar und repräsentiert die Einschätzung von Fachleuten."
                },
              ]
            },
             // ── KAPITEL 3 ──────────────────────────────────
            {
              id: "pca-3",
              name: "Kapitel 3 – Epidemiologie, Risikofaktoren, Prävention",
              duration: "ca. 6 min",
              audioUrl: BASE_AUDIO + "Pod_S3_GL_PCA_Kap_3_Epidemiologie,_Risikofaktoren,_Prävention_u.mp3",
              schaubildUrl: BASE_GRAPH + "Graph_S3_GL_PCA_Kap 3 Epidemiologie, Risikofaktoren, Pr\u00e4vention und Ern\u00e4hrung.png",
              quiz: [
                {
                  question: "Welche Aussage zur Epidemiologie des Prostatakarzinoms in Deutschland basierend auf den Daten von 2016 ist korrekt?",
                  options: ["Das mittlere Erkrankungsalter lag bei 65 Jahren.", "Die altersstandardisierte Sterberate lag bei 34,2 pro 100.000 Einwohner.", "Prostatakrebs ist die häufigste Krebstodesursache beim Mann in Deutschland.", "Die altersstandardisierte Inzidenz betrug 91,6 pro 100.000 Einwohner bei insgesamt 58.780 Neuerkrankungen."],
                  correct: 3,
                  tip: "",
                  explanation: "Diese Werte entsprechen den offiziellen statistischen Angaben für das Jahr 2016 in Deutschland laut Leitlinientext."
                },
                {
                  question: "Wie hoch wird das Risiko für einen Mann in westlichen Industrieländern eingeschätzt, im Laufe seines Lebens ein Prostatakarzinom zu entwickeln, und wie viele versterben tatsächlich daran?",
                  options: ["Sowohl das Risiko als auch die Sterberate liegen bei etwa 10%.", "Das Risiko liegt bei 25%, wobei die Sterberate aufgrund der demographischen Entwicklung auf 15% gestiegen ist.", "Das Entwicklungsrisiko liegt bei ca. 40%, während nur etwa 3% daran versterben.", "Etwa 10% entwickeln ein Karzinom, wovon fast alle (9%) symptomatisch werden."],
                  correct: 2,
                  tip: "",
                  explanation: "Diese Diskrepanz verdeutlicht den Unterschied zwischen der hohen Inzidenz latenter Karzinome und der vergleichsweise geringen Mortalität."
                },
                {
                  question: "In welcher Altersgruppe erreicht die altersspezifische rohe Inzidenzrate in Deutschland laut den im Text zitierten Daten ihren Gipfel?",
                  options: ["Zwischen 60 und 70 Jahren aufgrund der intensivierten Früherkennung.", "In der Gruppe der 45 bis 49-Jährigen mit 175,2 pro 100.000 Männern.", "In der Altersgruppe ≥85 Jahre mit 692,7 pro 100.000 Männern.", "Konstant ab dem 50. Lebensjahr bei ca. 400 pro 100.000 Männern."],
                  correct: 2,
                  tip: "",
                  explanation: "Die Inzidenz des Prostatakarzinoms steigt kontinuierlich mit dem Alter an und erreicht in der höchsten Altersgruppe ihren Maximalwert."
                },
                {
                  question: "Welches relative Risiko (RR) besteht laut Metaanalysen für Männer mit erstgradigen Verwandten, die an einem Prostatakarzinom erkrankt sind?",
                  options: ["Das Risiko ist nur erhöht, wenn der betroffene Verwandte älter als 75 Jahre war.", "Es gibt keine statistisch signifikante Erhöhung des Risikos durch rein familiäre Belastung.", "Das relative Risiko liegt bei 2,5 bis 4,3 für jeglichen erstgradigen Verwandten.", "Es besteht ein fixes Risiko von genau 10%, unabhängig von der Anzahl der Verwandten."],
                  correct: 2,
                  tip: "",
                  explanation: "Die Familienanamnese ist ein belegter Risikofaktor, der das Risiko mehr als verdoppeln kann."
                },
                {
                  question: "Welche Rolle spielt Diabetes mellitus laut der Leitlinie für das Risiko, an einem Prostatakarzinom zu erkranken?",
                  options: ["Diabetes mellitus erhöht das Risiko im Gegensatz zu anderen Tumoren nicht und scheint eher mit einem erniedrigten Risiko assoziiert zu sein.", "Diabetes ist der zweitwichtigste Risikofaktor nach dem Alter.", "Nur Typ-1-Diabetes ist mit einem erhöhten Risiko assoziiert, Typ-2-Diabetes hingegen nicht.", "Diabetes mellitus verdoppelt das Risiko aufgrund chronischer Hyperinsulinämie."],
                  correct: 0,
                  tip: "",
                  explanation: "Metaanalysen zeigen interessanterweise ein tendenziell niedrigeres Prostatakarzinomrisiko bei Diabetikern."
                },
                {
                  question: "Welche Erkenntnis lieferten Metaanalysen zur Testosteronsubstitution bei Männern im Hinblick auf das Prostatakarzinom-Risiko?",
                  options: ["Die Inzidenzen für diagnostizierte Prostatakarzinome unterschieden sich nicht signifikant zwischen substituierten Patienten und der Placebogruppe.", "Die Substitution ist streng kontraindiziert, da sie das Tumorwachstum bei Gesunden nachweislich induziert.", "Eine Substitution führt in über 20% der Fälle innerhalb von 5 Jahren zu einem Karzinom.", "Testosteron wirkt protektiv und senkt das Risiko um den Faktor 0,5."],
                  correct: 0,
                  tip: "",
                  explanation: "Randomisierte, Placebo-kontrollierte Studien zeigen vergleichbare Krebsraten in beiden Gruppen."
                },
                {
                  question: "Welche Aussage trifft das evidenzbasierte Statement 3.6 zur Einnahme von 5-alpha-Reduktase-Hemmern?",
                  options: ["Die Einnahme erhöht das Risiko für aggressive High-Grade-Tumoren signifikant.", "Sie führen zu einer künstlichen Erhöhung des PSA-Wertes, was die Diagnostik erschwert.", "Sie reduzieren die Häufigkeit des Nachweises von Prostatakarzinomen, haben aber keine belegte Auswirkung auf die Mortalität.", "Sie sind in Deutschland zur Primärprävention des Prostatakarzinoms offiziell zugelassen."],
                  correct: 2,
                  tip: "",
                  explanation: "Obwohl weniger Tumoren (und PIN) entdeckt werden, bleibt der Effekt auf das Überleben unklar."
                },
                {
                  question: "Gemäß den Empfehlungen zur Ernährung und zum Lebensstil (ACS-Guidelines), wie viel Alkohol gilt für Männer als Limit pro Tag, um das Krebsrisiko zu reduzieren?",
                  options: ["Bis zu 0,5 Liter Wein täglich gelten als unbedenklich.", "Nicht mehr als zwei alkoholische Drinks pro Tag (entspricht ca. 24 g Alkohol).", "Maximal ein Drink pro Woche, vorzugsweise Rotwein.", "Alkohol hat keinen Einfluss auf das Prostatakarzinom und wird daher nicht limitiert."],
                  correct: 1,
                  tip: "",
                  explanation: "Die Leitlinie definiert einen Drink als 12 g Alkohol und empfiehlt maximal zwei für Männer."
                },
                {
                  question: "Warum werden Nahrungsergänzungsmittel wie Vitamin E oder Selen laut Leitlinie nicht zur Prävention empfohlen?",
                  options: ["Es gibt keine Studien zu diesen Substanzen, weshalb keine Aussage möglich ist.", "Weil sie die Wirksamkeit einer späteren Hormontherapie herabsetzen.", "Randomisierte Studien (wie SELECT) zeigten keine Senkung des Auftretens, wobei Vitamin E das Risiko sogar leicht erhöhen könnte.", "Die Kosten für diese Präparate werden nicht von den Krankenkassen übernommen."],
                  correct: 2,
                  tip: "",
                  explanation: "Die SELECT-Studie widerlegte die protektive Wirkung und wies auf potenzielle Risiken durch Vitamin E hin."
                },
                {
                  question: "Was besagt das Quotenverhältnis (Odds Ratio) bezüglich lokaler entzündlicher Prozesse und dem Risiko für ein Prostatakarzinom?",
                  options: ["Es konnte keinerlei statistische Assoziation zwischen Entzündungen und Karzinomen nachgewiesen werden.", "Geschlechtskrankheiten senken das Risiko aufgrund einer Immunaktivierung auf ein OR von 0,7.", "Das Vorliegen einer Prostatitis ist mit einem Quotenverhältnis von 1,6 assoziiert.", "Nur virale Infektionen erhöhen das Risiko, bakterielle Prostatitiden hingegen nicht."],
                  correct: 2,
                  tip: "",
                  explanation: "Chronische Entzündungen gelten als Theorie für die Entstehung von Karzinomen über proliferative inflammatorische Atrophie."
                },
              ]
            },
            // ── KAPITEL 4 ──────────────────────────────────
            {
              id: "pca-4",
              name: "Kapitel 4 – Früherkennung, Diagnostik und Stadieneinteilung",
              duration: "ca. 12 min",
              audioUrl: BASE_AUDIO+ "Pod_S3_GL_PCA_Kap_4_Früherkennung,_Diagnostik_und_Stadieneintei.mp3",
              schaubildUrl: BASE_GRAPH + "Graph_Pod_S3_GL_PCA_Kap 4 Fr\u00fcherkennung, Diagnostik und Stadieneinteilung.png",
              quiz: [
                {
                  question: "Welche Empfehlung spricht die neue S3-Leitlinie (Version 8.1) bezüglich der digital-rektalen Untersuchung (DRU) im Rahmen der Früherkennung aus?",
                  options: ["Die DRU soll zur Früherkennung von Prostatakarzinomen nicht mehr durchgeführt werden.", "Die DRU sollte nur bei Männern ab dem 50. Lebensjahr jährlich erfolgen.", "Die DRU ist nur in Kombination mit einem transrektalen Ultraschall (TRUS) für das Screening empfohlen.", "Die DRU bleibt der primäre Goldstandard vor jeder PSA-Bestimmung."],
                  correct: 0,
                  tip: "",
                  explanation: "Die Leitlinie stützt sich auf Ergebnisse der PROBASE-Studie, die zeigen, dass die DRU dem PSA-Test bei der Detektion deutlich unterlegen ist."
                },
                {
                  question: "Ein 45-jähriger Mann wünscht eine Früherkennung und weist einen Basis-PSA-Wert von 1,2 ng/ml auf. Welches Intervall für die nächste Untersuchung ist laut der risikoadaptierten Strategie (Empfehlung 4.4) vorgesehen?",
                  options: ["1 Jahr", "10 Jahre", "2 Jahre", "5 Jahre"],
                  correct: 3,
                  tip: "",
                  explanation: "Bei einem PSA-Wert von <1,5 ng/ml im Alter von 45 Jahren wird aufgrund des geringen Progressionsrisikos ein 5-jähriges Intervall empfohlen."
                },
                {
                  question: "Was ist der nächste obligatorische Schritt, wenn bei einem Mann im Rahmen der Früherkennung ein PSA-Wert von ≥3 ng/ml festgestellt wird?",
                  options: ["Direkte Durchführung einer Skelettszintigraphie zum Staging.", "Kontrolle des PSA-Werts innerhalb von 3 Monaten unter Berücksichtigung von Einflussfaktoren.", "Einleitung einer antibiotischen Therapie zur PSA-Senkung.", "Sofortige Durchführung einer Prostatastanzbiopsie."],
                  correct: 1,
                  tip: "",
                  explanation: "Empfehlung 4.5 besagt, dass ein erhöhter Wert vor weiterer Diagnostik kontrolliert werden soll, um transiente Erhöhungen auszuschließen."
                },
                {
                  question: "Ab welchem Alter sollte Männern mit einer nachgewiesenen pathogenen Variante im BRCA2-Gen eine Risikosprechstunde und Früherkennung angeboten werden?",
                  options: ["50 Jahre", "40 Jahre", "45 Jahre", "35 Jahre"],
                  correct: 1,
                  tip: "",
                  explanation: "Für Mutationsträger (BRCA2, MSH2, MSH6) wird der Beginn der Früherkennung bereits ab 40 Jahren empfohlen."
                },
                {
                  question: "Welche Rolle spielt die Magnetresonanztomographie (MRT) laut Empfehlung 4.12 in der Primärdiagnostik?",
                  options: ["Die MRT soll ab einer bestätigten PSA-Erhöhung von >3 ng/ml vor einer Biopsie erfolgen.", "Die MRT soll erst nach einer negativen systematischen Erstbiopsie erfolgen.", "Die MRT kann durch einen hochauflösenden Ultraschall vollständig ersetzt werden.", "Eine MRT ist nur bei Patienten mit klinischem T3-Stadium obligat."],
                  correct: 0,
                  tip: "",
                  explanation: "Die MRT dient der Identifizierung suspekter Herde für eine gezielte Biopsieplanung und zur Vermeidung unnötiger Biopsien."
                },
                {
                  question: "Wie ist das Vorgehen bei einem MRT-Befund der Kategorie PI-RADS 1 oder 2 laut der neuen Leitlinie?",
                  options: ["Es ist eine alleinige Biopsie der Transitionalzone indiziert.", "Es soll keine Biopsie durchgeführt werden.", "Die Biopsie soll nur bei einer PSA-Dichte >0,25 ng/ml/ml erfolgen.", "Es soll eine systematische 12-Fach-Biopsie durchgeführt werden."],
                  correct: 1,
                  tip: "",
                  explanation: "Empfehlung 4.23 besagt explizit, dass bei unauffälligem MRT (PI-RADS 1−2) auf eine Biopsie verzichtet werden soll."
                },
                {
                  question: "Welche Biopsietechnik wird bei PI-RADS 4 oder 5 Befunden für die Erstbiopsie empfohlen?",
                  options: ["Eine alleinige systematische Biopsie ohne Berücksichtigung der MRT-Läsion.", "Eine Sättigungsbiopsie mit mindestens 24 Zylindern.", "Ausschließlich die Entnahme von 2−3 Zylindern aus dem suspekten Herd.", "Kombination aus gezielter Biopsie (2−3 Zylinder pro Herd) und systematischer Biopsie."],
                  correct: 3,
                  tip: "",
                  explanation: "Diese Kombination bietet laut Hintergrundtext zu Empfehlung 4.17/4.20 die höchste Sicherheit bei der Erstdiagnostik."
                },
                {
                  question: "Nach welcher Klassifikation erfolgt in der S3-Leitlinie primär die Einteilung in Risikogruppen für das lokal begrenzte Prostatakarzinom zur Therapieplanung?",
                  options: ["D’Amico-Klassifikation", "Nur nach der Anzahl der befallenen Lymphknoten.", "Gleason-Klassifikation von 1966", "Charlson Comorbidity Index (CCI)"],
                  correct: 0,
                  tip: "",
                  explanation: "Die D'Amico-Kriterien (PSA, Gleason/ISUP, cT) bilden traditionell die Basis für die therapeutischen Empfehlungen."
                },
                {
                  question: "Ein Patient hat einen PSA-Wert von 25 ng/ml und einen ISUP-Grad 2. In welche Risikogruppe nach D’Amico fällt dieser Patient?",
                  options: ["Hohes Risiko", "Niedriges Risiko", "Sehr hohes Risiko", "Intermediäres Risiko"],
                  correct: 0,
                  tip: "",
                  explanation: "Ein PSA-Wert von >20 ng/ml reicht laut Tabelle 9 aus, um das Stadium als 'High Risk' zu klassifizieren."
                },
                {
                  question: "Ab welchem Risikoprofil (nach NCCN) wird vor einer therapeutischen Entscheidung ein systemisches Staging (Ausbreitungsdiagnostik) empfohlen?",
                  options: ["Günstiges intermediäres Risiko", "Nur bei Patienten mit bereits tastbaren Knochenschmerzen.", "Sehr niedriges Risiko", "Ungünstiges intermediäres Risiko (unfavorable intermediate risk) oder höher."],
                  correct: 3,
                  tip: "",
                  explanation: "Gemäß Empfehlung 4.43 soll erst ab diesem Stadium eine Ausbreitungsdiagnostik vor Therapiebeginn erfolgen."
                },
                {
                  question: "Welches bildgebende Verfahren wird laut Empfehlung 4.44 primär zur Ausbreitungsdiagnostik eingesetzt, wenn Risikofaktoren für Fernmetastasen vorliegen?",
                  options: ["PSMA-PET/CT", "Kombination aus Abdomen-CT und Knochenszintigraphie.", "Transrektaler Ultraschall (TRUS)", "Ganzkörper-MRT"],
                  correct: 3,
                  tip: "",
                  explanation: "Die Kombination beider Verfahren erreicht eine sehr hohe Sensitivität von 97%, was den negativen prädiktiven Wert massiv verbessert."
                },
              ]
            }

          ]
        },

        // ── WEITERE GUIDELINES (coming soon) ──────────────
        {
          id: "harnblasenkarzinom", name: "Harnblasenkarzinom", badge: "S3",
          available: false, description: "S3-Leitlinie Harnblasenkarzinom",
          chapters: []
        },
        {
          id: "nierenzellkarzinom", name: "Nierenzellkarzinom", badge: "S3",
          available: false, description: "S3-Leitlinie Nierenzellkarzinom",
          chapters: []
        },
        {
          id: "peniskarzinom", name: "Peniskarzinom", badge: "S3",
          available: false, description: "S3-Leitlinie Peniskarzinom",
          chapters: []
        },
        {
          id: "hodentumoren", name: "Hodentumoren", badge: "S3",
          available: false, description: "S3-Leitlinie Hodentumoren",
          chapters: []
        }
      ]
    },

    // ══════════════════════════════════════════════
    //  2. BENIGNE & FUNKTIONELLE UROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "benigne", name: "Benigne & Funktionelle Urologie", icon: "⚡", color: "#8AA5B8",
      available: false, description: "Leitlinien zu benignen und funktionellen Erkrankungen",
      guidelines: [
        { id: "bps", name: "Benignes Prostatasyndrom", badge: "S2e", available: false, description: "S2e-Leitlinie BPS", chapters: [] },
        { id: "inkontinenz", name: "Harninkontinenz", badge: "S2k", available: false, description: "S2k-Leitlinie Harninkontinenz", chapters: [] },
        { id: "neurogene-blase", name: "Neurogene Blasenfunktionsstörungen", badge: "", available: false, description: "Leitlinie Neurogene Blase", chapters: [] },
        { id: "erektile-dysfunktion", name: "Erektile Dysfunktion", badge: "", available: false, description: "Leitlinie Erektile Dysfunktion", chapters: [] }
      ]
    },

    // ══════════════════════════════════════════════
    //  3. INFEKTIOLOGIE & ANDROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "infektio", name: "Infektiologie & Andrologie", icon: "🦠", color: "#8FAF8C",
      available: false, description: "Harnwegsinfekte, Entzündungen, männliche Fertilität",
      guidelines: [
        { id: "hwi", name: "Harnwegsinfektionen", badge: "S3", available: false, description: "S3-Leitlinie HWI", chapters: [] },
        { id: "epididymitis", name: "Epididymitis", badge: "", available: false, description: "Leitlinie Epididymitis", chapters: [] },
        { id: "prostatitis", name: "Prostatitis", badge: "", available: false, description: "Leitlinie Prostatitis", chapters: [] },
        { id: "maennliche-infertilitaet", name: "Männliche Infertilität", badge: "", available: false, description: "Leitlinie Männliche Infertilität", chapters: [] }
      ]
    },

    // ══════════════════════════════════════════════
    //  4. KINDERUROLOGIE
    // ══════════════════════════════════════════════
    {
      id: "kinderuro", name: "Kinderurologie", icon: "🧒", color: "#C49AA0",
      available: false, description: "Leitlinien zu kinderurologischen Erkrankungen",
      guidelines: [
        { id: "hodenhochstand", name: "Hodenhochstand", badge: "", available: false, description: "Leitlinie Hodenhochstand", chapters: [] },
        { id: "vur", name: "Vesikoureteraler Reflux", badge: "", available: false, description: "Leitlinie VUR", chapters: [] }
      ]
    }

  ]
};
