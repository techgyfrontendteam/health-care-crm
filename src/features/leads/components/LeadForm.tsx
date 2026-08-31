import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../components/ui/command';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../../components/ui/popover';
import { Loader2, User, ClipboardList, Check, ChevronsUpDown } from 'lucide-react';
import { useGetAllUsersQuery, useGetAllUsersByRoleIdQuery, useGetReporteesQuery } from '../../users/api/usersApi';
import { usePermissions } from '../../../hooks/usePermissions';
import { useGetAllMasterDataQuery } from '../../master/api/masterApi';
import { cn } from '../../../utils';
import type { CreateLeadRequest } from '../types';

const formSchema = z.object({
  first_name: z.string().max(30, 'First name must be less than 30 characters').optional().or(z.literal('')),
  last_name: z.string().max(30, 'Last name must be less than 30 characters').optional().or(z.literal('')),
  phone_number: z.string().min(1, 'Mobile number is required').regex(/^[0-9]\d{9}$/, 'Phone Number Should be 10 digits'),
  email_address: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  source_id: z.number({ error: 'Source is required' }).optional(),
  source_employee_user_id: z.number({ error: 'Invalid employee selection' }).nullable().optional(),
  project_id: z.number({ error: 'Project is required' }).min(1, 'Project is required'),
  assigned_to_rm: z.number({ error: 'Invalid RM selection' }).nullable().optional(),
  assigned_to_em: z.number({ error: 'Invalid EM selection' }).nullable().optional(),
  occupation: z.string().max(50, 'Occupation cannot exceed 50 characters').optional().or(z.literal('')),
  address: z.string().max(100, 'Address cannot exceed 100 characters').optional().or(z.literal('')),
  city: z.string().max(50, 'City cannot exceed 50 characters').optional().or(z.literal('')),
  state: z.string().max(50, 'State cannot exceed 50 characters').optional().or(z.literal('')),
  state_id: z.number({ error: 'Invalid state selection' }).optional(),
  country: z.string().max(50, 'Country cannot exceed 50 characters').optional().or(z.literal('')),
  zip: z.string().max(50, 'Zip cannot exceed 50 characters').optional().or(z.literal('')),
  dob: z.string().optional().or(z.literal('')),
  income: z.number({ error: 'Income must be a number' }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadFormProps {
  onSubmit: (values: CreateLeadRequest) => void;
  isLoading?: boolean;
  initialValues?: any;
  isEdit?: boolean;
}

export const LeadForm = ({
  onSubmit,
  isLoading,
  initialValues,
  isEdit = false
}: LeadFormProps) => {
  const { user: currentUser, roleCode } = usePermissions();
  const isEM = roleCode === 'EXPMNG';

  const { data: masterData } = useGetAllMasterDataQuery();

  const availableProjects = React.useMemo(() => {
    if (!masterData?.projects) return [];
    const userProjectIds = currentUser?.project_ids || [];
    const isSADMIN = roleCode === 'SADMIN';
    return (isSADMIN && userProjectIds.length === 0)
      ? masterData.projects
      : masterData.projects.filter((p: any) => userProjectIds.includes(p.id));
  }, [masterData?.projects, currentUser?.project_ids, roleCode]);

  const { data: allUsers = [] } = useGetAllUsersQuery({ offset: 0 });

  const { data: managers = [] } = useGetAllUsersByRoleIdQuery({ role_id: 3, offset: 0 });

  const [isSourceEmployeeOpen, setIsSourceEmployeeOpen] = React.useState(false);
  const [isRmOpen, setIsRmOpen] = React.useState(false);
  const [isEmOpen, setIsEmOpen] = React.useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: initialValues?.first_name || '',
      last_name: initialValues?.last_name || '',
      phone_number: initialValues?.phone_number || '',
      email_address: initialValues?.email_address || '',
      source_id: initialValues?.source_id || undefined,
      source_employee_user_id: initialValues?.source_employee_user_id || (isEdit ? null : Number(currentUser?.id)),
      project_id: initialValues?.project_id || undefined,
      assigned_to_rm: initialValues?.assigned_to_rm || null,
      assigned_to_em: initialValues?.assigned_to_em || null,
      occupation: initialValues?.occupation || '',
      address: initialValues?.address || '',
      city: initialValues?.city || '',
      state: initialValues?.state || '',
      state_id: initialValues?.state_id || undefined,
      country: initialValues?.country || '',
      zip: initialValues?.zip || '',
      dob: initialValues?.dob ? (initialValues.dob.includes('T') ? initialValues.dob.split('T')[0] : initialValues.dob) : '',
      income: initialValues?.income || undefined,
    },
  });

  React.useEffect(() => {
    if (!isEdit && !form.getValues('project_id')) {
      if (initialValues?.project_id) {
        form.setValue('project_id', initialValues.project_id);
      } else if (availableProjects.length === 1) {
        form.setValue('project_id', availableProjects[0].id);
      }
    }
  }, [availableProjects, isEdit, form, initialValues]);

  const selectedProjectId = form.watch('project_id');
  const selectedRmId = form.watch('assigned_to_rm');

  const filteredManagers = React.useMemo(() => {
    if (!selectedProjectId) return managers;
    return managers.filter((m: any) => {
      if (m.project_id && Number(m.project_id) === Number(selectedProjectId)) return true;
      if (m.projectId && Number(m.projectId) === Number(selectedProjectId)) return true;
      if (m.project_ids && m.project_ids.some((id: any) => Number(id) === Number(selectedProjectId))) return true;
      if (m.projects && Array.isArray(m.projects) && m.projects.some((p: any) => Number(p.id) === Number(selectedProjectId))) return true;
      if (m.project_users && Array.isArray(m.project_users) && m.project_users.some((p: any) => Number(p.project_id) === Number(selectedProjectId))) return true;
      return false;
    });
  }, [managers, selectedProjectId]);

  // Fetch reportees (EMs) for the selected RM
  const { data: reportees = [], isLoading: isLoadingReportees } = useGetReporteesQuery(
    { reporting_manager_id: selectedRmId as number, offset: 0 },
    { skip: !selectedRmId }
  );

  // Reset EM when RM changes (unless it's the initial edit selection)
  const isFirstRender = React.useRef(true);
  const initialRmId = React.useRef(initialValues?.assigned_to_rm || null);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (selectedRmId !== initialRmId.current) {
      form.setValue('assigned_to_em', null);
      initialRmId.current = -1;
    }
  }, [selectedRmId, form]);

  React.useEffect(() => {
    if (selectedProjectId && selectedRmId) {
      const isStillValid = filteredManagers.some((m: any) => m.id === selectedRmId);
      if (!isStillValid) {
        form.setValue('assigned_to_rm', null);
        form.setValue('assigned_to_em', null);
      }
    }
  }, [selectedProjectId, filteredManagers, selectedRmId, form]);

  const handleInternalSubmit = async (values: FormValues) => {
    if (!isEdit && !values.source_id) {
      form.setError('source_id', { message: 'Source is required' });
      return;
    }

    // Explicitly exclude Internal Employee logic check based on master data code
    const internalSource = masterData?.sources.find(s => s.code === 'INTERNAL' || s.description.toLowerCase().includes('internal'));
    const isInternal = values.source_id === internalSource?.id;

    const payload: CreateLeadRequest = {
      ...values,
      first_name: values.first_name || '',
      last_name: values.last_name || '',
      // Source employee only if 'internal' selected
      source_employee_user_id: isInternal ? (values.source_employee_user_id ?? null) : null,
      assigned_to_rm: values.assigned_to_rm ?? null,
      assigned_to_em: values.assigned_to_em ?? null,
      lead_status_id: initialValues?.lead_status_id || 1, // Default to NEW
      lead_priority_id: initialValues?.lead_priority_id || 1,
      source_id: values.source_id || initialValues?.source_id || 1,
      email_address: values.email_address || '',
      occupation: values.occupation || '',
      address: values.address || '',
      city: values.city || '',
      state: values.state || '',
      state_id: values.state_id || undefined,
      country: values.country || '',
      zip: values.zip || '',
      dob: values.dob || '',
      income: values.income || undefined,
    };

    onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-10 bg-zinc-50/30 dark:bg-zinc-950/30">
          {/* Section: Personal Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#063669]" />
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '-0.4px',
                  color: '#063669',
                }}
              >
                Personal Details
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Jonathan"
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={30}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Wick"
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={30}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Phone Number <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+00  000 000 0000"
                      {...field}
                      disabled={isLoading || isEdit || isEM}
                      type="tel"
                      maxLength={10}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value.replace(/\D/g, '');
                        field.onChange(val);
                      }}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium tracking-wider placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="name@email.com"
                      {...field}
                      disabled={isLoading || isEdit || isEM}
                      type="email"
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Occupation</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Consultant, Designer, etc."
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={50}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={isLoading || isEM}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="income"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Income</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 100007"
                        disabled={isLoading || isEM}
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          field.onChange(val ? Number(val) : undefined);
                        }}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section: Classification & Address */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[#063669]" />
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '-0.4px',
                  color: '#063669',
                }}
              >
                Classification
              </h3>
            </div>

            {!isEdit && (
              <>
                <FormField
                  control={form.control}
                  name="source_id"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Source {!isEdit && <span className="text-red-500">*</span>}</FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        value={field.value ? String(field.value) : ""}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all">
                            <SelectValue placeholder="Select Source" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-black">
                          {masterData?.sources.map((source) => (
                            <SelectItem key={source.id} value={String(source.id)} className="text-black cursor-pointer">
                              {source.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(() => {
                  const selectedSourceId = form.watch('source_id');
                  const internalSource = masterData?.sources.find(s => s.code === 'INTERNAL' || s.description.toLowerCase().includes('internal'));
                  return selectedSourceId === internalSource?.id;
                })() && (
                    <FormField
                      control={form.control}
                      name="source_employee_user_id"
                      render={({ field }) => (
                        <FormItem className="space-y-1.5 flex flex-col">
                          <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Source Employee</FormLabel>
                          <Popover open={isSourceEmployeeOpen} onOpenChange={setIsSourceEmployeeOpen}>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  type="button"
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={isSourceEmployeeOpen}
                                  className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium text-sm flex items-center justify-between shadow-none hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50"
                                  disabled={isLoading}
                                >
                                  <span className="truncate">
                                    {field.value
                                      ? (() => {
                                        const u = allUsers.find((user) => user.id === field.value);
                                        return u ? `${u.first_name || ''} ${u.last_name || ''}` : "Select Employee";
                                      })()
                                      : "Select Employee"}
                                  </span>
                                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 text-zinc-500" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              align="start"
                              side="bottom"
                              sideOffset={6}
                              className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl z-[99999] bg-white dark:bg-zinc-950 flex flex-col overflow-hidden"
                            >
                              <Command className="flex-1 flex flex-col overflow-hidden bg-transparent">
                                <CommandInput
                                  placeholder="Search employees..."
                                  className="h-10 border-none focus:ring-0 text-sm shrink-0"
                                />
                                <CommandList className="max-h-[250px] overflow-y-auto custom-scrollbar pointer-events-auto" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                                  <CommandEmpty className="py-4 text-xs text-zinc-400 text-center">
                                    No employees found.
                                  </CommandEmpty>
                                  <CommandGroup className="p-1">
                                    {allUsers.map((user) => (
                                      <CommandItem
                                        key={user.id}
                                        value={`${user.first_name || ''} ${user.last_name || ''}`}
                                        onSelect={() => {
                                          field.onChange(user.id);
                                          setIsSourceEmployeeOpen(false);
                                        }}
                                        className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-950 dark:data-[selected=true]:text-zinc-50"
                                      >
                                        <Check
                                          className={cn(
                                            "h-4 w-4 text-primary shrink-0",
                                            user.id === field.value ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        <span className="truncate font-semibold">
                                          {user.first_name || ''} {user.last_name || ''}
                                        </span>
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
              </>
            )}

            <FormField
              control={form.control}
              name="project_id"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Project <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={field.value ? String(field.value) : ""}
                    disabled={isLoading || isEM}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all">
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {availableProjects.map((project) => (
                        <SelectItem key={project.id} value={String(project.id)} className="text-black cursor-pointer">
                          {project.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {!isEM && (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="assigned_to_rm"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5 flex flex-col">
                      <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Assign to Sales Head</FormLabel>
                      <Popover open={isRmOpen} onOpenChange={setIsRmOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isRmOpen}
                              className={cn(
                                "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium text-sm flex items-center justify-between shadow-none hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 text-left",
                                roleCode === 'RELMNG' && "opacity-70 cursor-not-allowed pointer-events-none bg-zinc-100"
                              )}
                              disabled={isLoading || roleCode === 'RELMNG'}
                            >
                              <span className="truncate">
                                {field.value
                                  ? (() => {
                                    const r = managers.find((m: any) => m.id === field.value);
                                    return r ? `${r.first_name || ''} ${r.last_name || ''}` : "Unassigned";
                                  })()
                                  : "Unassigned"}
                              </span>
                              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 text-zinc-500" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          side="bottom"
                          sideOffset={6}
                          className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl z-[99999] bg-white dark:bg-zinc-950 flex flex-col overflow-hidden"
                        >
                          <Command className="flex-1 flex flex-col overflow-hidden bg-transparent">
                            <CommandInput
                              placeholder="Search Sales Heads..."
                              className="h-10 border-none focus:ring-0 text-sm shrink-0"
                            />
                            <CommandList className="max-h-[250px] overflow-y-auto custom-scrollbar pointer-events-auto" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                              <CommandEmpty className="py-4 text-xs text-zinc-400 text-center">
                                No sales heads found.
                              </CommandEmpty>
                              <CommandGroup className="p-1">
                                <CommandItem
                                  value="unassigned none"
                                  onSelect={() => {
                                    field.onChange(null);
                                    setIsRmOpen(false);
                                  }}
                                  className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none flex items-center gap-2 text-sm text-zinc-500 italic data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800"
                                >
                                  <Check
                                    className={cn(
                                      "h-4 w-4 text-primary shrink-0",
                                      field.value === null || field.value === undefined ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <span>Unassigned</span>
                                </CommandItem>
                                {filteredManagers.map((manager: any) => (
                                  <CommandItem
                                    key={manager.id}
                                    value={`${manager.first_name || ''} ${manager.last_name || ''}`}
                                    onSelect={() => {
                                      field.onChange(manager.id);
                                      setIsRmOpen(false);
                                    }}
                                    className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-950 dark:data-[selected=true]:text-zinc-50"
                                  >
                                    <Check
                                      className={cn(
                                        "h-4 w-4 text-primary shrink-0",
                                        manager.id === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <span className="truncate font-semibold">
                                      {manager.first_name || ''} {manager.last_name || ''}
                                    </span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assigned_to_em"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5 flex flex-col">
                      <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Assign to Sales Executive</FormLabel>
                      <Popover open={isEmOpen} onOpenChange={setIsEmOpen}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              type="button"
                              variant="outline"
                              role="combobox"
                              aria-expanded={isEmOpen}
                              className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium text-sm flex items-center justify-between shadow-none hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 text-left"
                              disabled={isLoading || !selectedRmId || isLoadingReportees}
                            >
                              <span className="truncate">
                                {field.value
                                  ? (() => {
                                    const e = reportees.find((em: any) => em.id === field.value);
                                    return e ? `${e.first_name || ''} ${e.last_name || ''}` : "Unassigned";
                                  })()
                                  : "Unassigned"}
                              </span>
                              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 text-zinc-500" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          side="bottom"
                          sideOffset={6}
                          className="w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-2xl z-[99999] bg-white dark:bg-zinc-950 flex flex-col overflow-hidden"
                        >
                          <Command className="flex-1 flex flex-col overflow-hidden bg-transparent">
                            <CommandInput
                              placeholder="Search Sales Executives..."
                              className="h-10 border-none focus:ring-0 text-sm shrink-0"
                            />
                            <CommandList className="max-h-[250px] overflow-y-auto custom-scrollbar pointer-events-auto" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>
                              <CommandEmpty className="py-4 text-xs text-zinc-400 text-center">
                                No sales executives found.
                              </CommandEmpty>
                              <CommandGroup className="p-1">
                                <CommandItem
                                  value="unassigned none"
                                  onSelect={() => {
                                    field.onChange(null);
                                    setIsEmOpen(false);
                                  }}
                                  className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none flex items-center gap-2 text-sm text-zinc-500 italic data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800"
                                >
                                  <Check
                                    className={cn(
                                      "h-4 w-4 text-primary shrink-0",
                                      field.value === null || field.value === undefined ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <span>Unassigned</span>
                                </CommandItem>
                                {reportees.map((em: any) => (
                                  <CommandItem
                                    key={em.id}
                                    value={`${em.first_name || ''} ${em.last_name || ''}`}
                                    onSelect={() => {
                                      field.onChange(em.id);
                                      setIsEmOpen(false);
                                    }}
                                    className="py-2.5 px-3 cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors select-none flex items-center gap-2 text-sm text-zinc-800 dark:text-zinc-200 data-[selected=true]:bg-zinc-100 dark:data-[selected=true]:bg-zinc-800 data-[selected=true]:text-zinc-950 dark:data-[selected=true]:text-zinc-50"
                                  >
                                    <Check
                                      className={cn(
                                        "h-4 w-4 text-primary shrink-0",
                                        em.id === field.value ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <span className="truncate font-semibold">
                                      {em.first_name || ''} {em.last_name || ''}
                                    </span>
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Organic Search"
                      {...field}
                      disabled={isLoading || isEM}
                      maxLength={100}
                      className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Country</FormLabel>
                    <Select
                      onValueChange={(v) => {
                        field.onChange(v);
                        form.setValue('state', ''); // Reset state when country changes
                        form.setValue('state_id', undefined);
                      }}
                      value={field.value}
                      disabled={isLoading || isEM}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {masterData?.countries?.map((c) => (
                          <SelectItem key={c.id} value={c.description} className="text-black cursor-pointer">
                            {c.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state_id"
                render={({ field }) => {
                  const selectedCountryDesc = form.watch('country');
                  const selectedCountry = masterData?.countries?.find(c => c.description === selectedCountryDesc);
                  const availableStates = masterData?.states?.filter(s => s.country_id === selectedCountry?.id) || [];
                  
                  return (
                    <FormItem className="space-y-1.5">
                      <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>State</FormLabel>
                      <Select
                        onValueChange={(v) => {
                          field.onChange(Number(v));
                          const st = availableStates.find(s => s.id === Number(v));
                          if (st) form.setValue('state', st.description);
                        }}
                        value={field.value ? String(field.value) : ""}
                        disabled={isLoading || isEM || !selectedCountry}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all">
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-black max-h-[300px] overflow-y-auto">
                          {availableStates.map((s) => (
                            <SelectItem key={s.id} value={String(s.id)} className="text-black cursor-pointer">
                              {s.description}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>City</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Jonathan"
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={50}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Pin Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Jonathan"
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={50}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px] placeholder:font-['Inter']"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-3 pb-5 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 shrink-0 sticky bottom-0 rounded-t-xl shadow-[0_-4px_20px_rgb(0,0,0,0.03)]">
          <Button
            type="submit"
            disabled={isLoading || isEM}
            className="w-full h-[50px] rounded-xl bg-[#063669] hover:bg-[#052d58] text-white text-[16px] shadow-lg active:scale-[0.98] transition-all"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{isEdit ? 'Updating...' : 'Creating...'}</span>
              </div>
            ) : (
              isEdit ? 'Update Lead' : 'Create Lead'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
