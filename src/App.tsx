
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CookieProvider } from "@/context/CookieContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import CookieBanner from "@/components/CookieBanner";
import Announcements from "@/components/Announcements";
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
    // Check if site is in maintenance mode from Supabase
    const checkMaintenanceMode = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'maintenanceMode')
          .single();
        
        if (error) {
          console.error('Error fetching maintenance mode:', error);
          // Fallback to localStorage if Supabase fails
          const savedMaintenanceMode = localStorage.getItem('maintenanceMode');
          if (savedMaintenanceMode) {
            setMaintenanceMode(JSON.parse(savedMaintenanceMode));
          }
        } else if (data) {
          // Parse the value from Supabase
          const isMaintenanceMode = data.value === true || data.value === 'true';
          setMaintenanceMode(isMaintenanceMode);
        }
      } catch (error) {
        console.error('Error checking maintenance mode:', error);
      }
      
      setLoading(false);
    };

    checkMaintenanceMode();

    // Set up real-time subscription for site settings
    const channel = supabase
      .channel('public:site_settings')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'site_settings',
        filter: 'key=eq.maintenanceMode'
      }, payload => {
        if (payload.new) {
          const isMaintenanceMode = payload.new.value === true || payload.new.value === 'true';
          setMaintenanceMode(isMaintenanceMode);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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
            <Announcements />
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
