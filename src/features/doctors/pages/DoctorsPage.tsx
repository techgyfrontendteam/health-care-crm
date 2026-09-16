import React, { useState, useMemo, useEffect } from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { SearchInput } from "../../../shared/components/FilterBar/FilterBar";
import { Button } from "../../../components/ui/button";
import { DoctorTable } from "../components/DoctorTable";
import { DoctorDetailsModal } from "../components/DoctorDetailsModal";
import { DoctorFormModal } from "../components/DoctorFormModal";
import { ConfirmDialog } from "../../../shared/components/ConfirmDialog/ConfirmDialog";
import type { Doctor, DepartmentType, ApiDoctor } from "../types";
import {
  UserPlus,
  Building,
  Users,
  Activity,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
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

  // Debounce search input (350ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 350);
    return () => clearTimeout(timer);
  }, [search]);

  // Master Data
  const { data: masterData } = useGetAllMasterDataQuery();

  // RTK Query with backend parameters
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

        const extractTime = (timeStr?: string, fallback = "09:00") => {
          if (!timeStr) return fallback;
          const match = timeStr.match(/(\d{1,2}):(\d{2})/);
          return match ? `${match[1].padStart(2, "0")}:${match[2]}` : fallback;
        };

        const startT = extractTime(apiDoc.available_start_time, "09:00");
        const endT = extractTime(apiDoc.available_end_time, "17:00");

        return {
          id: apiDoc.id,
          branch_id: apiDoc.branch_id,
          specialization_id: apiDoc.specialization_id,
          service_id: apiDoc.service_id,
          available_start_time: apiDoc.available_start_time,
          available_end_time: apiDoc.available_end_time,
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
      const extractTime = (timeStr?: string, fallback = "09:00") => {
        if (!timeStr) return fallback;
        const match = timeStr.match(/(\d{1,2}):(\d{2})/);
        return match ? `${match[1].padStart(2, "0")}:${match[2]}` : fallback;
      };

      const mappedDocs: Doctor[] = allDoctorsResp.data.map((apiDoc: ApiDoctor) => {
        const startT = extractTime(apiDoc.available_start_time, "09:00");
        const endT = extractTime(apiDoc.available_end_time, "17:00");

        return {
          id: apiDoc.id,
          branch_id: apiDoc.branch_id,
          specialization_id: apiDoc.specialization_id,
          service_id: apiDoc.service_id,
          available_start_time: apiDoc.available_start_time,
          available_end_time: apiDoc.available_end_time,
          name: `${apiDoc.first_name || ""} ${apiDoc.last_name || ""}`.trim(),
          first_name: apiDoc.first_name,
          last_name: apiDoc.last_name,
          email: apiDoc.email,
          phone_number: apiDoc.phone_number,
          image_url: apiDoc.profile_img,
          consultation_fee: Number(apiDoc.consultation_fee) || 0,
          working_hours: `${startT} - ${endT}`,
          department: "Both",
          specialization: "Specialist",
          service_type: "Both",
          hospital_branch: "Branch",
          qualification: apiDoc.education,
          experience_years: Number(apiDoc.experience) || 0,
          is_active: apiDoc.is_active,
          created_at: apiDoc.created_on,
        };
      });
      setDoctors(mappedDocs);
    }
  }, [allDoctorsResp, masterData]);

  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

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
  const paginatedDoctors = useMemo(() => {
    const start = (page - 1) * limit;
    return doctors.slice(start, start + limit);
  }, [doctors, page, limit]);

  // Statistics fallbacks
  const totalCount = stats?.total_doctors ?? doctors.length;
  const opdCount = stats?.op_doctors ?? doctors.filter((d) => d.department === "OPD" || d.department === "Both" || d.service_type?.includes("OPD")).length;
  const ipdCount = stats?.ip_doctors ?? doctors.filter((d) => d.department === "IPD" || d.department === "Both" || d.service_type?.includes("IPD")).length;
  const availableCount = stats?.available_doctors ?? doctors.filter((d) => d.is_active === 1).length;

  const handleFormSubmit = (data: any) => {
    if (editingDoctor) {
      setDoctors((prev) =>
        prev.map((d) => (d.id === editingDoctor.id ? { ...d, ...data } : d))
      );
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
    <div className="space-y-3.5 w-full px-2 sm:px-4 lg:px-6 pb-6 animate-in fade-in duration-200">
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
            className="gap-2 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-xl h-9 px-4 font-bold text-xs shadow-xs"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Add New Doctor
          </Button>
        }
      />

      {/* Compact KPI Metrics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Doctors */}
        <div className="bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center gap-3 hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-150">
          <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-[#063669] dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">Total Doctors</p>
            <p className="text-lg font-black text-zinc-900 dark:text-zinc-100 leading-tight">
              {isStatsLoading ? <Loader2 className="h-4 w-4 animate-spin text-zinc-400 inline" /> : totalCount}
            </p>
          </div>
        </div>

        {/* OP Doctors (OPD) */}
        <div className="bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center gap-3 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-150">
          <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Activity className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">OP Doctors</p>
            <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 leading-tight">
              {isStatsLoading ? <Loader2 className="h-4 w-4 animate-spin text-indigo-400 inline" /> : opdCount}
            </p>
          </div>
        </div>

        {/* IP Doctors (IPD) */}
        <div className="bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center gap-3 hover:border-purple-200 dark:hover:border-purple-900 transition-all duration-150">
          <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Building className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">IP Doctors</p>
            <p className="text-lg font-black text-purple-600 dark:text-purple-400 leading-tight">
              {isStatsLoading ? <Loader2 className="h-4 w-4 animate-spin text-purple-400 inline" /> : ipdCount}
            </p>
          </div>
        </div>

        {/* Active Staff */}
        <div className="bg-white dark:bg-zinc-950 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs flex items-center gap-3 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all duration-150">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">Active Staff</p>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 leading-tight">
              {isStatsLoading ? <Loader2 className="h-4 w-4 animate-spin text-emerald-400 inline" /> : availableCount}
            </p>
          </div>
        </div>
      </div>

      {/* Compact Filter & Search Bar */}
      <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Search Bar */}
          <div className="w-full sm:w-80">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by doctor name..."
            />
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
            {/* Service Type Select */}
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(Number(e.target.value))}
              className="h-8.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] cursor-pointer"
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
              className="h-8.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] cursor-pointer"
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
              className="h-8.5 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-[#063669] cursor-pointer"
            >
              <option value={0}>All Departments</option>
              {masterData?.specialisations?.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main 80vh Doctor Table View with Fixed Bottom Pagination */}
      <DoctorTable
        doctors={paginatedDoctors}
        isLoading={isAllDoctorsLoading || isAllDoctorsFetching}
        page={page}
        limit={limit}
        total={totalDoctors}
        onPageChange={setPage}
        onLimitChange={(newLimit) => {
          setLimit(newLimit);
          setPage(1);
        }}
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
