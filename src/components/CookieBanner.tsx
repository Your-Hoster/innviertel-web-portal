
import React, { useState } from 'react';
import { useCookieConsent } from '@/context/CookieContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X } from 'lucide-react';

const CookieBanner: React.FC = () => {
  const { showCookieBanner, acceptAllCookies, acceptSelectedCookies, rejectAllCookies } = useCookieConsent();
  const [showDetailedSettings, setShowDetailedSettings] = useState(false);
  const [settings, setSettings] = useState({
    analytics: false,
    marketing: false,
  });

  if (!showCookieBanner) return null;

  const handleSaveSettings = () => {
    acceptSelectedCookies(settings);
    setShowDetailedSettings(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-up">
      <div className="glass-panel max-w-5xl mx-auto rounded-xl p-6 border border-innviertel-light shadow-lg">
        {!showDetailedSettings ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-lg font-semibold text-innviertel-primary mb-2">
                  Wir verwenden Cookies
                </h3>
                <p className="text-sm text-gray-600 mb-4 max-w-3xl">
                  Diese Website verwendet Cookies, um Ihr Surferlebnis zu verbessern, Analysen durchzuführen und personalisierte Inhalte anzuzeigen. Sie können Ihre Cookie-Einstellungen jederzeit anpassen.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowDetailedSettings(true)}
                className="text-innviertel-secondary border-innviertel-secondary/30 hover:bg-innviertel-light"
              >
                Einstellungen anpassen
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={rejectAllCookies}
                className="text-innviertel-secondary border-innviertel-secondary/30 hover:bg-innviertel-light"
              >
                Nur notwendige Cookies
              </Button>
              <Button 
                size="sm" 
                onClick={acceptAllCookies}
                className="bg-innviertel-primary hover:bg-innviertel-secondary text-white button-transition"
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-innviertel-primary mb-2">
                  Cookie-Einstellungen
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Passen Sie Ihre Cookie-Präferenzen an:
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowDetailedSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </Button>
            </div>
            
            <ScrollArea className="h-[250px] rounded-md border p-4">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-innviertel-primary">Notwendige Cookies</h4>
                      <p className="text-xs text-gray-500">
                        Diese Cookies sind für das Funktionieren der Website erforderlich und können nicht deaktiviert werden.
                      </p>
                    </div>
                    <Switch checked={true} disabled={true} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-innviertel-primary">Analyse-Cookies</h4>
                      <p className="text-xs text-gray-500">
                        Diese Cookies helfen uns zu verstehen, wie Besucher mit unserer Website interagieren.
                      </p>
                    </div>
                    <Switch 
                      checked={settings.analytics} 
                      onCheckedChange={(checked) => setSettings({...settings, analytics: checked})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-sm text-innviertel-primary">Marketing-Cookies</h4>
                      <p className="text-xs text-gray-500">
                        Diese Cookies werden verwendet, um Werbung relevanter für Sie zu gestalten.
                      </p>
                    </div>
                    <Switch 
                      checked={settings.marketing} 
                      onCheckedChange={(checked) => setSettings({...settings, marketing: checked})}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={rejectAllCookies}
                className="text-innviertel-secondary border-innviertel-secondary/30 hover:bg-innviertel-light"
              >
                Ablehnen
              </Button>
              <Button 
                size="sm" 
                onClick={handleSaveSettings}
                className="bg-innviertel-primary hover:bg-innviertel-secondary text-white button-transition"
              >
                Einstellungen speichern
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieBanner;
