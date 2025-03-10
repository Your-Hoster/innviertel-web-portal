
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-innviertel-primary flex flex-col items-center justify-center text-white p-4 text-center">
      <Settings className="h-20 w-20 mb-6 animate-spin-slow" />
      <h1 className="text-4xl font-bold mb-4">Wartungsarbeiten</h1>
      <p className="text-xl max-w-lg mb-8">
        REAL LIFE INNVIERTEL ist derzeit wegen Wartungsarbeiten nicht verfügbar. Bitte versuchen Sie es später erneut.
      </p>
      <p className="mb-10">
        Wir entschuldigen uns für die Unannehmlichkeiten und danken für Ihr Verständnis.
      </p>
      <Button 
        asChild
        variant="outline" 
        className="bg-transparent text-white border-white hover:bg-white/10"
      >
        <a href="https://discord.gg/innviertel" target="_blank" rel="noopener noreferrer">
          Discord beitreten
        </a>
      </Button>
      
      <div className="mt-16 text-sm opacity-70">
        © {new Date().getFullYear()} REAL LIFE INNVIERTEL. Alle Rechte vorbehalten.
      </div>
    </div>
  );
};

export default Maintenance;
