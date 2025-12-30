import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  UsersIcon,
  ActivityIcon,
  ClipboardListIcon,
  HeartPulseIcon,
} from '@/components/icons/HealthcareIcons';

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const patient = {
  id,
  name: 'Aarav Mehta',
  age: 45,
  gender: 'Male',
  bloodGroup: 'B+',
  condition: 'Type 2 Diabetes, Mild Hypertension',
  lastVisit: '20 Dec 2024',
  vitals: {
    bp: '120/80 mmHg',
    heartRate: '72 bpm',
    sugar: '110 mg/dL',
    bmi: '23.5',
  },
  prescriptions: [
    'Metformin – 500mg (Twice daily)',
    'Amlodipine – 5mg (Once daily)',
    'Vitamin D3 – Weekly',
  ],
  labReports: [
    { test: 'Blood Sugar (Fasting)', value: '110 mg/dL', range: '70–110', status: 'Normal' },
    { test: 'HbA1c', value: '6.4%', range: '< 6.5', status: 'Controlled' },
    { test: 'Cholesterol', value: '180 mg/dL', range: '< 200', status: 'Normal' },
    { test: 'Blood Pressure', value: '120/80', range: '120/80', status: 'Optimal' },
  ],
  notes:
    'Patient is responding well to the treatment plan. Continue medication, maintain diet and exercise. Follow-up after 3 months.',
};

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <Card variant="elevated">
        <CardContent className="p-5 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <UsersIcon className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{patient.name}</h2>
              <p className="text-sm text-muted-foreground">
                Patient ID:{' '}
                <span className="text-primary font-medium">{patient.id}</span>
              </p>
            </div>
          </div>

          {/* RIGHT SIDE BUTTONS */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button variant="soft">Active</Button>
          </div>

        </CardContent>
      </Card>

      {/* Vital Cards */}
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(patient.vitals).map(([key, value]) => (
          <Card key={key}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <p className="text-lg font-bold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lab Reports */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold mb-3">Lab Reports</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Test</th>
                <th>Value</th>
                <th>Range</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {patient.labReports.map((report, index) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="py-2">{report.test}</td>
                  <td>{report.value}</td>
                  <td>{report.range}</td>
                  <td className="text-success font-medium">
                    {report.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Prescriptions */}
      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold mb-2">Prescriptions</h3>
          <ul className="list-disc pl-5 text-sm text-muted-foreground">
            {patient.prescriptions.map((prescription, index) => (
              <li key={index}>{prescription}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Doctor Notes */}
      <Card className="bg-gradient-success text-success-foreground">
        <CardContent className="p-5">
          <h3 className="font-semibold mb-2">Doctor’s Notes</h3>
          <p className="text-sm">{patient.notes}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetails;