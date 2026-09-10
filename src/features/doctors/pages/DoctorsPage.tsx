import React, { useState, useMemo, useEffect } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { Button } from "../../../components/ui/button";
import { DoctorCard } from "../components/DoctorCard";
import { DoctorTable } from "../components/DoctorTable";
import { DoctorDetailsModal } from "../components/DoctorDetailsModal";
import { DoctorFormModal } from "../components/DoctorFormModal";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import type { Doctor, DepartmentType, ApiDoctor } from "../types";
import {
  UserPlus,
  LayoutGrid,
  List,
  Stethoscope,
  Building,
  Award,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Users,
  Activity,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../../utils";
import { useGetAllDoctorsQuery, useGetDoctorStatsQuery } from "../api/doctorsApiSlice";
import { useGetAllMasterDataQuery } from "../../master/api/masterApi";

export const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Filter states
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState<number>(0);
  const [selectedSpecId, setSelectedSpecId] = useState<number>(0);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Debounce search input (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  // Master Data
  const { data: masterData } = useGetAllMasterDataQuery();

  // RTK Query with all 4 backend parameters
  const { data: allDoctorsResp, isLoading: isAllDoctorsLoading, isFetching: isAllDoctorsFetching } = useGetAllDoctorsQuery({
    branch_id: selectedBranchId,
    specialization_id: selectedSpecId,
    service_id: selectedServiceId,
    search_text: debouncedSearch.trim() || undefined,
  });

  // Doctor Stats Query (Filtered by selectedBranchId)
  const { data: doctorStatsResp, isLoading: isStatsLoading } = useGetDoctorStatsQuery({
    branch_id: selectedBranchId || 0,
  });
  const stats = doctorStatsResp?.data;

  // Map API doctors to Doctor models using master data descriptions
  useEffect(() => {
    if (allDoctorsResp?.data && masterData) {
      const mappedDocs: Doctor[] = allDoctorsResp.data.map((apiDoc: ApiDoctor) => {
        const specName =
          masterData.specialisations?.find((s) => s.id === apiDoc.specialization_id)?.description ||
          "General Medicine";
        const branchName =
          masterData.branches?.find((b) => b.id === apiDoc.branch_id)?.description ||
          "Main Branch";
        const serviceName =
          masterData.services?.find((s) => s.id === apiDoc.service_id)?.description ||
          "Both";

        let department: DepartmentType = "Both";
        if (serviceName.toUpperCase().includes("OPD") && !serviceName.toUpperCase().includes("IPD")) {
          department = "OPD";
        } else if (serviceName.toUpperCase().includes("IPD") && !serviceName.toUpperCase().includes("OPD")) {
          department = "IPD";
        }

        const startT = apiDoc.available_start_time ? apiDoc.available_start_time.slice(0, 5) : "09:00";
        const endT = apiDoc.available_end_time ? apiDoc.available_end_time.slice(0, 5) : "17:00";

        return {
          id: apiDoc.id,
          name: `${apiDoc.first_name || ""} ${apiDoc.last_name || ""}`.trim(),
          first_name: apiDoc.first_name,
          last_name: apiDoc.last_name,
          email: apiDoc.email,
          phone_number: apiDoc.phone_number,
          image_url: apiDoc.profile_img,
          consultation_fee: Number(apiDoc.consultation_fee) || 0,
          working_hours: `${startT} - ${endT}`,
          department: department,
          specialization: specName,
          service_type: serviceName,
          hospital_branch: branchName,
          qualification: apiDoc.education,
          experience_years: Number(apiDoc.experience) || 0,
          is_active: apiDoc.is_active,
          created_at: apiDoc.created_on,
        };
      });
      setDoctors(mappedDocs);
    } else if (allDoctorsResp?.data && !masterData) {
      const mappedDocs: Doctor[] = allDoctorsResp.data.map((apiDoc: ApiDoctor) => ({
        id: apiDoc.id,
        name: `${apiDoc.first_name || ""} ${apiDoc.last_name || ""}`.trim(),
        first_name: apiDoc.first_name,
        last_name: apiDoc.last_name,
        email: apiDoc.email,
        phone_number: apiDoc.phone_number,
        image_url: apiDoc.profile_img,
        consultation_fee: Number(apiDoc.consultation_fee) || 0,
        working_hours: "09:00 - 17:00",
        department: "Both",
        specialization: "Specialist",
        service_type: "Both",
        hospital_branch: "Branch",
        qualification: apiDoc.education,
        experience_years: Number(apiDoc.experience) || 0,
        is_active: apiDoc.is_active,
        created_at: apiDoc.created_on,
      }));
      setDoctors(mappedDocs);
    }
  }, [allDoctorsResp, masterData]);


  // Pagination states
  const [page, setPage] = useState(1);
  const limit = 8;

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedBranchId, selectedSpecId, selectedServiceId]);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Pagination Calculations
  const totalDoctors = doctors.length;
  const totalPages = Math.ceil(totalDoctors / limit);
  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * limit;
    return doctors.slice(start, start + limit);
  }, [doctors, page, limit]);

  // Statistics fallbacks
  const totalCount = stats?.total_doctors ?? doctors.length;
  const opdCount = stats?.op_doctors ?? doctors.filter((d) => d.department === "OPD" || d.department === "Both" || d.service_type?.includes("OPD")).length;
  const ipdCount = stats?.ip_doctors ?? doctors.filter((d) => d.department === "IPD" || d.department === "Both" || d.service_type?.includes("IPD")).length;
  const bothCount = stats?.both_doctors ?? doctors.filter((d) => d.department === "Both" || d.service_type?.toLowerCase().includes("both")).length;
  const availableCount = stats?.available_doctors ?? doctors.filter((d) => d.is_active === 1).length;

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
        is_active: 1,
        created_at: new Date().toISOString(),
        image_url: data.image_url || "",
      };
      setDoctors((prev) => [newDoc, ...prev]);
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

      {/* KPI Metrics Cards Banner (from getDoctorStats) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Doctors */}
        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-blue-200 dark:hover:border-blue-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-[#063669] dark:text-blue-400 flex items-center justify-center shrink-0 shadow-inner">
            <Users className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider truncate">Total Doctors</p>
            <p className="text-2xl font-black text-zinc-900 dark:text-zinc-100 mt-0.5">
              {isStatsLoading ? <Loader2 className="h-5 w-5 animate-spin text-zinc-400 inline" /> : totalCount}
            </p>
          </div>
        </div>

        {/* OP Doctors (OPD) */}
        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 shadow-inner">
            <Activity className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider truncate">OP Doctors</p>
            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
              {isStatsLoading ? <Loader2 className="h-5 w-5 animate-spin text-indigo-400 inline" /> : opdCount}
            </p>
          </div>
        </div>

        {/* IP Doctors (IPD) */}
        <div className="bg-white dark:bg-zinc-950 p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm flex items-center gap-4 group hover:border-purple-200 dark:hover:border-purple-900 transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-inner">
            <Building className="h-6 w-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider truncate">IP Doctors</p>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-0.5">
              {isStatsLoading ? <Loader2 className="h-5 w-5 animate-spin text-purple-400 inline" /> : ipdCount}
            </p>
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
              placeholder="Search by doctor name..."
            />
          </div>

          {/* Dropdown Filters & View Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end">
            {/* Service Type Select */}
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(Number(e.target.value))}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] cursor-pointer"
            >
              <option value={0}>All Service Types</option>
              {masterData?.services && masterData.services.length > 0 ? (
                masterData.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.description}
                  </option>
                ))
              ) : (
                <>
                  <option value={1}>OP Doctors (OPD)</option>
                  <option value={2}>IP Doctors (IPD)</option>
                  <option value={6}>Both (IPD &amp; OPD)</option>
                </>
              )}
            </select>

            {/* Branch Select */}
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(Number(e.target.value))}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] cursor-pointer"
            >
              <option value={0}>All Branches</option>
              {masterData?.branches?.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.description}
                </option>
              ))}
            </select>

            {/* Department / Specialization Select */}
            <select
              value={selectedSpecId}
              onChange={(e) => setSelectedSpecId(Number(e.target.value))}
              className="h-10 px-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-bold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] cursor-pointer"
            >
              <option value={0}>All Departments</option>
              {masterData?.specialisations?.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.description}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-zinc-500 hover:text-[#063669] transition-colors cursor-pointer",
                  viewMode === "grid" && "bg-white dark:bg-zinc-800 text-[#063669] dark:text-blue-400 shadow-sm"
                )}
                title="Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg text-zinc-500 hover:text-[#063669] transition-colors cursor-pointer",
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
      {isAllDoctorsLoading || isAllDoctorsFetching ? (
        <div className="py-20 text-center bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Loader2 className="h-8 w-8 text-[#063669] animate-spin mx-auto mb-3" />
          <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Loading Doctors...</h3>
          <p className="text-xs text-zinc-500 mt-1">Fetching medical practitioners from registry.</p>
        </div>
      ) : totalDoctors === 0 ? (
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
