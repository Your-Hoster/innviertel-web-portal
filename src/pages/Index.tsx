
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServerInfo from '@/components/ServerInfo';
import JoinSection from '@/components/JoinSection';
import RulesSection from '@/components/RulesSection';
import CommunitySection from '@/components/CommunitySection';
import Announcements from '@/components/Announcements';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-32 min-h-screen flex items-center bg-hero-pattern bg-cover bg-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white backdrop-blur-sm">FiveM Roleplay Server</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
              Willkommen im <span className="text-innviertel-accent">REAL LIFE INNVIERTEL</span>
            </h1>
            <p className="text-xl text-white/80 mb-8 animate-fade-up" style={{ animationDelay: '200ms' }}>
              Tauche ein in die authentischste FiveM Roleplay-Erfahrung. Lebe dein virtuelles Leben im wunderschönen Innviertel und werde Teil unserer wachsenden Community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Button 
                asChild
                size="lg"
                className="bg-innviertel-accent hover:bg-innviertel-accent/90 text-white button-transition"
              >
                <a href="fivem://connect/connect.rl-innviertel.at">Jetzt spielen</a>
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="border-white/60 text-white hover:bg-white/10 button-transition"
              >
                <a href="#server">Mehr erfahren</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Announcements */}
      <Announcements />
      
      {/* Main Content Sections */}
      <main>
        <ServerInfo />
        <JoinSection />
        <RulesSection />
        <CommunitySection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
