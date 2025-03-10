
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdmin(adminToken === 'rl-innviertel-admin-token');
    };

    checkAdmin();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Startseite', path: '/' },
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutz', path: '/datenschutz' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-innviertel-primary shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white font-bold text-xl">REAL LIFE INNVIERTEL</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path}
                className="text-white hover:text-innviertel-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {isAdmin && (
              <Link 
                to="/admin"
                className="flex items-center gap-1 text-innviertel-accent hover:text-white transition-colors"
              >
                <Shield className="h-4 w-4" />
                Admin
              </Link>
            )}
            <Button 
              asChild
              className="bg-innviertel-accent hover:bg-innviertel-accent/90 text-white"
            >
              <a href="fivem://connect/connect.rl-innviertel.at">Jetzt spielen</a>
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-innviertel-primary">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className="text-white hover:text-innviertel-accent transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="flex items-center gap-1 text-innviertel-accent hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
              )}
              <Button 
                asChild
                className="bg-innviertel-accent hover:bg-innviertel-accent/90 text-white w-full mt-2"
              >
                <a href="fivem://connect/connect.rl-innviertel.at">Jetzt spielen</a>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
