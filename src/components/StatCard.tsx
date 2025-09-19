import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'navy';
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  trend,
  colorScheme = 'primary' 
}: StatCardProps) {
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'navy':
        return 'bg-navy/10 text-navy border-navy/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="erp-card hover-lift animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl lg:text-3xl font-heading font-bold text-foreground">{value}</p>
            {trend && (
              <span className={`text-sm font-medium ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        
        <div className={`p-3 rounded-radius border ${getColorClasses()}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}