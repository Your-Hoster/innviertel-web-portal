
import { Button } from '@/components/ui/button';
import { Settings, AlertTriangle } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-innviertel-primary flex flex-col items-center justify-center text-white p-4 text-center">
      <div className="relative mb-6">
        <Settings className="h-24 w-24 animate-spin-slow text-innviertel-accent" />
        <AlertTriangle className="h-10 w-10 absolute bottom-0 right-0 text-yellow-400" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 text-innviertel-accent">Wartungsarbeiten</h1>
      <p className="text-xl max-w-lg mb-8">
        REAL LIFE INNVIERTEL ist derzeit wegen Wartungsarbeiten nicht verfügbar. Bitte versuchen Sie es später erneut.
      </p>
      <div className="bg-black/20 p-6 rounded-lg max-w-lg mb-10">
        <p className="italic">
          Wir entschuldigen uns für die Unannehmlichkeiten und danken für Ihr Verständnis.
          Unsere Techniker arbeiten mit Hochdruck daran, die Website wieder verfügbar zu machen.
        </p>
      </div>
      
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button 
          asChild
          variant="outline" 
          className="bg-transparent text-white border-white hover:bg-white/10"
        >
          <a href="https://discord.gg/spvdkNdqx9" target="_blank" rel="noopener noreferrer">
            Discord beitreten
          </a>
        </Button>
        
        <Button
          asChild
          variant="accent"
        >
          <a href="https://connect.yourhoster.at" target="_blank" rel="noopener noreferrer">
            Zum Spielserver
          </a>
        </Button>
      </div>
      
      <div className="mt-16 text-sm opacity-70">
        © {new Date().getFullYear()} REAL LIFE INNVIERTEL. Alle Rechte vorbehalten.
      </div>
    </div>
  );
};

export default Maintenance;
