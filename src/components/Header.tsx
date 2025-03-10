
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Startseite', path: '/' },
    { name: 'Server', path: '/#server' },
    { name: 'Beitreten', path: '/#join' },
    { name: 'Regeln', path: '/#rules' },
    { name: 'Community', path: '/#community' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 font-bold text-innviertel-primary text-xl"
        >
          <span className="tracking-tight">REAL LIFE INNVIERTEL</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md button-transition",
                location.pathname + location.hash === item.path
                  ? "text-innviertel-accent"
                  : "text-innviertel-primary/80 hover:text-innviertel-primary hover:bg-innviertel-light/50"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button 
            asChild
            className="ml-2 bg-innviertel-primary hover:bg-innviertel-secondary button-transition"
          >
            <a href="fivem://connect/connect.rl-innviertel.at">Jetzt spielen</a>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <Button
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-4 py-3 text-sm font-medium rounded-md",
                  location.pathname + location.hash === item.path
                    ? "bg-innviertel-light/80 text-innviertel-primary"
                    : "text-innviertel-primary/80 hover:bg-innviertel-light/50 hover:text-innviertel-primary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              asChild
              className="mt-2 bg-innviertel-primary hover:bg-innviertel-secondary button-transition"
            >
              <a href="fivem://connect/connect.rl-innviertel.at">Jetzt spielen</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
