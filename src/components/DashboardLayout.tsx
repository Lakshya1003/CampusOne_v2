import React from 'react'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebarContent: React.ReactNode
  title?: string
}

export function DashboardLayout({
  children,
  sidebarContent,
  title = 'Dashboard',
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen w-full bg-soft-gray">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col border-r bg-card p-4 shadow-subtle md:flex">
        <div className="mb-6 text-2xl font-heading font-semibold text-navy-blue">
          CampusBloom
        </div>
        <nav className="flex-1 space-y-2">{sidebarContent}</nav>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed top-4 left-4 z-50"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-4 bg-card shadow-lg">
          <div className="mb-6 text-2xl font-heading font-semibold text-navy-blue">
            CampusBloom
          </div>
          <nav className="flex-1 space-y-2">{sidebarContent}</nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  )
}
