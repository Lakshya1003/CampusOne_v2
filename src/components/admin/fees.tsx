import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/lib/mongodb';
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

const feeSchema = z.object({
  studentId: z.string().min(1, { message: 'Student ID is required.' }),
  studentName: z.string().min(1, { message: 'Student Name is required.' }),
  amount: z.number().min(1, { message: 'Amount must be greater than 0.' }),
});

type FeeFormValues = z.infer<typeof feeSchema>;

interface FeeRecord extends FeeFormValues {
  _id: string;
  createdAt: Date;
}

const Fees = () => {
  const { toast } = useToast();
  const [fees, setFees] = useState<FeeRecord[]>([]);
  const form = useForm<FeeFormValues>({
    resolver: zodResolver(feeSchema),
    defaultValues: {
      studentId: '',
      studentName: '',
      amount: 0,
    },
  });

  const fetchFees = async () => {
    try {
      const feesCollection = await db.fees();
      const feeRecords = await feesCollection.find({});
      setFees(feeRecords as FeeRecord[]);
    } catch (error: any) {
      toast({
        title: 'Error fetching fees',
        description: error.message || 'Could not fetch fee records.',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const onSubmit = async (data: FeeFormValues) => {
    try {
      const feesCollection = await db.fees();
      await feesCollection.insertOne({
        ...data,
        createdAt: new Date(),
      });
      toast({
        title: 'Fee Recorded',
        description: 'The fee payment has been successfully recorded.',
      });
      form.reset();
      fetchFees(); // Refresh the list
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Could not record fee payment.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Record a Fee Payment</CardTitle>
          <CardDescription>Enter the student and fee details below.</CardDescription>
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
              <Label htmlFor="studentName">Student Name</Label>
              <Input id="studentName" {...form.register('studentName')} />
              {form.formState.errors.studentName && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.studentName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" {...form.register('amount', { valueAsNumber: true })} />
              {form.formState.errors.amount && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.amount.message}
                </p>
              )}
            </div>
            <Button type="submit">Record Payment</Button>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Fee Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>{fee.studentId}</TableCell>
                  <TableCell>{fee.studentName}</TableCell>
                  <TableCell>{fee.amount}</TableCell>
                  <TableCell>{new Date(fee.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Fees;
