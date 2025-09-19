import React, { useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge' // Added Badge import
import { BedDouble, User, XCircle } from 'lucide-react' // Added XCircle import
import { useToast } from './ui/use-toast'

interface Room {
  id: string
  roomNumber: string
  capacity: number
  occupants: string[] // Array of student IDs
}

interface Student {
  id: string
  name: string
  allocatedRoomId: string | null
}

const mockRooms: Room[] = [
  { id: 'R001', roomNumber: '101', capacity: 2, occupants: ['S001'] },
  { id: 'R002', roomNumber: '102', capacity: 2, occupants: ['S002', 'S003'] },
  { id: 'R003', roomNumber: '103', capacity: 1, occupants: [] },
  { id: 'R004', roomNumber: '104', capacity: 3, occupants: ['S004', 'S005'] },
  { id: 'R005', roomNumber: '105', capacity: 2, occupants: [] },
]

const mockStudents: Student[] = [
  { id: 'S001', name: 'Alice Johnson', allocatedRoomId: 'R001' },
  { id: 'S002', name: 'Bob Williams', allocatedRoomId: 'R002' },
  { id: 'S003', name: 'Charlie Brown', allocatedRoomId: 'R002' },
  { id: 'S004', name: 'Diana Prince', allocatedRoomId: 'R004' },
  { id: 'S005', name: 'Eve Adams', allocatedRoomId: 'R004' },
  { id: 'S006', name: 'Frank Green', allocatedRoomId: null },
  { id: 'S007', name: 'Grace Hall', allocatedRoomId: null },
]

const HostelAllocationPanel: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [students, setStudents] = useState<Student[]>(mockStudents)
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  )
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const { toast } = useToast()

  const availableStudents = students.filter((s) => s.allocatedRoomId === null)
  const availableRooms = rooms.filter(
    (room) => room.occupants.length < room.capacity
  )

  const handleAllocate = () => {
    if (!selectedStudentId || !selectedRoomId) {
      toast({
        title: 'Allocation Failed',
        description: 'Please select both a student and a room.',
        variant: 'destructive',
      })
      return
    }

    const studentToAllocate = students.find((s) => s.id === selectedStudentId)
    const roomToAllocate = rooms.find((r) => r.id === selectedRoomId)

    if (!studentToAllocate || !roomToAllocate) {
      toast({
        title: 'Allocation Failed',
        description: 'Student or room not found.',
        variant: 'destructive',
      })
      return
    }

    if (roomToAllocate.occupants.length >= roomToAllocate.capacity) {
      toast({
        title: 'Allocation Failed',
        description: `Room ${roomToAllocate.roomNumber} is full.`,
        variant: 'destructive',
      })
      return
    }

    // Update room occupants
    const updatedRooms = rooms.map((room) =>
      room.id === selectedRoomId
        ? { ...room, occupants: [...room.occupants, selectedStudentId] }
        : room
    )

    // Update student allocation
    const updatedStudents = students.map((student) =>
      student.id === selectedStudentId
        ? { ...student, allocatedRoomId: selectedRoomId }
        : student
    )

    setRooms(updatedRooms)
    setStudents(updatedStudents)
    setSelectedStudentId(null)
    setSelectedRoomId(null)

    toast({
      title: 'Allocation Successful',
      description: `${studentToAllocate.name} allocated to Room ${roomToAllocate.roomNumber}.`,
    })
  }

  const handleDeallocate = (studentId: string, roomId: string) => {
    const studentToDeallocate = students.find((s) => s.id === studentId)
    const roomToDeallocate = rooms.find((r) => r.id === roomId)

    if (!studentToDeallocate || !roomToDeallocate) {
      toast({
        title: 'Deallocation Failed',
        description: 'Student or room not found.',
        variant: 'destructive',
      })
      return
    }

    // Remove student from room occupants
    const updatedRooms = rooms.map((room) =>
      room.id === roomId
        ? {
            ...room,
            occupants: room.occupants.filter((id) => id !== studentId),
          }
        : room
    )

    // Clear student's allocated room
    const updatedStudents = students.map((student) =>
      student.id === studentId ? { ...student, allocatedRoomId: null } : student
    )

    setRooms(updatedRooms)
    setStudents(updatedStudents)

    toast({
      title: 'Deallocation Successful',
      description: `${studentToDeallocate.name} deallocated from Room ${roomToDeallocate.roomNumber}.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-heading text-navy-blue">
          Hostel Allocation
        </CardTitle>
        <CardDescription>
          Manage student room allocations in hostels.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Allocation Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="student-select">Select Student</Label>
            <Select
              onValueChange={setSelectedStudentId}
              value={selectedStudentId || ''}
            >
              <SelectTrigger id="student-select">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {availableStudents.length === 0 && (
                  <SelectItem value="" disabled>
                    No unallocated students
                  </SelectItem>
                )}
                {availableStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="room-select">Select Room</Label>
            <Select
              onValueChange={setSelectedRoomId}
              value={selectedRoomId || ''}
            >
              <SelectTrigger id="room-select">
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.length === 0 && (
                  <SelectItem value="" disabled>
                    No available rooms
                  </SelectItem>
                )}
                {availableRooms.map((room) => (
                  <SelectItem key={room.id} value={room.id}>
                    Room {room.roomNumber} ({room.occupants.length}/
                    {room.capacity})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleAllocate} className="btn-primary">
            Allocate Room
          </Button>
        </div>

        {/* Room Occupancy Table */}
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
            Room Occupancy
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room No.</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Occupants</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">
                    {room.roomNumber}
                  </TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>
                    {room.occupants.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {room.occupants.map((studentId) => {
                          const student = students.find(
                            (s) => s.id === studentId
                          )
                          return student ? (
                            <Badge
                              key={student.id}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              <User className="h-3 w-3" /> {student.name}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1 text-muted-foreground hover:text-destructive"
                                onClick={() =>
                                  handleDeallocate(student.id, room.id)
                                }
                              >
                                <XCircle className="h-3 w-3" />
                              </Button>
                            </Badge>
                          ) : null
                        })}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Empty</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {room.occupants.length < room.capacity && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRoomId(room.id)}
                        className="text-primary"
                      >
                        Allocate
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default HostelAllocationPanel
