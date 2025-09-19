import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from './ui/card'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  colorScheme?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'navy'
    | 'teal'
    | 'blue'
    | 'light-blue'
}

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  colorScheme = 'primary',
}: StatCardProps) {
  const getColorClasses = () => {
    switch (colorScheme) {
      case 'primary':
        return 'bg-primary/10 text-primary border-primary/20'
      case 'secondary':
        return 'bg-secondary/10 text-secondary border-secondary/20'
      case 'success':
        return 'bg-green-500/10 text-green-600 border-green-500/20' // Using generic green for success
      case 'warning':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' // Using generic yellow for warning
      case 'navy':
        return 'bg-navy-blue/10 text-navy-blue border-navy-blue/20'
      case 'teal':
        return 'bg-teal/10 text-teal border-teal/20'
      case 'blue':
        return 'bg-blue/10 text-blue border-blue/20'
      case 'light-blue':
        return 'bg-light-blue/10 text-light-blue border-light-blue/20'
      default:
        return 'bg-primary/10 text-primary border-primary/20'
    }
  }

  return (
    <Card className="hover-lift animate-fade-in">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
                {value}
              </p>
              {trend && (
                <span
                  className={`text-sm font-medium ${
                    trend.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {trend.isPositive ? '+' : '-'}
                  {trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${getColorClasses()}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
