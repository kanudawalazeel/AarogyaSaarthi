import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, ChevronRightIcon } from '@/components/icons/HealthcareIcons';
import {
  MobileLayout,
  DashboardHeader,
} from '@/components/layout/MobileLayout';

const appointments = [
  {
    id: 1,
    doctor: 'Dr. Ananya Sharma',
    specialty: 'Cardiologist',
    date: 'Dec 29, 2024',
    time: '10:30 AM',
  },
  {
    id: 2,
    doctor: 'Dr. Rahul Mehta',
    specialty: 'General Physician',
    date: 'Jan 02, 2025',
    time: '1:00 PM',
  },
  {
    id: 3,
    doctor: 'Dr. Priya Verma',
    specialty: 'Dermatologist',
    date: 'Jan 05, 2025',
    time: '4:15 PM',
  },
];

const AppointmentsPage: React.FC = () => {
  return (
    <MobileLayout
      header={
        <DashboardHeader
          title="Upcoming Appointments"
          subtitle="Your scheduled doctor visits"
        />
      }
    >
      <div className="px-5 py-4 space-y-4 animate-fade-in">
        {appointments.map((appt) => (
          <Card key={appt.id} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-6 h-6 text-success" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {appt.doctor}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {appt.specialty}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {appt.date} • {appt.time}
                  </p>
                </div>

                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
};
console.log("AppointmentsPage loaded", AppointmentsPage);
export default AppointmentsPage;