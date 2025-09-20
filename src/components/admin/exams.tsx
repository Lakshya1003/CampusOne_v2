import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/mongodb';
import { trackExamUpload } from '@/lib/analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const examSchema = z.object({
  studentId: z.string().min(1, { message: 'Student ID is required.' }),
  subject: z.string().min(1, { message: 'Subject is required.' }),
  marks: z.number().min(0, { message: 'Marks must be a positive number.' }),
});

type ExamFormValues = z.infer<typeof examSchema>;

interface ExamRecord extends ExamFormValues {
  _id: string;
  createdAt: Date;
}

const Exams = () => {
  const { toast } = useToast();
  const [exams, setExams] = useState<ExamRecord[]>([]);
  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      studentId: '',
      subject: '',
      marks: 0,
    },
  });

  const fetchExams = async () => {
    try {
      const examsCollection = await db.exams();
      const examRecords = await examsCollection.find({});
      setExams(examRecords as ExamRecord[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching exams',
        description: error.message || 'Could not fetch exam records.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const onSubmit = async (data: ExamFormValues) => {
    try {
      const examsCollection = await db.exams();
      await examsCollection.insertOne({
        ...data,
        createdAt: new Date(),
      });
      toast({
        title: 'Exam Result Uploaded',
        description: 'The exam result has been successfully uploaded.',
      });
      trackExamUpload(data.subject, data.marks);
      form.reset();
      fetchExams(); // Refresh the list
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not upload exam result.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Upload Exam Result</CardTitle>
          <CardDescription>Enter the student's exam details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" {...form.register('studentId')} />
              {form.formState.errors.studentId && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.studentId.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" {...form.register('subject')} />
              {form.formState.errors.subject && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="marks">Marks</Label>
              <Input id="marks" type="number" {...form.register('marks', { valueAsNumber: true })} />
              {form.formState.errors.marks && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.marks.message}
                </p>
              )}
            </div>
            <Button type="submit">Upload Result</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Exam Results</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam._id}>
                  <TableCell>{exam.studentId}</TableCell>
                  <TableCell>{exam.subject}</TableCell>
                  <TableCell>{exam.marks}</TableCell>
                  <TableCell>{new Date(exam.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exams;