import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Welcome from "./pages/Welcome";
import Auth from "./pages/Auth";
import PatientDashboard from "./pages/dashboards/PatientDashboard";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import PharmacyDashboard from "./pages/dashboards/PharmacyDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import AppointmentsPage from '@/pages/AppointmentsPage';
import PharmaciesPage from '@/pages/PharmaciesPage';
import DoctorPendingRequests from "./pages/dashboards/DoctorPendingRequests";
import PatientDetails from "./pages/dashboards/PatientDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/pharmacies/:prescriptionId" element={<PharmaciesPage />} />
            <Route path="/doctor/pending-requests" element={<DoctorPendingRequests />}/>
            <Route path="/doctor/patient/:id" element={<PatientDetails />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
