import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import {
  MobileLayout,
  DashboardHeader,
  BottomNav,
  StatCard,
  SectionHeader,
} from '@/components/layout/MobileLayout';
import {
  PillIcon,
  HomeIcon,
  PackageIcon,
  ClipboardListIcon,
  SettingsIcon,
  SearchIcon,
  BellIcon,
  LogOutIcon,
  ChevronRightIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  PlusIcon,
  BarChartIcon,
} from '@/components/icons/HealthcareIcons';

const PharmacyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'home' | 'inventory' | 'orders' | 'analytics' | 'profile'>('home');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { icon: <HomeIcon className="w-5 h-5" />, label: 'Home', isActive: activeTab === 'home', onClick: () => setActiveTab('home') },
    { icon: <PackageIcon className="w-5 h-5" />, label: 'Inventory', badge: 5, isActive: activeTab === 'inventory', onClick: () => setActiveTab('inventory') },
    { icon: <ClipboardListIcon className="w-5 h-5" />, label: 'Orders', isActive: activeTab === 'orders', onClick: () => setActiveTab('orders') },
    { icon: <BarChartIcon className="w-5 h-5" />, label: 'Analytics', isActive: activeTab === 'analytics', onClick: () => setActiveTab('analytics') },
    { icon: <SettingsIcon className="w-5 h-5" />, label: 'Profile', isActive: activeTab === 'profile', onClick: () => setActiveTab('profile') },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <PharmacyHomeTab setActiveTab={setActiveTab} />;
      case 'inventory':
        return <InventoryTab />;
      case 'orders':
        return <OrdersTab />;
      case 'analytics':
        return <AnalyticsTab />;
      case 'profile':
        return <PharmacyProfileTab onLogout={handleLogout} />;
      default:
        return <PharmacyHomeTab setActiveTab={setActiveTab} />;
    }
  };

  return (
    <MobileLayout
      header={
        <DashboardHeader
          title={user?.name || 'MediCare Pharmacy'}
          subtitle="Verified Pharmacy"
          avatar={
            <div className="w-11 h-11 bg-gradient-accent rounded-full flex items-center justify-center shadow-md">
              <PillIcon className="w-6 h-6 text-accent-foreground" />
            </div>
          }
          actions={
            <Button variant="ghost" size="icon-sm" className="relative">
              <BellIcon className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
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

interface PharmacyHomeTabProps {
  setActiveTab: React.Dispatch<
    React.SetStateAction<'home' | 'inventory' | 'orders' | 'analytics' | 'profile'>
  >;
}

const PharmacyHomeTab: React.FC<PharmacyHomeTabProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          title="Today's Sales"
          value="₹12,450"
          icon={<BarChartIcon className="w-5 h-5" />}
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        <div
          onClick={() => setActiveTab('orders')}
          className="cursor-pointer"
        >
        <StatCard
          title="Orders"
          value={24}
          subtitle="Today"
          icon={<ClipboardListIcon className="w-5 h-5" />}
          color="success"
          />
        </div>
        <div
  onClick={() => setActiveTab('inventory')}
  className="cursor-pointer"
>
        <StatCard
          title="Total Items"
          value={342}
          icon={<PackageIcon className="w-5 h-5" />}
          color="accent"
          />
        </div>

        <StatCard 
          title="Low Stock" 
          value={5} 
          subtitle="Items" 
          icon={<AlertTriangleIcon className="w-5 h-5" />} color="warning" />
      </div>

      {/* Prescription Verification */}
      <div>
        <SectionHeader title="Verify Prescription" />
        <Card variant="elevated">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Enter Prescription ID" 
                  className="pl-10"
                />
              </div>
              <Button variant="gradient">
                Verify
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alerts */}
      <div>
        <SectionHeader 
          title="Low Stock Alerts" 
          action={{ label: 'View All', onClick: () => {} }}
        />
        <div className="space-y-2">
          {[
            { name: 'Paracetamol 500mg', stock: 15, minStock: 50, expiry: 'Jan 2025' },
            { name: 'Amoxicillin 250mg', stock: 8, minStock: 30, expiry: 'Mar 2025' },
            { name: 'Metformin 500mg', stock: 20, minStock: 40, expiry: 'Feb 2025' },
          ].map((item, index) => (
            <Card key={index} className="border-warning/30 bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-warning/10 rounded-xl flex items-center justify-center">
                      <AlertTriangleIcon className="w-5 h-5 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Stock: <span className="text-warning font-medium">{item.stock}</span> / {item.minStock}
                      </p>
                    </div>
                  </div>
                  <Button variant="soft" size="sm">
                    Reorder
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <SectionHeader title="Recent Orders" />
        <div className="space-y-2">
          {[
            { id: 'ORD-001', patient: 'John Doe', items: 3, total: '₹450', status: 'completed' },
            { id: 'ORD-002', patient: 'Sarah Smith', items: 2, total: '₹280', status: 'processing' },
            { id: 'ORD-003', patient: 'Mike Johnson', items: 5, total: '₹890', status: 'pending' },
          ].map((order, index) => (
            <Card key={index} variant="interactive">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.patient} • {order.items} items</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{order.total}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      order.status === 'completed' ? 'bg-success/10 text-success' :
                      order.status === 'processing' ? 'bg-primary/10 text-primary' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {order.status}
                    </span>
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

const InventoryTab: React.FC = () => {
const { toast } = useToast();
const [open, setOpen] = useState(false);

const [newItem, setNewItem] = useState({
  name: '',
  stock: '',
  price: '',
  generic: false,
});
  const [inventory, setInventory] = useState([
  { id: 1, name: 'Paracetamol 500mg', stock: 150, price: '₹15', generic: true },
  { id: 2, name: 'Amoxicillin 250mg', stock: 80, price: '₹45', generic: false },
  { id: 3, name: 'Metformin 500mg', stock: 200, price: '₹25', generic: true },
  { id: 4, name: 'Omeprazole 20mg', stock: 120, price: '₹35', generic: false },
  { id: 5, name: 'Cetirizine 10mg', stock: 90, price: '₹12', generic: true },
]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Inventory</h2>
        <Button
          variant="gradient"
          size="sm"
          className="gap-1"
          onClick={() => setOpen(true)}>
          <PlusIcon className="w-4 h-4" />
          Add Item
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add New Medicine</DialogTitle>
    </DialogHeader>

    <div className="space-y-3">
      <Input
        placeholder="Medicine Name"
        value={newItem.name}
        onChange={(e) =>
          setNewItem({ ...newItem, name: e.target.value })
        }
      />

      <Input
        type="number"
        placeholder="Units in Stock"
        value={newItem.stock}
        onChange={(e) =>
          setNewItem({ ...newItem, stock: e.target.value })
        }
      />

      <Input
        placeholder="Price (₹)"
        value={newItem.price}
        onChange={(e) =>
          setNewItem({ ...newItem, price: e.target.value })
        }
      />

      <Button
        variant="gradient"
        className="w-full"
        onClick={() => {
          setInventory((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: newItem.name,
              stock: Number(newItem.stock),
              price: `₹${newItem.price}`,
              generic: newItem.generic,
            },
          ]);

          toast({
            title: 'Live stocks updated',
            description: 'New medicine added to inventory',
          });

          setNewItem({ name: '', stock: '', price: '', generic: false });
          setOpen(false);
        }}
      >
        Add Medicine
      </Button>
    </div>
  </DialogContent>
</Dialog>
      </div>

      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input placeholder="Search medicines..." className="pl-10" />
      </div>

      <div className="space-y-3">
        {inventory.map((item) => (
          <Card key={item.id} variant="interactive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <PillIcon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">{item.name}</p>
                      {item.generic && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-success/10 text-success rounded">
                          Generic
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Stock: {item.stock} units</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{item.price}</p>
                  <Button variant="ghost" size="sm" className="h-6 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const OrdersTab: React.FC = () => {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Orders</h2>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5">
        {['All', 'Pending', 'Processing', 'Completed'].map((filter, index) => (
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
          { id: 'ORD-001', patient: 'John Doe', time: '10:30 AM', items: ['Paracetamol', 'Amoxicillin'], total: '₹450', status: 'pending' },
          { id: 'ORD-002', patient: 'Sarah Smith', time: '11:15 AM', items: ['Metformin'], total: '₹280', status: 'processing' },
          { id: 'ORD-003', patient: 'Mike Johnson', time: '12:00 PM', items: ['Cetirizine', 'Omeprazole'], total: '₹890', status: 'completed' },
        ].map((order, index) => (
          <Card key={index} variant="elevated">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.time}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  order.status === 'completed' ? 'bg-success/10 text-success' :
                  order.status === 'processing' ? 'bg-primary/10 text-primary' :
                  'bg-warning/10 text-warning'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">{order.patient}</p>
                  <p className="text-xs text-muted-foreground">{order.items.join(', ')}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">{order.total}</p>
                  {order.status !== 'completed' && (
                    <Button variant="soft" size="sm" className="mt-1 h-7 text-xs">
                      {order.status === 'pending' ? 'Process' : 'Complete'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-xl font-bold text-foreground">Analytics</h2>

      <Card variant="elevated" className="bg-gradient-primary text-primary-foreground">
        <CardContent className="p-5">
          <p className="text-sm text-primary-foreground/80">This Month's Revenue</p>
          <p className="text-3xl font-bold mt-1">₹2,45,680</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs bg-primary-foreground/20 px-2 py-0.5 rounded-full">
              +18% from last month
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card variant="elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">892</p>
            <p className="text-sm text-muted-foreground">Orders</p>
          </CardContent>
        </Card>
        <Card variant="elevated">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">342</p>
            <p className="text-sm text-muted-foreground">Products</p>
          </CardContent>
        </Card>
      </div>

      <div>
        <SectionHeader title="Top Selling Medicines" />
        <div className="space-y-2">
          {[
            { name: 'Paracetamol 500mg', sales: 245, revenue: '₹3,675' },
            { name: 'Amoxicillin 250mg', sales: 180, revenue: '₹8,100' },
            { name: 'Metformin 500mg', sales: 156, revenue: '₹3,900' },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.sales} units sold</p>
                    </div>
                  </div>
                  <p className="font-bold text-success">{item.revenue}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

interface PharmacyProfileTabProps {
  onLogout: () => void;
}

const PharmacyProfileTab: React.FC<PharmacyProfileTabProps> = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <Card variant="elevated" className="text-center">
        <CardContent className="pt-6 pb-5">
          <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <PillIcon className="w-10 h-10 text-accent-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{user?.name || 'MediCare Pharmacy'}</h2>
          <p className="text-sm text-muted-foreground mt-1">License: PH-2024-12345</p>
          <div className="inline-flex items-center gap-2 bg-success/10 px-3 py-1.5 rounded-full mt-3">
            <CheckCircleIcon className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Verified Pharmacy</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {[
          { icon: <PackageIcon className="w-5 h-5" />, label: 'Inventory Settings', color: 'text-primary' },
          { icon: <BarChartIcon className="w-5 h-5" />, label: 'Sales Reports', color: 'text-success' },
          { icon: <BellIcon className="w-5 h-5" />, label: 'Notifications', color: 'text-accent' },
          { icon: <SettingsIcon className="w-5 h-5" />, label: 'Store Settings', color: 'text-muted-foreground' },
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

export default PharmacyDashboard;