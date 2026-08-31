import React, { useState, useMemo } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { Button } from "../../../components/ui/button";
import { DoctorCard } from "../components/DoctorCard";
import { DoctorTable } from "../components/DoctorTable";
import { DoctorDetailsModal } from "../components/DoctorDetailsModal";
import { DoctorFormModal } from "../components/DoctorFormModal";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import {
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../api/doctorsApi";
import { Doctor, DepartmentType, DoctorStatus } from "../types";
import { getSpecializationOptions } from "../data/doctorsData";
import {
  UserPlus,
  LayoutGrid,
  List,
  Stethoscope,
  Building,
  UserCheck,
  Award,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../utils";

export const DoctorsPage = () => {
  const { data: doctors = [], isLoading } = useGetDoctorsQuery();
  const [createDoctor, { isLoading: isCreating }] = useCreateDoctorMutation();
  const [updateDoctor, { isLoading: isUpdating }] = useUpdateDoctorMutation();
  const [deleteDoctor, { isLoading: isDeleting }] = useDeleteDoctorMutation();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<"All" | DepartmentType>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | DoctorStatus>("All");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const specializations = useMemo(() => ["All", ...getSpecializationOptions()], []);

  // Filtered Doctors list
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchSearch =
        search === "" ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
        doc.room_number.toLowerCase().includes(search.toLowerCase()) ||
        doc.phone_number.includes(search);

      const matchDept =
        departmentFilter === "All" ||
        doc.department === departmentFilter ||
        doc.department === "Both";

      const matchStatus =
        statusFilter === "All" || doc.availability_status === statusFilter;

      const matchSpec =
        specializationFilter === "All" ||
        doc.specialization === specializationFilter;

      return matchSearch && matchDept && matchStatus && matchSpec;
    });
  }, [doctors, search, departmentFilter, statusFilter, specializationFilter]);

  // Statistics
  const totalCount = doctors.length;
  const opdCount = doctors.filter((d) => d.department === "OPD" || d.department === "Both").length;
  const ipdCount = doctors.filter((d) => d.department === "IPD" || d.department === "Both").length;
  const availableCount = doctors.filter((d) => d.availability_status === "Available").length;

  const handleFormSubmit = async (data: any) => {
    try {
      if (editingDoctor) {
        await updateDoctor(data).unwrap();
        toast.success("Doctor profile updated successfully");
      } else {
        await createDoctor(data).unwrap();
        toast.success("New doctor registered successfully");
      }
      setIsFormOpen(false);
      setEditingDoctor(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to save doctor details");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    try {
      await deleteDoctor(deleteId).unwrap();
      toast.success("Doctor record deleted successfully");
      setDeleteId(null);
    } catch (err: any) {
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <PageHeader
        title="Doctor Directory & Medical Staff"
        description="Manage medical practitioners, OPD & IPD consultants, schedules, and clinical affiliations"
        actions={
          <Button
            onClick={() => {
              setEditingDoctor(null);
              setIsFormOpen(true);
            }}
            className="gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-2xl h-11 px-6 font-bold text-sm shadow-sm"
          >
            <UserPlus className="h-4 w-4" />
            Add New Doctor
          </Button>
        }
      />

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-primary flex items-center justify-center shrink-0">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Total Doctors</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{totalCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 flex items-center justify-center shrink-0">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">OPD Consultants</p>
            <p className="text-2xl font-black text-indigo-600">{opdCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center shrink-0">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">IPD Doctors</p>
            <p className="text-2xl font-black text-purple-600">{ipdCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Available Now</p>
            <p className="text-2xl font-black text-emerald-600">{availableCount}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by doctor name, specialization, or room..."
            />
          </div>

          {/* Department Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
            {(["All", "OPD", "IPD"] as const).map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  departmentFilter === dept
                    ? "bg-white dark:bg-zinc-800 text-primary shadow-sm"
                    : "text-zinc-500 hover:text-primary"
                )}
              >
                {dept === "All" ? "All Depts" : `${dept} Leads`}
              </button>
            ))}
          </div>

          {/* Dropdown Filters & View Switcher */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Specialization Select */}
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-primary"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === "All" ? "All Specializations" : spec}
                </option>
              ))}
            </select>

            {/* Availability Status Select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Statuses</option>
              <option value="Available">Available</option>
              <option value="In Consultation">In Consultation</option>
              <option value="Emergency Only">Emergency Only</option>
              <option value="On Leave">On Leave</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-zinc-500 hover:text-primary transition-colors",
                  viewMode === "grid" && "bg-white dark:bg-zinc-800 text-primary shadow-sm"
                )}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg text-zinc-500 hover:text-primary transition-colors",
                  viewMode === "table" && "bg-white dark:bg-zinc-800 text-primary shadow-sm"
                )}
                title="Table View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-20 text-center text-zinc-500 font-medium">
          Loading doctors directory...
        </div>
      ) : filteredDoctors.length === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Stethoscope className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No Doctors Found</h3>
          <p className="text-xs text-zinc-500 mt-1">Try resetting search terms or filters.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onViewDetails={(doc) => {
                setSelectedDoctor(doc);
                setIsDetailsOpen(true);
              }}
              onEdit={(doc) => {
                setEditingDoctor(doc);
                setIsFormOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <DoctorTable
          doctors={filteredDoctors}
          onViewDetails={(doc) => {
            setSelectedDoctor(doc);
            setIsDetailsOpen(true);
          }}
          onEdit={(doc) => {
            setEditingDoctor(doc);
            setIsFormOpen(true);
          }}
          onDelete={(id) => setDeleteId(id)}
        />
      )}

      {/* Doctor Details Modal */}
      <DoctorDetailsModal
        doctor={selectedDoctor}
        open={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false);
          setSelectedDoctor(null);
        }}
        onEdit={(doc) => {
          setEditingDoctor(doc);
          setIsFormOpen(true);
        }}
      />

      {/* Doctor Add / Edit Form Modal */}
      <DoctorFormModal
        open={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingDoctor(null);
        }}
        onSubmit={handleFormSubmit}
        doctor={editingDoctor}
        isLoading={isCreating || isUpdating}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete Doctor Record"
        description="Are you sure you want to delete this doctor from the registry? This action cannot be undone."
      />
    </div>
  );
};
