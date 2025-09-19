import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-soft-gray p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-heading text-navy-blue">
            Sign Up
          </CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/login"
            afterSignUpUrl="/student"
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-primary hover:bg-primary/90 text-white rounded-md px-4 py-2',
                card: 'shadow-none',
                footer: 'hidden',
              },
            }}
          />
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

