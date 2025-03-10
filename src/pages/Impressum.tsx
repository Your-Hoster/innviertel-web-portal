
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Impressum = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 heading-gradient">Impressum</h1>
          
          <div className="glass-panel rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">Angaben gemäß § 5 TMG</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Betreiber</h3>
                <p>Max Mustermann</p>
                <p>Musterstraße 123</p>
                <p>4910 Ried im Innkreis</p>
                <p>Österreich</p>
              </div>
              
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Kontakt</h3>
                <p>Telefon: +43 123 456789</p>
                <p>E-Mail: info@rl-innviertel.at</p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">Haftungsausschluss</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Haftung für Inhalte</h3>
                <p className="text-gray-600">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Haftung für Links</h3>
                <p className="text-gray-600">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-innviertel-secondary mb-2">Urheberrecht</h3>
                <p className="text-gray-600">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                </p>
              </div>
            </div>
          </div>
          
          <div className="glass-panel rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-4 text-innviertel-primary">Spieleinhalt-Disclaimer</h2>
            
            <p className="text-gray-600 mb-4">
              REAL LIFE INNVIERTEL ist ein Roleplay-Server für die Modifikation FiveM für das Spiel Grand Theft Auto V. Diese Website und der Server stehen in keiner Verbindung zu Rockstar Games, Take-Two Interactive oder anderen Rechteinhabern.
            </p>
            
            <p className="text-gray-600">
              Grand Theft Auto V und alle zugehörigen Marken sind eingetragene Warenzeichen von Take-Two Interactive und/oder deren Tochtergesellschaften. FiveM ist eine Modifikation und steht in keiner Verbindung zu Rockstar Games oder Take-Two Interactive.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Impressum;
