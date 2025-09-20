import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/lib/mongodb'
import { trackPageView } from '@/lib/analytics'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Student {
  _id: string
  studentId: string
  name: string
  gender: 'Male' | 'Female' | 'Other'
  classId: string
}

interface AttendanceRecord {
  studentId: string
  status: 'Present' | 'Absent'
}

interface ClassAttendance {
  _id?: string
  classId: string
  date: string
  records: AttendanceRecord[]
  createdAt?: Date
  updatedAt?: Date
}

const Attendance = () => {
  const { toast } = useToast()
  const [students, setStudents] = useState<Student[]>([])
  const [classes, setClasses] = useState<string[]>([])
  const [selectedClass, setSelectedClass] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )
  const [classAttendance, setClassAttendance] = useState<AttendanceRecord[]>([])
  const [allAttendance, setAllAttendance] = useState<ClassAttendance[]>([])

  useEffect(() => {
    const fetchStudentsAndClasses = async () => {
      try {
        const studentsCollection = await db.students()
        const fetchedStudents = (await studentsCollection.find({})) as Student[]
        setStudents(fetchedStudents)
        const uniqueClasses = Array.from(
          new Set(fetchedStudents.map((s) => s.classId))
        )
        setClasses(uniqueClasses.sort())
        if (uniqueClasses.length > 0) {
          setSelectedClass(uniqueClasses[0])
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: error.message || 'Could not fetch students or classes.',
          variant: 'destructive',
        })
      }
    }
    fetchStudentsAndClasses()
  }, [])

  useEffect(() => {
    const fetchAttendanceForSelectedDateAndClass = async () => {
      if (selectedClass && selectedDate) {
        try {
          const attendanceCollection = await db.attendance()
          const existingAttendance = (await attendanceCollection.findOne({
            classId: selectedClass,
            date: selectedDate,
          })) as ClassAttendance

          const studentsInClass = students.filter(
            (s) => s.classId === selectedClass
          )

          if (existingAttendance) {
            // Pre-populate with existing attendance
            const populatedAttendance = studentsInClass.map((student) => ({
              studentId: student.studentId,
              status:
                existingAttendance.records.find(
                  (rec) => rec.studentId === student.studentId
                )?.status || 'Absent',
            }))
            setClassAttendance(populatedAttendance)
          } else {
            // Default to all absent if no record exists
            setClassAttendance(
              studentsInClass.map((student) => ({
                studentId: student.studentId,
                status: 'Absent',
              }))
            )
          }
        } catch (error: any) {
          toast({
            title: 'Error',
            description:
              error.message ||
              'Could not fetch attendance for selected date/class.',
            variant: 'destructive',
          })
        }
      }
    }
    fetchAttendanceForSelectedDateAndClass()
  }, [selectedClass, selectedDate, students])

  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const attendanceCollection = await db.attendance()
        const allRecords = (await attendanceCollection.find(
          {}
        )) as ClassAttendance[]
        setAllAttendance(allRecords)
      } catch (error: any) {
        toast({
          title: 'Error',
          description:
            error.message || 'Could not fetch all attendance records.',
          variant: 'destructive',
        })
      }
    }
    fetchAllAttendance()
  }, [classAttendance]) // Refresh when class attendance is updated

  const handleStatusChange = (
    studentId: string,
    status: 'Present' | 'Absent'
  ) => {
    setClassAttendance((prev) =>
      prev.map((record) =>
        record.studentId === studentId ? { ...record, status } : record
      )
    )
  }

  const handleSubmitAttendance = async () => {
    if (!selectedClass || !selectedDate) {
      toast({
        title: 'Missing Information',
        description: 'Please select a class and a date.',
        variant: 'destructive',
      })
      return
    }

    try {
      const attendanceCollection = await db.attendance()
      const existingAttendance = (await attendanceCollection.findOne({
        classId: selectedClass,
        date: selectedDate,
      })) as ClassAttendance

      const attendanceToSave: ClassAttendance = {
        classId: selectedClass,
        date: selectedDate,
        records: classAttendance,
      }

      if (existingAttendance) {
        await attendanceCollection.updateOne(
          { _id: existingAttendance._id },
          { $set: { records: classAttendance, updatedAt: new Date() } }
        )
        toast({
          title: 'Attendance Updated',
          description:
            'Attendance for the selected date and class has been updated.',
        })
      } else {
        await attendanceCollection.insertOne({
          ...attendanceToSave,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        toast({
          title: 'Attendance Recorded',
          description:
            'Attendance for the selected date and class has been recorded.',
        })
      }
      // Re-fetch all attendance to update the display table
      const allRecords = (await attendanceCollection.find(
        {}
      )) as ClassAttendance[]
      setAllAttendance(allRecords)
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not save attendance.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage Attendance</CardTitle>
          <CardDescription>
            Select a class and date to mark or edit attendance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="classSelect">Select Class</Label>
              <Select onValueChange={setSelectedClass} value={selectedClass}>
                <SelectTrigger id="classSelect">
                  <SelectValue placeholder="Select a class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls} value={cls}>
                      {cls}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateInput">Select Date</Label>
              <Input
                id="dateInput"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSubmitAttendance} className="w-full">
                Save Attendance
              </Button>
            </div>
          </div>

          {selectedClass && selectedDate && students.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Attendance for {selectedClass} on {selectedDate}
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students
                    .filter((s) => s.classId === selectedClass)
                    .map((student) => {
                      const record = classAttendance.find(
                        (rec) => rec.studentId === student.studentId
                      )
                      return (
                        <TableRow key={student._id}>
                          <TableCell>{student.studentId}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>
                            <Select
                              value={record?.status || 'Absent'}
                              onValueChange={(value: 'Present' | 'Absent') =>
                                handleStatusChange(student.studentId, value)
                              }
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Present">Present</SelectItem>
                                <SelectItem value="Absent">Absent</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>All Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Present</TableHead>
                <TableHead>Absent</TableHead>
                <TableHead>Total Students</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allAttendance.map((att) => {
                const presentCount = att.records.filter(
                  (r) => r.status === 'Present'
                ).length
                const absentCount = att.records.filter(
                  (r) => r.status === 'Absent'
                ).length
                const totalStudents = att.records.length
                return (
                  <TableRow key={att._id}>
                    <TableCell>{att.classId}</TableCell>
                    <TableCell>{att.date}</TableCell>
                    <TableCell>{presentCount}</TableCell>
                    <TableCell>{absentCount}</TableCell>
                    <TableCell>{totalStudents}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Attendance
