import React from 'react'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trackPageView } from '@/lib/analytics'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

// Pages and Layouts
import NotFound from './pages/NotFound'
import LoginPage from './components/LoginPage'
import SignUpPage from './components/SignUpPage'
import { DashboardLayout } from './components/DashboardLayout'
import { AppSidebar } from './components/AppSidebar'
import AdminDashboard from './pages/AdminDashboard'

// Admin Components
import Admissions from './components/admin/admissions'
import Fees from './components/admin/fees'
import Hostel from './components/admin/hostel'
import Exams from './components/admin/exams'
import Attendance from './components/admin/attendance'
import Analytics from './components/admin/analytics'
import Notifications from './components/admin/notifications'
import Settings from './components/admin/settings'


// Student Components
import StudentDashboard from './pages/StudentDashboard'
import AdmissionForm from './components/AdmissionForm'
import HostelAllocationPanel from './components/HostelAllocationPanel'

const queryClient = new QueryClient()

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <header className="fixed top-0 left-0 right-0 p-4 flex justify-end items-center bg-white shadow-sm z-50">
          <SignedOut>
            <SignInButton mode="modal" />
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </header>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin/*"
              element={
                <DashboardLayout
                  sidebarContent={<AppSidebar userRole="admin" />}
                >
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="admissions" element={<Admissions />} />
                    <Route path="fees" element={<Fees />} />
                    <Route path="hostel" element={<Hostel />} />
                    <Route path="exams" element={<Exams />} />
                    <Route
                      path="attendance"
                      element={<Attendance />}
                    />
                    <Route
                      path="analytics"
                      element={<Analytics />}
                    />
                    <Route
                      path="notifications"
                      element={<Notifications />}
                    />
                    <Route
                      path="settings"
                      element={<Settings />}
                    />
                  </Routes>
                </DashboardLayout>
              }
            />

            {/* Student Routes */}
            <Route
              path="/student/*"
              element={
                <DashboardLayout
                  sidebarContent={<AppSidebar userRole="student" />}
                >
                  <Routes>
                    <Route index element={<StudentDashboard />} />
                    <Route path="admission" element={<AdmissionForm />} />
                    <Route path="hostel" element={<HostelAllocationPanel />} />
                    <Route path="results" element={<Exams />} />
                    <Route
                      path="attendance"
                      element={<Attendance />}
                    />
                    <Route
                      path="notifications"
                      element={<Notifications />}
                    />
                    <Route path="settings" element={<Settings />} />
                  </Routes>
                </DashboardLayout>
              }
            />

            {/* Root and fallback routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
