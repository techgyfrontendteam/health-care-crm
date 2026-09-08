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
import { Loader2, User, ClipboardList, Check, ChevronsUpDown, Stethoscope } from 'lucide-react';
import { useGetAllUsersQuery, useGetAllUsersByRoleIdQuery, useGetReporteesQuery } from '../../users/api/usersApi';
import { usePermissions } from '../../../hooks/usePermissions';
import { useGetAllMasterDataQuery } from '../../master/api/masterApi';
import { cn } from '../../../utils';
import type { CreateLeadRequest } from '../types';
import { useGetAllDoctorsQuery } from '../../doctors/api/doctorsApiSlice';
import type { ApiDoctor } from '../../doctors/types';

const formSchema = z.object({
  first_name: z.string().max(30, 'First name must be less than 30 characters').optional().or(z.literal('')),
  last_name: z.string().max(30, 'Last name must be less than 30 characters').optional().or(z.literal('')),
  phone_number: z.string().min(1, 'Mobile number is required').regex(/^[0-9]\d{9}$/, 'Phone Number Should be 10 digits'),
  email_address: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  source_id: z.number({ error: 'Source is required' }).optional(),
  source_employee_user_id: z.number({ error: 'Invalid employee selection' }).nullable().optional(),
  project_id: z.number({ error: 'Project is required' }).nullable().optional(),
  location_id: z.number({ error: 'Location is required' }).min(1, 'Location is required'),
  branch_id: z.number({ error: 'Branch is required' }).nullable().optional(),
  department: z.string().optional().or(z.literal('')),
  doctor_id: z.number().nullable().optional(),
  appointment_date: z.string().optional().or(z.literal('')),
  appointment_time: z.string().optional().or(z.literal('')),
  appointment_note: z.string().optional().or(z.literal('')),
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
      location_id: initialValues?.location_id || null,
      branch_id: initialValues?.branch_id || null,
      department: initialValues?.specialisation_id ? String(initialValues.specialisation_id) : (initialValues?.department || (initialValues as any)?.specialization || ''),
      doctor_id: initialValues?.doctor_id || null,
      appointment_date: initialValues?.appointment_date || '',
      appointment_time: initialValues?.appointment_time || '',
      appointment_note: (initialValues?.appointment_note && initialValues?.appointment_note.toLowerCase() !== 'kukatpally' && initialValues?.appointment_note !== initialValues?.address) ? initialValues.appointment_note : '',
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
  const selectedLocationId = form.watch('location_id');
  const selectedBranchId = form.watch('branch_id');
  const selectedRmId = form.watch('assigned_to_rm');
  const selectedDepartment = form.watch('department');

  React.useEffect(() => {
    const currentBranchId = form.getValues('branch_id');
    if (selectedLocationId && currentBranchId) {
      const branchExists = masterData?.branches?.some(
        (b: any) => b.id === currentBranchId && b.location_id === selectedLocationId
      );
      if (!branchExists) {
        form.setValue('branch_id', null);
      }
    }
  }, [selectedLocationId, masterData?.branches, form]);

  const filteredBranches = React.useMemo(() => {
    if (!masterData?.branches || !selectedLocationId) return [];
    return masterData.branches.filter((b: any) => b.location_id === selectedLocationId);
  }, [masterData?.branches, selectedLocationId]);

  const selectedSpecId = React.useMemo(() => {
    if (!selectedDepartment) return 0;
    if (!isNaN(Number(selectedDepartment)) && Number(selectedDepartment) > 0) {
      return Number(selectedDepartment);
    }
    const found = masterData?.specialisations?.find(
      (s: any) => s.description.toLowerCase() === selectedDepartment.toLowerCase() || s.code.toLowerCase() === selectedDepartment.toLowerCase()
    );
    return found ? found.id : 0;
  }, [selectedDepartment, masterData?.specialisations]);

  const { data: doctorsResp, isLoading: isLoadingDoctors } = useGetAllDoctorsQuery({
    branch_id: selectedBranchId ? Number(selectedBranchId) : 0,
    specialization_id: selectedSpecId ? Number(selectedSpecId) : 0,
  });

  const doctorsList: ApiDoctor[] = React.useMemo(() => {
    return doctorsResp?.data || [];
  }, [doctorsResp]);

  const departmentOptions = React.useMemo(() => {
    if (masterData?.specialisations && masterData.specialisations.length > 0) {
      return masterData.specialisations.map((spec: any) => ({
        id: spec.id,
        value: String(spec.id),
        label: spec.description,
      }));
    }
    return [
      "OPD", "IPD", "Cardiology", "Neurology", "Orthopedics & Joint Replacement",
      "Pediatrics", "Oncology", "Dermatology & Cosmetology", "Gastroenterology", "Obstetrics & Gynaecology"
    ].map((dept, index) => ({
      id: index + 1,
      value: dept,
      label: dept,
    }));
  }, [masterData?.specialisations]);

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

  const { data: reportees = [], isLoading: isLoadingReportees } = useGetReporteesQuery(
    { reporting_manager_id: selectedRmId as number, offset: 0 },
    { skip: !selectedRmId }
  );

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

    const internalSource = masterData?.sources.find(s => s.code === 'INTERNAL' || s.description.toLowerCase().includes('internal'));
    const isInternal = values.source_id === internalSource?.id;

    const matchedSpec = masterData?.specialisations?.find(
      (s: any) => String(s.id) === String(values.department) || s.description.toLowerCase() === (values.department || '').toLowerCase()
    );
    const specialisationId = matchedSpec ? matchedSpec.id : (selectedSpecId || 1);
    const departmentName = matchedSpec ? matchedSpec.description : (values.department || '');

    const payload: CreateLeadRequest = {
      ...values,
      specialisation_id: specialisationId,
      department: departmentName,
      source_id: Number(values.source_id || initialValues?.source_id || 1),
      first_name: values.first_name || '',
      last_name: values.last_name || '',
      email_address: values.email_address || '',
      source_employee_user_id: isInternal ? (values.source_employee_user_id ?? null) : null,
      assigned_to_rm: values.assigned_to_rm ?? null,
      assigned_to_em: values.assigned_to_em ?? null,
      lead_status_id: initialValues?.lead_status_id || 1,
      lead_priority_id: initialValues?.lead_priority_id || 1,
      occupation: values.occupation || '',
      address: values.address || '',
      city: values.city || '',
      state: values.state || '',
      country: values.country || '',
      zip: values.zip || '',
      dob: values.dob || '',
      income: values.income || undefined,
      doctor_id: values.doctor_id || null,
      appointment_date: values.appointment_date || '',
      appointment_time: values.appointment_time || '',
      appointment_note: values.appointment_note || '',
    };

    onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleInternalSubmit)} className="flex flex-col h-full overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 bg-zinc-50/30 dark:bg-zinc-950/30">
          
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-[#063669]" />
              <h3 className="font-extrabold text-[#063669] text-base">Lead Source</h3>
            </div>

            {!isEdit && (
              <>
                <FormField
                  control={form.control}
                  name="source_id"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>
                        Source <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        value={field.value ? String(field.value) : ""}
                      >
                        <FormControl>
                          <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium">
                            <SelectValue placeholder="-- Select Source * --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-black z-[99999]">
                          {masterData?.sources.map((source) => (
                            <SelectItem key={source.id} value={String(source.id)} className="text-black cursor-pointer font-medium">
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
          </div>

          <div className="space-y-5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-[#063669]" />
              <h3 className="font-extrabold text-[#063669] text-base">Patient Details</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>
                      Patient First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Patient First Name *"
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={30}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
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
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Patient Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Patient Last Name"
                        {...field}
                        disabled={isLoading || isEM}
                        maxLength={30}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Phone <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone *"
                        {...field}
                        disabled={isLoading || isEdit || isEM}
                        type="tel"
                        maxLength={10}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const val = e.target.value.replace(/\D/g, '');
                          field.onChange(val);
                        }}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all font-medium tracking-wider placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
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
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>E-mail <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E-mail *"
                        {...field}
                        disabled={isLoading || isEdit || isEM}
                        type="email"
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 focus:ring-primary/20 transition-all placeholder:text-[#94A3B8] placeholder:font-normal placeholder:text-[14px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-5 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4 text-[#063669]" />
              <h3 className="font-extrabold text-[#063669] text-base">Make an Appointment Details</h3>
            </div>

            <FormField
              control={form.control}
              name="location_id"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Select Location <span className="text-red-500">*</span></FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(Number(v))}
                    value={field.value ? String(field.value) : ""}
                    disabled={isLoading || isEM}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium">
                        <SelectValue placeholder="-- Select Location * --" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black z-[99999]">
                      {masterData?.locations?.map((loc: any) => (
                        <SelectItem key={loc.id} value={String(loc.id)} className="text-black cursor-pointer font-medium">
                          {loc.description}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedLocationId && (
              <FormField
                control={form.control}
                name="branch_id"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Branch</FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(Number(v))}
                      value={field.value ? String(field.value) : ""}
                      disabled={isLoading || isEM}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium">
                          <SelectValue placeholder="-- Select Branch --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black z-[99999]">
                        {filteredBranches.map((b: any) => (
                          <SelectItem key={b.id} value={String(b.id)} className="text-black cursor-pointer font-medium">
                            {b.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => {
                const currentDeptValue = (() => {
                  if (!field.value) return "";
                  const found = departmentOptions.find(
                    (o) => String(o.id) === String(field.value) || o.value === String(field.value) || o.label.toLowerCase() === String(field.value).toLowerCase()
                  );
                  return found ? found.value : String(field.value);
                })();

                return (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>
                      Select Department <span className="text-red-500">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(v) => field.onChange(v)}
                      value={currentDeptValue}
                      disabled={isLoading || isEM}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium">
                          <SelectValue placeholder="-- Select Department * --" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black z-[99999]">
                        {departmentOptions.map((dept) => (
                          <SelectItem key={dept.id} value={dept.value} className="text-black cursor-pointer font-medium">
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="doctor_id"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>
                    Select Doctor
                  </FormLabel>
                  <Select
                    onValueChange={(v) => field.onChange(v ? Number(v) : null)}
                    value={field.value ? String(field.value) : ""}
                    disabled={isLoading || isEM || isLoadingDoctors}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl h-11 px-4 focus:ring-primary/20 transition-all font-medium">
                        <SelectValue placeholder={isLoadingDoctors ? "Loading doctors..." : "-- Select Doctor --"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black z-[99999]">
                      {isLoadingDoctors ? (
                        <div className="p-3 text-xs text-zinc-500 text-center flex items-center justify-center gap-2">
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Loading doctors...</span>
                        </div>
                      ) : doctorsList.length === 0 ? (
                        <div className="p-3 text-xs text-zinc-500 text-center">
                          No doctors available for selected department / branch
                        </div>
                      ) : (
                        doctorsList.map((doc: ApiDoctor) => {
                          const specName = masterData?.specialisations?.find((s: any) => s.id === doc.specialization_id)?.description;
                          const docName = `Dr. ${doc.first_name || ''} ${doc.last_name || ''}`.trim();
                          return (
                            <SelectItem key={doc.id} value={String(doc.id)} className="text-black cursor-pointer font-medium">
                              {docName} {specName ? `(${specName})` : ''}
                            </SelectItem>
                          );
                        })
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="appointment_date"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Appointment Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={isLoading || isEM}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointment_time"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Time *</FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        {...field}
                        disabled={isLoading || isEM}
                        className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 font-medium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="appointment_note"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Lead Note</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Type Lead Note"
                      {...field}
                      disabled={isLoading || isEM}
                      rows={3}
                      className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm font-medium focus:ring-[#063669]/20 outline-none transition-all placeholder:text-[#94A3B8]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 
            SALES HEAD & SALES EXECUTIVE ASSIGNMENT COMMENTED OUT (NOT REMOVED):
          */}
          {/*
          {!isEM && (
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800">
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
          */}

          {/* 
            UNUSED FIELDS COMMENTED OUT (NOT REMOVED):
            - Occupation
            - DOB & Income
            - Address, Country, State, City, Zip
          */}
          {/*
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Occupation</FormLabel>
                <FormControl>
                  <Input placeholder="Consultant, Designer, etc." {...field} disabled={isLoading || isEM} maxLength={50} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 font-medium" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField control={form.control} name="dob" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Date of Birth</FormLabel>
                <FormControl><Input type="date" {...field} disabled={isLoading || isEM} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 font-medium" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="income" render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Income</FormLabel>
                <FormControl><Input type="number" placeholder="e.g. 100007" disabled={isLoading || isEM} {...field} value={field.value ?? ''} onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 font-medium" /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem className="space-y-1.5">
              <FormLabel style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', lineHeight: '16.5px', letterSpacing: '0.55px', textTransform: 'uppercase', color: '#64748B' }}>Address</FormLabel>
              <FormControl><Input placeholder="Address" {...field} disabled={isLoading || isEM} maxLength={100} className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 h-11 font-medium" /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          */}

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
              isEdit ? 'Update Lead' : 'Make an Appointment / Create Lead'
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
