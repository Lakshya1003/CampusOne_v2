import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  ClipboardCheck
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Admin navigation items
const adminItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Admission Approvals", url: "/admin/admissions", icon: UserPlus },
  { title: "Fee Management", url: "/admin/fees", icon: DollarSign },
  { title: "Hostel Allocation", url: "/admin/hostel", icon: Building },
  { title: "Exam Results", url: "/admin/exams", icon: FileText },
  { title: "Attendance", url: "/admin/attendance", icon: Calendar },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
];

// Student navigation items
const studentItems = [
  { title: "Dashboard", url: "/student", icon: Home },
  { title: "Admission Status", url: "/student/admission", icon: GraduationCap },
  { title: "Fee Payment", url: "/student/fees", icon: Receipt },
  { title: "Hostel Application", url: "/student/hostel", icon: BedDouble },
  { title: "Exam Results", url: "/student/results", icon: FileText },
  { title: "Attendance", url: "/student/attendance", icon: ClipboardCheck },
];

// Common items for both roles
const commonItems = [
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
];

interface AppSidebarProps {
  userRole?: 'admin' | 'student';
}

export function AppSidebar({ userRole = 'student' }: AppSidebarProps) {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const navigationItems = userRole === 'admin' ? adminItems : studentItems;

  return (
    <Sidebar
      className={!open ? "w-16" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="border-r border-border bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            {open && (
              <div>
                <h2 className="font-heading font-semibold text-foreground">College ERP</h2>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={!open ? "sr-only" : ""}>
            General
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && <span className="text-sm font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        {open && (
          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center gap-3 p-3 rounded-md bg-accent/50">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {userRole === 'admin' ? 'Admin User' : 'Student User'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {userRole === 'admin' ? 'Administrator' : 'Computer Science'}
                </p>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}