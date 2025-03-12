
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CookieProvider } from "@/context/CookieContext";
import { useEffect, useState } from "react";
import CookieBanner from "@/components/CookieBanner";
import Index from "./pages/Index";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./components/AdminLogin";
import Maintenance from "./components/Maintenance";

const queryClient = new QueryClient();

const App = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if site is in maintenance mode
    const checkMaintenanceMode = () => {
      const savedMaintenanceMode = localStorage.getItem('maintenanceMode');
      if (savedMaintenanceMode) {
        setMaintenanceMode(JSON.parse(savedMaintenanceMode));
      }
      setLoading(false);
    };

    checkMaintenanceMode();

    // Listen for storage events to update maintenance mode in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'maintenanceMode') {
        checkMaintenanceMode();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return null; // Return nothing during initial load to prevent flicker
  }

  // Show maintenance page for all routes except admin routes
  if (maintenanceMode && 
      !window.location.pathname.startsWith('/admin')) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <CookieProvider>
            <Toaster />
            <Sonner />
            <Maintenance />
          </CookieProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CookieProvider>
          <Toaster />
          <Sonner />
          <CookieBanner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CookieProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
