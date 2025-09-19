import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Shield, BookOpen, DollarSign, Building } from 'lucide-react';
import heroImage from "@/assets/hero-banner.jpg";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      description: "Complete student lifecycle from admission to graduation"
    },
    {
      icon: DollarSign,
      title: "Fee Management",
      description: "Automated fee collection with online payment gateway"
    },
    {
      icon: Building,
      title: "Hostel Management",
      description: "Room allocation and hostel administration made simple"
    },
    {
      icon: BookOpen,
      title: "Academic Records",
      description: "Exam results, attendance tracking, and performance analytics"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-foreground">College ERP</h1>
                <p className="text-xs text-muted-foreground">Smart Education Management</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button className="erp-button-primary">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-accent/20 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6">
                Smart College <span className="erp-gradient-text">ERP System</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Streamline admissions, fees, hostel management, exams, and attendance with our comprehensive educational platform designed for modern institutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link to="/student">
                  <Button className="erp-button-primary w-full sm:w-auto">
                    <Users className="w-5 h-5 mr-2" />
                    Student Portal
                  </Button>
                </Link>
                <Link to="/admin">
                  <Button className="erp-button-secondary w-full sm:w-auto">
                    <Shield className="w-5 h-5 mr-2" />
                    Admin Portal
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm font-medium">Admissions & Applications</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-sm font-medium">Fee Management</span>
                </div>
                <div className="flex items-center gap-2 text-navy">
                  <div className="w-2 h-2 bg-navy rounded-full"></div>
                  <span className="text-sm font-medium">Hostel & Attendance</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-card shadow-elevated">
                <img 
                  src={heroImage} 
                  alt="College ERP System Dashboard Preview"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
              Complete Educational Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything your institution needs to manage students, staff, and operations efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="erp-card hover-lift text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="font-heading">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of educational institutions already using our ERP system to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button className="erp-button-primary w-full sm:w-auto">
                Start Free Trial
              </Button>
            </Link>
            <Button variant="outline" className="w-full sm:w-auto border-navy text-navy hover:bg-navy hover:text-navy-foreground">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground">College ERP</h3>
                <p className="text-xs text-muted-foreground">Smart Education Management</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 College ERP System. Built for educational excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
