import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  SearchIcon,
  ChevronRightIcon,
  BellIcon,
} from '@/components/icons/HealthcareIcons';

const DoctorPendingRequests: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState('');

  const [requests, setRequests] = useState<
  { name: string; healthId: string; time: string }[]
>([
  { name: 'John Doe', healthId: 'HID-2024-001234', time: '2 hours ago' },
  { name: 'Sarah Smith', healthId: 'HID-2024-001235', time: '5 hours ago' },
  { name: 'Michael Brown', healthId: 'HID-2024-001236', time: 'Yesterday' },
]);

  const filteredRequests = requests?.filter(r =>
  r.healthId.toLowerCase().includes(search.toLowerCase())
) || [];

  const handleApprove = (request) => {
  toast({
    title: 'Access Approved',
    description: `${request.name} access approved successfully`,
  });

  setRequests(prev =>
    prev.filter(r => r.healthId !== request.healthId)
  );
};

  const handleReject = (request) => {
  toast({
    title: 'Request Rejected',
    description: `${request.name} access request rejected`,
    variant: 'destructive',
  });

  setRequests(prev =>
    prev.filter(r => r.healthId !== request.healthId)
  );
};

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Header */}
      <Card variant="elevated">
  <CardContent className="p-5 flex items-center justify-between">

    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => navigate(-1)}
      >
        <ChevronRightIcon className="w-5 h-5 rotate-180" />
      </Button>

      <div>
        <h2 className="text-xl font-bold text-foreground">
          Pending Patient Access Requests
        </h2>
        <p className="text-sm text-muted-foreground">
          Review and manage patient record access
        </p>
      </div>
      </div>

      {/* Notification Icon */}
      <Button variant="ghost" size="icon-sm" className="relative">
      <BellIcon className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-warning text-warning-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
          {filteredRequests.length}
        </span>
      </Button>
      </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search by Health ID"
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Approve to grant temporary access to patient medical records.
      </p>

      {/* Requests List */}
      <div className="space-y-3">
  {filteredRequests.length === 0 ? (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          No pending access requests
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          All patient requests have been processed
        </p>
      </CardContent>
    </Card>
  ) : (
    filteredRequests.map((req) => (
      <Card
        key={req.healthId}
        variant="interactive"
        className="hover:shadow-md transition-shadow"
      >
        <CardContent className="p-4">
          {/* Status Badge */}
          <span className="inline-block mb-2 text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium">
            Pending Approval
          </span>

          <div className="flex items-center justify-between">
            {/* Left Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UsersIcon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">
                  {req.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {req.healthId}
                </p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                  <ClockIcon className="w-3 h-3" />
                  {req.time}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="soft"
                size="sm"
                onClick={() => handleApprove(req)}
              >
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReject(req)}
              >
                <AlertTriangleIcon className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      ))
      )}
      </div>
    </div>
  );
};

export default DoctorPendingRequests;