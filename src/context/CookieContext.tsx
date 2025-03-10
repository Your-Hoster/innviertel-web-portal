
import React, { createContext, useState, useContext, useEffect } from 'react';

type CookieConsentType = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
} | null;

interface CookieContextType {
  cookieConsent: CookieConsentType;
  showCookieBanner: boolean;
  setShowCookieBanner: (show: boolean) => void;
  acceptAllCookies: () => void;
  acceptSelectedCookies: (consent: Omit<CookieConsentType, 'necessary'>) => void;
  rejectAllCookies: () => void;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export const CookieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState<CookieConsentType>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if the user has already given consent
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent) {
      setCookieConsent(JSON.parse(storedConsent));
      setShowCookieBanner(false);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAllCookies = () => {
    const fullConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setCookieConsent(fullConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(fullConsent));
    setShowCookieBanner(false);
  };

  const acceptSelectedCookies = (selected: Omit<CookieConsentType, 'necessary'>) => {
    if (!selected) return;
    
    const consent = {
      necessary: true, // Necessary cookies are always required
      analytics: !!selected.analytics,
      marketing: !!selected.marketing,
    };
    
    setCookieConsent(consent);
    localStorage.setItem('cookieConsent', JSON.stringify(consent));
    setShowCookieBanner(false);
  };

  const rejectAllCookies = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setCookieConsent(minimalConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent));
    setShowCookieBanner(false);
  };

  return (
    <CookieContext.Provider
      value={{
        cookieConsent,
        showCookieBanner,
        setShowCookieBanner,
        acceptAllCookies,
        acceptSelectedCookies,
        rejectAllCookies,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
};
