
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if already logged in
    const adminToken = localStorage.getItem('adminToken');
    const discordUserId = localStorage.getItem('discordUserId');
    
    if (adminToken === 'rl-innviertel-admin-token' && discordUserId === '1108408817626124439') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simple validation
    if (!username || !password) {
      setError('Bitte geben Sie Benutzername und Passwort ein');
      setIsLoading(false);
      return;
    }

    // Check if credentials match the expected Discord ID
    if (username === "admin" && password === "1108408817626124439") {
      // Store the admin token and Discord ID
      localStorage.setItem('adminToken', 'rl-innviertel-admin-token');
      localStorage.setItem('discordUserId', '1108408817626124439');
      
      toast({
        title: "Erfolgreich angemeldet",
        description: "Willkommen im Admin-Bereich",
      });
      
      navigate('/admin');
    } else {
      setError('Ungültiger Benutzername oder Passwort');
      toast({
        title: "Anmeldung fehlgeschlagen",
        description: "Ungültiger Benutzername oder Passwort",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 bg-innviertel-primary rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <CardDescription>
              Bitte melden Sie sich an, um auf den Admin-Bereich zuzugreifen
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username">Benutzername</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Benutzername eingeben" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Passwort eingeben" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  autoComplete="off"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-innviertel-primary hover:bg-innviertel-secondary"
                disabled={isLoading}
              >
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
