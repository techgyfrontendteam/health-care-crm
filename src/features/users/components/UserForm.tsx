import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cn } from "../../../utils";
import {
  Check,
  ChevronsUpDown,
  Mail,
  Phone as PhoneIcon,
  Radio,
  User,
  X,
} from "lucide-react";
import { useGetAllUsersByRoleIdQuery } from "../api/usersApi";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";
import { useGetLeadsByRmIdQuery } from "../../leads/api/leadsApi";
import { ProjectChangeImpactDialog } from "./ProjectChangeImpactDialog";

const generateRandomPassword = (length = 10) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*";
  const allChars = upper + lower + numbers + special;

  const passwordChars = [
    upper.charAt(Math.floor(Math.random() * upper.length)),
    lower.charAt(Math.floor(Math.random() * lower.length)),
    numbers.charAt(Math.floor(Math.random() * numbers.length)),
    special.charAt(Math.floor(Math.random() * special.length)),
  ];

  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(allChars.charAt(Math.floor(Math.random() * allChars.length)));
  }

  return passwordChars.sort(() => Math.random() - 0.5).join("");
};

const getFormSchema = (isEdit: boolean, roleId: number) => {
  return z
    .object({
      first_name: z
        .string()
        .trim()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters")
        .regex(/^[a-zA-Z0-9\s]+$/, "First name can only contain alphanumeric characters and spaces"),
      last_name: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Last name cannot exceed 50 characters")
        .regex(/^[a-zA-Z0-9\s]+$/, "Last name can only contain alphanumeric characters and spaces"),
      phone_number: z
        .string()
        .trim()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
      email: z
        .string()
        .trim()
        .toLowerCase()
        .min(1, "Email address is required")
        .max(100, "Email cannot exceed 100 characters")
        .email("Please enter a valid email format (e.g., user@example.com)"),
      caller_id: z
        .string()
        .trim()
        .min(1, "Caller ID is required")
        .regex(/^\d+$/, "Caller ID must contain only numbers"),
      login_id: z.string().optional(),
      password: z.string().optional(),
      role_id: z.number({ error: "Role is required" }),
      reporting_manager_id: z.number({ error: "Invalid manager selection" }).nullable().optional(),
      project_id: z.number().optional().nullable(),
    })
    .superRefine((data, ctx) => {
      if (roleId === 4 && !data.reporting_manager_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Reporting manager is required",
          path: ["reporting_manager_id"],
        });
      }
    });
};

type FormValues = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  caller_id: string;
  login_id?: string;
  password?: string;
  role_id: number;
  reporting_manager_id?: number | null;
  project_id?: number | null;
};

const extractProjectId = (vals?: any): number | undefined => {
  if (!vals) return undefined;
  if (vals.project_id !== undefined && vals.project_id !== null && vals.project_id !== "") {
    const num = Number(vals.project_id);
    if (!isNaN(num) && num > 0) return num;
  }
  if (vals.projectId !== undefined && vals.projectId !== null && vals.projectId !== "") {
    const num = Number(vals.projectId);
    if (!isNaN(num) && num > 0) return num;
  }
  if (vals.project_ids && Array.isArray(vals.project_ids) && vals.project_ids.length > 0) {
    const num = Number(vals.project_ids[0]);
    if (!isNaN(num) && num > 0) return num;
  }
  return undefined;
};

interface UserFormProps {
  onSubmit: (values: any) => void;
  isLoading?: boolean;
  initialValues?: Partial<Omit<FormValues, 'project_id'>> & {
    project_ids?: (number | string)[];
    project_id?: number | string;
    projectId?: number | string;
    [key: string]: any;
  };
  isEdit?: boolean;
  roleId: number;
  roleLabel: string;
  onClose?: () => void;
}

export const UserForm = ({
  onSubmit,
  isLoading,
  initialValues,
  isEdit = false,
  roleId,
  roleLabel,
  onClose,
}: UserFormProps) => {
  const [open, setOpen] = useState(false);

  // Fetch all Relationship Managers (Role ID 3) for the reporting manager dropdown
  const { data: managers = [] } = useGetAllUsersByRoleIdQuery({
    role_id: 3,
    offset: 0,
  });
  const { data: masterData } = useGetAllMasterDataQuery();

  const oldProjectId = React.useMemo(() => extractProjectId(initialValues), [initialValues]);

  // Fetch active leads for Relationship Manager in their current project
  const { data: rmLeadsData } = useGetLeadsByRmIdQuery(
    {
      assigned_to_rm: initialValues?.id || 0,
      offset: 0,
      project: oldProjectId ? [oldProjectId] : undefined,
    },
    { skip: !isEdit || !initialValues?.id || roleId !== 3 || !oldProjectId }
  );

  const [pendingProjectId, setPendingProjectId] = useState<number | null>(null);
  const [isImpactDialogOpen, setIsImpactDialogOpen] = useState(false);

  const activeLeadsInCurrentProject = React.useMemo(() => {
    if (!rmLeadsData) return [];
    if (!oldProjectId) return [];

    const leadsList = Array.isArray(rmLeadsData) ? rmLeadsData : (rmLeadsData?.data || []);
    return leadsList.filter(
      (lead: any) => Number(lead.project_id) === Number(oldProjectId) && lead.is_active === 1
    );
  }, [rmLeadsData, oldProjectId]);

  const formSchema = getFormSchema(isEdit, roleId);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    mode: "onChange",
    defaultValues: {
      first_name: initialValues?.first_name || "",
      last_name: initialValues?.last_name || "",
      phone_number: initialValues?.phone_number || "",
      email: initialValues?.email || "",
      caller_id: initialValues?.caller_id ? String(initialValues.caller_id) : "",
      login_id: initialValues?.login_id || "",
      role_id: initialValues?.role_id || roleId,
      reporting_manager_id: initialValues?.reporting_manager_id || null,
      project_id: extractProjectId(initialValues),
    },
  });

  useEffect(() => {
    form.reset({
      first_name: initialValues?.first_name || "",
      last_name: initialValues?.last_name || "",
      phone_number: initialValues?.phone_number || "",
      email: initialValues?.email || "",
      caller_id: initialValues?.caller_id ? String(initialValues.caller_id) : "",
      login_id: initialValues?.login_id || "",
      role_id: initialValues?.role_id || roleId,
      reporting_manager_id: initialValues?.reporting_manager_id || null,
      project_id: extractProjectId(initialValues),
    });
  }, [initialValues, roleId, form]);

  const handleInternalSubmit = (values: FormValues) => {
    // Automatically set login_id to email and transform project_id to project_ids array
    const { project_id, password: _formPassword, ...restValues } = values;
    const generatedPassword = generateRandomPassword();
    const payload = {
      ...restValues,
      email: values.email.toLowerCase(),
      login_id: values.email.toLowerCase(),
      role_id: roleId,
      project_ids: project_id ? [project_id] : [],
      caller_id: values.caller_id.trim(),
      assign_extension: true,
      route_call_through: 2,
      block_web_login: false,
      login_based_calling: false,
      ...(isEdit ? {} : { password: generatedPassword }),
    };
    onSubmit(payload);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (!form) return;
      const index = Array.prototype.indexOf.call(form, e.currentTarget);
      const nextElement = form.elements[index + 1] as HTMLElement;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleInternalSubmit)}
        className="flex flex-col h-full overflow-hidden"
      >
        {/* Fixed Header Section */}
        <div className="px-6 py-6 border-b border-zinc-100 dark:border-zinc-800 shrink-0 bg-white/50 backdrop-blur-sm z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-[24px] font-black text-[#0f3d6b] tracking-tight">
                {isEdit ? `Update ${roleLabel}` : `Create ${roleLabel}`}
              </h2>
              <p className="text-zinc-500 font-medium text-[11px]">
                {isEdit
                  ? `Modify profile details for this ${roleLabel.toLowerCase()}.`
                  : `Fill in the details to create a new ${roleLabel.toLowerCase()} account.`}
              </p>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-400"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Body Section */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7 custom-scrollbar bg-white dark:bg-zinc-950">
          {/* Section Header */}
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-[#0f3d6b]/5 dark:bg-zinc-900 rounded-lg text-[#0f3d6b] shadow-sm">
              <User size={16} />
            </div>
            <h3 className="text-[11px] font-black text-[#0f3d6b] dark:text-zinc-100 tracking-widest uppercase">
              Personal Details
            </h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Vikram"
                        {...field}
                        maxLength={50}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
                          field.onChange(value);
                        }}
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                        className={cn(
                          "h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] transition-all font-bold text-sm placeholder:text-zinc-400/30",
                          fieldState.invalid &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Singh"
                        {...field}
                        maxLength={50}
                        onChange={(e) => {
                          const value = e.target.value.replace(/[^a-zA-Z0-9\s]/g, "");
                          field.onChange(value);
                        }}
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                        className={cn(
                          "h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] transition-all font-bold text-sm placeholder:text-zinc-400/30",
                          fieldState.invalid &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                    Email Address
                  </FormLabel>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#0f3d6b] transition-colors" />
                    <FormControl>
                      <Input
                        placeholder="vikram.s@leados.com"
                        type="email"
                        {...field}
                        maxLength={100}
                        onChange={(e) => field.onChange(e.target.value.trim())}
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                        className={cn(
                          "pl-11 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] transition-all font-bold text-sm placeholder:text-zinc-400/40",
                          fieldState.invalid &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                    Phone Number
                  </FormLabel>
                  <div className="relative group">
                    <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#0f3d6b] transition-colors" />
                    <FormControl>
                      <Input
                        placeholder="+91 98765 43210"
                        {...field}
                        maxLength={10}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        disabled={isLoading}
                        readOnly={isEdit}
                        onKeyDown={handleKeyDown}
                        className={cn(
                          "pl-11 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] transition-all font-bold text-sm placeholder:text-zinc-400/40",
                          isEdit &&
                          "opacity-70 cursor-not-allowed select-none bg-zinc-100 dark:bg-zinc-900",
                          !isEdit &&
                          fieldState.invalid &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caller_id"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                    Caller ID
                  </FormLabel>
                  <div className="relative group">
                    <Radio className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 group-focus-within:text-[#0f3d6b] transition-colors" />
                    <FormControl>
                      <Input
                        placeholder="918069879539"
                        {...field}
                        maxLength={20}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                        disabled={isLoading}
                        onKeyDown={handleKeyDown}
                        className={cn(
                          "pl-11 h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] transition-all font-bold text-sm placeholder:text-zinc-400/40",
                          fieldState.invalid &&
                          "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        )}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Selection (Commented out) */}
            {/*
            <FormField
              control={form.control}
              name="project_id"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                    Project
                  </FormLabel>
                  <Select
                    onValueChange={(v) => {
                      const newVal = Number(v);
                      const oldProjectId = extractProjectId(initialValues);
                      
                      if (isEdit && roleId === 3 && oldProjectId && newVal !== oldProjectId) {
                        setPendingProjectId(newVal);
                        setIsImpactDialogOpen(true);
                      } else {
                        field.onChange(newVal);
                      }
                    }}
                    value={field.value ? String(field.value) : ""}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className={cn(
                        "h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] transition-all font-bold text-sm text-left px-4",
                        fieldState.invalid && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                        !field.value && "text-zinc-400/40"
                      )}>
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {masterData?.projects?.map((project) => (
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
            */}

            {/* Reporting Manager Dropdown (Only for Experience Managers/Agents) */}
            {roleId === 4 && (
              <FormField
                control={form.control}
                name="reporting_manager_id"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-[11px] font-black text-zinc-400 uppercase tracking-widest px-1">
                      Reporting Sales Head
                    </FormLabel>
                    <Popover modal={false} open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className={cn(
                              "h-11 bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 rounded-xl focus-visible:ring-[#0f3d6b]/10 focus-visible:border-[#0f3d6b] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all font-bold text-sm w-full flex items-center justify-between gap-2 overflow-hidden shadow-none",
                              !field.value && "text-zinc-400/40",
                              fieldState.invalid &&
                              "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
                            )}
                            disabled={isLoading}
                          >
                            <span className="truncate max-w-[220px] block">
                              {field.value
                                ? `${managers.find((m) => m.id === field.value)?.first_name} ${managers.find((m) => m.id === field.value)?.last_name}`
                                : "Select Sales Head"}
                            </span>
                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50 text-[#0f3d6b]" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverPrimitive.Content
                        align="start"
                        side="bottom"
                        sideOffset={6}
                        avoidCollisions={false}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        className="w-[320px] h-[300px] p-0 rounded-2xl border border-zinc-100 shadow-2xl z-[99999] bg-white pointer-events-auto flex flex-col overflow-hidden"
                      >
                        <Command className="flex-1 flex flex-col overflow-hidden">
                          <CommandInput
                            placeholder="Search sales heads..."
                            className="h-12 border-none focus:ring-0 text-sm shrink-0"
                          />
                          <CommandList 
                            className="flex-1 overflow-y-auto custom-scrollbar" 
                            style={{ pointerEvents: 'auto', touchAction: 'pan-y' }}
                            data-vaul-no-drag
                          >
                            <CommandEmpty className="py-6 text-xs text-zinc-400 text-center">
                              No sales head found.
                            </CommandEmpty>
                            <CommandGroup className="p-2">
                              {managers.map((manager) => (
                                <CommandItem
                                  key={manager.id}
                                  value={`${manager.first_name} ${manager.last_name}`}
                                  onSelect={() => {
                                    field.onChange(manager.id);
                                    setOpen(false);
                                  }}
                                  className="py-3 px-4 cursor-pointer rounded-xl hover:bg-[#0f3d6b]/5 transition-colors select-none"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4 text-[#0f3d6b]",
                                      manager.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  <div className="flex flex-col">
                                    <span className="font-bold text-zinc-900">
                                      {manager.first_name} {manager.last_name}
                                    </span>
                                    <span className="text-[10px] text-zinc-400 font-bold">
                                      {manager.email}
                                    </span>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverPrimitive.Content>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Fixed Footer Section */}
        <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 shrink-0 bg-zinc-50/30 backdrop-blur-sm">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-[54px] bg-[#0f3d6b] hover:bg-[#0c3156] text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-[#0f3d6b]/10 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading
              ? isEdit
                ? "Updating Profile..."
                : "Creating Account..."
              : isEdit
                ? `Update ${roleLabel}`
                : `Create ${roleLabel}`}
          </Button>
        </div>
      </form>
      {isEdit && roleId === 3 && initialValues?.id && pendingProjectId !== null && (
        <ProjectChangeImpactDialog
          isOpen={isImpactDialogOpen}
          onClose={() => {
            setIsImpactDialogOpen(false);
            setPendingProjectId(null);
          }}
          onConfirm={() => {
            const currentValues = form.getValues();
            const updatedValues = {
              ...currentValues,
              project_id: pendingProjectId,
            };
            form.setValue("project_id", pendingProjectId);
            setIsImpactDialogOpen(false);
            handleInternalSubmit(updatedValues);
            setPendingProjectId(null);
          }}
          currentRmId={Number(initialValues.id)}
          currentRmName={`${initialValues.first_name || ""} ${initialValues.last_name || ""}`.trim()}
          currentProjectId={Number(extractProjectId(initialValues) || 0)}
          newProjectId={pendingProjectId}
          activeLeads={activeLeadsInCurrentProject}
        />
      )}
    </Form>
  );
};
