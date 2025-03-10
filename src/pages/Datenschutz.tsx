
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Datenschutz = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 heading-gradient">Datenschutzerklärung</h1>
          
          <div className="glass-panel rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">1. Datenschutz auf einen Blick</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Allgemeine Hinweise</h3>
                <p className="text-gray-600">
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Datenerfassung auf dieser Website</h3>
                <p className="text-gray-600 mb-2">
                  <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
                </p>
                <p className="text-gray-600 mb-4">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
                </p>
                
                <p className="text-gray-600 mb-2">
                  <strong>Wie erfassen wir Ihre Daten?</strong>
                </p>
                <p className="text-gray-600 mb-4">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="text-gray-600 mb-4">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
                </p>
                
                <p className="text-gray-600 mb-2">
                  <strong>Wofür nutzen wir Ihre Daten?</strong>
                </p>
                <p className="text-gray-600 mb-4">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
                
                <p className="text-gray-600 mb-2">
                  <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong>
                </p>
                <p className="text-gray-600">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">2. Hosting</h2>
            
            <p className="text-gray-600 mb-4">
              Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Externes Hosting</h3>
                <p className="text-gray-600">
                  Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Datenschutz</h3>
                <p className="text-gray-600">
                  Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Hinweis zur verantwortlichen Stelle</h3>
                <p className="text-gray-600 mb-4">
                  Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
                </p>
                
                <p className="text-gray-600">
                  Max Mustermann<br />
                  Musterstraße 123<br />
                  4910 Ried im Innkreis<br />
                  Österreich
                </p>
                
                <p className="text-gray-600 mt-4">
                  Telefon: +43 123 456789<br />
                  E-Mail: info@rl-innviertel.at
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">4. Cookies</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Allgemeines zu Cookies</h3>
                <p className="text-gray-600">
                  Unsere Website verwendet Cookies. Hierbei handelt es sich um kleine Dateien, die Ihr Browser automatisch erstellt und die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie unsere Website besuchen. Cookies richten auf Ihrem Endgerät keinen Schaden an, enthalten keine Viren, Trojaner oder sonstige Schadsoftware.
                </p>
                <p className="text-gray-600 mt-2">
                  In dem Cookie werden Informationen abgelegt, die sich jeweils im Zusammenhang mit dem spezifisch eingesetzten Endgerät ergeben. Dies bedeutet jedoch nicht, dass wir dadurch unmittelbar Kenntnis von Ihrer Identität erhalten.
                </p>
                <p className="text-gray-600 mt-2">
                  Der Einsatz von Cookies dient einerseits dazu, die Nutzung unseres Angebots für Sie angenehmer zu gestalten. So setzen wir sogenannte Session-Cookies ein, um zu erkennen, dass Sie einzelne Seiten unserer Website bereits besucht haben. Diese werden nach Verlassen unserer Seite automatisch gelöscht.
                </p>
                <p className="text-gray-600 mt-2">
                  Sie können Ihre Browser-Einstellung entsprechend Ihren Wünschen konfigurieren und z.B. die Annahme von Third-Party-Cookies oder allen Cookies ablehnen. Wir weisen Sie darauf hin, dass Sie eventuell nicht alle Funktionen dieser Website nutzen können.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Datenschutz;
