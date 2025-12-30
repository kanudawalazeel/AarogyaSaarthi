import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
  MobileLayout,
  DashboardHeader,
  BottomNav,
  StatCard,
  SectionHeader,
} from '@/components/layout/MobileLayout';
import {
  StethoscopeIcon,
  HomeIcon,
  UsersIcon,
  ClipboardListIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  LogOutIcon,
  ChevronRightIcon,
  FileTextIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ActivityIcon,
  EyeIcon,
  PlusIcon,
} from '@/components/icons/HealthcareIcons';

const DoctorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'home' | 'patients' | 'prescriptions' | 'schedule' | 'profile'>('home');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: 'Home', isActive: activeTab === 'home', onClick: () => setActiveTab('home') },
    { icon: <UsersIcon className="w-5 h-5" />, label: 'Patients', isActive: activeTab === 'patients', onClick: () => setActiveTab('patients') },
    { icon: <ClipboardListIcon className="w-5 h-5" />, label: 'Prescriptions', isActive: activeTab === 'prescriptions', onClick: () => setActiveTab('prescriptions') },
    { icon: <CalendarIcon className="w-5 h-5" />, label: 'Schedule', isActive: activeTab === 'schedule', onClick: () => setActiveTab('schedule') },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Profile', isActive: activeTab === 'profile', onClick: () => setActiveTab('profile') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <DoctorHomeTab setActiveTab={setActiveTab} />;
      case 'patients':
        return <PatientsTab />;
      case 'prescriptions':
        return <PrescriptionsTab />;
      case 'schedule':
        return <ScheduleTab />;
      case 'profile':
        return <DoctorProfileTab onLogout={handleLogout} />;
      default:
        return <DoctorHomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <MobileLayout
      header={
        <DashboardHeader
          title={`Dr. ${user?.name?.split(' ').slice(-1)[0] || 'Doctor'}`}
          subtitle="Verified Healthcare Provider"
          avatar={
            <div className="w-11 h-11 bg-gradient-success rounded-full flex items-center justify-center shadow-md">
              <StethoscopeIcon className="w-6 h-6 text-success-foreground" />
            </div>
          }
          actions={
            <Button variant="ghost" size="icon-sm" className="relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                5
              </span>
            </Button>
          }
        />
      }
      footer={<BottomNav items={navItems} />}
    >
      <div className="px-5 py-4">
        {renderContent()}
      </div>
    </MobileLayout>
  );
};

interface DoctorHomeTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'home' | 'patients' | 'prescriptions' | 'schedule' | 'profile'>
  >;
}

const DoctorHomeTab: React.FC<DoctorHomeTabProps> = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div onClick={() => setActiveTab('patients')} className="cursor-pointer">
        <StatCard
            title="Today's Patients"
            value={8}
            icon={<UsersIcon className="w-5 h-5" />}
            color="primary"
          />
        </div>
        <div
        onClick={() => navigate('/doctor/pending-requests')}
        className="cursor-pointer">
        <StatCard
          title="Pending Requests"
          value={3}
          icon={<ClockIcon className="w-5 h-5" />}
          color="accent"/>
        </div>
        <div onClick={() => setActiveTab('prescriptions')} className="cursor-pointer">
        <StatCard
            title="Prescriptions"
            value={12}
            subtitle="This week"
            icon={<ClipboardListIcon className="w-5 h-5" />}
            color="success"
          />
        </div>
        <div onClick={() => setActiveTab('patients')} className="cursor-pointer">
        <StatCard
            title="Completed"
            value={45}
            subtitle="This month"
            icon={<CheckCircleIcon className="w-5 h-5" />}
            color="warning"
          />
        </div>
      </div>
      {/* Quick Access Patient */}
      <div>
        <SectionHeader title="Access Patient Records" />
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter Health ID"
                  className="pl-10"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                />
              </div>
              <Button
                variant="gradient"
                onClick={() => setOpen(true)}>
                  Request
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Enter patient's Health ID to request access to their records
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Access Requests */}
      <div>
        <SectionHeader 
            title="Pending Access Requests"
            action={{
            label: 'View All',
            onClick: () => navigate('/doctor/pending-requests'),
            }}
        />
        <div className="space-y-2">
          {[
            { name: 'John Doe', healthId: 'HID-2024-001234', status: 'pending', time: '2 hours ago' },
            { name: 'Sarah Smith', healthId: 'HID-2024-001235', status: 'approved', time: '1 day ago' },
          ].map((request, index) => (
            <Card
              key={index}
              variant="interactive"
              onClick={() => navigate('/doctor/pending-requests')}
              className="cursor-pointer"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">{request.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{request.name}</p>
                      <p className="text-xs text-muted-foreground">{request.healthId}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    request.status === 'pending' 
                      ? 'bg-warning/10 text-warning' 
                      : 'bg-success/10 text-success'
                  }`}>
                    {request.status === 'pending' ? 'Pending' : 'Approved'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Today's Appointments */}
      <div>
        <SectionHeader title="Today's Schedule" />
        <div className="space-y-2">
          {[
            { time: '10:00 AM', name: 'John Patient', type: 'Follow-up', status: 'completed' },
            { time: '11:30 AM', name: 'Mary Johnson', type: 'Consultation', status: 'current' },
            { time: '2:00 PM', name: 'David Brown', type: 'Check-up', status: 'upcoming' },
            { time: '4:30 PM', name: 'Lisa Wilson', type: 'Review', status: 'upcoming' },
          ].map((apt, index) => (
            <Card key={index} className={`${apt.status === 'current' ? 'border-primary border-2' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-12 rounded-full ${
                    apt.status === 'completed' ? 'bg-muted' :
                    apt.status === 'current' ? 'bg-primary' : 'bg-success'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-foreground text-sm">{apt.name}</p>
                      <span className="text-xs text-muted-foreground">{apt.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{apt.type}</p>
                  </div>
                  {apt.status === 'current' && (
                    <Button variant="soft" size="sm">Start</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Request Patient Access</DialogTitle>
    </DialogHeader>

    <Input
      placeholder="Enter Patient Health ID"
      value={patientId}
      onChange={(e) => setPatientId(e.target.value)}
    />
    <Button
      className="mt-3"
      disabled={!patientId}
      onClick={() => {
        setOpen(false);

        toast({
          title: 'Request Sent Successfully',
          description: 'Please wait for a while',
        });

        setTimeout(() => {
          toast({
            title: 'Patient Approved Request',
            description: 'Access granted to patient records',
          });

          navigate(`/doctor/patient/${patientId}`);
        }, 3000);
      }}
      >
      Request Sent
      </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
};

const PatientsTab: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState('');
  const patients = [
    { id: 1, name: 'John Doe', healthId: 'HID-2024-001234', lastVisit: 'Dec 20, 2024', condition: 'Diabetes Type 2' },
    { id: 2, name: 'Sarah Smith', healthId: 'HID-2024-001235', lastVisit: 'Dec 18, 2024', condition: 'Hypertension' },
    { id: 3, name: 'Mike Johnson', healthId: 'HID-2024-001236', lastVisit: 'Dec 15, 2024', condition: 'Annual Checkup' },
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">My Patients</h2>
          <Button
            variant="gradient"
            size="sm"
            className="gap-1"
            onClick={() => setOpen(true)}
            >
            <PlusIcon className="w-4 h-4" />
              Request Access
          </Button>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search patients..." className="pl-10" />
      </div>

      <div className="space-y-3">
        {patients.map((patient) => (
          <Card key={patient.id} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold text-lg">{patient.name[0]}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{patient.name}</p>
                  <p className="text-xs text-primary">{patient.healthId}</p>
                  <p className="text-xs text-muted-foreground mt-1">{patient.condition}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Button variant="soft" size="sm">
                    <EyeIcon className="w-4 h-4" />
                  </Button>
                  <span className="text-[10px] text-muted-foreground">{patient.lastVisit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
            <DialogTitle>Request Patient Access</DialogTitle>
        </DialogHeader>
    <Input
      placeholder="Enter Patient Health ID"
      value={patientId}
      onChange={(e) => setPatientId(e.target.value)}
    />
        <Button
      className="mt-3"
      disabled={!patientId}
      onClick={() => {
        setOpen(false);
        toast({
          title: 'Request Sent Successfully',
          description: 'Please wait for a while',
        });
        setTimeout(() => {
          toast({
            title: 'Patient Approved Request',
            description: 'Access granted to patient records',
          });
          navigate(`/doctor/patient/${patientId}`);
        }, 3000);
      }}
    >
      Request Sent
        </Button>
      </DialogContent>
    </Dialog>
    </div>
  );
};

const PrescriptionsTab: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Prescriptions</h2>
        <Button variant="gradient" size="sm" className="gap-1">
          <PlusIcon className="w-4 h-4" />
          New
        </Button>
      </div>

      <div className="space-y-3">
        {[
          { patient: 'John Doe', date: 'Dec 20, 2024', medicines: 3, status: 'active' },
          { patient: 'Sarah Smith', date: 'Dec 18, 2024', medicines: 2, status: 'active' },
          { patient: 'Mike Johnson', date: 'Dec 15, 2024', medicines: 4, status: 'completed' },
        ].map((prescription, index) => (
          <Card key={index} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <ClipboardListIcon className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{prescription.patient}</p>
                    <p className="text-xs text-muted-foreground">{prescription.date} • {prescription.medicines} medicines</p>
                  </div>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const ScheduleTab: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Schedule</h2>
        <Button variant="outline" size="sm">
          <CalendarIcon className="w-4 h-4" />
        </Button>
      </div>

      <Card variant="elevated" className="bg-gradient-success text-success-foreground">
        <CardContent className="p-4">
          <p className="text-sm text-success-foreground/80">Today's Summary</p>
          <p className="text-2xl font-bold mt-1">8 Appointments</p>
          <p className="text-sm text-success-foreground/80 mt-1">2 completed, 1 in progress, 5 upcoming</p>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {[
          { time: '10:00 - 10:30 AM', name: 'John Patient', type: 'Follow-up' },
          { time: '11:00 - 11:45 AM', name: 'Mary Johnson', type: 'Consultation' },
          { time: '2:00 - 2:30 PM', name: 'David Brown', type: 'Check-up' },
          { time: '3:00 - 3:30 PM', name: 'Emma Davis', type: 'Review' },
          { time: '4:00 - 4:30 PM', name: 'Lisa Wilson', type: 'Follow-up' },
        ].map((apt, index) => (
          <Card key={index} variant="elevated">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-center min-w-[60px]">
                  <p className="text-xs text-muted-foreground">{apt.time.split(' - ')[0]}</p>
                  <p className="text-[10px] text-muted-foreground">{apt.time.split(' ')[2]}</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm">{apt.name}</p>
                  <p className="text-xs text-muted-foreground">{apt.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

interface DoctorProfileTabProps {
  onLogout: () => void;
}

const DoctorProfileTab: React.FC<DoctorProfileTabProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card variant="elevated" className="text-center">
        <CardContent className="pt-6 pb-5">
          <div className="w-20 h-20 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <StethoscopeIcon className="w-10 h-10 text-success-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Dr. {user?.name || 'Doctor'}</h2>
          <p className="text-sm text-muted-foreground mt-1">General Medicine</p>
          <div className="inline-flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full mt-3">
            <CheckCircleIcon className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Verified Provider</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {[
          { icon: <FileTextIcon className="w-5 h-5" />, label: 'Medical License', color: 'text-primary' },
          { icon: <ActivityIcon className="w-5 h-5" />, label: 'Practice Settings', color: 'text-success' },
          { icon: <BellIcon className="w-5 h-5" />, label: 'Notifications', color: 'text-accent' },
          { icon: <SettingsIcon className="w-5 h-5" />, label: 'App Settings', color: 'text-muted-foreground' },
        ].map((item, index) => (
          <Card key={index} variant="interactive" className="p-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-muted rounded-xl flex items-center justify-center ${item.color}`}>
                  {item.icon}
                </div>
                <span className="flex-1 font-medium text-foreground">{item.label}</span>
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full gap-2 text-destructive border-destructive/30 hover:bg-destructive/10"
        onClick={onLogout}
      >
        <LogOutIcon className="w-5 h-5" />
        Sign Out
      </Button>
    </div>
  );
};

export default DoctorDashboard;