import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Textarea } from './ui/textarea'
import { useToast } from './ui/use-toast'
import { UploadCloud, XCircle, FileText } from 'lucide-react'

const admissionSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits.'),
  address: z.string().min(10, 'Address must be at least 10 characters.'),
  course: z.string().min(1, 'Please select a course.'),
  previousInstitution: z
    .string()
    .min(2, 'Previous institution name is required.'),
  previousGrade: z.string().min(1, 'Previous grade/percentage is required.'),
})

type AdmissionFormValues = z.infer<typeof admissionSchema>

const mockCourses = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electronics & Communication',
  'Information Technology',
]

const AdmissionForm: React.FC = () => {
  const [documents, setDocuments] = useState<{ [key: string]: File | null }>({
    photo: null,
    transcript: null,
    idProof: null,
  })
  const { toast } = useToast()

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      fullName: '',
      gender: 'male',
      dateOfBirth: '',
      email: '',
      phone: '',
      address: '',
      course: '',
      previousInstitution: '',
      previousGrade: '',
    },
  })

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      setDocuments((prev) => ({ ...prev, [type]: file }))
      toast({
        title: 'File Uploaded',
        description: `${file.name} has been uploaded successfully.`,
      })
    }
  }

  const handleRemoveFile = (type: string) => {
    setDocuments((prev) => ({ ...prev, [type]: null }))
    toast({
      title: 'File Removed',
      description: `${type} document has been removed.`,
    })
  }

  const onSubmit = (data: AdmissionFormValues) => {
    // Check if all required documents are uploaded
    if (!documents.photo || !documents.transcript || !documents.idProof) {
      toast({
        title: 'Missing Documents',
        description: 'Please upload all required documents.',
        variant: 'destructive',
      })
      return
    }

    console.log('Form data:', data)
    console.log('Documents:', documents)

    toast({
      title: 'Application Submitted',
      description:
        'Your admission application has been submitted successfully.',
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-heading text-navy-blue">
          Admission Application
        </CardTitle>
        <CardDescription>
          Fill out the form below to apply for admission.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Personal Information
            </h3>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...form.register('fullName')} />
              {form.formState.errors.fullName && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <Label>Gender</Label>
              <RadioGroup
                onValueChange={(value) =>
                  form.setValue('gender', value as 'male' | 'female' | 'other')
                }
                defaultValue={form.getValues('gender')}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                {...form.register('dateOfBirth')}
              />
              {form.formState.errors.dateOfBirth && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.dateOfBirth.message}
                </p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Contact Information
            </h3>

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
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...form.register('phone')} />
              {form.formState.errors.phone && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" {...form.register('address')} />
              {form.formState.errors.address && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>
          </div>

          {/* Academic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Academic Information
            </h3>

            <div>
              <Label htmlFor="course">Course Selection</Label>
              <Select onValueChange={(value) => form.setValue('course', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map((course) => (
                    <SelectItem key={course} value={course}>
                      {course}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.course && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.course.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="previousInstitution">Previous Institution</Label>
              <Input
                id="previousInstitution"
                {...form.register('previousInstitution')}
              />
              {form.formState.errors.previousInstitution && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.previousInstitution.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="previousGrade">Previous Grade/Percentage</Label>
              <Input id="previousGrade" {...form.register('previousGrade')} />
              {form.formState.errors.previousGrade && (
                <p className="text-sm text-destructive mt-1">
                  {form.formState.errors.previousGrade.message}
                </p>
              )}
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Required Documents
            </h3>

            {/* Photo Upload */}
            <div>
              <Label htmlFor="photo">Recent Photograph</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'photo')}
                />
                {documents.photo && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile('photo')}
                    className="text-destructive"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Academic Transcript */}
            <div>
              <Label htmlFor="transcript">Academic Transcript</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="transcript"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e, 'transcript')}
                />
                {documents.transcript && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile('transcript')}
                    className="text-destructive"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* ID Proof */}
            <div>
              <Label htmlFor="idProof">ID Proof</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="idProof"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e, 'idProof')}
                />
                {documents.idProof && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveFile('idProof')}
                    className="text-destructive"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Button type="submit" className="btn-primary w-full">
            Submit Application
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default AdmissionForm
