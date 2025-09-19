import React, { useState } from 'react'
import { StatCard } from '@/components/StatCard'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import AdmissionForm from '@/components/AdmissionForm'
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
  Star,
  FileText,
  ClipboardCheck,
  Bell,
  Settings,
} from 'lucide-react'

// Mock data for the student dashboard
const studentStats = [
  {
    title: 'Current Semester',
    value: 'Spring 2024',
    icon: BookOpen,
    description: 'Computer Science',
    colorScheme: 'teal' as const,
  },
  {
    title: 'GPA',
    value: '3.85',
    icon: Star,
    description: 'Overall performance',
    trend: { value: 5, isPositive: true },
    colorScheme: 'blue' as const,
  },
  {
    title: 'Attendance',
    value: '92%',
    icon: Calendar,
    description: 'This semester',
    trend: { value: 2, isPositive: true },
    colorScheme: 'navy' as const,
  },
  {
    title: 'Pending Fees',
    value: '$2,450',
    icon: DollarSign,
    description: 'Spring 2024',
    colorScheme: 'light-blue' as const,
  },
]

const StudentDashboard: React.FC = () => {
  const [showAdmissionForm, setShowAdmissionForm] = useState(false)

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-heading font-bold text-navy-blue">
        Student Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {studentStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Admission Status & Fee Payment */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-heading text-navy-blue">
              Admission Status
            </CardTitle>
            <CardDescription>
              View your admission application status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showAdmissionForm ? (
              <div className="space-y-4">
                <AdmissionForm />
                <Button
                  variant="outline"
                  onClick={() => setShowAdmissionForm(false)}
                  className="w-full"
                >
                  Close Form
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-teal">Pending</Badge>
                  <span className="text-sm text-muted-foreground">
                    ID: #APP2024001
                  </span>
                </div>
                <Progress value={40} className="h-2" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Application Progress</span>
                  <span>40%</span>
                </div>
                <Button
                  className="mt-4 w-full btn-secondary"
                  onClick={() => setShowAdmissionForm(true)}
                >
                  Continue Application
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-heading text-navy-blue">
              Fee Payment
            </CardTitle>
            <CardDescription>
              Manage your fees and make payments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Fee Dashboard + Razorpay-style checkout modal */}
            <p className="text-muted-foreground">
              Fee dashboard and payment options will go here.
            </p>
            <Button className="mt-4 btn-primary">Pay Fees Now</Button>
          </CardContent>
        </Card>
      </div>

      {/* Hostel & Exam Results */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-heading text-navy-blue">
              Hostel Application
            </CardTitle>
            <CardDescription>Apply for hostel accommodation.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Hostel application + room map */}
            <p className="text-muted-foreground">
              Hostel application and room map will go here.
            </p>
            <Button className="mt-4 btn-secondary">Apply for Hostel</Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-heading text-navy-blue">
              Exam Results
            </CardTitle>
            <CardDescription>View your latest exam results.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Student result page */}
            <p className="text-muted-foreground">
              Your exam results will be displayed here.
            </p>
            <Button className="mt-4 btn-secondary">View Results</Button>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-heading text-navy-blue">
            Attendance Analytics
          </CardTitle>
          <CardDescription>
            Track your attendance trends and predictions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Placeholder for Attendance analytics (student view: charts, trends, predictions) */}
          <p className="text-muted-foreground">
            Attendance charts and analysis will go here.
          </p>
          <Button className="mt-4 btn-secondary">
            View Detailed Attendance
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentDashboard
