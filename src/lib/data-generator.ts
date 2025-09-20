import { db } from './mongodb';

interface Student {
  studentId: string;
  name: string;
  gender: 'Male' | 'Female' | 'Other';
  classId: string;
}

const generateRandomName = (gender: 'Male' | 'Female' | 'Other') => {
  const maleNames = ['John', 'Peter', 'Mike', 'David', 'James'];
  const femaleNames = ['Mary', 'Jane', 'Sarah', 'Emily', 'Linda'];
  const otherNames = ['Alex', 'Casey', 'Jamie', 'Riley', 'Taylor'];

  if (gender === 'Male') return maleNames[Math.floor(Math.random() * maleNames.length)];
  if (gender === 'Female') return femaleNames[Math.floor(Math.random() * femaleNames.length)];
  return otherNames[Math.floor(Math.random() * otherNames.length)];
};

export const generateDummyStudents = (numClasses: number, studentsPerClass: number): Student[] => {
  const students: Student[] = [];
  for (let i = 1; i <= numClasses; i++) {
    const classId = `Class-${String(i).padStart(2, '0')}`;
    for (let j = 1; j <= studentsPerClass; j++) {
      const gender: 'Male' | 'Female' | 'Other' = Math.random() < 0.45 ? 'Male' : Math.random() < 0.9 ? 'Female' : 'Other';
      students.push({
        studentId: `${classId}-${String(j).padStart(3, '0')}`,
        name: generateRandomName(gender),
        gender,
        classId,
      });
    }
  }
  return students;
};

export const seedStudents = async () => {
  try {
    const studentsCollection = await db.students();
    const existingStudents = await studentsCollection.count();
    if (existingStudents === 0) {
      const dummyStudents = generateDummyStudents(5, 50);
      await studentsCollection.insertMany(dummyStudents);
      console.log('Dummy students seeded successfully!');
    } else {
      console.log('Students collection already contains data. Skipping seeding.');
    }
  } catch (error) {
    console.error('Error seeding students:', error);
  }
};
