import React, { useState, useMemo, useEffect } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { Button } from "../../../components/ui/button";
import { DoctorCard } from "../components/DoctorCard";
import { DoctorTable } from "../components/DoctorTable";
import { DoctorDetailsModal } from "../components/DoctorDetailsModal";
import { DoctorFormModal } from "../components/DoctorFormModal";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import type { Doctor, DepartmentType, DoctorStatus } from "../types";
import { mockDoctors, getSpecializationOptions, getBranchOptions } from "../data/doctorsData";
import {
  UserPlus,
  LayoutGrid,
  List,
  Stethoscope,
  Building,
  UserCheck,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../utils";

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<"All" | DepartmentType>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | DoctorStatus>("All");
  const [specializationFilter, setSpecializationFilter] = useState("All");
  const [branchFilter, setBranchFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 8;

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const specializations = useMemo(() => ["All", ...getSpecializationOptions()], []);
  const branches = useMemo(() => ["All", ...getBranchOptions()], []);

  // Filtered Doctors list
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const matchSearch =
        search === "" ||
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(search.toLowerCase()) ||
        (doc.service_type && doc.service_type.toLowerCase().includes(search.toLowerCase())) ||
        (doc.room_number ? doc.room_number.toLowerCase().includes(search.toLowerCase()) : false) ||
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

      const matchBranch =
        branchFilter === "All" || doc.hospital_branch === branchFilter;

      return matchSearch && matchDept && matchStatus && matchSpec && matchBranch;
    });
  }, [doctors, search, departmentFilter, statusFilter, specializationFilter, branchFilter]);

  // Reset page when filters or search change
  useEffect(() => {
    setPage(1);
  }, [search, departmentFilter, statusFilter, specializationFilter, branchFilter]);

  // Pagination Calculations
  const totalDoctors = filteredDoctors.length;
  const totalPages = Math.ceil(totalDoctors / limit);
  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredDoctors.slice(start, start + limit);
  }, [filteredDoctors, page, limit]);

  // Statistics
  const totalCount = doctors.length;
  const opdCount = doctors.filter((d) => d.department === "OPD" || d.department === "Both").length;
  const ipdCount = doctors.filter((d) => d.department === "IPD" || d.department === "Both").length;
  const availableCount = doctors.filter((d) => d.availability_status === "Available").length;

  const handleFormSubmit = (data: any) => {
    if (editingDoctor) {
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingDoctor.id ? { ...d, ...data } : d))
      );
      toast.success("Doctor profile updated successfully");
    } else {
      const newDoc: Doctor = {
        ...data,
        id: Date.now(),
        uuid: `doc-uuid-${Date.now()}`,
        rating: 5.0,
        patients_count: 0,
        is_active: 1,
        created_at: new Date().toISOString(),
        image_url:
          data.image_url ||
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
      };
      setDoctors((prev) => [newDoc, ...prev]);
      toast.success("New doctor registered successfully");
    }
    setIsFormOpen(false);
    setEditingDoctor(null);
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    setDoctors((prev) => prev.filter((d) => d.id !== deleteId));
    toast.success("Doctor record deleted successfully");
    setDeleteId(null);
  };

  return (
    <div className="space-y-6 w-full px-2 sm:px-4 lg:px-6 pb-12">
      {/* Header */}
      <PageHeader
        title="Doctor Directory & Medical Staff"
        description="Manage medical practitioners, OP & IP doctors, schedules, and clinical affiliations"
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
        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-blue-200 dark:hover:border-blue-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#063669] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Doctors</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{totalCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">OP Doctors</p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{opdCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-purple-200 dark:hover:border-purple-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">IP Doctors</p>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{ipdCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-emerald-200 dark:hover:border-emerald-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-inner">
            <UserCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Available Now</p>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{availableCount}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="w-full lg:w-1/3">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by doctor name, specialization, or room..."
            />
          </div>

          {/* Department Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
            {(["All", "OPD", "IPD"] as const).map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                  departmentFilter === dept
                    ? "bg-white dark:bg-zinc-800 text-[#063669] dark:text-blue-400 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                )}
              >
                {dept === "All" ? "All Doctors" : dept === "OPD" ? "OP Doctors" : "IP Doctors"}
              </button>
            ))}
          </div>

          {/* Dropdown Filters & View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            {/* Branch Select */}
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669]"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch === "All" ? "All Branches" : branch}
                </option>
              ))}
            </select>

            {/* Department Select */}
            <select
              value={specializationFilter}
              onChange={(e) => setSpecializationFilter(e.target.value)}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669]"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec === "All" ? "All Departments" : spec}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-zinc-500 hover:text-[#063669] transition-colors",
                  viewMode === "grid" && "bg-white dark:bg-zinc-800 text-[#063669] dark:text-blue-400 shadow-sm"
                )}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg text-zinc-500 hover:text-[#063669] transition-colors",
                  viewMode === "table" && "bg-white dark:bg-zinc-800 text-[#063669] dark:text-blue-400 shadow-sm"
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
      {totalDoctors === 0 ? (
        <div className="py-20 text-center bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Stethoscope className="h-12 w-12 text-zinc-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-zinc-800 dark:text-zinc-200">No Doctors Found</h3>
          <p className="text-xs text-zinc-500 mt-1">Try resetting search terms or filters.</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {paginatedDoctors.map((doctor) => (
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
          doctors={paginatedDoctors}
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

      {/* Pagination Bar */}
      {totalDoctors > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm mt-6">
          <div className="text-xs text-zinc-500 font-medium">
            Showing <span className="font-bold text-zinc-900 dark:text-zinc-100">{Math.min((page - 1) * limit + 1, totalDoctors)} - {Math.min(page * limit, totalDoctors)}</span> of{" "}
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{totalDoctors.toLocaleString()}</span> Doctors
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center gap-1.5 text-xs font-bold"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1 mx-1">
              {page > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setPage(1)}
                  >
                    1
                  </Button>
                  {page > 2 && <span className="px-1 text-zinc-400 text-xs">...</span>}
                </>
              )}

              <Button
                variant="default"
                size="sm"
                className="h-9 w-9 p-0 rounded-xl text-xs font-bold bg-[#063669] text-white hover:bg-[#063669]/90 shadow-sm"
              >
                {page}
              </Button>

              {totalPages > 1 && totalPages > page && (
                <>
                  {totalPages > page + 1 && <span className="px-1 text-zinc-400 text-xs">...</span>}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 p-0 rounded-xl text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => setPage(totalPages)}
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 flex items-center gap-1.5 text-xs font-bold"
              disabled={page >= totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Doctor Record"
        description="Are you sure you want to delete this doctor from the registry? This action cannot be undone."
      />
    </div>
  );
};
