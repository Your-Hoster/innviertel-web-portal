
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const RulesSection = () => {
  const generalRules = [
    "Respektiere alle Spieler, unabhängig von ihrer Rolle oder Position.",
    "Metagaming (Nutzung von Informationen, die dein Charakter nicht haben kann) ist verboten.",
    "Powergaming (unrealistische Handlungen oder Zwang anderer Spieler) ist nicht erlaubt.",
    "Halte dich an realistische Szenarien im Rollenspiel.",
    "Das Nutzen von Bugs oder Exploits ist strengstens untersagt.",
    "Diskriminierung oder Belästigung wird nicht toleriert.",
    "Gameplay muss aufgezeichnet werden, um bei Streitigkeiten als Beweis dienen zu können.",
    "Administratoren haben das letzte Wort bei Streitigkeiten."
  ];

  const vehicleRules = [
    "Fahre gemäß der deutschen Straßenverkehrsordnung.",
    "Respektiere Verkehrsregeln wie Geschwindigkeitsbegrenzungen und Ampeln.",
    "Kein absichtliches Rammen oder Beschädigen von Fahrzeugen ohne RP-Grund.",
    "Fahrzeuge müssen regelmäßig gewartet werden.",
    "Fahrzeugdiebstahl ist nur mit entsprechendem Roleplay erlaubt.",
    "Unrealistisches Fahren (z.B. Stunts, extremes Offroad-Fahren) ist zu vermeiden."
  ];

  const criminalRules = [
    "Kriminelle Aktivitäten müssen einen RP-Hintergrund haben.",
    "Kein Random Deathmatch (RDM) - töte niemanden ohne angemessenen RP-Grund.",
    "Kein Value of Life (VoL) - fürchte um dein Leben in gefährlichen Situationen.",
    "Banküberfälle und große Raubüberfälle sind nur zu bestimmten Zeiten erlaubt.",
    "Geiselnahmen müssen realistische Forderungen und Zeitrahmen haben.",
    "Bei Festnahme oder medizinischer Behandlung ist Kooperation erforderlich.",
    "Das Ausnutzen von Safezones ist verboten."
  ];

  const communicationRules = [
    "In-Game-Kommunikation muss realistisch sein (keine Emotes bei Bewusstlosigkeit).",
    "Funkgeräte haben begrenzte Reichweite und müssen realistisch verwendet werden.",
    "Halte dich an die Proximity-Chat-Regeln (normales Sprechen, Flüstern, Schreien).",
    "Keine Beleidigungen oder toxische Kommunikation.",
    "Sprachchats dürfen nicht missbraucht werden, um anderen Spielern das RP zu erschweren.",
    "Bei Nutzung des Notrufs müssen realistische Informationen gegeben werden."
  ];

  return (
    <section id="rules" className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-3 bg-innviertel-light text-innviertel-primary">Regeln</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Unsere Serverregeln
          </h2>
          <p className="text-gray-600">
            Um ein faires und immersives Spielerlebnis für alle zu gewährleisten, haben wir einige wichtige Regeln aufgestellt, die auf unserem Server gelten.
          </p>
        </div>

        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="general">Allgemein</TabsTrigger>
            <TabsTrigger value="vehicles">Fahrzeuge</TabsTrigger>
            <TabsTrigger value="criminal">Kriminalität</TabsTrigger>
            <TabsTrigger value="communication">Kommunikation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {generalRules.map((rule, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-innviertel-accent font-semibold">§{index + 1}.</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vehicles" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {vehicleRules.map((rule, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-innviertel-accent font-semibold">§{index + 1}.</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="criminal" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {criminalRules.map((rule, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-innviertel-accent font-semibold">§{index + 1}.</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="communication" className="animate-fade-in">
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {communicationRules.map((rule, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-innviertel-accent font-semibold">§{index + 1}.</span>
                      <span className="text-gray-700">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-10 text-center max-w-2xl mx-auto">
          <p className="text-gray-600 italic">
            Hinweis: Diese Regelliste ist nicht vollständig. Alle detaillierten Regeln findest du auf unserem Discord-Server. 
            Bei Fragen oder Unklarheiten wende dich bitte an unser Teammitglieder.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RulesSection;
