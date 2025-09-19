import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Label } from './ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Badge } from './ui/badge'
import { CheckCircle, XCircle, CalendarDays } from 'lucide-react'
import { useToast } from './ui/use-toast'

interface Student {
  id: string
  name: string
  status: 'present' | 'absent' | 'unmarked'
}

interface Class {
  id: string
  name: string
  periods: string[]
}

const mockClasses: Class[] = [
  {
    id: 'C001',
    name: '10th Grade - A',
    periods: ['Math', 'Science', 'English'],
  },
  {
    id: 'C002',
    name: '11th Grade - B',
    periods: ['Physics', 'Chemistry', 'Biology'],
  },
]

const mockStudents: Student[] = [
  { id: 'S001', name: 'Alice Johnson', status: 'unmarked' },
  { id: 'S002', name: 'Bob Williams', status: 'unmarked' },
  { id: 'S003', name: 'Charlie Brown', status: 'unmarked' },
  { id: 'S004', name: 'Diana Prince', status: 'unmarked' },
  { id: 'S005', name: 'Eve Adams', status: 'unmarked' },
]

const AttendanceMarkingInterface: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null)
  const [studentsAttendance, setStudentsAttendance] =
    useState<Student[]>(mockStudents)
  const { toast } = useToast()

  const handleMarkAttendance = (
    studentId: string,
    status: 'present' | 'absent'
  ) => {
    setStudentsAttendance((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status } : student
      )
    )
    toast({
      title: 'Attendance Marked',
      description: `Student ${studentId} marked as ${status}.`,
    })
  }

  const handleSubmitAttendance = () => {
    console.log('Submitting attendance for:', {
      class: selectedClass,
      period: selectedPeriod,
      attendance: studentsAttendance.map((s) => ({
        id: s.id,
        status: s.status,
      })),
    })
    toast({
      title: 'Attendance Submitted',
      description: 'Attendance records have been saved.',
    })
    // Reset state or navigate
    setSelectedClass(null)
    setSelectedPeriod(null)
    setStudentsAttendance(
      mockStudents.map((s) => ({ ...s, status: 'unmarked' }))
    )
  }

  const currentClass = mockClasses.find((c) => c.id === selectedClass)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-heading text-navy-blue">
          Attendance Marking
        </CardTitle>
        <CardDescription>
          Mark student attendance for classes and periods.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="class-select">Select Class</Label>
            <Select
              onValueChange={setSelectedClass}
              value={selectedClass || ''}
            >
              <SelectTrigger id="class-select">
                <SelectValue placeholder="Select a class" />
              </SelectTrigger>
              <SelectContent>
                {mockClasses.map((cls) => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="period-select">Select Period</Label>
            <Select
              onValueChange={setSelectedPeriod}
              value={selectedPeriod || ''}
              disabled={!selectedClass}
            >
              <SelectTrigger id="period-select">
                <SelectValue placeholder="Select a period" />
              </SelectTrigger>
              <SelectContent>
                {currentClass?.periods.map((period) => (
                  <SelectItem key={period} value={period}>
                    {period}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedClass && selectedPeriod && (
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Mark Attendance for {currentClass?.name} - {selectedPeriod}
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentsAttendance.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">
                      {student.name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          {
                            present: 'status-approved',
                            absent: 'status-rejected',
                            unmarked: 'status-pending',
                          }[student.status]
                        }
                      >
                        {student.status.charAt(0).toUpperCase() +
                          student.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleMarkAttendance(student.id, 'present')
                        }
                        className="text-green-600 hover:text-green-700 mr-2"
                        disabled={student.status === 'present'}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleMarkAttendance(student.id, 'absent')
                        }
                        className="text-red-600 hover:text-red-700"
                        disabled={student.status === 'absent'}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              onClick={handleSubmitAttendance}
              className="btn-primary w-full"
            >
              Submit Attendance
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default AttendanceMarkingInterface
