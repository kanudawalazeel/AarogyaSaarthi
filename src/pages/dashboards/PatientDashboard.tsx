import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import {
  MobileLayout,
  DashboardHeader,
  BottomNav,
  StatCard,
  QuickAction,
  SectionHeader,
} from '@/components/layout/MobileLayout';
import {
  HeartPulseIcon,
  HealthIdIcon,
  ClipboardListIcon,
  BellIcon,
  MapPinIcon,
  SettingsIcon,
  LogOutIcon,
  HomeIcon,
  PlusIcon,
  CalendarIcon,
  FileTextIcon,
  ActivityIcon,
  UsersIcon,
  PillIcon,
  ChevronRightIcon,
  QrCodeIcon,
} from '@/components/icons/HealthcareIcons';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const AddRecordDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onAdd: (record: {
    title: string;
    type: string;
    date: string;
    isPublic: boolean;
  }) => void;
}> = ({ open, onClose, onAdd }) => {

  const { toast } = useToast();

  const [newRecord, setNewRecord] = useState({
    title: "",
    type: "",
    date: "",
    isPublic: false,
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Health Record</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Record Title</Label>
            <Input
              placeholder="e.g. Blood Test Report"
              value={newRecord.title}
              onChange={(e) =>
                setNewRecord({ ...newRecord, title: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Record Type</Label>
            <Input
              placeholder="Lab Report / Prescription / Vaccination"
              value={newRecord.type}
              onChange={(e) =>
                setNewRecord({ ...newRecord, type: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={newRecord.date}
              onChange={(e) =>
                setNewRecord({ ...newRecord, date: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              checked={newRecord.isPublic}
              onCheckedChange={(checked) =>
                setNewRecord({ ...newRecord, isPublic: checked })
              }
            />
            <span className="text-sm">
              {newRecord.isPublic ? "Public" : "Private"}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="gradient"
            onClick={() => {
            onAdd(newRecord);
            onClose();
            toast({
            title: "Record added successfully",
            description: "Your health record has been saved.",
          });
          }}
          >
            Save Record
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PatientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<
  'home' | 'records' | 'appointments' | 'reminders' | 'family' | 'profile'
>('home');
const [records, setRecords] = useState([
  { id: 1, title: 'Blood Test Report', date: 'Dec 20, 2024', type: 'lab_report', isPublic: false },
  { id: 2, title: 'COVID-19 Vaccination', date: 'Dec 15, 2024', type: 'vaccination', isPublic: true },
  { id: 3, title: 'Diabetes Medication', date: 'Dec 10, 2024', type: 'prescription', isPublic: false },
  { id: 4, title: 'Annual Checkup', date: 'Nov 28, 2024', type: 'lab_report', isPublic: true },
  { id: 5, title: 'Flu Shot', date: 'Nov 15, 2024', type: 'vaccination', isPublic: true },
]);
const handleAddRecord = (record: {
  title: string;
  type: string;
  date: string;
  isPublic: boolean;
}) => {
  setRecords((prev) => [
    {
      id: Date.now(),
      ...record,
      type: record.type.toLowerCase().replace(/\s+/g, '_'),
    },
    ...prev,
  ]);
};
  const [openAddRecord, setOpenAddRecord] = useState(false);
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: 'Home', isActive: activeTab === 'home', onClick: () => setActiveTab('home') },
    { icon: <FileTextIcon className="w-5 h-5" />, label: 'Records', isActive: activeTab === 'records', onClick: () => setActiveTab('records') },
    { icon: <BellIcon className="w-5 h-5" />, label: 'Reminders', badge: 3, isActive: activeTab === 'reminders', onClick: () => setActiveTab('reminders') },
    { icon: <UsersIcon className="w-5 h-5" />, label: 'Family', isActive: activeTab === 'family', onClick: () => setActiveTab('family') },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Profile', isActive: activeTab === 'profile', onClick: () => setActiveTab('profile') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
         <HomeTab
          goToRecords={() => setActiveTab('records')}
          goToAppointments={() => setActiveTab('appointments')}
          goToReminders={() => setActiveTab('reminders')}
          />
        );
      case 'records':
        return (
          <RecordsTab
          records={records}
          setRecords={setRecords}
          onAddRecord={() => setOpenAddRecord(true)}
          />
        );
      case 'appointments':
        return <AppointmentsTab />;
      case 'reminders':
        return <RemindersTab />;
      case 'family':
        return <FamilyTab />;
      case 'profile':
        return <ProfileTab onLogout={handleLogout} />;
      default:
        return <HomeTab
        goToRecords={() => setActiveTab('records')}
        goToAppointments={() => setActiveTab('appointments')}
        goToReminders={() => setActiveTab('reminders')}
        />;
        } 
      };
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
      <div className="px-5 py-4">
        {renderContent()}
      </div>
      <AddRecordDialog
      open={openAddRecord}
      onClose={() => setOpenAddRecord(false)}
      onAdd={handleAddRecord}
      />
    </MobileLayout>
  );
};

interface HomeTabProps {
  goToRecords: () => void;
  goToAppointments: () => void;
  goToReminders: () => void;
}

const HomeTab: React.FC<HomeTabProps> = ({
  goToRecords,
  goToAppointments,
  goToReminders,
}) => {

  const healthId = 'HID-2024-001234';
  const navigate = useNavigate();
  const [openPharmacyDialog, setOpenPharmacyDialog] = useState(false);
  const [prescriptionId, setPrescriptionId] = useState('');
  const { toast } = useToast();
  const [openAddRecord, setOpenAddRecord] = useState(false);

const [newRecord, setNewRecord] = useState({
  title: "",
  type: "",
  date: "",
  isPublic: false,
});

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Health ID Card */}
      <Card className="bg-gradient-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-5 relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <HealthIdIcon className="w-5 h-5" />
              <span className="text-sm font-medium text-primary-foreground/80">Digital Health ID</span>
            </div>
            <p className="text-2xl font-bold tracking-wider mb-2">{healthId}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-primary-foreground/70">Your unified health identity</span>
              <Button variant="secondary" size="sm" className="gap-1">
                <QrCodeIcon className="w-4 h-4" />
                Show QR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div onClick={goToRecords} className="cursor-pointer">
         <StatCard
          title="Records"
          value={12}
          icon={<FileTextIcon className="w-5 h-5" />}
          color="primary"
          />
        </div>
        <div
        onClick={goToAppointments}
        className="cursor-pointer"
        >
        <StatCard
        title="Upcoming Appointments"
        value={3}
        icon={<CalendarIcon className="w-5 h-5" />}
        color="success"
        />
      </div>
    </div>

      {/* Quick Actions */}
      <div>
        <SectionHeader title="Quick Actions" />
        <div className="grid grid-cols-4 gap-2">
          <QuickAction
          icon={<PlusIcon className="w-5 h-5 text-primary" />}
          label="Add Record"
          color="primary"
          onClick={() => setOpenAddRecord(true)}
          />
          <QuickAction
          icon={<MapPinIcon className="w-5 h-5 text-success" />}
          label="Pharmacies"
          color="success"
          onClick={() => setOpenPharmacyDialog(true)}
          />  
          <QuickAction
            icon={<PillIcon className="w-5 h-5 text-accent" />}
            label="Medicines"
            color="accent"
            onClick={goToReminders}
          />
          <QuickAction
            icon={<ActivityIcon className="w-5 h-5 text-warning" />}
            label="Vitals"
            color="warning"
          />
        </div>
      </div>

      {/* Health Alert */}
      <Card className="bg-warning/10 border-warning/30">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <BellIcon className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">Health Alert</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Seasonal flu cases increasing in your area. Consider getting vaccinated.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Records */}
      <div>
        <SectionHeader 
          title="Recent Records" 
          action={{ label: 'View All', onClick: goToRecords }}
        />

        <div className="space-y-2">
          {[
            { title: 'Blood Test Report', date: 'Dec 20, 2024', type: 'Lab Report', isPublic: false },
            { title: 'Vaccination Record', date: 'Dec 15, 2024', type: 'Vaccination', isPublic: true },
            { title: 'Prescription', date: 'Dec 10, 2024', type: 'Prescription', isPublic: false },
          ].map((record, index) => (
            <Card key={index} variant="interactive" className="p-0">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FileTextIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{record.title}</p>
                      <p className="text-xs text-muted-foreground">{record.date} • {record.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${record.isPublic ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                      {record.isPublic ? 'Public' : 'Private'}
                    </span>
                    <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Government Schemes */}
      <div>
        <SectionHeader title="Healthcare Schemes" />
        <Card variant="elevated" className="bg-success/5 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <HeartPulseIcon className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-sm">Ayushman Bharat</h3>
                <p className="text-xs text-mute d-foreground mt-0.5">
                  Free healthcare up to ₹5 lakhs per family
                </p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={openAddRecord} onOpenChange={setOpenAddRecord}>
    <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Health Record</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <Label>Record Title</Label>
        <Input
          placeholder="e.g. Blood Test Report"
          value={newRecord.title}
          onChange={(e) =>
            setNewRecord({ ...newRecord, title: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Record Type</Label>
        <Input
          placeholder="Lab Report / Prescription / Vaccination"
          value={newRecord.type}
          onChange={(e) =>
            setNewRecord({ ...newRecord, type: e.target.value })
          }
        />
      </div>

      <div>
        <Label>Date</Label>
        <Input
          type="date"
          value={newRecord.date}
          onChange={(e) =>
            setNewRecord({ ...newRecord, date: e.target.value })
          }
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          checked={newRecord.isPublic}
          onCheckedChange={(checked) =>
            setNewRecord({ ...newRecord, isPublic: checked })
          }
        />
        <span className="text-sm">
          {newRecord.isPublic ? "Public" : "Private"}
        </span>
      </div>
    </div>

    <DialogFooter>
      <Button
        variant="gradient"
        onClick={() => {
          setOpenAddRecord(false);
          toast({
            title: "Record added successfully",
            description: "Your health record has been saved.",
          });
        }}
      >
        Save Record
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
<Dialog open={openPharmacyDialog} onOpenChange={setOpenPharmacyDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Enter Prescription ID</DialogTitle>
    </DialogHeader>

    <Input
      placeholder="Prescription ID"
      value={prescriptionId}
      onChange={(e) => setPrescriptionId(e.target.value)}
    />

    <DialogFooter>
      <Button
        onClick={() => {
          if (!prescriptionId) return;
          setOpenPharmacyDialog(false);
          navigate(`/pharmacies/${prescriptionId}`);
        }}
      >
        Continue
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
</div>
);
};

const RecordsTab: React.FC<{
  records: any[];
  setRecords: React.Dispatch<React.SetStateAction<any[]>>;
  onAddRecord: () => void;
}> = ({ records, setRecords, onAddRecord }) => {

  const [activeFilter, setActiveFilter] = useState<'all' | 'lab_report' | 'prescription' | 'vaccination'>('all');
  const filteredRecords =
  activeFilter === 'all'
    ? records
    : records.filter((record) => record.type === activeFilter);

  const toggleRecordPrivacy = (id: number) => {
  setRecords((prevRecords) =>
    prevRecords.map((record) =>
      record.id === id
        ? { ...record, isPublic: !record.isPublic }
        : record
    )
  );
};

  const typeIcons: Record<string, React.ReactNode> = {
    lab_report: <ActivityIcon className="w-5 h-5 text-primary" />,
    vaccination: <HeartPulseIcon className="w-5 h-5 text-success" />,
    prescription: <ClipboardListIcon className="w-5 h-5 text-accent" />,
  };

  const typeColors: Record<string, string> = {
    lab_report: 'bg-primary/10',
    vaccination: 'bg-success/10',
    prescription: 'bg-accent/10',
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Health Records</h2>
        <Button
        variant="gradient"
        size="sm"
        onClick={onAddRecord}
        >
        <PlusIcon className="w-4 h-4" />
        Upload
        </Button>

      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
  <Button
    size="sm"
    variant={activeFilter === 'all' ? 'default' : 'outline'}
    onClick={() => setActiveFilter('all')}
  >
    All
  </Button>

  <Button
    size="sm"
    variant={activeFilter === 'lab_report' ? 'default' : 'outline'}
    onClick={() => setActiveFilter('lab_report')}
  >
    Lab Reports
  </Button>

  <Button
    size="sm"
    variant={activeFilter === 'prescription' ? 'default' : 'outline'}
    onClick={() => setActiveFilter('prescription')}
  >
    Prescriptions
  </Button>

  <Button
    size="sm"
    variant={activeFilter === 'vaccination' ? 'default' : 'outline'}
    onClick={() => setActiveFilter('vaccination')}
  >
    Vaccinations
  </Button>
</div>


      {/* Records List */}
      <div className="space-y-3">
        {filteredRecords.map((record) => (
          <Card key={record.id} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${typeColors[record.type]} rounded-xl flex items-center justify-center`}>
                  {typeIcons[record.type]}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{record.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{record.date}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Switch
                    checked={record.isPublic}
                    onCheckedChange={() => toggleRecordPrivacy(record.id)}
                  />      
                  <span className="text-[10px] text-muted-foreground">
                    {record.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
const AppointmentsTab: React.FC = () => {
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

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground">
        Upcoming Appointments
      </h2>

      {appointments.map((appt) => (
        <Card key={appt.id} variant="interactive">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
              <CalendarIcon className="w-6 h-6 text-success" />
            </div>

            <div className="flex-1">
              <p className="font-semibold">{appt.doctor}</p>
              <p className="text-sm text-muted-foreground">{appt.specialty}</p>
              <p className="text-xs text-muted-foreground">
                {appt.date} • {appt.time}
              </p>
            </div>

            <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
const AddReminderDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onAdd: (reminder: any) => void;
}> = ({ open, onClose, onAdd }) => {
  const { toast } = useToast();

  const [type, setType] = useState<'medicine' | 'appointment' | 'vaccination'>(
    'medicine'
  );

  const [form, setForm] = useState<any>({});

  const handleAdd = () => {
    onAdd({
      id: Date.now(),
      type,
      ...form,
      enabled: true,
    });

    setForm({});
    onClose();

    toast({
      title: 'Reminder added successfully',
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Reminder</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* TYPE SELECT */}
          <div>
            <Label>Reminder Type</Label>
            <select
              className="w-full border rounded-md p-2"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="medicine">Prescription</option>
              <option value="appointment">Appointment</option>
              <option value="vaccination">Vaccination</option>
            </select>
          </div>

          {/* MEDICINE */}
          {type === 'medicine' && (
            <>
              <Input
                placeholder="Medicine Name"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              <Input
                placeholder="Dose"
                onChange={(e) =>
                  setForm({ ...form, dose: e.target.value })
                }
              />
              <Input
                placeholder="Time"
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </>
          )}

          {/* APPOINTMENT */}
          {type === 'appointment' && (
            <>
              <Input
                placeholder="Doctor Name"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              <Input
                type="date"
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
              <Input
                type="time"
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </>
          )}

          {/* VACCINATION */}
          {type === 'vaccination' && (
            <>
              <Input
                placeholder="Vaccine Name"
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />
              <Input
                type="date"
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
              />
              <Input
                type="time"
                onChange={(e) =>
                  setForm({ ...form, time: e.target.value })
                }
              />
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="gradient" onClick={handleAdd}>
            Add Reminder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RemindersTab: React.FC = () => {
 const [reminders, setReminders] = useState([
    { id: 1, title: 'Take Metformin', time: '8:00 AM', type: 'medicine', enabled: true },
    { id: 2, title: 'Blood pressure check', time: '9:00 AM', type: 'medicine', enabled: true },
    { id: 3, title: 'Dr. Smith Appointment', time: 'Dec 28, 2:00 PM', type: 'appointment', enabled: true },
    { id: 4, title: 'Flu vaccination due', time: 'Dec 30', type: 'vaccination', enabled: false },
  ]);
  const [openAddReminder, setOpenAddReminder] = useState(false);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Reminders</h2>
        <Button
          variant="gradient"
          size="sm"
          className="gap-1"
          onClick={() => setOpenAddReminder(true)}
          >
          <PlusIcon className="w-4 h-4" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => (
          <Card key={reminder.id} variant="elevated">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    reminder.type === 'medicine' ? 'bg-primary/10' :
                    reminder.type === 'appointment' ? 'bg-success/10' : 'bg-accent/10'
                  }`}>
                    {reminder.type === 'medicine' ? <PillIcon className="w-5 h-5 text-primary" /> :
                     reminder.type === 'appointment' ? <CalendarIcon className="w-5 h-5 text-success" /> :
                     <HeartPulseIcon className="w-5 h-5 text-accent" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{reminder.title}</p>
                    <p className="text-xs text-muted-foreground">{reminder.time}</p>
                  </div>
                </div>
                <Switch checked={reminder.enabled} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AddReminderDialog
        open={openAddReminder}
        onClose={() => setOpenAddReminder(false)}
        onAdd={(reminder) =>
        setReminders((prev) => [...prev, reminder])
        }
      />
    </div>
  );
};

const AddFamilyDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onAdd: (member: {
    name: string;
    relationship: string;
    healthId: string;
  }) => void;
}> = ({ open, onClose, onAdd }) => {

  const { toast } = useToast();

  const [form, setForm] = useState({
    name: '',
    relationship: '',
    healthId: '',
  });

  const resetForm = () => {
    setForm({ name: '', relationship: '', healthId: '' });
  };

const handleSubmit = () => {
  onAdd(form);
  onClose();
  resetForm();
  toast({
    title: 'Family member added successfully',
  });
};

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Family Member</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Full Name</Label>
            <Input
              placeholder="e.g. Sarah Patient"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <Label>Relationship</Label>
            <Input
              placeholder="Spouse / Son / Daughter / Parent"
              value={form.relationship}
              onChange={(e) => setForm({ ...form, relationship: e.target.value })}
            />
          </div>

          <div>
            <Label>Health ID</Label>
            <Input
              placeholder="HID-2024-001235"
              value={form.healthId}
              onChange={(e) => setForm({ ...form, healthId: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="gradient" onClick={handleSubmit}>
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const FamilyTab: React.FC = () => {
 const [familyMembers, setFamilyMembers] = useState([
  { id: 1, name: 'Sarah Patient', relationship: 'Spouse', healthId: 'HID-2024-001235' },
  { id: 2, name: 'Tom Patient', relationship: 'Son', healthId: 'HID-2024-001236' },
]);

const [openAddFamily, setOpenAddFamily] = useState(false);


  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Family Members</h2>
        <Button
          variant="gradient"
          size="sm"
          className="gap-1"
          onClick={() => setOpenAddFamily(true)}
          >
          <PlusIcon className="w-4 h-4" />
          Add
        </Button>
      </div>

      <div className="space-y-3">
        {familyMembers.map((member) => (
          <Card key={member.id} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {member.name[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.relationship}</p>
                  <p className="text-xs text-primary mt-1">{member.healthId}</p>
                </div>
                <ChevronRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <AddFamilyDialog
        open={openAddFamily}
        onClose={() => setOpenAddFamily(false)}
        onAdd={(member) =>
        setFamilyMembers((prev) => [
        ...prev,
      {
        id: Date.now(),
        ...member,
      },
      ])
      }
    />
    </div>
  );
};

interface ProfileTabProps {
  onLogout: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ onLogout }) => {
  const { user } = useAuth();

  const menuItems = [
    { icon: <HealthIdIcon className="w-5 h-5" />, label: 'Health ID Settings', color: 'text-primary' },
    { icon: <FileTextIcon className="w-5 h-5" />, label: 'Privacy Controls', color: 'text-success' },
    { icon: <BellIcon className="w-5 h-5" />, label: 'Notifications', color: 'text-accent' },
    { icon: <UsersIcon className="w-5 h-5" />, label: 'Emergency Access', color: 'text-warning' },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'App Settings', color: 'text-muted-foreground' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Card */}
      <Card variant="elevated" className="text-center">
        <CardContent className="pt-6 pb-5">
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <span className="text-primary-foreground font-bold text-3xl">
              {user?.name?.[0] || 'P'}
            </span>
          </div>
          <h2 className="text-xl font-bold text-foreground">{user?.name || 'Patient'}</h2>
          <p className="text-sm text-muted-foreground mt-1">{user?.email}</p>
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mt-3">
            <HealthIdIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{user?.healthId || 'HID-2024-001234'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item, index) => (
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

      {/* Logout */}
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

export default PatientDashboard;
