
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tab } from '@headlessui/react';
import { cn } from '@/lib/utils';

const CommunitySection = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  
  const testimonials = [
    {
      name: "Max",
      role: "Polizeibeamter",
      quote: "Seit ich dem Server beigetreten bin, erlebe ich jeden Tag neue spannende Rollenspiel-Situationen. Die Community ist freundlich und hilfsbereit, vor allem für Neueinsteiger.",
      image: "/placeholder.svg"
    },
    {
      name: "Lisa",
      role: "Unternehmerin",
      quote: "Als Inhaberin mehrerer Geschäfte im Innviertel schätze ich besonders das realistische Wirtschaftssystem. Man kann wirklich sein eigenes Imperium aufbauen!",
      image: "/placeholder.svg"
    },
    {
      name: "Tim",
      role: "Mechaniker",
      quote: "Die Fahrzeugmechanik auf diesem Server ist unglaublich detailliert. Als Autoliebhaber genieße ich es, Fahrzeuge zu reparieren und zu tunen.",
      image: "/placeholder.svg"
    }
  ];
  
  const events = [
    {
      title: "Stadtfest Ried",
      date: "Jeden letzten Samstag im Monat",
      description: "Ein großes Fest mit Musik, Essen und verschiedenen Aktivitäten im Stadtzentrum von Ried im Innkreis."
    },
    {
      title: "Autorennen",
      date: "Jeden Freitag, 20 Uhr",
      description: "Legale Rennveranstaltungen auf unserer Rennstrecke. Melde dich an und zeige dein Können!"
    },
    {
      title: "Jobmesse",
      date: "Jeden ersten Sonntag im Monat",
      description: "Lerne die verschiedenen Berufe kennen und finde deinen Traumjob im Innviertel."
    }
  ];

  return (
    <section id="community" className="section-padding">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="mb-3 bg-innviertel-light text-innviertel-primary">Community</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-gradient">
            Unsere lebendige Gemeinschaft
          </h2>
          <p className="text-gray-600">
            REAL LIFE INNVIERTEL ist mehr als nur ein Server - es ist eine Gemeinschaft von Gleichgesinnten, 
            die gemeinsam eine lebendige und immersive Welt erschaffen.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tab.Group 
            selectedIndex={selectedTab} 
            onChange={setSelectedTab}
          >
            <Tab.List className="flex rounded-xl bg-innviertel-light/30 p-1 mb-8">
              <Tab
                className={({ selected }) =>
                  cn(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-innviertel-primary focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-innviertel-primary'
                      : 'text-innviertel-primary/70 hover:bg-white/[0.12] hover:text-innviertel-primary'
                  )
                }
              >
                Spielerstimmen
              </Tab>
              <Tab
                className={({ selected }) =>
                  cn(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-innviertel-primary focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow text-innviertel-primary'
                      : 'text-innviertel-primary/70 hover:bg-white/[0.12] hover:text-innviertel-primary'
                  )
                }
              >
                Events
              </Tab>
            </Tab.List>
            
            <Tab.Panels className="mt-2">
              <Tab.Panel className={cn('rounded-xl p-3', 'ring-white ring-opacity-60 focus:outline-none')}>
                <div className="grid gap-6">
                  {testimonials.map((testimonial, idx) => (
                    <Card key={idx} className="glass-panel overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                          <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-innviertel-light">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-gray-600 italic mb-4">{testimonial.quote}</p>
                            <div>
                              <h4 className="text-innviertel-primary font-semibold">{testimonial.name}</h4>
                              <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </Tab.Panel>
              
              <Tab.Panel className={cn('rounded-xl p-3', 'ring-white ring-opacity-60 focus:outline-none')}>
                <div className="grid gap-6">
                  {events.map((event, idx) => (
                    <Card key={idx} className="glass-panel overflow-hidden">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-innviertel-primary mb-2">{event.title}</h3>
                        <p className="text-sm text-innviertel-accent font-medium mb-3">{event.date}</p>
                        <p className="text-gray-600">{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-600">
                    Weitere Events und Ankündigungen findest du auf unserem Discord-Server.
                  </p>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
