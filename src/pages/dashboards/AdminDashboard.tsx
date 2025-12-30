import React, { useState } from 'react';
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
  ShieldCheckIcon,
  HomeIcon,
  UsersIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  LogOutIcon,
  ChevronRightIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  BarChartIcon,
  ActivityIcon,
  FileTextIcon,
  EyeIcon,
  ClockIcon,
} from '@/components/icons/HealthcareIcons';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'users' | 'security' | 'analytics' | 'settings'>('home');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: 'Dashboard', isActive: activeTab === 'home', onClick: () => setActiveTab('home') },
    { icon: <UsersIcon className="w-5 h-5" />, label: 'Users', isActive: activeTab === 'users', onClick: () => setActiveTab('users') },
    { icon: <ShieldCheckIcon className="w-5 h-5" />, label: 'Security', badge: 2, isActive: activeTab === 'security', onClick: () => setActiveTab('security') },
    { icon: <BarChartIcon className="w-5 h-5" />, label: 'Analytics', isActive: activeTab === 'analytics', onClick: () => setActiveTab('analytics') },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Settings', isActive: activeTab === 'settings', onClick: () => setActiveTab('settings') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <AdminHomeTab setActiveTab={setActiveTab} />;
      case 'users':
        return <UsersTab />;
      case 'security':
        return <SecurityTab />;
      case 'analytics':
        return <AdminAnalyticsTab />;
      case 'settings':
        return <AdminSettingsTab onLogout={handleLogout} />;
      default:
        return <AdminHomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <MobileLayout
      header={
        <DashboardHeader
          title="Admin Dashboard"
          subtitle={user?.name || 'System Administrator'}
          avatar={
            <div className="w-11 h-11 bg-foreground rounded-full flex items-center justify-center shadow-md">
              <ShieldCheckIcon className="w-6 h-6 text-background" />
            </div>
          }
          actions={
            <Button variant="ghost" size="icon-sm" className="relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                2
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

interface AdminHomeTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'home' | 'users' | 'security' | 'analytics' | 'settings'>
  >;
}

const AdminHomeTab: React.FC<AdminHomeTabProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* System Status */}
      <Card variant="elevated" className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-foreground/80">System Status</p>
              <p className="text-2xl font-bold mt-1">All Systems Operational</p>
            </div>
            <div className="w-12 h-12 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <CheckCircleIcon className="w-7 h-7 text-primary-foreground" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">
              Uptime: 99.9%
            </span>
            <span className="text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">
              Last checked: 2 min ago
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div
  onClick={() => setActiveTab('users')}
  className="cursor-pointer"
>
        <StatCard
          title="Total Users"
          value="12,458"
          icon={<UsersIcon className="w-5 h-5" />}
          trend={{ value: 8, isPositive: true }}
          color="primary"
          />
        </div>
        <StatCard
          title="Active Sessions"
          value="1,234"
          icon={<ActivityIcon className="w-5 h-5" />}
          color="success"
        />
        <div
        onClick={() => setActiveTab('security')}
        className="cursor-pointer"
        >
        <StatCard
        title="Security Alerts"
        value={2}
        icon={<AlertTriangleIcon className="w-5 h-5" />}
        color="warning"
        />
        </div>
        <StatCard
          title="Audit Logs"
          value="48.2K"
          subtitle="This month"
          icon={<FileTextIcon className="w-5 h-5" />}
          color="accent"
        />
      </div>

      {/* User Distribution */}
      <div>
        <SectionHeader title="User Distribution" />
        <Card variant="elevated">
          <CardContent className="p-4 space-y-4">
            {[
              { role: 'Patients', count: 8542, color: 'bg-primary' },
              { role: 'Doctors', count: 1856, color: 'bg-success' },
              { role: 'Pharmacies', count: 2045, color: 'bg-accent' },
              { role: 'Admins', count: 15, color: 'bg-muted-foreground' },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-foreground">{item.role}</span>
                  <span className="text-sm font-medium text-foreground">{item.count.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${(item.count / 8542) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div>
        <SectionHeader title="Recent Activity" />
        <div className="space-y-2">
          {[
            { action: 'New doctor registered', user: 'Dr. Smith', time: '2 min ago', type: 'info' },
            { action: 'Failed login attempt', user: 'Unknown', time: '15 min ago', type: 'warning' },
            { action: 'Patient data accessed', user: 'Dr. Johnson', time: '1 hour ago', type: 'info' },
            { action: 'Pharmacy verified', user: 'MediCare Plus', time: '2 hours ago', type: 'success' },
          ].map((activity, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-10 rounded-full ${
                    activity.type === 'warning' ? 'bg-warning' :
                    activity.type === 'success' ? 'bg-success' : 'bg-primary'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const UsersTab: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">User Management</h2>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search users..." className="pl-10" />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
        {['All', 'Patients', 'Doctors', 'Pharmacies', 'Pending'].map((filter, index) => (
          <Button
            key={filter}
            variant={index === 0 ? 'default' : 'outline'}
            size="sm"
            className="flex-shrink-0"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {[
          { name: 'John Doe', email: 'john@example.com', role: 'patient', status: 'active', verified: true },
          { name: 'Dr. Sarah Smith', email: 'sarah@hospital.com', role: 'doctor', status: 'active', verified: true },
          { name: 'MediCare Pharmacy', email: 'medicare@pharmacy.com', role: 'pharmacy', status: 'pending', verified: false },
          { name: 'Dr. Mike Johnson', email: 'mike@clinic.com', role: 'doctor', status: 'active', verified: false },
        ].map((user, index) => (
          <Card key={index} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  user.role === 'patient' ? 'bg-primary/10' :
                  user.role === 'doctor' ? 'bg-success/10' : 'bg-accent/10'
                }`}>
                  <span className={`font-bold text-lg ${
                    user.role === 'patient' ? 'text-primary' :
                    user.role === 'doctor' ? 'text-success' : 'text-accent'
                  }`}>
                    {user.name[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{user.name}</p>
                    {user.verified && (
                      <CheckCircleIcon className="w-4 h-4 text-success" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      user.role === 'patient' ? 'bg-primary/10 text-primary' :
                      user.role === 'doctor' ? 'bg-success/10 text-success' : 'bg-accent/10 text-accent'
                    }`}>
                      {user.role}
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      user.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm">
                  <EyeIcon className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const SecurityTab: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground">Security Center</h2>

      {/* Active Alerts */}
      <div>
        <SectionHeader title="Active Alerts" />
        <div className="space-y-2">
          {[
            { title: 'Multiple failed login attempts', description: 'IP: 192.168.1.45', severity: 'high', time: '15 min ago' },
            { title: 'Unusual data access pattern', description: 'User: dr.unknown@clinic.com', severity: 'medium', time: '1 hour ago' },
          ].map((alert, index) => (
            <Card key={index} className={`border-l-4 ${
              alert.severity === 'high' ? 'border-l-destructive bg-destructive/5' : 'border-l-warning bg-warning/5'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-2">{alert.time}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Audit Logs */}
      <div>
        <SectionHeader 
          title="Recent Audit Logs" 
          action={{ label: 'View All', onClick: () => {} }}
        />
        <div className="space-y-2">
          {[
            { action: 'LOGIN_SUCCESS', user: 'john@patient.com', resource: 'Auth', time: '2 min ago' },
            { action: 'DATA_ACCESS', user: 'dr.smith@hospital.com', resource: 'Patient Records', time: '5 min ago' },
            { action: 'PRESCRIPTION_CREATE', user: 'dr.smith@hospital.com', resource: 'Prescription', time: '10 min ago' },
            { action: 'INVENTORY_UPDATE', user: 'medicare@pharmacy.com', resource: 'Inventory', time: '15 min ago' },
          ].map((log, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{log.action}</p>
                    <p className="text-xs text-muted-foreground">{log.user}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">
                      {log.resource}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-1">{log.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminAnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground">System Analytics</h2>

      {/* Regional Health Overview */}
      <Card variant="elevated">
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Regional Health Data (Anonymized)</h3>
          <div className="space-y-4">
            {[
              { region: 'North Region', patients: 3245, cases: 156, trend: 'down' },
              { region: 'South Region', patients: 4521, cases: 234, trend: 'up' },
              { region: 'East Region', patients: 2156, cases: 89, trend: 'stable' },
              { region: 'West Region', patients: 2536, cases: 112, trend: 'down' },
            ].map((region, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground text-sm">{region.region}</p>
                  <p className="text-xs text-muted-foreground">{region.patients.toLocaleString()} registered patients</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{region.cases} active cases</p>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    region.trend === 'down' ? 'bg-success/10 text-success' :
                    region.trend === 'up' ? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                  }`}>
                    {region.trend === 'down' ? '↓ Decreasing' :
                     region.trend === 'up' ? '↑ Increasing' : '→ Stable'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <Card variant="elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">245ms</p>
            <p className="text-sm text-muted-foreground">Avg Response Time</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">99.9%</p>
            <p className="text-sm text-muted-foreground">Uptime</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface AdminSettingsTabProps {
  onLogout: () => void;
}

const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card variant="elevated" className="text-center">
        <CardContent className="pt-6 pb-5">
          <div className="w-20 h-20 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <ShieldCheckIcon className="w-10 h-10 text-background" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{user?.name || 'Administrator'}</h2>
          <p className="text-sm text-muted-foreground mt-1">System Administrator</p>
          <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full mt-3">
            <ShieldCheckIcon className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Super Admin</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {[
          { icon: <UsersIcon className="w-5 h-5" />, label: 'Role Management', color: 'text-primary' },
          { icon: <ShieldCheckIcon className="w-5 h-5" />, label: 'Security Settings', color: 'text-success' },
          { icon: <BarChartIcon className="w-5 h-5" />, label: 'Reports', color: 'text-accent' },
          { icon: <SettingsIcon className="w-5 h-5" />, label: 'System Configuration', color: 'text-muted-foreground' },
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

export default AdminDashboard;