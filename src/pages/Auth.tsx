import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserRole } from '@/types';
import {
  HeartPulseIcon,
  ChevronLeftIcon,
  UserCircleIcon,
  StethoscopeIcon,
  PillIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeOffIcon,
} from '@/components/icons/HealthcareIcons';

const roleConfig: Record<UserRole, { 
  icon: React.FC<{ className?: string }>; 
  title: string;
  color: string;
  bgColor: string;
}> = {
  patient: {
    icon: UserCircleIcon,
    title: 'Patient',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  doctor: {
    icon: StethoscopeIcon,
    title: 'Doctor / Hospital',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  pharmacy: {
    icon: PillIcon,
    title: 'Medical Store',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  admin: {
    icon: ShieldCheckIcon,
    title: 'Administrator',
    color: 'text-secondary-foreground',
    bgColor: 'bg-secondary',
  },
};

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRole, login, signup, setSelectedRole } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    specialization: '',
    licenseNumber: '',
    hospitalName: '',
    pharmacyName: '',
    address: '',
  });

  React.useEffect(() => {
    if (!selectedRole) {
      navigate('/');
    }
  }, [selectedRole, navigate]);

  if (!selectedRole) return null;

  const config = roleConfig[selectedRole];
  const Icon = config.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let success: boolean;
      
      if (isLogin) {
        success = await login(formData.email, formData.password, selectedRole);
      } else {
        success = await signup({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          role: selectedRole,
          additionalData: {
            specialization: formData.specialization,
            licenseNumber: formData.licenseNumber,
            hospitalName: formData.hospitalName,
            pharmacyName: formData.pharmacyName,
            address: formData.address,
          },
        });
      }

      if (success) {
        toast({
          title: isLogin ? 'Welcome back!' : 'Account created!',
          description: isLogin ? 'You have been logged in successfully.' : 'Your account has been created.',
        });
        
        switch (selectedRole) {
          case 'patient':
            navigate('/patient');
            break;
          case 'doctor':
            navigate('/doctor');
            break;
          case 'pharmacy':
            navigate('/pharmacy');
            break;
          case 'admin':
            navigate('/admin');
            break;
        }
      } else {
        toast({
          title: 'Error',
          description: 'Invalid credentials or role mismatch.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedRole(null);
    navigate('/');
  };

  const renderRoleSpecificFields = () => {
    if (isLogin) return null;

    switch (selectedRole) {
      case 'doctor':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="specialization">Specialization</Label>
              <Input
                id="specialization"
                name="specialization"
                placeholder="e.g., Cardiology, General Medicine"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Medical License Number</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                placeholder="Enter your license number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hospitalName">Hospital/Clinic Name (Optional)</Label>
              <Input
                id="hospitalName"
                name="hospitalName"
                placeholder="Enter hospital or clinic name"
                value={formData.hospitalName}
                onChange={handleChange}
              />
            </div>
          </>
        );
      case 'pharmacy':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="pharmacyName">Pharmacy Name</Label>
              <Input
                id="pharmacyName"
                name="pharmacyName"
                placeholder="Enter pharmacy name"
                value={formData.pharmacyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licenseNumber">Pharmacy License Number</Label>
              <Input
                id="licenseNumber"
                name="licenseNumber"
                placeholder="Enter license number"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Pharmacy Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Enter full address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col safe-area-inset-top safe-area-inset-bottom">
      {/* Header */}
      <header className="px-4 pt-6 pb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="gap-1"
        >
          <ChevronLeftIcon className="w-5 h-5" />
          Back
        </Button>
      </header>

      {/* Content */}
      <div className="flex-1 px-6 pb-8">
        {/* Logo and Role Badge */}
        <div className="text-center mb-6 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <HeartPulseIcon className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          
          <div className={`inline-flex items-center gap-2 ${config.bgColor} px-4 py-2 rounded-full`}>
            <Icon className={`w-4 h-4 ${config.color}`} />
            <span className={`text-sm font-medium ${config.color}`}>
              {config.title}
            </span>
          </div>
        </div>

        {/* Auth Card */}
        <Card variant="elevated" className="animate-slide-up">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? 'Sign in to access your dashboard' 
                : 'Fill in your details to get started'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {renderRoleSpecificFields()}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary font-medium ml-1 hover:underline"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            {isLogin && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;