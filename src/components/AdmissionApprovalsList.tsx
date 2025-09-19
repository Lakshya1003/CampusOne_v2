import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { CheckCircle, XCircle, Eye } from 'lucide-react'

interface Admission {
  id: string
  studentName: string
  course: string
  status: 'pending' | 'approved' | 'rejected'
  appliedDate: string
}

const mockAdmissions: Admission[] = [
  {
    id: 'ADM001',
    studentName: 'Alice Johnson',
    course: 'Computer Science',
    status: 'pending',
    appliedDate: '2025-09-15',
  },
  {
    id: 'ADM002',
    studentName: 'Bob Williams',
    course: 'Electrical Engineering',
    status: 'approved',
    appliedDate: '2025-09-14',
  },
  {
    id: 'ADM003',
    studentName: 'Charlie Brown',
    course: 'Mechanical Engineering',
    status: 'rejected',
    appliedDate: '2025-09-13',
  },
  {
    id: 'ADM004',
    studentName: 'Diana Prince',
    course: 'Physics',
    status: 'pending',
    appliedDate: '2025-09-12',
  },
  {
    id: 'ADM005',
    studentName: 'Eve Adams',
    course: 'Chemistry',
    status: 'pending',
    appliedDate: '2025-09-11',
  },
]

const AdmissionApprovalsList: React.FC = () => {
  const handleApprove = (id: string) => {
    console.log(`Approving admission ${id}`)
    // Logic to update admission status
  }

  const handleReject = (id: string) => {
    console.log(`Rejecting admission ${id}`)
    // Logic to update admission status
  }

  const handleView = (id: string) => {
    console.log(`Viewing admission details for ${id}`)
    // Logic to navigate to admission details page or open a modal
  }

  const getStatusBadge = (status: Admission['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="status-pending">Pending</Badge>
      case 'approved':
        return <Badge className="status-approved">Approved</Badge>
      case 'rejected':
        return <Badge className="status-rejected">Rejected</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-heading text-navy-blue">
          Admission Approvals
        </CardTitle>
        <CardDescription>
          Manage pending and approved student admissions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdmissions.map((admission) => (
              <TableRow key={admission.id}>
                <TableCell className="font-medium">{admission.id}</TableCell>
                <TableCell>{admission.studentName}</TableCell>
                <TableCell>{admission.course}</TableCell>
                <TableCell>{admission.appliedDate}</TableCell>
                <TableCell>{getStatusBadge(admission.status)}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleView(admission.id)}
                    className="mr-2"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {admission.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleApprove(admission.id)}
                        className="text-green-600 hover:text-green-700 mr-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleReject(admission.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default AdmissionApprovalsList
