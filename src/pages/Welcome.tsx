import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';
import { 
  HeartPulseIcon, 
  UserCircleIcon, 
  StethoscopeIcon, 
  PillIcon, 
  ShieldCheckIcon,
  ChevronRightIcon
} from '@/components/icons/HealthcareIcons';

const roleConfig: Record<UserRole, { 
  icon: React.FC<{ className?: string }>; 
  title: string; 
  description: string;
  color: string;
  bgColor: string;
}> = {
  patient: {
    icon: UserCircleIcon,
    title: 'Patient',
    description: 'Manage your health records, prescriptions, and appointments',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  doctor: {
    icon: StethoscopeIcon,
    title: 'Doctor / Hospital',
    description: 'Access patient records and manage clinical workflows',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  pharmacy: {
    icon: PillIcon,
    title: 'Medical Store / Pharmacy',
    description: 'Manage inventory and process prescriptions',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  admin: {
    icon: ShieldCheckIcon,
    title: 'Administrator',
    description: 'System management, analytics and security controls',
    color: 'text-secondary-foreground',
    bgColor: 'bg-secondary',
  },
};

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedRole } = useAuth();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col safe-area-inset-top safe-area-inset-bottom">
      {/* Header Section */}
      <header className="px-6 pt-10 pb-6 text-center animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow animate-pulse-soft">
            <HeartPulseIcon className="w-9 h-9 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Aarogya<span className="text-gradient">Saarthi</span>
        </h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Healthcare Equity for Everyone
        </p>
      </header>

      {/* Illustration Section */}
      <div className="px-6 py-4 flex-shrink-0">
        <div className="relative bg-gradient-primary rounded-3xl p-6 overflow-hidden shadow-glow">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 className="text-xl font-bold text-primary-foreground mb-2">
              From Records to Care, Seamlessly.
            </h2>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              A unified platform that enables secure access, management, and consent-based sharing of health records, while supporting coordinated interactions with doctors and pharmacies when needed.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs text-primary-foreground font-medium">
                Early Detection
              </span>
              <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs text-primary-foreground font-medium">
                Telehealth
              </span>
              <span className="px-3 py-1 bg-primary-foreground/20 rounded-full text-xs text-primary-foreground font-medium">
                Digital ID
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Section */}
      <div className="flex-1 px-6 py-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Select your role to continue
        </h3>
        
        <div className="space-y-3">
          {(Object.keys(roleConfig) as UserRole[]).map((role, index) => {
            const config = roleConfig[role];
            const Icon = config.icon;
            
            return (
              <Card
                key={role}
                variant="role"
                onClick={() => handleRoleSelect(role)}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${config.bgColor} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-foreground text-base">
                        {config.title}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                        {config.description}
                      </p>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Inclusive & Human-Centered Healthcare
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Your data is secure and private
        </p>
      </footer>
    </div>
  );
};

export default Welcome;
