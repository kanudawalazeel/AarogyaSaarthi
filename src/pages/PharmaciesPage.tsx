import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPinIcon, ChevronRightIcon } from '@/components/icons/HealthcareIcons';
import {
  MobileLayout,
  DashboardHeader,
  BottomNav,
} from '@/components/layout/MobileLayout';

import { BellIcon, HomeIcon, FileTextIcon, UsersIcon, SettingsIcon } from '@/components/icons/HealthcareIcons';
import { useAuth } from '@/contexts/AuthContext';

const dummyPharmacies = [
  { id: 1, name: 'Apollo Pharmacy', distance: 1.2 },
  { id: 2, name: 'MedPlus Store', distance: 1.8 },
  { id: 3, name: 'Wellness Forever', distance: 2.4 },
  { id: 4, name: 'CarePlus Medical', distance: 3.1 },
].sort((a, b) => a.distance - b.distance);

const PharmaciesPage: React.FC = () => {
  const { prescriptionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const navItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: 'Home', onClick: () => navigate('/patient') },
    { icon: <FileTextIcon className="w-5 h-5" />, label: 'Records', onClick: () => navigate('/patient?tab=records') },
    { icon: <BellIcon className="w-5 h-5" />, label: 'Reminders', onClick: () => navigate('/patient?tab=reminders') },
    { icon: <UsersIcon className="w-5 h-5" />, label: 'Family', onClick: () => navigate('/patient?tab=family') },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Profile', onClick: () => navigate('/patient?tab=profile') },
  ];

  return (
    <MobileLayout
    header={
    <DashboardHeader
        title={`Hello, ${user?.name?.split(' ')[0] || 'Patient'}`}
        subtitle="How are you feeling today?"
        avatar={
        <div className="w-11 h-11 bg-gradient-primary rounded-full flex items-center justify-center shadow-md">
            <span className="text-primary-foreground font-bold text-lg">
            {user?.name?.[0] || 'P'}
            </span>
        </div>
        }
        actions={
        <Button variant="ghost" size="icon-sm" className="relative">
        <BellIcon className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
        3
        </span>
        </Button>
        }
    />
    }
    footer={<BottomNav items={navItems} />}
    >
      <div className="px-5 py-4 space-y-4 animate-fade-in">
        <h2 className="text-xl font-bold text-foreground">
            Nearby Medical Stores
        </h2>
        <p className="text-sm text-muted-foreground">
          Showing results for Prescription ID:{' '}
          <span className="font-medium">{prescriptionId}</span>
        </p>
        {dummyPharmacies.map((pharmacy) => (
          <Card key={pharmacy.id} variant="interactive">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">{pharmacy.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {pharmacy.distance} km away
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        ))}
      </div>
    </MobileLayout>
  );
};
export default PharmaciesPage;
