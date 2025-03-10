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
import { Shield, Bell, Settings, LogOut } from 'lucide-react';
import AdminLogin from '@/components/AdminLogin';

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  active: boolean;
}

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken === 'rl-innviertel-admin-token') {
      setIsLoggedIn(true);
    }
    
    const savedMaintenanceMode = localStorage.getItem('maintenanceMode');
    if (savedMaintenanceMode) {
      setMaintenanceMode(JSON.parse(savedMaintenanceMode));
    }
    
    const savedAnnouncements = localStorage.getItem('announcements');
    if (savedAnnouncements) {
      setAnnouncements(JSON.parse(savedAnnouncements));
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem('maintenanceMode', JSON.stringify(maintenanceMode));
  }, [maintenanceMode]);

  useEffect(() => {
    localStorage.setItem('announcements', JSON.stringify(announcements));
  }, [announcements]);

  const handleLogin = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminToken', 'rl-innviertel-admin-token');
      setIsLoggedIn(true);
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen im Admin-Bereich",
      });
    } else {
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Falsche Anmeldedaten",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    toast({
      title: "Abgemeldet",
      description: "Sie wurden erfolgreich abgemeldet",
    });
  };

  const handleMaintenanceModeToggle = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode ? "Wartungsmodus deaktiviert" : "Wartungsmodus aktiviert",
      description: maintenanceMode 
        ? "Die Website ist jetzt für alle Besucher zugänglich." 
        : "Die Website zeigt jetzt den Wartungsmodus für Besucher an.",
    });
  };

  const handleAddAnnouncement = () => {
    if (newAnnouncement.title.trim() === '' || newAnnouncement.content.trim() === '') {
      toast({
        title: "Fehler",
        description: "Titel und Inhalt der Ankündigung dürfen nicht leer sein",
        variant: "destructive",
      });
      return;
    }

    const announcement: Announcement = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      date: new Date().toISOString(),
      active: true
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: '', content: '' });
    
    toast({
      title: "Ankündigung erstellt",
      description: "Die Ankündigung wurde erfolgreich erstellt",
    });
  };

  const toggleAnnouncementStatus = (id: number) => {
    setAnnouncements(
      announcements.map(announcement => 
        announcement.id === id 
          ? { ...announcement, active: !announcement.active } 
          : announcement
      )
    );
  };

  const deleteAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(announcement => announcement.id !== id));
    toast({
      title: "Ankündigung gelöscht",
      description: "Die Ankündigung wurde erfolgreich gelöscht",
    });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
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
        
        <Tabs defaultValue="announcements" className="w-full">
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
                  <Button onClick={handleAddAnnouncement}>
                    Ankündigung erstellen
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
                              />
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => deleteAnnouncement(announcement.id)}
                              >
                                Löschen
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {announcement.content}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(announcement.date).toLocaleDateString('de-DE')}
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
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
