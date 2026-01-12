
import { Calendar, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const upcomingEvents = [
  { id: 1, title: "Community Garden Workshop", date: "Tomorrow, 10:00 AM", location: "Green Park" },
  { id: 2, title: "Recycling Drive", date: "Saturday, 9:00 AM", location: "Community Center" },
  { id: 3, title: "Sustainable Cooking Class", date: "Next Tuesday, 6:00 PM", location: "Online" },
];

export default function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-eco-green" />
          Upcoming Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <div className="font-medium">{event.title}</div>
              <div className="text-sm text-muted-foreground">{event.date}</div>
              <div className="text-sm text-muted-foreground">{event.location}</div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm" className="ml-auto text-eco-green">
          View Calendar
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
