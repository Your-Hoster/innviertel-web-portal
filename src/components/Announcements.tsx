
import { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  active: boolean;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissedAnnouncements, setDismissedAnnouncements] = useState<number[]>([]);

  useEffect(() => {
    // Load announcements from localStorage
    const savedAnnouncements = localStorage.getItem('announcements');
    if (savedAnnouncements) {
      const parsedAnnouncements = JSON.parse(savedAnnouncements);
      setAnnouncements(parsedAnnouncements.filter((a: Announcement) => a.active));
    }

    // Load dismissed announcements from localStorage
    const savedDismissed = localStorage.getItem('dismissedAnnouncements');
    if (savedDismissed) {
      setDismissedAnnouncements(JSON.parse(savedDismissed));
    }
  }, []);

  // Save dismissed announcements to localStorage
  useEffect(() => {
    localStorage.setItem('dismissedAnnouncements', JSON.stringify(dismissedAnnouncements));
  }, [dismissedAnnouncements]);

  const dismissAnnouncement = (id: number) => {
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
                {new Date(announcement.date).toLocaleDateString('de-DE')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcements;
