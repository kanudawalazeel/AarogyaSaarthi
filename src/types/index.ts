export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  healthId?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Patient extends User {
  role: 'patient';
  healthId: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  familyMembers?: FamilyMember[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  hospital?: string;
  verified: boolean;
}

export interface Pharmacy extends User {
  role: 'pharmacy';
  pharmacyName: string;
  licenseNumber: string;
  address: string;
  verified: boolean;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  accessLevel: 'super' | 'regional' | 'standard';
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  healthId: string;
  dateOfBirth?: string;
}

export interface HealthRecord {
  id: string;
  patientId: string;
  type: 'prescription' | 'lab_report' | 'vaccination' | 'chronic_condition' | 'medication';
  title: string;
  description?: string;
  date: Date;
  isPublic: boolean;
  doctorId?: string;
  doctorName?: string;
  attachments?: string[];
  metadata?: Record<string, any>;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  price: number;
  stock: number;
  expiryDate: Date;
  requiresPrescription: boolean;
  alternatives?: string[];
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medicines: PrescriptionMedicine[];
  diagnosis: string;
  notes?: string;
  issuedAt: Date;
  validUntil: Date;
}

export interface PrescriptionMedicine {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Reminder {
  id: string;
  patientId: string;
  type: 'medicine' | 'appointment' | 'vaccination' | 'followup';
  title: string;
  description?: string;
  scheduledAt: Date;
  recurring?: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
  enabled: boolean;
}

export interface AccessRequest {
  id: string;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientHealthId: string;
  reason: string;
  status: 'pending' | 'approved' | 'denied';
  requestedAt: Date;
  expiresAt?: Date;
  accessDuration: number; 
}

export interface InventoryAlert {
  id: string;
  pharmacyId: string;
  medicineId: string;
  medicineName: string;
  currentStock: number;
  minimumStock: number;
  alertType: 'low_stock' | 'out_of_stock' | 'expiring_soon';
  createdAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  userRole: UserRole;
  action: string;
  resource: string;
  resourceId: string;
  details?: string;
  ipAddress?: string;
  timestamp: Date;
}

export interface HealthAlert {
  id: string;
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'critical';
  region?: string;
  disease?: string;
  validFrom: Date;
  validUntil?: Date;
  active: boolean;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  benefits: string[];
  applicationUrl?: string;
  active: boolean;
}
