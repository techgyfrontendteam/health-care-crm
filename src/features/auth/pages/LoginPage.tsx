import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../app/store';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { useLoginMutation, useGetUserRolesMutation, useGetUserByIdMutation } from '../api/authApi';
import { setRoles } from '../store/authSlice';
import { Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  login_id: z.email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const [loginApi, { isLoading: isLoggingIn }] = useLoginMutation();
  const [getUserRoles, { isLoading: isFetchingRoles }] = useGetUserRolesMutation();
  const [getUserById, { isLoading: isFetchingUser }] = useGetUserByIdMutation();
  const [showPassword, setShowPassword] = React.useState(false);

  const isLoading = isLoggingIn || isFetchingRoles || isFetchingUser;

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login_id: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    let response: any;
    try {
      response = await loginApi(values).unwrap();
    } catch (err: any) {
      const message =
        err?.data?.error ||
        err?.data?.message ||
        (typeof err?.data === 'string' ? err.data : null) ||
        err?.message ||
        'Invalid credentials or server unavailable.';
      form.setError('root', { message });
      return;
    }

    const isFirst = Number(response.is_first_login) === 1;
    const loginUserId = Number(response.id);

    try {
      sessionStorage.setItem('agent_id', String(loginUserId));
    } catch (e) {
      console.error('Error saving agent_id to sessionStorage:', e);
    }

    // 1. Set credentials first so the token is available for subsequent API calls
    login(
      response.token,
      response.refreshToken,
      isFirst,
      {
        id: String(response.id),
        agent_id: loginUserId,
        email: response.login_id,
        name: `${response.first_name} ${response.last_name}`,
        role_id: response.role_id,
        project_ids: response.project_ids,
        profile_pic_location: null,
      }
    );

    // Fetch user details to get profile picture
    try {
      const userDetails = await getUserById({ id: response.id }).unwrap();

      login(
        response.token,
        response.refreshToken,
        isFirst,
        {
          id: String(response.id),
          agent_id: loginUserId,
          email: response.login_id,
          name: `${response.first_name} ${response.last_name}`,
          role_id: response.role_id,
          project_ids: response.project_ids,
          profile_pic_location: userDetails.profile_pic_location || null,
        }
      );
    } catch (err) {
      console.error('Failed to fetch user details for profile picture', err);
    }

    // 2. Now fetch roles (token will be injected by baseApi)
    try {
      const roles = await getUserRoles({ offset: 0 }).unwrap();
      dispatch(setRoles(roles));
    } catch (err) {
      console.error('Failed to fetch user roles', err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center">TechGy CRM</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="login_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="superadmin@gmail.com"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        disabled={isLoading}
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 transition-colors focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-1">
              <Link
                to="/auth/forgotPassword"
                className="text-sm font-medium text-primary hover:underline transition-all"
              >
                Forgot Password?
              </Link>
            </div>
            {form.formState.errors.root && (
              <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 rounded-md border border-destructive/20 text-center">
                {form.formState.errors.root.message}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoggingIn
                ? 'Signing In...'
                : isFetchingRoles
                ? 'Loading roles...'
                : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
