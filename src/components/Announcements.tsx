
import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from "@/integrations/supabase/client";

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  active: boolean;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    // Load dismissed announcements from localStorage
    const savedDismissed = localStorage.getItem('dismissedAnnouncements');
    if (savedDismissed) {
      setDismissedAnnouncements(JSON.parse(savedDismissed));
    }

    // Fetch announcements from Supabase
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('active', true)
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

    fetchAnnouncements();

    // Set up real-time subscription for announcements
    const channel = supabase
      .channel('public:announcements')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'announcements'
      }, () => {
        fetchAnnouncements();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Save dismissed announcements to localStorage
  useEffect(() => {
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissedAnnouncements));
  }, [dismissedAnnouncements]);

  const dismissAnnouncement = (id: string) => {
    setDismissedAnnouncements([...dismissedAnnouncements, id]);
  };

  // Filter out dismissed announcements
  const activeAnnouncements = announcements.filter(
    announcement => !dismissedAnnouncements.includes(announcement.id)
  );

  if (activeAnnouncements.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="bg-innviertel-accent/10 border border-innviertel-accent/20 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Bell className="h-5 w-5 text-innviertel-accent" />
          <h2 className="text-lg font-semibold text-innviertel-primary">Ankündigungen</h2>
        </div>
        
        <div className="space-y-4">
          {activeAnnouncements.map(announcement => (
            <div 
              key={announcement.id} 
              className="bg-white rounded-md p-4 shadow-sm relative pr-10"
            >
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 h-7 w-7 p-0"
                onClick={() => dismissAnnouncement(announcement.id)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Schließen</span>
              </Button>
              
              <h3 className="font-medium text-innviertel-primary mb-1">{announcement.title}</h3>
              <p className="text-sm text-gray-700 mb-2">{announcement.content}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(announcement.created_at).toLocaleDateString('de-DE')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
