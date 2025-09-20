import React, { useEffect } from 'react';
import { seedStudents } from '@/lib/data-generator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const SeedData = () => {
  const { toast } = useToast();

  const handleSeed = async () => {
    try {
      await seedStudents();
      toast({
        title: 'Seeding Complete',
        description: 'Dummy student data has been seeded (if collection was empty).',
      });
    } catch (error: any) {
      toast({
        title: 'Seeding Failed',
        description: error.message || 'An error occurred during seeding.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Data Seeder</h1>
      <p className="mb-4">Click the button below to seed dummy student data into MongoDB.</p>
      <Button onClick={handleSeed}>Seed Student Data</Button>
    </div>
  );
};

export default SeedData;
