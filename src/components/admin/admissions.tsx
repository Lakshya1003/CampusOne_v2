import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/mongodb';
import { trackAdmissionCreated } from '@/lib/analytics';
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

const admissionSchema = z.object({
  studentName: z.string().min(1, { message: 'Student Name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  dateOfBirth: z.string().min(1, { message: 'Date of Birth is required.' }),
  course: z.string().min(1, { message: 'Course is required.' }),
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

interface AdmissionRecord extends AdmissionFormValues {
  _id: string;
  createdAt: Date;
}

const Admissions = () => {
  const { toast } = useToast();
  const [admissions, setAdmissions] = useState<AdmissionRecord[]>([]);
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentName: '',
      email: '',
      dateOfBirth: '',
      course: '',
    },
  });

  const fetchAdmissions = async () => {
    try {
      const admissionsCollection = await db.admissions();
      const admissionRecords = await admissionsCollection.find({});
      setAdmissions(admissionRecords as AdmissionRecord[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching admissions',
        description: error.message || 'Could not fetch admission records.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const onSubmit = async (data: AdmissionFormValues) => {
    try {
      const admissionsCollection = await db.admissions();
      await admissionsCollection.insertOne({
        ...data,
        createdAt: new Date(),
      });
      toast({
        title: 'Admission Created',
        description: 'The new admission has been successfully created.',
      });
      trackAdmissionCreated(data.course);
      form.reset();
      fetchAdmissions(); // Refresh the list
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not create admission.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create New Admission</CardTitle>
          <CardDescription>Enter the student's details below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="studentName">Student Name</Label>
              <Input id="studentName" {...form.register('studentName')} />
              {form.formState.errors.studentName && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.studentName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register('email')} />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" {...form.register('dateOfBirth')} />
              {form.formState.errors.dateOfBirth && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.dateOfBirth.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input id="course" {...form.register('course')} />
              {form.formState.errors.course && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.course.message}
                </p>
              )}
            </div>
            <Button type="submit">Create Admission</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Admissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Admission Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {admissions.map((admission) => (
                <TableRow key={admission._id}>
                  <TableCell>{admission.studentName}</TableCell>
                  <TableCell>{admission.email}</TableCell>
                  <TableCell>{admission.course}</TableCell>
                  <TableCell>{new Date(admission.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admissions;