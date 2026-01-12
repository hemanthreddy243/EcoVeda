import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Video, Calendar, Pill, Clock, User, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  specialty: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}

interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: string[];
  rating: number;
  image: string;
}

export default function Telemedicine() {
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  const [user, setUser] = useState<any>(null);
  const [appointments] = useState<Appointment[]>([
    {
      id: '1',
      date: '2024-02-10',
      time: '10:00 AM',
      doctor: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      status: 'scheduled',
      notes: 'Follow-up consultation',
    },
    {
      id: '2',
      date: '2024-02-15',
      time: '2:30 PM',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      status: 'scheduled',
    },
  ]);

  const [prescriptions] = useState<Prescription[]>([
    {
      id: '1',
      date: '2024-02-01',
      doctor: 'Dr. Sarah Johnson',
      medication: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '7 days',
      notes: 'Take with food',
    },
    {
      id: '2',
      date: '2024-01-15',
      doctor: 'Dr. Michael Chen',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
    },
  ]);

  const [doctors] = useState<Doctor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialty: 'General Medicine',
      availability: ['Mon', 'Wed', 'Fri'],
      rating: 4.8,
      image: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      specialty: 'Cardiology',
      availability: ['Tue', 'Thu', 'Sat'],
      rating: 4.9,
      image: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: '3',
      name: 'Dr. Emily Brown',
      specialty: 'Pediatrics',
      availability: ['Mon', 'Tue', 'Wed'],
      rating: 4.7,
      image: 'https://i.pravatar.cc/150?img=3',
    },
  ]);

  const [newAppointment, setNewAppointment] = useState({
    date: '',
    time: '',
    doctor: '',
    specialty: '',
    notes: '',
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const scheduleAppointment = async () => {
    const { error } = await supabase
      .from('appointments')
      .insert({
        user_id: user?.id,
        ...newAppointment,
        status: 'scheduled',
      });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule appointment.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Appointment scheduled successfully.',
      });
      setNewAppointment({
        date: '',
        time: '',
        doctor: '',
        specialty: '',
        notes: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {appointments.filter(a => a.status === 'scheduled').length}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Next: {appointments[0]?.date} at {appointments[0]?.time}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prescriptions.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Last updated: {prescriptions[0]?.date}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Doctors</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{doctors.length}</div>
            <p className="text-xs text-muted-foreground mt-2">
              Across {new Set(doctors.map(d => d.specialty)).size} specialties
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select
                value={newAppointment.specialty}
                onValueChange={(value) => setNewAppointment({ ...newAppointment, specialty: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select specialty" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(doctors.map(d => d.specialty))).map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Select
                value={newAppointment.doctor}
                onValueChange={(value) => setNewAppointment({ ...newAppointment, doctor: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors
                    .filter(d => d.specialty === newAppointment.specialty)
                    .map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.name}>
                        {doctor.name} ({doctor.rating} ★)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                placeholder="Any specific concerns or requirements"
              />
            </div>
            <div className="flex justify-end">
              <Button onClick={scheduleAppointment}>Schedule Appointment</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments
              .filter(a => a.status === 'scheduled')
              .map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start gap-4 p-4 rounded-lg border border-border"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{appointment.doctor}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {appointment.specialty}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {appointment.date} at {appointment.time}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Video className="w-4 h-4 mr-2" />
                          Join Call
                        </Button>
                      </div>
                    </div>
                    {appointment.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">{appointment.notes}</p>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Prescriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Pill className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{prescription.medication}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Prescribed by {prescription.doctor}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{prescription.dosage}</div>
                      <div className="text-sm text-muted-foreground">
                        {prescription.frequency} for {prescription.duration}
                      </div>
                    </div>
                  </div>
                  {prescription.notes && (
                    <p className="mt-2 text-sm text-muted-foreground">{prescription.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Doctors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex flex-col items-center p-4 rounded-lg border border-border"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-24 h-24 rounded-full mb-4"
                />
                <h3 className="font-medium text-center">{doctor.name}</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  {doctor.specialty}
                </p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1 text-sm">{doctor.rating}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {doctor.availability.map((day) => (
                    <span
                      key={day}
                      className="px-2 py-1 bg-secondary/10 text-secondary rounded-full text-sm"
                    >
                      {day}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-4">
                  <Phone className="w-4 h-4 mr-2" />
                  Book Consultation
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 