
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-innviertel-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">REAL LIFE INNVIERTEL</h3>
            <p className="text-gray-300 mb-4">
              Der authentischste FiveM Roleplay Server mit Fokus auf realistische Spielerfahrung 
              und einer lebendigen Community.
            </p>
            <div className="flex space-x-4">
              <a href="https://discord.gg/example" className="text-gray-300 hover:text-white transition-colors">
                Discord
              </a>
              <a href="https://instagram.com/example" className="text-gray-300 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="https://tiktok.com/@example" className="text-gray-300 hover:text-white transition-colors">
                TikTok
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Schnelllinks</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/#server" className="text-gray-300 hover:text-white transition-colors">
                  Server Informationen
                </Link>
              </li>
              <li>
                <Link to="/#join" className="text-gray-300 hover:text-white transition-colors">
                  Wie man beitritt
                </Link>
              </li>
              <li>
                <Link to="/#rules" className="text-gray-300 hover:text-white transition-colors">
                  Serverregeln
                </Link>
              </li>
              <li>
                <Link to="/#community" className="text-gray-300 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/impressum" className="text-gray-300 hover:text-white transition-colors">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="text-gray-300 hover:text-white transition-colors">
                  Datenschutzerklärung
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    localStorage.removeItem('cookieConsent');
                    window.location.reload();
                  }}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} REAL LIFE INNVIERTEL. Alle Rechte vorbehalten. 
            <br />
            <span className="text-xs">
              Diese Website steht in keiner Verbindung zu Rockstar Games, Take-Two Interactive oder anderen Inhabern von Markenrechten.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
