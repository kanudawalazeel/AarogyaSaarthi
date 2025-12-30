import React from 'react';
import { cn } from '@/lib/utils';

interface MobileLayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  header,
  footer,
  className,
}) => {
  return (
    <div className="min-h-screen bg-background flex flex-col safe-area-inset-top safe-area-inset-bottom">
      {header && (
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
          {header}
        </header>
      )}
      
      <main className={cn("flex-1 overflow-auto", className)}>
        {children}
      </main>
      
      {footer && (
        <footer className="sticky bottom-0 z-50 bg-background/95 backdrop-blur-md border-t border-border">
          {footer}
        </footer>
      )}
    </div>
  );
};

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  avatar,
  actions,
}) => {
  return (
    <div className="px-5 py-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {avatar}
        <div>
          <h1 className="text-lg font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
};

interface BottomNavItem {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
}

export const BottomNav: React.FC<BottomNavProps> = ({ items }) => {
  return (
    <nav className="flex items-center justify-around py-2 px-4">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={cn(
            "flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-200 relative",
            item.isActive
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className="relative">
            {item.icon}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                {item.badge > 9 ? '9+' : item.badge}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'accent' | 'warning';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  color = 'primary',
  onClick,
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    success: 'bg-success/10 text-success',
    accent: 'bg-accent/10 text-accent',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card rounded-2xl p-4 shadow-card border border-border/50",
        onClick && "cursor-pointer hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", colorClasses[color])}>
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            trend.isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground mt-0.5">{title}</div>
      {subtitle && (
        <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
      )}
    </div>
  );
};

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  color?: 'primary' | 'success' | 'accent' | 'warning';
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon,
  label,
  onClick,
  color = 'primary',
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary hover:bg-primary/20',
    success: 'bg-success/10 text-success hover:bg-success/20',
    accent: 'bg-accent/10 text-accent hover:bg-accent/20',
    warning: 'bg-warning/10 text-warning hover:bg-warning/20',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 active:scale-95",
        colorClasses[color]
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-card shadow-sm flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-medium text-foreground text-center">{label}</span>
    </button>
  );
};

interface SectionHeaderProps {
  title: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm text-primary font-medium hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-4">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm text-primary font-medium hover:underline"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
