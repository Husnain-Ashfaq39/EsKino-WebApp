import React from 'react';
import Spacing from './Spacing';

const Policy = () => {
  return (
    <div className="p-20">
      <Spacing md='130' lg='90'/>
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
      <p className="mb-4">
        Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten (nachfolgend kurz „Daten“) im Rahmen der Erbringung unserer Leistungen sowie innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte sowie externen Onlinepräsenzen, wie z.B. unser Social Media Profile auf (nachfolgend gemeinsam bezeichnet als „Onlineangebot“). Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. „Verarbeitung“ oder „Verantwortlicher“ verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
      </p>

      <h2 className="text-2xl font-semibold mb-3">Verantwortlicher</h2>
      <p className="mb-4">
        Dr. Susanne Nusser und Dr. Stephan Schwarz / EsKiNo Elternseminare Kindernotfälle GbR
        <br />
        Imhofstraße 1
        <br />
        89312 Günzburg
        <br />
        Deutschland
        <br />
        E-Mail: <a href="mailto:info@eskino.info" className="text-blue-500 underline">info@eskino.info</a>
        <br />
        Geschäftsführer: Dr. Susanne Nusser, Dr. Stephan Schwarz
        <br />
        Impressum: <a href="#" className="text-blue-500 underline">hier den Link einfügen</a>
      </p>

      <h2 className="text-2xl font-semibold mb-3">Arten der verarbeiteten Daten</h2>
      <ul className="list-disc pl-5 mb-4">
        <li><b>Bestandsdaten</b> (z.B., Personen-Stammdaten, Namen oder Adressen).</li>
        <li><b>Kontaktdaten</b> (z.B., E-Mail, Telefonnummern).</li>
        <li><b>Inhaltsdaten</b> (z.B., Texteingaben, Fotografien, Videos).</li>
        <li><b>Nutzungsdaten</b> (z.B., besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten).</li>
        <li><b>Meta-/Kommunikationsdaten</b> (z.B., Geräte-Informationen, IP-Adressen).</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Kategorien betroffener Personen</h2>
      <p className="mb-4">
        Besucher und Nutzer des Onlineangebotes (Nachfolgend bezeichnen wir die betroffenen Personen zusammenfassend auch als „Nutzer“).
      </p>

      <h2 className="text-2xl font-semibold mb-3">Zweck der Verarbeitung</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte.</li>
        <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern.</li>
        <li>Sicherheitsmaßnahmen.</li>
        <li>Reichweitenmessung/Marketing</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Verwendete Begrifflichkeiten</h2>
      <p className="mb-4">
        „<b>Personenbezogene Daten</b>“ sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden „betroffene Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer, zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen, psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person sind.
      </p>
      <p className="mb-4">
        „<b>Verarbeitung</b>“ ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten.
      </p>
      <p className="mb-4">
        „<b>Pseudonymisierung</b>“ die Verarbeitung personenbezogener Daten in einer Weise, dass die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können, sofern diese zusätzlichen Informationen gesondert aufbewahrt werden und technischen und organisatorischen Maßnahmen unterliegen, die gewährleisten, dass die personenbezogenen Daten nicht einer identifizierten oder identifizierbaren natürlichen Person zugewiesen werden.
      </p>
      <p className="mb-4">
        „<b>Profiling</b>“ jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte, die sich auf eine natürliche Person beziehen, zu bewerten, insbesondere um Aspekte bezüglich Arbeitsleistung, wirtschaftliche Lage, Gesundheit, persönliche Vorlieben, Interessen, Zuverlässigkeit, Verhalten, Aufenthaltsort oder Ortswechsel dieser natürlichen Person zu analysieren oder vorherzusagen.
      </p>
      <p className="mb-4">
        Als „<b>Verantwortlicher</b>“ wird die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.
      </p>
      <p className="mb-4">
        „<b>Auftragsverarbeiter</b>“ eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Maßgebliche Rechtsgrundlagen</h2>
      <p className="mb-4">
        Nach Maßgabe des Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit. Für Nutzer aus dem Geltungsbereich der Datenschutzgrundverordnung (DSGVO), d.h. der EU und des EWG gilt, sofern die Rechtsgrundlage in der Datenschutzerklärung nicht genannt wird, Folgendes:
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Die Rechtsgrundlage für die Einholung von Einwilligungen ist Art. 6 Abs. 1 lit. a und Art. 7 DSGVO;</li>
        <li>Die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer Leistungen und Durchführung vertraglicher Maßnahmen sowie Beantwortung von Anfragen ist Art. 6 Abs. 1 lit. b DSGVO;</li>
        <li>Die Rechtsgrundlage für die Verarbeitung zur Erfüllung unserer rechtlichen Verpflichtungen ist Art. 6 Abs. 1 lit. c DSGVO;</li>
        <li>Für den Fall, dass lebenswichtige Interessen der betroffenen Person oder einer anderen natürlichen Person eine Verarbeitung personenbezogener Daten erforderlich machen, dient Art. 6 Abs. 1 lit. d DSGVO als Rechtsgrundlage.</li>
        <li>Die Rechtsgrundlage für die erforderliche Verarbeitung zur Wahrnehmung einer Aufgabe, die im öffentlichen Interesse liegt oder in Ausübung öffentlicher Gewalt erfolgt, die dem Verantwortlichen übertragen wurde ist Art. 6 Abs. 1 lit. e DSGVO.</li>
        <li>Die Rechtsgrundlage für die Verarbeitung zur Wahrung unserer berechtigten Interessen ist Art. 6 Abs. 1 lit. f DSGVO.</li>
        <li>Die Verarbeitung von Daten zu anderen Zwecken als denen, zu denen sie erhoben wurden, bestimmt sich nach den Vorgaben des Art 6 Abs. 4 DSGVO.</li>
        <li>Die Verarbeitung von besonderen Kategorien von Daten (entsprechend Art. 9 Abs. 1 DSGVO) bestimmt sich nach den Vorgaben des Art. 9 Abs. 2 DSGVO.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">Sicherheitsmaßnahmen</h2>
      <p className="mb-4">
        Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten natürlicher Personen, geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
      </p>
      <p className="mb-4">
        Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit von Daten durch Kontrolle des physischen Zugangs zu den Daten, als auch des sie betreffenden Zugriffs, der Eingabe, Weitergabe, der Sicherung der Verfügbarkeit und ihrer Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von Betroffenenrechten, Löschung von Daten und Reaktion auf Gefährdung der Daten gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der Entwicklung, bzw. Auswahl von Hardware, Software sowie Verfahren, entsprechend dem Prinzip des Datenschutzes durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Zusammenarbeit mit Auftragsverarbeitern, gemeinsam Verantwortlichen und Dritten</h2>
      <p className="mb-4">
        Sofern wir im Rahmen unserer Verarbeitung Daten gegenüber anderen Personen und Unternehmen (Auftragsverarbeitern, gemeinsam Verantwortlichen oder Dritten) offenbaren, sie an diese übermitteln oder ihnen sonst Zugriff auf die Daten gewähren, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis (z.B. wenn eine Übermittlung der Daten an Dritte, wie an Zahlungsdienstleister, zur Vertragserfüllung erforderlich ist), Nutzer eingewilligt haben, eine rechtliche Verpflichtung dies vorsieht oder auf Grundlage unserer berechtigten Interessen (z.B. beim Einsatz von Beauftragten, Webhostern, etc.).
      </p>
      <p className="mb-4">
        Sofern wir Daten anderen Unternehmen unserer Unternehmensgruppe offenbaren, übermitteln oder ihnen sonst den Zugriff gewähren, erfolgt dies insbesondere zu administrativen Zwecken als berechtigtes Interesse und darüber hinausgehend auf einer den gesetzlichen Vorgaben entsprechenden Grundlage.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Übermittlungen in Drittländer</h2>
      <p className="mb-4">
        Sofern wir Daten in einem Drittland (d.h. außerhalb der Europäischen Union (EU), des Europäischen Wirtschaftsraums (EWR) oder der Schweizer Eidgenossenschaft) verarbeiten oder dies im Rahmen der Inanspruchnahme von Diensten Dritter oder Offenlegung, bzw. Übermittlung von Daten an andere Personen oder Unternehmen geschieht, erfolgt dies nur, wenn es zur Erfüllung unserer (vor)vertraglichen Pflichten, auf Grundlage Ihrer Einwilligung, aufgrund einer rechtlichen Verpflichtung oder auf Grundlage unserer berechtigten Interessen geschieht. Vorbehaltlich gesetzlicher oder vertraglicher Erlaubnisse, verarbeiten oder lassen wir die Daten in einem Drittland nur beim Vorliegen der gesetzlichen Voraussetzungen. D.h. die Verarbeitung erfolgt z.B. auf Grundlage besonderer Garantien, wie der offiziell anerkannten Feststellung eines der EU entsprechenden Datenschutzniveaus (z.B. für die USA durch das „Privacy Shield“) oder Beachtung offiziell anerkannter spezieller vertraglicher Verpflichtungen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Rechte der betroffenen Personen</h2>
      <p className="mb-4">
        Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
      </p>
      <p className="mb-4">
        Sie haben entsprechend den gesetzlichen Vorgaben das Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie betreffenden unrichtigen Daten zu verlangen.
      </p>
      <p className="mb-4">
        Sie haben nach Maßgabe der gesetzlichen Vorgaben das Recht zu verlangen, dass betreffende Daten unverzüglich gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der Verarbeitung der Daten zu verlangen.
      </p>
      <p className="mb-4">
        Sie haben das Recht zu verlangen, dass die Sie betreffenden Daten, die Sie uns bereitgestellt haben nach Maßgabe der gesetzlichen Vorgaben zu erhalten und deren Übermittlung an andere Verantwortliche zu fordern.
      </p>
      <p className="mb-4">
        Sie haben ferner nach Maßgabe der gesetzlichen Vorgaben das Recht, eine Beschwerde bei der zuständigen Aufsichtsbehörde einzureichen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Widerrufsrecht</h2>
      <p className="mb-4">
        Sie haben das Recht, erteilte Einwilligungen mit Wirkung für die Zukunft zu widerrufen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Widerspruchsrecht</h2>
      <p className="mb-4">
        Sie können der künftigen Verarbeitung der Sie betreffenden Daten nach Maßgabe der gesetzlichen Vorgaben jederzeit widersprechen. Der Widerspruch kann insbesondere gegen die Verarbeitung für Zwecke der Direktwerbung erfolgen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Cookies und Widerspruchsrecht bei Direktwerbung</h2>
      <p className="mb-4">
        Als „<b>Cookies</b>“ werden kleine Dateien bezeichnet, die auf Rechnern der Nutzer gespeichert werden. Innerhalb der Cookies können unterschiedliche Angaben gespeichert werden. Ein Cookie dient primär dazu, die Angaben zu einem Nutzer (bzw. dem Gerät auf dem das Cookie gespeichert ist) während oder auch nach seinem Besuch innerhalb eines Onlineangebotes zu speichern. Als temporäre Cookies, bzw. „Session-Cookies“ oder „transiente Cookies“, werden Cookies bezeichnet, die gelöscht werden, nachdem ein Nutzer ein Onlineangebot verlässt und seinen Browser schließt. In einem solchen Cookie kann z.B. der Inhalt eines Warenkorbs in einem Onlineshop oder ein Login-Status gespeichert werden. Als „permanent“ oder „persistent“ werden Cookies bezeichnet, die auch nach dem Schließen des Browsers gespeichert bleiben. So kann z.B. der Login-Status gespeichert werden, wenn die Nutzer diese nach mehreren Tagen aufsuchen. Ebenso können in einem solchen Cookie die Interessen der Nutzer gespeichert werden, die für Reichweitenmessung oder Marketingzwecke verwendet werden. Als „Third-Party-Cookie“ werden Cookies bezeichnet, die von anderen Anbietern als dem Verantwortlichen, der das Onlineangebot betreibt, angeboten werden (andernfalls, wenn es nur dessen Cookies sind spricht man von „First-Party Cookies“).
      </p>
      <p className="mb-4">
        Wir können temporäre und permanente Cookies einsetzen und klären hierüber im Rahmen unserer Datenschutzerklärung auf.
      </p>
      <p className="mb-4">
        Falls die Nutzer nicht möchten, dass Cookies auf ihrem Rechner gespeichert werden, werden sie gebeten die entsprechende Option in den Systemeinstellungen ihres Browsers zu deaktivieren. Gespeicherte Cookies können in den Systemeinstellungen des Browsers gelöscht werden. Der Ausschluss von Cookies kann zu Funktionseinschränkungen dieses Onlineangebotes führen.
      </p>
      <p className="mb-4">
        Ein genereller Widerspruch gegen den Einsatz der zu Zwecken des Onlinemarketing eingesetzten Cookies kann bei einer Vielzahl der Dienste, vor allem im Fall des Trackings, über die US-amerikanische Seite <a href="http://www.aboutads.info/choices/" className="text-blue-500 underline">http://www.aboutads.info/choices/</a> oder die EU-Seite <a href="http://www.youronlinechoices.com/" className="text-blue-500 underline">http://www.youronlinechoices.com/</a> erklärt werden. Des Weiteren kann die Speicherung von Cookies mittels deren Abschaltung in den Einstellungen des Browsers erreicht werden. Bitte beachten Sie, dass dann gegebenenfalls nicht alle Funktionen dieses Onlineangebotes genutzt werden können.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Löschung von Daten</h2>
      <p className="mb-4">
        Die von uns verarbeiteten Daten werden nach Maßgabe der gesetzlichen Vorgaben gelöscht oder in ihrer Verarbeitung eingeschränkt. Sofern nicht im Rahmen dieser Datenschutzerklärung ausdrücklich angegeben, werden die bei uns gespeicherten Daten gelöscht, sobald sie für ihre Zweckbestimmung nicht mehr erforderlich sind und der Löschung keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>
      <p className="mb-4">
        Sofern die Daten nicht gelöscht werden, weil sie für andere und gesetzlich zulässige Zwecke erforderlich sind, wird deren Verarbeitung eingeschränkt. D.h. die Daten werden gesperrt und nicht für andere Zwecke verarbeitet. Das gilt z.B. für Daten, die aus handels- oder steuerrechtlichen Gründen aufbewahrt werden müssen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Änderungen und Aktualisierungen der Datenschutzerklärung</h2>
      <p className="mb-4">
        Wir bitten Sie sich regelmäßig über den Inhalt unserer Datenschutzerklärung zu informieren. Wir passen die Datenschutzerklärung an, sobald die Änderungen der von uns durchgeführten Datenverarbeitungen dies erforderlich machen. Wir informieren Sie, sobald durch die Änderungen eine Mitwirkungshandlung Ihrerseits (z.B. Einwilligung) oder eine sonstige individuelle Benachrichtigung erforderlich wird.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Geschäftsbezogene Verarbeitung</h2>
      <p className="mb-4">
        Zusätzlich verarbeiten wir
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Vertragsdaten (z.B., Vertragsgegenstand, Laufzeit, Kundenkategorie).</li>
        <li>Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie)</li>
      </ul>
      <p className="mb-4">
        von unseren Kunden, Interessenten und Geschäftspartner zwecks Erbringung vertraglicher Leistungen, Service und Kundenpflege, Marketing, Werbung und Marktforschung.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Agenturdienstleistungen</h2>
      <p className="mb-4">
        Wir verarbeiten die Daten unserer Kunden im Rahmen unserer vertraglichen Leistungen zu denen konzeptionelle und strategische Beratung, Kampagnenplanung, Software- und Designentwicklung/-beratung oder Pflege, Umsetzung von Kampagnen und Prozessen/ Handling, Serveradministration, Datenanalyse/ Beratungsleistungen und Schulungsleistungen gehören.
      </p>
      <p className="mb-4">
        Hierbei verarbeiten wir Bestandsdaten (z.B., Kundenstammdaten, wie Namen oder Adressen), Kontaktdaten (z.B., E-Mail, Telefonnummern), Inhaltsdaten (z.B., Texteingaben, Fotografien, Videos), Vertragsdaten (z.B., Vertragsgegenstand, Laufzeit), Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie), Nutzungs- und Metadaten (z.B. im Rahmen der Auswertung und Erfolgsmessung von Marketingmaßnahmen). Besondere Kategorien personenbezogener Daten verarbeiten wir grundsätzlich nicht, außer wenn diese Bestandteile einer beauftragten Verarbeitung sind. Zu den Betroffenen gehören unsere Kunden, Interessenten sowie deren Kunden, Nutzer, Websitebesucher oder Mitarbeiter sowie Dritte. Der Zweck der Verarbeitung besteht in der Erbringung von Vertragsleistungen, Abrechnung und unserem Kundenservice. Die Rechtsgrundlagen der Verarbeitung ergeben sich aus Art. 6 Abs. 1 lit. b DSGVO (vertragliche Leistungen), Art. 6 Abs. 1 lit. f DSGVO (Analyse, Statistik, Optimierung, Sicherheitsmaßnahmen). Wir verarbeiten Daten, die zur Begründung und Erfüllung der vertraglichen Leistungen erforderlich sind und weisen auf die Erforderlichkeit ihrer Angabe hin. Eine Offenlegung an Externe erfolgt nur, wenn sie im Rahmen eines Auftrags erforderlich ist. Bei der Verarbeitung der uns im Rahmen eines Auftrags überlassenen Daten handeln wir entsprechend den Weisungen der Auftraggeber sowie der gesetzlichen Vorgaben einer Auftragsverarbeitung gem. Art. 28 DSGVO und verarbeiten die Daten zu keinen anderen, als den auftragsgemäßen Zwecken.
      </p>
      <p className="mb-4">
        Wir löschen die Daten nach Ablauf gesetzlicher Gewährleistungs- und vergleichbarer Pflichten. die Erforderlichkeit der Aufbewahrung der Daten wird alle drei Jahre überprüft; im Fall der gesetzlichen Archivierungspflichten erfolgt die Löschung nach deren Ablauf (6 J, gem. § 257 Abs. 1 HGB, 10 J, gem. § 147 Abs. 1 AO). Im Fall von Daten, die uns gegenüber im Rahmen eines Auftrags durch den Auftraggeber offengelegt wurden, löschen wir die Daten entsprechend den Vorgaben des Auftrags, grundsätzlich nach Ende des Auftrags.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Therapeutische Leistungen und Coaching</h2>
      <p className="mb-4">
        Wir verarbeiten die Daten unserer Klienten und Interessenten und anderer Auftraggeber oder Vertragspartner (einheitlich bezeichnet als „Klienten“) entsprechend Art. 6 Abs. 1 lit. b) DSGVO, um ihnen gegenüber unsere vertraglichen oder vorvertraglichen Leistungen zu erbringen. Die hierbei verarbeiteten Daten, die Art, der Umfang und der Zweck und die Erforderlichkeit ihrer Verarbeitung, bestimmen sich nach dem zugrundeliegenden Vertragsverhältnis. Zu den verarbeiteten Daten gehören grundsätzlich Bestands- und Stammdaten der Klienten (z.B., Name, Adresse, etc.), als auch die Kontaktdaten (z.B., E-Mailadresse, Telefon, etc.), die Vertragsdaten (z.B., in Anspruch genommene Leistungen, Honorare, Namen von Kontaktpersonen, etc.) und Zahlungsdaten (z.B., Bankverbindung, Zahlungshistorie, etc.).
      </p>
      <p className="mb-4">
        Im Rahmen unserer Leistungen, können wir ferner besondere Kategorien von Daten gem. Art. 9 Abs. 1 DSGVO, insbesondere Angaben zur Gesundheit der Klienten, ggf. mit Bezug zu deren Sexualleben oder der sexuellen Orientierung, ethnischer Herkunft oder religiösen oder weltanschaulichen Überzeugungen, verarbeiten. Hierzu holen wir, sofern erforderlich, gem. Art. 6 Abs. 1 lit. a., Art. 7, Art. 9 Abs. 2 lit. a. DSGVO eine ausdrückliche Einwilligung der Klienten ein und verarbeiten die besonderen Kategorien von Daten ansonsten zu Zwecken der Gesundheitsvorsorge auf Grundlage des Art. 9 Abs. 2 lit h. DSGVO, § 22 Abs. 1 Nr. 1 b. BDSG.
      </p>
      <p className="mb-4">
        Sofern für die Vertragserfüllung oder gesetzlich erforderlich, offenbaren oder übermitteln wir die Daten der Klienten im Rahmen der Kommunikation mit anderen Fachkräften, an der Vertragserfüllung erforderlicherweise oder typischerweise beteiligten Dritten, wie z.B. Abrechnungsstellen oder vergleichbare Dienstleister, sofern dies der Erbringung unserer Leistungen gem. Art. 6 Abs. 1 lit b. DSGVO dient, gesetzlich gem. Art. 6 Abs. 1 lit c. DSGVO vorgeschrieben ist, unseren Interessen oder denen der Klienten an einer effizienten und kostengünstigen Gesundheitsversorgung als berechtigtes Interesse gem. Art. 6 Abs. 1 lit f. DSGVO dient oder gem. Art. 6 Abs. 1 lit d. DSGVO notwendig ist, um lebenswichtige Interessen der Klienten oder einer anderen natürlichen Person zu schützen oder im Rahmen einer Einwilligung gem. Art. 6 Abs. 1 lit. a., Art. 7 DSGVO.
      </p>
      <p className="mb-4">
        Die Löschung der Daten erfolgt, wenn die Daten zur Erfüllung vertraglicher oder gesetzlicher Fürsorgepflichten sowie Umgang mit etwaigen Gewährleistungs- und vergleichbaren Pflichten nicht mehr erforderlich ist, wobei die Erforderlichkeit der Aufbewahrung der Daten alle drei Jahre überprüft wird; im Übrigen gelten die gesetzlichen Aufbewahrungspflichten.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Administration, Finanzbuchhaltung, Büroorganisation, Kontaktverwaltung</h2>
      <p className="mb-4">
        Wir verarbeiten Daten im Rahmen von Verwaltungsaufgaben sowie Organisation unseres Betriebs, Finanzbuchhaltung und Befolgung der gesetzlichen Pflichten, wie z.B. der Archivierung. Hierbei verarbeiten wir dieselben Daten, die wir im Rahmen der Erbringung unserer vertraglichen Leistungen verarbeiten. Die Verarbeitungsgrundlagen sind Art. 6 Abs. 1 lit. c. DSGVO, Art. 6 Abs. 1 lit. f. DSGVO. Von der Verarbeitung sind Kunden, Interessenten, Geschäftspartner und Websitebesucher betroffen. Der Zweck und unser Interesse an der Verarbeitung liegt in der Administration, Finanzbuchhaltung, Büroorganisation, Archivierung von Daten, also Aufgaben die der Aufrechterhaltung unserer Geschäftstätigkeiten, Wahrnehmung unserer Aufgaben und Erbringung unserer Leistungen dienen. Die Löschung der Daten im Hinblick auf vertragliche Leistungen und die vertragliche Kommunikation entspricht den, bei diesen Verarbeitungstätigkeiten genannten Angaben.
      </p>
      <p className="mb-4">
        Wir offenbaren oder übermitteln hierbei Daten an die Finanzverwaltung, Berater, wie z.B., Steuerberater oder Wirtschaftsprüfer sowie weitere Gebührenstellen und Zahlungsdienstleister.
      </p>
      <p className="mb-4">
        Ferner speichern wir auf Grundlage unserer betriebswirtschaftlichen Interessen Angaben zu Lieferanten, Veranstaltern und sonstigen Geschäftspartnern, z.B. zwecks späterer Kontaktaufnahme. Diese mehrheitlich unternehmensbezogenen Daten, speichern wir grundsätzlich dauerhaft.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Registrierfunktion</h2>
      <p className="mb-4">
        Nutzer können ein Nutzerkonto anlegen. Im Rahmen der Registrierung werden die erforderlichen Pflichtangaben den Nutzern mitgeteilt und auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO zu Zwecken der Bereitstellung des Nutzerkontos verarbeitet. Zu den verarbeiteten Daten gehören insbesondere die Login-Informationen (Name, Passwort sowie eine E-Mailadresse). Die im Rahmen der Registrierung eingegebenen Daten werden für die Zwecke der Nutzung des Nutzerkontos und dessen Zwecks verwendet.
      </p>
      <p className="mb-4">
        Die Nutzer können über Informationen, die für deren Nutzerkonto relevant sind, wie z.B. technische Änderungen, per E-Mail informiert werden. Wenn Nutzer ihr Nutzerkonto gekündigt haben, werden deren Daten im Hinblick auf das Nutzerkonto, vorbehaltlich einer gesetzlichen Aufbewahrungspflicht, gelöscht. Es obliegt den Nutzern, ihre Daten bei erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind berechtigt, sämtliche während der Vertragsdauer gespeicherten Daten des Nutzers unwiederbringlich zu löschen.
      </p>
      <p className="mb-4">
        Im Rahmen der Inanspruchnahme unserer Registrierungs- und Anmeldefunktionen sowie der Nutzung des Nutzerkontos, speichern wir die IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung. Die Speicherung erfolgt auf Grundlage unserer berechtigten Interessen, als auch der Nutzer an Schutz vor Missbrauch und sonstiger unbefugter Nutzung. Eine Weitergabe dieser Daten an Dritte erfolgt grundsätzlich nicht, außer sie ist zur Verfolgung unserer Ansprüche erforderlich oder es besteht hierzu eine gesetzliche Verpflichtung gem. Art. 6 Abs. 1 lit. c DSGVO. Die IP-Adressen werden spätestens nach 7 Tagen anonymisiert oder gelöscht.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Kontaktaufnahme</h2>
      <p className="mb-4">
        Bei der Kontaktaufnahme mit uns (z.B. per Kontaktformular, E-Mail, Telefon oder via sozialer Medien) werden die Angaben des Nutzers zur Bearbeitung der Kontaktanfrage und deren Abwicklung gem. Art. 6 Abs. 1 lit. b. (im Rahmen vertraglicher-/vorvertraglicher Beziehungen), Art. 6 Abs. 1 lit. f. (andere Anfragen) DSGVO verarbeitet. Die Angaben der Nutzer können in einem Customer-Relationship-Management System ("CRM System") oder vergleichbarer Anfragenorganisation gespeichert werden.
      </p>
      <p className="mb-4">
        Wir löschen die Anfragen, sofern diese nicht mehr erforderlich sind. Wir überprüfen die Erforderlichkeit alle zwei Jahre; Ferner gelten die gesetzlichen Archivierungspflichten.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Newsletter</h2>
      <p className="mb-4">
        Mit den nachfolgenden Hinweisen informieren wir Sie über die Inhalte unseres Newsletters sowie das Anmelde-, Versand- und das statistische Auswertungsverfahren sowie Ihre Widerspruchsrechte auf. Indem Sie unseren Newsletter abonnieren, erklären Sie sich mit dem Empfang und den beschriebenen Verfahren einverstanden.
      </p>
      <p className="mb-4">
        Inhalt des Newsletters: Wir versenden Newsletter, E-Mails und weitere elektronische Benachrichtigungen mit werblichen Informationen (nachfolgend „Newsletter“) nur mit der Einwilligung der Empfänger oder einer gesetzlichen Erlaubnis. Sofern im Rahmen einer Anmeldung zum Newsletter dessen Inhalte konkret umschrieben werden, sind sie für die Einwilligung der Nutzer maßgeblich. Im Übrigen enthalten unsere Newsletter Informationen zu unseren Leistungen und uns.
      </p>
      <p className="mb-4">
        <b>Double-Opt-In und Protokollierung:</b> Die Anmeldung zu unserem Newsletter erfolgt in einem sog. Double-Opt-In-Verfahren. D.h. Sie erhalten nach der Anmeldung eine E-Mail, in der Sie um die Bestätigung Ihrer Anmeldung gebeten werden. Diese Bestätigung ist notwendig, damit sich niemand mit fremden E-Mailadressen anmelden kann. Die Anmeldungen zum Newsletter werden protokolliert, um den Anmeldeprozess entsprechend den rechtlichen Anforderungen nachweisen zu können. Hierzu gehört die Speicherung des Anmelde- und des Bestätigungszeitpunkts, als auch der IP-Adresse. Ebenso werden die Änderungen Ihrer bei dem Versanddienstleister gespeicherten Daten protokolliert.
      </p>
      <p className="mb-4">
        <b>Anmeldedaten:</b> Um sich für den Newsletter anzumelden, reicht es aus, wenn Sie Ihre E-Mailadresse angeben. Optional bitten wir Sie einen Namen, zwecks persönlicher Ansprache im Newsletters anzugeben.
      </p>
      <p className="mb-4">
        Der Versand des Newsletters und die mit ihm verbundene Erfolgsmessung erfolgen auf Grundlage einer Einwilligung der Empfänger gem. Art. 6 Abs. 1 lit. a, Art. 7 DSGVO i.V.m § 7 Abs. 2 Nr. 3 UWG oder falls eine Einwilligung nicht erforderlich ist, auf Grundlage unserer berechtigten Interessen am Direktmarketing gem. Art. 6 Abs. 1 lt. f. DSGVO i.V.m. § 7 Abs. 3 UWG.
      </p>
      <p className="mb-4">
        Die Protokollierung des Anmeldeverfahrens erfolgt auf Grundlage unserer berechtigten Interessen gem. Art. 6 Abs. 1 lit. f DSGVO. Unser Interesse richtet sich auf den Einsatz eines nutzerfreundlichen sowie sicheren Newslettersystems, das sowohl unseren geschäftlichen Interessen dient, als auch den Erwartungen der Nutzer entspricht und uns ferner den Nachweis von Einwilligungen erlaubt.
      </p>
      <p className="mb-4">
        <b>Kündigung/Widerruf</b> - Sie können den Empfang unseres Newsletters jederzeit kündigen, d.h. Ihre Einwilligungen widerrufen. Einen Link zur Kündigung des Newsletters finden Sie am Ende eines jeden Newsletters. Wir können die ausgetragenen E-Mailadressen bis zu drei Jahren auf Grundlage unserer berechtigten Interessen speichern bevor wir sie löschen, um eine ehemals gegebene Einwilligung nachweisen zu können. Die Verarbeitung dieser Daten wird auf den Zweck einer möglichen Abwehr von Ansprüchen beschränkt. Ein individueller Löschungsantrag ist jederzeit möglich, sofern zugleich das ehemalige Bestehen einer Einwilligung bestätigt wird.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Hosting und E-Mail-Versand</h2>
      <p className="mb-4">
        Die von uns in Anspruch genommenen Hosting-Leistungen dienen der Zurverfügungstellung der folgenden Leistungen: Infrastruktur- und Plattformdienstleistungen, Rechenkapazität, Speicherplatz und Datenbankdienste, E-Mail-Versand, Sicherheitsleistungen sowie technische Wartungsleistungen, die wir zum Zwecke des Betriebs dieses Onlineangebotes einsetzen.
      </p>
      <p className="mb-4">
        Hierbei verarbeiten wir, bzw. unser Hostinganbieter Bestandsdaten, Kontaktdaten, Inhaltsdaten, Vertragsdaten, Nutzungsdaten, Meta- und Kommunikationsdaten von Kunden, Interessenten und Besuchern dieses Onlineangebotes auf Grundlage unserer berechtigten Interessen an einer effizienten und sicheren Zurverfügungstellung dieses Onlineangebotes gem. Art. 6 Abs. 1 lit. f DSGVO i.V.m. Art. 28 DSGVO (Abschluss Auftragsverarbeitungsvertrag).
      </p>

      <h2 className="text-2xl font-semibold mb-3">Erhebung von Zugriffsdaten und Logfiles</h2>
      <p className="mb-4">
        Wir, bzw. unser Hostinganbieter, erhebt auf Grundlage unserer berechtigten Interessen im Sinne des Art. 6 Abs. 1 lit. f. DSGVO Daten über jeden Zugriff auf den Server, auf dem sich dieser Dienst befindet (sogenannte Serverlogfiles). Zu den Zugriffsdaten gehören Name der abgerufenen Webseite, Datei, Datum und Uhrzeit des Abrufs, übertragene Datenmenge, Meldung über erfolgreichen Abruf, Browsertyp nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite), IP-Adresse und der anfragende Provider.
      </p>
      <p className="mb-4">
        Logfile-Informationen werden aus Sicherheitsgründen (z.B. zur Aufklärung von Missbrauchs- oder Betrugshandlungen) für die Dauer von maximal 7 Tagen gespeichert und danach gelöscht. Daten, deren weitere Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen Vorfalls von der Löschung ausgenommen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Google Analytics</h2>
      <p className="mb-4">
        Wir setzen auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Google Analytics, einen Webanalysedienst der Google LLC („Google“) ein. Google verwendet Cookies. Die durch das Cookie erzeugten Informationen über Benutzung des Onlineangebotes durch die Nutzer werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
      </p>
      <p className="mb-4">
        Google ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine Garantie, das europäische Datenschutzrecht einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active</a>).
      </p>
      <p className="mb-4">
        Google wird diese Informationen in unserem Auftrag benutzen, um die Nutzung unseres Onlineangebotes durch die Nutzer auszuwerten, um Reports über die Aktivitäten innerhalb dieses Onlineangebotes zusammenzustellen und um weitere, mit der Nutzung dieses Onlineangebotes und der Internetnutzung verbundene Dienstleistungen, uns gegenüber zu erbringen. Dabei können aus den verarbeiteten Daten pseudonyme Nutzungsprofile der Nutzer erstellt werden.
      </p>
      <p className="mb-4">
        Wir setzen Google Analytics nur mit aktivierter IP-Anonymisierung ein. Das bedeutet, die IP-Adresse der Nutzer wird von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum gekürzt. Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den USA übertragen und dort gekürzt.
      </p>
      <p className="mb-4">
        Die von dem Browser des Nutzers übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt. Die Nutzer können die Speicherung der Cookies durch eine entsprechende Einstellung ihrer Browser-Software verhindern; die Nutzer können darüber hinaus die Erfassung der durch das Cookie erzeugten und auf ihre Nutzung des Onlineangebotes bezogenen Daten an Google sowie die Verarbeitung dieser Daten durch Google verhindern, indem sie das unter folgendem Link verfügbare Browser-Plugin herunterladen und installieren: <a href="http://tools.google.com/dlpage/gaoptout?hl=de" className="text-blue-500 underline">http://tools.google.com/dlpage/gaoptout?hl=de</a>.
      </p>
      <p className="mb-4">
        Weitere Informationen zur Datennutzung durch Google, Einstellungs- und Widerspruchsmöglichkeiten, erfahren Sie in der Datenschutzerklärung von Google (<a href="https://policies.google.com/privacy" className="text-blue-500 underline">https://policies.google.com/privacy</a>) sowie in den Einstellungen für die Darstellung von Werbeeinblendungen durch Google (<a href="https://adssettings.google.com/authenticated" className="text-blue-500 underline">https://adssettings.google.com/authenticated</a>).
      </p>
      <p className="mb-4">
        Die personenbezogenen Daten der Nutzer werden nach 14 Monaten gelöscht oder anonymisiert.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Onlinepräsenzen in sozialen Medien</h2>
      <p className="mb-4">
        Wir unterhalten Onlinepräsenzen innerhalb sozialer Netzwerke und Plattformen, um mit den dort aktiven Kunden, Interessenten und Nutzern kommunizieren und sie dort über unsere Leistungen informieren zu können.
      </p>
      <p className="mb-4">
        Wir weisen darauf hin, dass dabei Daten der Nutzer außerhalb des Raumes der Europäischen Union verarbeitet werden können. Hierdurch können sich für die Nutzer Risiken ergeben, weil so z.B. die Durchsetzung der Rechte der Nutzer erschwert werden könnte. Im Hinblick auf US-Anbieter die unter dem Privacy-Shield zertifiziert sind, weisen wir darauf hin, dass sie sich damit verpflichten, die Datenschutzstandards der EU einzuhalten.
      </p>
      <p className="mb-4">
        Ferner werden die Daten der Nutzer im Regelfall für Marktforschungs- und Werbezwecke verarbeitet. So können z.B. aus dem Nutzungsverhalten und sich daraus ergebenden Interessen der Nutzer Nutzungsprofile erstellt werden. Die Nutzungsprofile können wiederum verwendet werden, um z.B. Werbeanzeigen innerhalb und außerhalb der Plattformen zu schalten, die mutmaßlich den Interessen der Nutzer entsprechen. Zu diesen Zwecken werden im Regelfall Cookies auf den Rechnern der Nutzer gespeichert, in denen das Nutzungsverhalten und die Interessen der Nutzer gespeichert werden. Ferner können in den Nutzungsprofilen auch Daten unabhängig der von den Nutzern verwendeten Geräte gespeichert werden (insbesondere wenn die Nutzer Mitglieder der jeweiligen Plattformen sind und bei diesen eingeloggt sind).
      </p>
      <p className="mb-4">
        Die Verarbeitung der personenbezogenen Daten der Nutzer erfolgt auf Grundlage unserer berechtigten Interessen an einer effektiven Information der Nutzer und Kommunikation mit den Nutzern gem. Art. 6 Abs. 1 lit. f. DSGVO. Falls die Nutzer von den jeweiligen Anbietern der Plattformen um eine Einwilligung in die vorbeschriebene Datenverarbeitung gebeten werden, ist die Rechtsgrundlage der Verarbeitung Art. 6 Abs. 1 lit. a., Art. 7 DSGVO.
      </p>
      <p className="mb-4">
        Für eine detaillierte Darstellung der jeweiligen Verarbeitungen und der Widerspruchsmöglichkeiten (Opt-Out), verweisen wir auf die nachfolgend verlinkten Angaben der Anbieter.
      </p>
      <p className="mb-4">
        Auch im Fall von Auskunftsanfragen und der Geltendmachung von Nutzerrechten, weisen wir darauf hin, dass diese am effektivsten bei den Anbietern geltend gemacht werden können. Nur die Anbieter haben jeweils Zugriff auf die Daten der Nutzer und können direkt entsprechende Maßnahmen ergreifen und Auskünfte geben. Sollten Sie dennoch Hilfe benötigen, dann können Sie sich an uns wenden.
      </p>
      <p className="mb-4">
        - <b>Facebook</b>, -Seiten, -Gruppen, (Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland) auf Grundlage einer Vereinbarung über gemeinsame Verarbeitung personenbezogener Daten - Datenschutzerklärung: <a href="https://www.facebook.com/about/privacy/" className="text-blue-500 underline">https://www.facebook.com/about/privacy/</a>, speziell für Seiten: <a href="https://www.facebook.com/legal/terms/information_about_page_insights_data" className="text-blue-500 underline">https://www.facebook.com/legal/terms/information_about_page_insights_data</a>, Opt-Out: <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-500 underline">https://www.facebook.com/settings?tab=ads</a> und <a href="http://www.youronlinechoices.com" className="text-blue-500 underline">http://www.youronlinechoices.com</a>, Privacy Shield: <a href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active</a>.
      </p>
      <p className="mb-4">
        - <b>Google/ YouTube</b> (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA) – Datenschutzerklärung: <a href="https://policies.google.com/privacy" className="text-blue-500 underline">https://policies.google.com/privacy</a>, Opt-Out: <a href="https://adssettings.google.com/authenticated" className="text-blue-500 underline">https://adssettings.google.com/authenticated</a>, Privacy Shield: <a href="https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt000000001L5AAI&status=Active</a>.
      </p>
      <p className="mb-4">
        - <b>Instagram</b> (Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA) – Datenschutzerklärung/ Opt-Out: <a href="http://instagram.com/about/legal/privacy/" className="text-blue-500 underline">http://instagram.com/about/legal/privacy/</a>.
      </p>
      <p className="mb-4">
        - <b>Twitter</b> (Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103, USA) - Datenschutzerklärung: <a href="https://twitter.com/de/privacy" className="text-blue-500 underline">https://twitter.com/de/privacy</a>, Opt-Out: <a href="https://twitter.com/personalization" className="text-blue-500 underline">https://twitter.com/personalization</a>, Privacy Shield: <a href="https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active</a>.
      </p>
      <p className="mb-4">
        - <b>Pinterest</b> (Pinterest Inc., 635 High Street, Palo Alto, CA, 94301, USA) – Datenschutzerklärung/ Opt-Out: <a href="https://about.pinterest.com/de/privacy-policy" className="text-blue-500 underline">https://about.pinterest.com/de/privacy-policy</a>.
      </p>
      <p className="mb-4">
        - <b>LinkedIn</b> (LinkedIn Ireland Unlimited Company Wilton Place, Dublin 2, Irland) - Datenschutzerklärung <a href="https://www.linkedin.com/legal/privacy-policy" className="text-blue-500 underline">https://www.linkedin.com/legal/privacy-policy</a>, Opt-Out: <a href="https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out" className="text-blue-500 underline">https://www.linkedin.com/psettings/guest-controls/retargeting-opt-out</a>, Privacy Shield: <a href="https://www.privacyshield.gov/participant?id=a2zt0000000L0UZAA0&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt0000000L0UZAA0&status=Active</a>.
      </p>
      <p className="mb-4">
        - <b>Xing</b> (XING AG, Dammtorstraße 29-32, 20354 Hamburg, Deutschland) - Datenschutzerklärung/ Opt-Out: <a href="https://privacy.xing.com/de/datenschutzerklaerung" className="text-blue-500 underline">https://privacy.xing.com/de/datenschutzerklaerung</a>.
      </p>
      <p className="mb-4">
        - <b>Wakalet</b> (Wakelet Limited, 76 Quay Street, Manchester, M3 4PR, United Kingdom) - Datenschutzerklärung/ Opt-Out: <a href="https://wakelet.com/privacy.html" className="text-blue-500 underline">https://wakelet.com/privacy.html</a>.
      </p>
      <p className="mb-4">
        - <b>Soundcloud</b> (SoundCloud Limited, Rheinsberger Str. 76/77, 10115 Berlin, Deutschland) - Datenschutzerklärung/ Opt-Out: <a href="https://soundcloud.com/pages/privacy" className="text-blue-500 underline">https://soundcloud.com/pages/privacy</a>.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Einbindung von Diensten und Inhalten Dritter</h2>
      <p className="mb-4">
        Wir setzen innerhalb unseres Onlineangebotes auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Inhalts- oder Serviceangebote von Drittanbietern ein, um deren Inhalte und Services, wie z.B. Videos oder Schriftarten einzubinden (nachfolgend einheitlich bezeichnet als “Inhalte”).
      </p>
      <p className="mb-4">
        Dies setzt immer voraus, dass die Drittanbieter dieser Inhalte, die IP-Adresse der Nutzer wahrnehmen, da sie ohne die IP-Adresse die Inhalte nicht an deren Browser senden könnten. Die IP-Adresse ist damit für die Darstellung dieser Inhalte erforderlich. Wir bemühen uns nur solche Inhalte zu verwenden, deren jeweilige Anbieter die IP-Adresse lediglich zur Auslieferung der Inhalte verwenden. Drittanbieter können ferner so genannte Pixel-Tags (unsichtbare Grafiken, auch als "Web Beacons" bezeichnet) für statistische oder Marketingzwecke verwenden. Durch die "Pixel-Tags" können Informationen, wie der Besucherverkehr auf den Seiten dieser Website ausgewertet werden. Die pseudonymen Informationen können ferner in Cookies auf dem Gerät der Nutzer gespeichert werden und unter anderem technische Informationen zum Browser und Betriebssystem, verweisende Webseiten, Besuchszeit sowie weitere Angaben zur Nutzung unseres Onlineangebotes enthalten, als auch mit solchen Informationen aus anderen Quellen verbunden werden.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Youtube</h2>
      <p className="mb-4">
        Wir binden die Videos der Plattform “YouTube” des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Datenschutzerklärung: <a href="https://www.google.com/policies/privacy/" className="text-blue-500 underline">https://www.google.com/policies/privacy/</a>, Opt-Out: <a href="https://adssettings.google.com/authenticated" className="text-blue-500 underline">https://adssettings.google.com/authenticated</a>.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Google Maps</h2>
      <p className="mb-4">
        Wir binden die Landkarten des Dienstes “Google Maps” des Anbieters Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA, ein. Zu den verarbeiteten Daten können insbesondere IP-Adressen und Standortdaten der Nutzer gehören, die jedoch nicht ohne deren Einwilligung (im Regelfall im Rahmen der Einstellungen ihrer Mobilgeräte vollzogen), erhoben werden. Die Daten können in den USA verarbeitet werden. Datenschutzerklärung: <a href="https://www.google.com/policies/privacy/" className="text-blue-500 underline">https://www.google.com/policies/privacy/</a>, Opt-Out: <a href="https://adssettings.google.com/authenticated" className="text-blue-500 underline">https://adssettings.google.com/authenticated</a>.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Verwendung von Facebook Social Plugins</h2>
      <p className="mb-4">
        Wir nutzen auf Grundlage unserer berechtigten Interessen (d.h. Interesse an der Analyse, Optimierung und wirtschaftlichem Betrieb unseres Onlineangebotes im Sinne des Art. 6 Abs. 1 lit. f. DSGVO) Social Plugins ("Plugins") des sozialen Netzwerkes facebook.com, welches von der Facebook Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland betrieben wird ("Facebook").
      </p>
      <p className="mb-4">
        Hierzu können z.B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Facebook teilen können. Die Liste und das Aussehen der Facebook Social Plugins kann hier eingesehen werden: <a href="https://developers.facebook.com/docs/plugins/" className="text-blue-500 underline">https://developers.facebook.com/docs/plugins/</a>.
      </p>
      <p className="mb-4">
        Facebook ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine Garantie, das europäische Datenschutzrecht einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt0000000GnywAAC&status=Active</a>).
      </p>
      <p className="mb-4">
        Wenn ein Nutzer eine Funktion dieses Onlineangebotes aufruft, die ein solches Plugin enthält, baut sein Gerät eine direkte Verbindung mit den Servern von Facebook auf. Der Inhalt des Plugins wird von Facebook direkt an das Gerät des Nutzers übermittelt und von diesem in das Onlineangebot eingebunden. Dabei können aus den verarbeiteten Daten Nutzungsprofile der Nutzer erstellt werden. Wir haben daher keinen Einfluss auf den Umfang der Daten, die Facebook mit Hilfe dieses Plugins erhebt und informiert die Nutzer daher entsprechend unserem Kenntnisstand.
      </p>
      <p className="mb-4">
        Durch die Einbindung der Plugins erhält Facebook die Information, dass ein Nutzer die entsprechende Seite des Onlineangebotes aufgerufen hat. Ist der Nutzer bei Facebook eingeloggt, kann Facebook den Besuch seinem Facebook-Konto zuordnen. Wenn Nutzer mit den Plugins interagieren, zum Beispiel den Like Button betätigen oder einen Kommentar abgeben, wird die entsprechende Information von Ihrem Gerät direkt an Facebook übermittelt und dort gespeichert. Falls ein Nutzer kein Mitglied von Facebook ist, besteht trotzdem die Möglichkeit, dass Facebook seine IP-Adresse in Erfahrung bringt und speichert. Laut Facebook wird in Deutschland nur eine anonymisierte IP-Adresse gespeichert.
      </p>
      <p className="mb-4">
        Zweck und Umfang der Datenerhebung und die weitere Verarbeitung und Nutzung der Daten durch Facebook sowie die diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz der Privatsphäre der Nutzer, können diese den Datenschutzhinweisen von Facebook entnehmen: <a href="https://www.facebook.com/about/privacy/" className="text-blue-500 underline">https://www.facebook.com/about/privacy/</a>.
      </p>
      <p className="mb-4">
        Wenn ein Nutzer Facebookmitglied ist und nicht möchte, dass Facebook über dieses Onlineangebot Daten über ihn sammelt und mit seinen bei Facebook gespeicherten Mitgliedsdaten verknüpft, muss er sich vor der Nutzung unseres Onlineangebotes bei Facebook ausloggen und seine Cookies löschen. Weitere Einstellungen und Widersprüche zur Nutzung von Daten für Werbezwecke, sind innerhalb der Facebook-Profileinstellungen möglich: <a href="https://www.facebook.com/settings?tab=ads" className="text-blue-500 underline">https://www.facebook.com/settings?tab=ads</a> oder über die US-amerikanische Seite <a href="http://www.aboutads.info/choices/" className="text-blue-500 underline">http://www.aboutads.info/choices/</a> oder die EU-Seite <a href="http://www.youronlinechoices.com/" className="text-blue-500 underline">http://www.youronlinechoices.com/</a>. Die Einstellungen erfolgen plattformunabhängig, d.h. sie werden für alle Geräte, wie Desktopcomputer oder mobile Geräte übernommen.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Twitter</h2>
      <p className="mb-4">
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des Dienstes Twitter, angeboten durch die Twitter Inc., 1355 Market Street, Suite 900, San Francisco, CA 94103, USA, eingebunden werden. Hierzu können z.B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Twitter teilen können.
      </p>
      <p className="mb-4">
        Sofern die Nutzer Mitglieder der Plattform Twitter sind, kann Twitter den Aufruf der o.g. Inhalte und Funktionen den dortigen Profilen der Nutzer zuordnen. Twitter ist unter dem Privacy-Shield-Abkommen zertifiziert und bietet hierdurch eine Garantie, das europäische Datenschutzrecht einzuhalten (<a href="https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active" className="text-blue-500 underline">https://www.privacyshield.gov/participant?id=a2zt0000000TORzAAO&status=Active</a>). Datenschutzerklärung: <a href="https://twitter.com/de/privacy" className="text-blue-500 underline">https://twitter.com/de/privacy</a>, Opt-Out: <a href="https://twitter.com/personalization" className="text-blue-500 underline">https://twitter.com/personalization</a>.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Instagram</h2>
      <p className="mb-4">
        Innerhalb unseres Onlineangebotes können Funktionen und Inhalte des Dienstes Instagram, angeboten durch die Instagram Inc., 1601 Willow Road, Menlo Park, CA, 94025, USA, eingebunden werden. Hierzu können z.B. Inhalte wie Bilder, Videos oder Texte und Schaltflächen gehören, mit denen Nutzer Inhalte dieses Onlineangebotes innerhalb von Instagram teilen können. Sofern die Nutzer Mitglieder der Plattform Instagram sind, kann Instagram den Aufruf der o.g. Inhalte und Funktionen den dortigen Profilen der Nutzer zuordnen. Datenschutzerklärung von Instagram: <a href="http://instagram.com/about/legal/privacy/" className="text-blue-500 underline">http://instagram.com/about/legal/privacy/</a>.
      </p>

      <p className="mt-8">
        <i>Erstellt mit <a href="https://datenschutz-generator.de" className="text-blue-500 underline">Datenschutz-Generator.de</a> von RA Dr. Thomas Schwenke</i>
      </p>
    </div>
  );
};

export default Policy;
