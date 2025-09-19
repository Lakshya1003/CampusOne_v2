import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  DollarSign, 
  Building, 
  GraduationCap, 
  TrendingUp,
  Calendar,
  FileCheck,
  AlertCircle,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Mock data for the dashboard
const statsData = [
  {
    title: "Total Students",
    value: "1,247",
    icon: Users,
    description: "Active enrollments",
    trend: { value: 12, isPositive: true },
    colorScheme: 'primary' as const
  },
  {
    title: "Pending Admissions",
    value: "24",
    icon: GraduationCap,
    description: "Awaiting approval",
    colorScheme: 'warning' as const
  },
  {
    title: "Fee Collection",
    value: "$234,560",
    icon: DollarSign,
    description: "This month",
    trend: { value: 8, isPositive: true },
    colorScheme: 'success' as const
  },
  {
    title: "Hostel Occupancy",
    value: "87%",
    icon: Building,
    description: "342/394 rooms",
    colorScheme: 'secondary' as const
  },
  {
    title: "Attendance Rate",
    value: "94.2%",
    icon: Calendar,
    description: "This week average",
    trend: { value: 2, isPositive: true },
    colorScheme: 'navy' as const
  },
  {
    title: "Exam Completion",
    value: "89%",
    icon: FileCheck,
    description: "Current semester",
    colorScheme: 'primary' as const
  }
];

const recentAdmissions = [
  { id: 1, name: "Sarah Johnson", email: "sarah.j@email.com", course: "Computer Science", status: "pending", appliedDate: "2024-01-15" },
  { id: 2, name: "Michael Chen", email: "m.chen@email.com", course: "Business Administration", status: "pending", appliedDate: "2024-01-14" },
  { id: 3, name: "Emily Davis", email: "emily.d@email.com", course: "Engineering", status: "approved", appliedDate: "2024-01-13" },
  { id: 4, name: "James Wilson", email: "j.wilson@email.com", course: "Arts & Design", status: "pending", appliedDate: "2024-01-12" },
  { id: 5, name: "Lisa Martinez", email: "l.martinez@email.com", course: "Medicine", status: "rejected", appliedDate: "2024-01-11" },
];

const recentActivities = [
  { id: 1, activity: "New admission application received", user: "Sarah Johnson", time: "2 hours ago", type: "admission" },
  { id: 2, activity: "Fee payment completed", user: "Michael Chen", time: "4 hours ago", type: "payment" },
  { id: 3, activity: "Hostel room allocated", user: "Emily Davis", time: "6 hours ago", type: "hostel" },
  { id: 4, activity: "Attendance marked for CS101", user: "Prof. Anderson", time: "8 hours ago", type: "attendance" },
  { id: 5, activity: "Exam results uploaded", user: "Dr. Williams", time: "1 day ago", type: "exam" },
];

export default function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="erp-status-approved">Approved</Badge>;
      case 'rejected':
        return <Badge className="erp-status-rejected">Rejected</Badge>;
      default:
        return <Badge className="erp-status-pending">Pending</Badge>;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'admission':
        return <GraduationCap className="h-4 w-4 text-primary" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-success" />;
      case 'hostel':
        return <Building className="h-4 w-4 text-secondary" />;
      case 'attendance':
        return <Calendar className="h-4 w-4 text-navy" />;
      case 'exam':
        return <FileCheck className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DashboardLayout userRole="admin" title="Admin Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              description={stat.description}
              trend={stat.trend}
              colorScheme={stat.colorScheme}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="erp-card">
          <CardHeader>
            <CardTitle className="font-heading">Quick Actions</CardTitle>
            <CardDescription>Frequently used administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="erp-button-primary h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>Review Admissions</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <DollarSign className="h-6 w-6" />
                <span>Manage Fees</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-navy text-navy hover:bg-navy hover:text-navy-foreground">
                <Building className="h-6 w-6" />
                <span>Hostel Allocation</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-success text-success hover:bg-success hover:text-success-foreground">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Admissions */}
          <Card className="erp-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-heading">Recent Admission Applications</CardTitle>
                <CardDescription>Latest student applications requiring review</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAdmissions.map((admission) => (
                  <div key={admission.id} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-medium text-foreground">{admission.name}</h4>
                        {getStatusBadge(admission.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{admission.course}</p>
                      <p className="text-xs text-muted-foreground">{admission.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {admission.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" className="border-success text-success hover:bg-success hover:text-success-foreground">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="erp-card">
            <CardHeader>
              <CardTitle className="font-heading">Recent Activities</CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="p-2 rounded-md bg-muted/50">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">by {activity.user}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}