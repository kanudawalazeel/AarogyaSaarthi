import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  onClose: () => void;
}

const RequestAccessModal = ({ onClose }: Props) => {
  const [patientId, setPatientId] = useState('');
  const navigate = useNavigate();

  const handleRequest = () => {
    alert('Request Sent Successfully. Please wait...');

    setTimeout(() => {
      alert('Patient Approved Request');
      navigate(`/doctor/patient/${patientId}`);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <Card className="w-[350px]">
        <CardContent className="p-5 space-y-4">
          <h2 className="text-lg font-semibold">Request Patient Access</h2>

          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleRequest}>
              Request Sent
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestAccessModal;