import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  DollarSign, 
  BedDouble, 
  BookOpen, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star
} from 'lucide-react';

// Mock data for the student dashboard
const studentStats = [
  {
    title: "Current Semester",
    value: "Spring 2024",
    icon: BookOpen,
    description: "Computer Science",
    colorScheme: 'primary' as const
  },
  {
    title: "GPA",
    value: "3.85",
    icon: Star,
    description: "Overall performance",
    trend: { value: 5, isPositive: true },
    colorScheme: 'success' as const
  },
  {
    title: "Attendance",
    value: "92%",
    icon: Calendar,
    description: "This semester",
    trend: { value: 2, isPositive: true },
    colorScheme: 'secondary' as const
  },
  {
    title: "Pending Fees",
    value: "$2,450",
    icon: DollarSign,
    description: "Spring 2024",
    colorScheme: 'warning' as const
  }
];

const upcomingDeadlines = [
  { id: 1, title: "Assignment - Data Structures", course: "CS201", dueDate: "2024-01-20", priority: "high" },
  { id: 2, title: "Fee Payment - Spring 2024", course: "Administration", dueDate: "2024-01-25", priority: "high" },
  { id: 3, title: "Hostel Room Preference", course: "Housing", dueDate: "2024-01-30", priority: "medium" },
  { id: 4, title: "Mid-term Exam - Mathematics", course: "MATH301", dueDate: "2024-02-05", priority: "medium" },
];

const recentGrades = [
  { id: 1, course: "Computer Science Fundamentals", code: "CS101", grade: "A", credits: 3, semester: "Fall 2023" },
  { id: 2, course: "Mathematics for CS", code: "MATH201", grade: "A-", credits: 4, semester: "Fall 2023" },
  { id: 3, course: "Physics I", code: "PHY101", grade: "B+", credits: 3, semester: "Fall 2023" },
  { id: 4, course: "English Composition", code: "ENG101", grade: "A", credits: 3, semester: "Fall 2023" },
];

const attendanceData = [
  { course: "Data Structures", code: "CS201", attended: 28, total: 30, percentage: 93 },
  { course: "Algorithms", code: "CS301", attended: 25, total: 28, percentage: 89 },
  { course: "Database Systems", code: "CS202", attended: 30, total: 32, percentage: 94 },
  { course: "Software Engineering", code: "CS401", attended: 22, total: 24, percentage: 92 },
];

export default function StudentDashboard() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-destructive';
      case 'medium':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-success';
    if (grade.startsWith('B')) return 'text-secondary';
    if (grade.startsWith('C')) return 'text-warning';
    return 'text-destructive';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <DashboardLayout userRole="student" title="Student Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <Card className="erp-card bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Welcome back, <span className="erp-gradient-text">Alex Johnson</span>!
                </h2>
                <p className="text-muted-foreground">Here's your academic overview for Spring 2024</p>
              </div>
              <div className="hidden md:block">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentStats.map((stat, index) => (
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
            <CardDescription>Frequently used student services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="erp-button-primary h-20 flex-col gap-2">
                <DollarSign className="h-6 w-6" />
                <span>Pay Fees</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                <BedDouble className="h-6 w-6" />
                <span>Hostel Application</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-navy text-navy hover:bg-navy hover:text-navy-foreground">
                <BookOpen className="h-6 w-6" />
                <span>View Results</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2 border-success text-success hover:bg-success hover:text-success-foreground">
                <Calendar className="h-6 w-6" />
                <span>Check Attendance</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upcoming Deadlines */}
          <Card className="erp-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-heading">Upcoming Deadlines</CardTitle>
                <CardDescription>Important dates and submissions</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                View Calendar
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${deadline.priority === 'high' ? 'bg-destructive/10' : 'bg-warning/10'}`}>
                        {deadline.priority === 'high' ? (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        ) : (
                          <Clock className="h-4 w-4 text-warning" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{deadline.title}</h4>
                        <p className="text-sm text-muted-foreground">{deadline.course}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-medium ${getPriorityColor(deadline.priority)}`}>
                        {deadline.dueDate}
                      </p>
                      <Badge variant="outline" className={deadline.priority === 'high' ? 'border-destructive text-destructive' : 'border-warning text-warning'}>
                        {deadline.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card className="erp-card">
            <CardHeader>
              <CardTitle className="font-heading">Recent Grades</CardTitle>
              <CardDescription>Latest academic performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div key={grade.id} className="flex items-center justify-between p-3 rounded-md border border-border hover:bg-muted/50 transition-colors">
                    <div>
                      <h4 className="font-medium text-foreground">{grade.course}</h4>
                      <p className="text-sm text-muted-foreground">{grade.code} • {grade.credits} credits</p>
                      <p className="text-xs text-muted-foreground">{grade.semester}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Overview */}
        <Card className="erp-card">
          <CardHeader>
            <CardTitle className="font-heading">Attendance Overview</CardTitle>
            <CardDescription>Current semester attendance by course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {attendanceData.map((course) => (
                <div key={course.code} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">{course.course}</h4>
                      <p className="text-sm text-muted-foreground">{course.code}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getAttendanceColor(course.percentage)}`}>
                        {course.percentage}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {course.attended}/{course.total} classes
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={course.percentage} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}