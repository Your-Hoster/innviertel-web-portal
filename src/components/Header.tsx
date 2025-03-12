
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { useMobile } from '@/hooks/use-mobile';
import { Link, useLocation } from 'react-router-dom';
import UserProfile from '@/components/UserProfile';
import { useAuth } from '@/components/AuthProvider';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isMobile = useMobile();
  const location = useLocation();
  const { session } = useAuth();

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    setShowMobileMenu(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background/95 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-innviertel-primary">RL Innviertel</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm hover:text-innviertel-primary transition-colors ${isActive('/') ? 'text-innviertel-primary font-bold' : 'text-foreground'}`}>
              Home
            </Link>
            <Link to="/impressum" className={`text-sm hover:text-innviertel-primary transition-colors ${isActive('/impressum') ? 'text-innviertel-primary font-bold' : 'text-foreground'}`}>
              Impressum
            </Link>
            <Link to="/datenschutz" className={`text-sm hover:text-innviertel-primary transition-colors ${isActive('/datenschutz') ? 'text-innviertel-primary font-bold' : 'text-foreground'}`}>
              Datenschutz
            </Link>
          </nav>
        )}
        
        {/* Auth Actions */}
        <div className="flex items-center space-x-4">
          {session ? (
            <UserProfile />
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Anmelden
              </Button>
            </Link>
          )}
          
          {/* Mobile Menu Toggle */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="md:hidden">
              {showMobileMenu ? <X /> : <Menu />}
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobile && showMobileMenu && (
        <div className="md:hidden bg-background border-t p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className={`flex items-center p-2 ${isActive('/') ? 'text-innviertel-primary font-bold' : 'text-foreground'}`}>
              Home
            </Link>
            <Link to="/impressum" className={`flex items-center p-2 ${isActive('/impressum') ? 'text-innviertel-primary font-bold' : 'text-foreground'}`}>
              Impressum
            </Link>
            <Link to="/datenschutz" className={`flex items-center p-2 ${isActive('/datenschutz') ? 'text-innviertel-primary font-bold' : 'text-foreground'}`}>
              Datenschutz
            </Link>
            {!session && (
              <Link to="/login" className="flex items-center p-2 text-innviertel-primary">
                <LogIn className="mr-2 h-4 w-4" />
                Anmelden
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
