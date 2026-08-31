import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';

import { useForgotPasswordMutation } from '../api/authApi';

// Validation
const schema = z.object({
  login_id: z.email({ message: 'Please enter a valid email address.' }),
});

type FormValues = z.infer<typeof schema>;

export const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [success, setSuccess] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      login_id: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setSuccess('');
      await forgotPassword(values).unwrap();

      form.reset();
      setSuccess('Temporary password sent to your email.');
    } catch (err: any) {
      const message =
        err?.data?.error || 'Something went wrong. Please try again.';
      form.setError('root', { message });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">
          Forgot Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your email to receive a temporary password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <FormField
              control={form.control}
              name="login_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Error / Success */}
            {form.formState.errors.root && (
              <p className="text-sm font-medium text-center text-destructive">
                {form.formState.errors.root.message}
              </p>
            )}

            {success && (
              <p className="text-sm font-medium text-center text-green-600">
                {success}
              </p>
            )}

            {/* Reset Password Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Reset Password'}
            </Button>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Link
                to="/login"
                className="text-sm font-medium text-primary hover:underline transition-all"
              >
                ← Back to Login
              </Link>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
