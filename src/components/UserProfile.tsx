
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { session, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!session) return null;

  const user = session.user;
  const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'User';
  const avatarUrl = user?.user_metadata?.avatar_url;
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Fehler",
        description: "Es gab einen Fehler bei der Abmeldung",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatarUrl || undefined} alt={username} />
        <AvatarFallback>
          <User className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium hidden md:inline">{username}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleSignOut}
        className="h-8 w-8 p-0 md:h-auto md:w-auto md:p-2 md:px-3"
      >
        <LogOut className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Abmelden</span>
      </Button>
    </div>
  );
};

export default UserProfile;
