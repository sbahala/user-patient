import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User, Lock, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { authService } from '../../services/auth.service';
import { useToast } from "@/hooks/use-toast"

// Validation Schema
const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

const RegisterPage = () => {
  const { toast } = useToast()

  const initialValues = {
    username: '',
    email: '',
    password: ''
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const result = await authService.register(values);
              toast({
                description: result?.message || "Registration successful!",
                variant: "success"
              });
              resetForm();
            } catch (err) {
              toast({
                description: err?.message || "Registration failed",
                variant: "destructive"
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <CardContent className="space-y-4">
                {/* Username Field */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="username"
                      name="username"
                      placeholder="johndoe"
                      className={`pl-10 ${errors.username && touched.username ? 'border-red-500' : ''}`}
                    />
                    <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {errors.username && touched.username && (
                      <div className="text-red-500 text-sm mt-1">{errors.username}</div>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      className={`pl-10 ${errors.email && touched.email ? 'border-red-500' : ''}`}
                    />
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`pl-10 ${errors.password && touched.password ? 'border-red-500' : ''}`}
                    />
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                    )}
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Register Account'
                  )}
                </Button>
              </CardContent>
            </Form>
          )}
        </Formik>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;