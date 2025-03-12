
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Bell, Settings, LogOut, AlertTriangle } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";

// Discord ID of the only allowed admin
const ALLOWED_DISCORD_ID = "1108408817626124439";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  active: boolean;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [discordUserId, setDiscordUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for admin token and Discord user ID
    const adminToken = localStorage.getItem('adminToken');
    const storedDiscordUserId = localStorage.getItem('discordUserId');
    
    // Only allow access if the user has the specific Discord ID
    if (adminToken === 'rl-innviertel-admin-token' && storedDiscordUserId === ALLOWED_DISCORD_ID) {
      setIsLoggedIn(true);
      setDiscordUserId(storedDiscordUserId);
      
      // Fetch data from Supabase
      fetchMaintenanceMode();
      fetchAnnouncements();
    } else {
      // If not authorized, redirect to homepage
      navigate('/');
      toast({
        title: "Zugriff verweigert",
        description: "Sie haben keine Berechtigung für den Admin-Bereich",
        variant: "destructive",
      });
    }

    window.scrollTo(0, 0);
  }, [navigate, toast]);

  // Fetch maintenance mode from Supabase
  const fetchMaintenanceMode = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'maintenanceMode')
        .single();
      
      if (error) {
        console.error('Error fetching maintenance mode:', error);
        return;
      }
      
      if (data) {
        setMaintenanceMode(data.value === true || data.value === 'true');
      }
    } catch (error) {
      console.error('Error fetching maintenance mode:', error);
    }
  };

  // Fetch announcements from Supabase
  const fetchAnnouncements = async () => {
    try {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching announcements:', error);
        return;
      }
      
      if (data) {
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
    }
  };

  // Update maintenance mode in Supabase
  const updateMaintenanceMode = async (newValue: boolean) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('site_settings')
        .update({ value: newValue })
        .eq('key', 'maintenanceMode');
      
      if (error) {
        console.error('Error updating maintenance mode:', error);
        toast({
          title: "Fehler",
          description: "Die Einstellung konnte nicht gespeichert werden",
          variant: "destructive",
        });
        return;
      }
      
      setMaintenanceMode(newValue);
      
      // Also update localStorage as a fallback
      localStorage.setItem('maintenanceMode', JSON.stringify(newValue));
      
      toast({
        title: newValue ? "Wartungsmodus aktiviert" : "Wartungsmodus deaktiviert",
        description: newValue 
          ? "Die Website zeigt jetzt den Wartungsmodus für Besucher an." 
          : "Die Website ist jetzt für alle Besucher zugänglich.",
      });
    } catch (error) {
      console.error('Error updating maintenance mode:', error);
      toast({
        title: "Fehler",
        description: "Die Einstellung konnte nicht gespeichert werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('discordUserId');
    setIsLoggedIn(false);
    navigate('/');
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet",
    });
  };

  const handleMaintenanceModeToggle = () => {
    updateMaintenanceMode(!maintenanceMode);
  };

  const handleAddAnnouncement = async () => {
    if (newAnnouncement.title.trim() === '' || newAnnouncement.content.trim() === '') {
      toast({
        title: "Fehler",
        description: "Titel und Inhalt der Ankündigung dürfen nicht leer sein",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('announcements')
        .insert({
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          active: true
        })
        .select();
      
      if (error) {
        console.error('Error adding announcement:', error);
        toast({
          title: "Fehler",
          description: "Die Ankündigung konnte nicht erstellt werden",
          variant: "destructive",
        });
        return;
      }
      
      if (data) {
        setAnnouncements([...data, ...announcements]);
        setNewAnnouncement({ title: '', content: '' });
        
        toast({
          title: "Ankündigung erstellt",
          description: "Die Ankündigung wurde erfolgreich erstellt",
        });
      }
    } catch (error) {
      console.error('Error adding announcement:', error);
      toast({
        title: "Fehler",
        description: "Die Ankündigung konnte nicht erstellt werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAnnouncementStatus = async (id: string) => {
    const announcement = announcements.find(a => a.id === id);
    if (!announcement) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ active: !announcement.active })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating announcement:', error);
        toast({
          title: "Fehler",
          description: "Der Status der Ankündigung konnte nicht geändert werden",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setAnnouncements(announcements.map(a => 
        a.id === id ? { ...a, active: !a.active } : a
      ));
      
      toast({
        title: "Status geändert",
        description: `Ankündigung wurde ${!announcement.active ? 'aktiviert' : 'deaktiviert'}`,
      });
    } catch (error) {
      console.error('Error updating announcement:', error);
      toast({
        title: "Fehler",
        description: "Der Status der Ankündigung konnte nicht geändert werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAnnouncement = async (id: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('announcements')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting announcement:', error);
        toast({
          title: "Fehler",
          description: "Die Ankündigung konnte nicht gelöscht werden",
          variant: "destructive",
        });
        return;
      }
      
      // Update local state
      setAnnouncements(announcements.filter(a => a.id !== id));
      
      toast({
        title: "Ankündigung gelöscht",
        description: "Die Ankündigung wurde erfolgreich gelöscht",
      });
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast({
        title: "Fehler",
        description: "Die Ankündigung konnte nicht gelöscht werden",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If not logged in or unauthorized, don't show login screen - just redirect
  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="container mx-auto px-4 py-8 flex-grow mt-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin-Bereich</h1>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut size={16} />
            Abmelden
          </Button>
        </div>
        
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell size={16} />
              Ankündigungen
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings size={16} />
              Einstellungen
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="announcements">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Neue Ankündigung erstellen</CardTitle>
                  <CardDescription>
                    Erstellen Sie eine neue Ankündigung, die auf der Website angezeigt wird
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titel</Label>
                    <Input 
                      id="title" 
                      value={newAnnouncement.title} 
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
                      placeholder="Titel der Ankündigung"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Inhalt</Label>
                    <Textarea 
                      id="content" 
                      value={newAnnouncement.content}
                      onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
                      placeholder="Inhalt der Ankündigung"
                      rows={5}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleAddAnnouncement}
                    disabled={isLoading}
                  >
                    {isLoading ? "Wird gespeichert..." : "Ankündigung erstellen"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Aktive Ankündigungen</CardTitle>
                  <CardDescription>
                    Verwalten Sie bestehende Ankündigungen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {announcements.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Keine Ankündigungen vorhanden
                    </p>
                  ) : (
                    <ul className="space-y-4">
                      {announcements.map(announcement => (
                        <li key={announcement.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{announcement.title}</h3>
                            <div className="flex items-center gap-2">
                              <Switch 
                                checked={announcement.active}
                                onCheckedChange={() => toggleAnnouncementStatus(announcement.id)}
                                disabled={isLoading}
                              />
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteAnnouncement(announcement.id)}
                                disabled={isLoading}
                              >
                                Löschen
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {announcement.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(announcement.created_at).toLocaleDateString('de-DE')}
                          </p>
                          <div className="flex items-center mt-2">
                            <span className={`text-xs px-2 py-1 rounded ${announcement.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                              {announcement.active ? 'Aktiv' : 'Inaktiv'}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Website-Einstellungen</CardTitle>
                <CardDescription>
                  Verwalten Sie grundlegende Einstellungen der Website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border border-yellow-300 bg-yellow-50 rounded-md p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Wartungsmodus Information</h4>
                      <p className="text-sm text-yellow-700">
                        Der Wartungsmodus sperrt alle Seiten außer den Admin-Bereich.
                        Nur Administratoren können auf die Website zugreifen, wenn dieser Modus aktiviert ist.
                      </p>
                    </div>
                  </div>
                </div>
              
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Wartungsmodus</h3>
                    <p className="text-sm text-muted-foreground">
                      Wenn aktiviert, wird Besuchern eine Wartungsseite angezeigt
                    </p>
                  </div>
                  <Switch 
                    checked={maintenanceMode}
                    onCheckedChange={handleMaintenanceModeToggle}
                    disabled={isLoading}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end border-t pt-4">
                <p className="text-xs text-muted-foreground">
                  Aktuelle Einstellung: {maintenanceMode ? "Wartungsmodus aktiv" : "Website normal erreichbar"}
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
