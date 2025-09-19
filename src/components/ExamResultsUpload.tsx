import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { UploadCloud, FileText, XCircle } from 'lucide-react'
import { useToast } from './ui/use-toast'

const ExamResultsUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]
      if (file.type === 'text/csv') {
        setSelectedFile(file)
      } else {
        setSelectedFile(null)
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a CSV file.',
          variant: 'destructive',
        })
      }
    } else {
      setSelectedFile(null)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: 'No File Selected',
        description: 'Please select a CSV file to upload.',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)
    // Simulate API call for file upload
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate upload time
      console.log('Uploading file:', selectedFile.name)
      toast({
        title: 'Upload Successful',
        description: `${selectedFile.name} has been uploaded and processed.`,
      })
      setSelectedFile(null)
    } catch (error) {
      console.error('Upload failed:', error)
      toast({
        title: 'Upload Failed',
        description:
          'There was an error uploading your file. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-heading text-navy-blue">
          Exam Results Upload
        </CardTitle>
        <CardDescription>Upload student exam results via CSV.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="results-csv">Upload CSV File</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="results-csv"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="flex-1"
            />
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="btn-primary"
            >
              {uploading ? 'Uploading...' : 'Upload'}
              <UploadCloud className="ml-2 h-4 w-4" />
            </Button>
          </div>
          {selectedFile && (
            <div className="flex items-center justify-between rounded-md bg-soft-gray p-3 mt-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {selectedFile.name}
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                <XCircle className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-1">
            Please upload a CSV file with student ID, subject, and marks.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ExamResultsUpload
