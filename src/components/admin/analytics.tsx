import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/mongodb';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Student {
  _id: string;
}

interface AdmissionRecord {
  _id: string;
}

interface FeeRecord {
  _id: string;
  amount: number;
}

interface ClassAttendance {
  _id: string;
  records: { status: 'Present' | 'Absent' }[];
}

interface ExamRecord {
  _id: string;
  marks: number;
}

const Analytics = () => {
  const { toast } = useToast();
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalAdmissions, setTotalAdmissions] = useState(0);
  const [totalFeesCollected, setTotalFeesCollected] = useState(0);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [averageMarks, setAverageMarks] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Total Students
        const studentsCollection = await db.students();
        const studentsCount = await studentsCollection.count();
        setTotalStudents(studentsCount);

        // Fetch Total Admissions
        const admissionsCollection = await db.admissions();
        const admissionsCount = await admissionsCollection.count();
        setTotalAdmissions(admissionsCount);

        // Fetch Total Fees Collected
        const feesCollection = await db.fees();
        const feesRecords = await feesCollection.find({}) as FeeRecord[];
        const totalFees = feesRecords.reduce((sum, fee) => sum + fee.amount, 0);
        setTotalFeesCollected(totalFees);

        // Fetch Attendance Summary
        const attendanceCollection = await db.attendance();
        const attendanceRecords = await attendanceCollection.find({}) as ClassAttendance[];
        let presentCount = 0;
        let absentCount = 0;
        attendanceRecords.forEach(classAtt => {
          classAtt.records.forEach(rec => {
            if (rec.status === 'Present') {
              presentCount++;
            } else {
              absentCount++;
            }
          });
        });
        setTotalPresent(presentCount);
        setTotalAbsent(absentCount);

        // Fetch Exam Results Summary
        const examsCollection = await db.exams();
        const examRecords = await examsCollection.find({}) as ExamRecord[];
        const totalMarks = examRecords.reduce((sum, exam) => sum + exam.marks, 0);
        const avgMarks = examRecords.length > 0 ? totalMarks / examRecords.length : 0;
        setAverageMarks(avgMarks);

      } catch (error: any) {
        toast({
          title: 'Error fetching analytics data',
          description: error.message || 'Could not fetch data for analytics.',
          variant: 'destructive',
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">College ERP Analytics Dashboard</h1>
      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87m-3-1.13a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">Total registered students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admissions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmissions}</div>
            <p className="text-xs text-muted-foreground">New admissions this year</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees Collected</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 20h9" />
              <path d="M16.5 6.5a4.5 4.5 0 0 0-9 0v3.5H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-1.5V10a4.5 4.5 0 0 0-4.5-4.5z" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFeesCollected.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total revenue from fees</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance Summary</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPresent} Present</div>
            <p className="text-xs text-muted-foreground">{totalAbsent} Absent</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Exam Marks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMarks.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">Overall average across all exams</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;