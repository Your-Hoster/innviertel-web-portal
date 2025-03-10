
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const JoinSection = () => {
  const steps = [
    {
      number: "01",
      title: "FiveM Client installieren",
      description: "Lade den FiveM Client von der offiziellen Website herunter und installiere ihn auf deinem PC."
    },
    {
      number: "02",
      title: "GTA V installieren",
      description: "Du benötigst eine legale Kopie von GTA V, um auf unserem Server spielen zu können."
    },
    {
      number: "03",
      title: "Discord beitreten",
      description: "Tritt unserem Discord-Server bei, um die neuesten Informationen zu erhalten und Teil unserer Community zu werden."
    },
    {
      number: "04",
      title: "Server beitreten",
      description: "Verbinde dich mit unserem Server über die FiveM-Serverliste oder direkt über die Schaltfläche 'Jetzt spielen'."
    }
  ];

  return (
    <section id="join" className="section-padding bg-gradient-innviertel">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-3 bg-white/20 text-white">Beitreten</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Wie du mitspielen kannst
          </h2>
          <p className="text-white/80">
            In wenigen Schritten kannst du Teil unserer Roleplay-Community werden und dein virtuelles Leben im Innviertel beginnen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-colors overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <span className="text-3xl font-bold text-white/40">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-white/70">{step.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="glass-panel rounded-xl p-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-2xl font-bold mb-4 text-white">Bereit zum Spielen?</h3>
            <p className="text-white/80 mb-6">
              Du kannst sofort mit dem Spielen beginnen! Klicke einfach auf die Schaltfläche unten, um dich mit unserem Server zu verbinden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild
                size="lg"
                className="bg-white text-innviertel-primary hover:bg-white/90 button-transition"
              >
                <a href="https://connect.yourhoster.at">Jetzt spielen</a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 button-transition"
              >
                <a href="https://discord.gg/example" target="_blank" rel="noopener noreferrer">
                  Discord beitreten
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
