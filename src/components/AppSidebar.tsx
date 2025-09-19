import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  Home,
  UserPlus,
  DollarSign,
  Building,
  FileText,
  Users,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  GraduationCap,
  Receipt,
  BedDouble,
  ClipboardCheck,
} from 'lucide-react'

interface AppSidebarProps {
  userRole?: 'admin' | 'student'
}

const SidebarLink: React.FC<{
  to: string
  icon: React.ElementType
  title: string
}> = ({ to, icon: Icon, title }) => {
  const location = useLocation()
  const isActive =
    location.pathname === to || (location.pathname.startsWith(to) && to !== '/')

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground ${
          isActive
            ? 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground'
            : 'text-foreground'
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {title}
    </NavLink>
  )
}

// Admin navigation items
const adminItems = [
  { title: 'Dashboard', url: '/admin', icon: Home },
  { title: 'Admission Approvals', url: '/admin/admissions', icon: UserPlus },
  { title: 'Fee Management', url: '/admin/fees', icon: DollarSign },
  { title: 'Hostel Allocation', url: '/admin/hostel', icon: Building },
  { title: 'Exam Results', url: '/admin/exams', icon: FileText },
  { title: 'Attendance', url: '/admin/attendance', icon: Calendar },
  { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
  { title: 'Notifications', url: '/admin/notifications', icon: Bell },
  { title: 'Settings & Roles', url: '/admin/settings', icon: Settings },
]

// Student navigation items
const studentItems = [
  { title: 'Dashboard', url: '/student', icon: Home },
  { title: 'Admission Form', url: '/student/admission', icon: GraduationCap },
  { title: 'Fee Payment', url: '/student/fees', icon: Receipt },
  { title: 'Hostel Application', url: '/student/hostel', icon: BedDouble },
  { title: 'Exam Results', url: '/student/results', icon: FileText },
  { title: 'Attendance', url: '/student/attendance', icon: ClipboardCheck },
  { title: 'Notifications', url: '/student/notifications', icon: Bell },
  { title: 'Settings', url: '/student/settings', icon: Settings },
]

export function AppSidebar({ userRole = 'student' }: AppSidebarProps) {
  const items = userRole === 'admin' ? adminItems : studentItems

  return (
    <div className="flex flex-col h-full">
      {items.map((item) => (
        <SidebarLink
          key={item.url}
          to={item.url}
          icon={item.icon}
          title={item.title}
        />
      ))}
    </div>
  )
}
