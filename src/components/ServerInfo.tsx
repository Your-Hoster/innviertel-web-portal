
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ServerInfo = () => {
  const features = [
    {
      title: "Realistische Wirtschaft",
      description: "Ein ausgeklügeltes Wirtschaftssystem mit realistischen Jobs, Steuern und Unternehmensführung."
    },
    {
      title: "Immobiliensystem",
      description: "Kaufe und gestalte dein eigenes Zuhause, investiere in Gewerbeimmobilien und baue dein Imperium auf."
    },
    {
      title: "Fraktionssystem",
      description: "Tritt einer der vielen Fraktionen bei, von der Polizei und Rettungsdienst bis hin zu kriminellen Organisationen."
    },
    {
      title: "Jobsystem",
      description: "Vielfältige legale und illegale Beschäftigungsmöglichkeiten, um deinen Lebensunterhalt zu verdienen."
    },
    {
      title: "Fahrzeugsystem",
      description: "Realistische Fahrzeugmechanik mit Wartung, Tuning und individuellem Fahrzeugbesitz."
    },
    {
      title: "Events",
      description: "Regelmäßige Server-Events und Community-Veranstaltungen für abwechslungsreiches Gameplay."
    }
  ];

  return (
    <section id="server" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-3 bg-innviertel-light text-innviertel-primary">Server</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Entdecke REAL LIFE INNVIERTEL
          </h2>
          <p className="text-gray-600">
            Tauche ein in unsere authentische Rollenspielwelt und erlebe das Innviertel wie nie zuvor. Unser Server bietet eine Vielzahl an Möglichkeiten für dein individuelles Roleplay-Erlebnis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-panel hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-innviertel-primary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 glass-panel rounded-xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-4xl font-bold text-innviertel-accent mb-2">100+</h3>
              <p className="text-gray-600">Spielerslots</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-innviertel-accent mb-2">50+</h3>
              <p className="text-gray-600">Einzigartige Jobs</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-innviertel-accent mb-2">24/7</h3>
              <p className="text-gray-600">Online Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServerInfo;
