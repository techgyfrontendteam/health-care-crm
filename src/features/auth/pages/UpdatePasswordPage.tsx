import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../../../components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { useUpdatePasswordMutation } from '../api/authApi';
import { toast } from 'sonner';
import { Eye, EyeOff, ArrowLeft, Lock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

// ✅ Schema
const schema = z
  .object({
    old_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(8, 'Minimum 8 characters required'),
    confirm_password: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Passwords do not match',
  })
  .refine((data) => data.old_password !== data.new_password, {
    path: ['new_password'],
    message: 'New password must be different from current password',
  });

type FormValues = z.infer<typeof schema>;

export const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Derive display info from auth context
  const displayName = React.useMemo(() => {
    if (user?.name) return user.name;
    if (user?.email) {
      const part = user.email.split('@')[0];
      return part
        .replace(/[0-9]/g, '')
        .replace(/[._-]/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    return 'User';
  }, [user]);

  const getRoleLabel = () => {
    if (!user) return 'User';
    if (user.role_id === 1) return 'Sales Head';
    if (user.role_id === 2) return 'Sales Admin';
    if (user.role_id === 3) return 'Sales Head';
    if (user.role_id === 4) return 'Sales Executive';
    return 'User';
  };

  const getInitials = () => {
    return displayName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await updatePassword({
        old_password: values.old_password,
        new_password: values.new_password,
      }).unwrap();

      if (!res || res.success !== true) {
        toast.error(res?.message || 'Current password is incorrect');
        return;
      }

      if (res.message && res.message.toLowerCase().includes('incorrect')) {
        toast.error(res.message);
        return;
      }

      toast.success('Password updated successfully!');
      setTimeout(() => navigate('/leads'), 1500);
    } catch (err: any) {
      toast.error(
        err?.data?.message || err?.message || 'Current password is incorrect'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[420px]">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#002d62] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-lg shadow-slate-200/60 overflow-hidden border border-slate-100">

          {/* Header — dark blue gradient */}
          <div className="bg-gradient-to-br from-[#002d62] to-[#1a4d9e] px-8 py-8">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-base font-black text-white uppercase border border-white/30 shrink-0 shadow-sm">
                {getInitials()}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[17px] font-extrabold text-white truncate leading-tight">
                  {displayName}
                </span>
                <span className="text-[12px] text-blue-200 font-semibold truncate mt-0.5">
                  {getRoleLabel()}
                </span>
                <span className="text-[11px] text-blue-300/80 font-medium truncate mt-0.5">
                  {user?.email}
                </span>
              </div>
            </div>

            {/* Section label */}
            <div className="flex items-center gap-2.5 mt-6">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <Lock className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[15px] font-extrabold text-white leading-tight">Update Password</p>
                <p className="text-[11px] text-blue-200 font-medium">Keep your account secure</p>
              </div>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-8 py-7">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="old_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-extrabold text-slate-500 uppercase tracking-wider">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showOldPassword ? 'text' : 'password'}
                            placeholder="Enter your current password"
                            {...field}
                            className="h-11 pr-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                          >
                            {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Divider */}
                <div className="h-px bg-slate-100" />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-extrabold text-slate-500 uppercase tracking-wider">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? 'text' : 'password'}
                            placeholder="Minimum 8 characters"
                            {...field}
                            className="h-11 pr-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                          >
                            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[12px] font-extrabold text-slate-500 uppercase tracking-wider">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Re-enter new password"
                            {...field}
                            className="h-11 pr-10 rounded-xl border-slate-200 bg-slate-50 focus:bg-white text-sm font-semibold text-slate-800 placeholder:text-slate-400 placeholder:font-normal transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-[#002d62] to-[#1a4d9e] hover:from-[#003580] hover:to-[#2258b5] text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      Update Password
                    </>
                  )}
                </button>

              </form>
            </Form>
          </div>
        </div>

        {/* Footer hint */}
        <p className="text-center text-[11px] text-slate-400 font-medium mt-5">
          Use a strong password with letters, numbers & symbols
        </p>
      </div>
    </div>
  );
};