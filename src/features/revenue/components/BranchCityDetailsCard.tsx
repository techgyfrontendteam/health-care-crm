import React from "react";
import type { BranchInfo } from "../types";
import {
  Building2,
  MapPin,
  Phone,
  BedDouble,
  Users,
  IndianRupee,
  Globe,
  PieChart,
  CheckCircle2,
  Sparkles,
  Navigation,
} from "lucide-react";

interface BranchCityDetailsCardProps {
  selectedBranch: BranchInfo | null;
  allBranches: BranchInfo[];
}

export const BranchCityDetailsCard: React.FC<BranchCityDetailsCardProps> = ({
  selectedBranch,
  allBranches,
}) => {
  // If "All Branches" is selected (selectedBranch is null)
  if (!selectedBranch) {
    const totalBeds = allBranches.reduce((acc, b) => acc + b.totalBeds, 0);
    const totalDoctors = allBranches.reduce((acc, b) => acc + b.activeDoctors, 0);
    const uniqueCities = Array.from(new Set(allBranches.map((b) => b.city)));

    return (
      <div className="bg-gradient-to-r from-slate-900 via-[#063669] to-blue-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-900/50 relative overflow-hidden transition-all">
        {/* Background decorative element */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Main Info Header */}
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/20 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 text-blue-400" />
              <span>Multi-City Hospital Network</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              All Branches & City Overview
            </h2>

            <p className="text-xs sm:text-sm text-blue-100/80 leading-relaxed">
              Consolidated financial and operational performance across all{" "}
              <strong className="text-white font-bold">{allBranches.length} branches</strong> spanning{" "}
              <strong className="text-white font-bold">{uniqueCities.length} major cities</strong> ({uniqueCities.join(", ")}).
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/10 dark:bg-black/20 p-3 sm:p-4 rounded-xl border border-white/10 backdrop-blur-md">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="h-3 w-3 text-cyan-400" /> Cities
              </span>
              <p className="text-lg font-black text-white">{uniqueCities.length}</p>
              <span className="text-[10px] text-blue-300 font-medium">Metros & Hubs</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1">
                <Building2 className="h-3 w-3 text-blue-400" /> Branches
              </span>
              <p className="text-lg font-black text-white">{allBranches.length}</p>
              <span className="text-[10px] text-blue-300 font-medium">Active Hospitals</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1">
                <BedDouble className="h-3 w-3 text-purple-400" /> Total Beds
              </span>
              <p className="text-lg font-black text-white">{totalBeds}</p>
              <span className="text-[10px] text-blue-300 font-medium">Network Capacity</span>
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wider flex items-center gap-1">
                <Users className="h-3 w-3 text-emerald-400" /> Specialists
              </span>
              <p className="text-lg font-black text-white">{totalDoctors}</p>
              <span className="text-[10px] text-blue-300 font-medium">Active Doctors</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If a specific branch is selected
  return (
    <div className="bg-gradient-to-r from-blue-900 via-[#063669] to-indigo-950 text-white rounded-2xl p-5 sm:p-6 shadow-md border border-blue-800/60 relative overflow-hidden transition-all">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        {/* Left Side: Branch & City Overview */}
        <div className="space-y-3 max-w-xl">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-200 text-xs font-bold border border-cyan-400/30">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              City: <span className="text-white underline decoration-cyan-400 underline-offset-2">{selectedBranch.city}</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-200 text-xs font-semibold border border-purple-400/30">
              State: {selectedBranch.state}
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <CheckCircle2 className="h-3 w-3 text-emerald-400" /> ID: {selectedBranch.id}
            </span>
          </div>

          {/* Branch Title & City Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Building2 className="h-6 w-6 text-blue-400 shrink-0" />
              {selectedBranch.name}
            </h2>
            <p className="text-xs sm:text-sm text-blue-200/90 mt-1 flex items-start gap-1.5 leading-snug">
              <Navigation className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{selectedBranch.location}</span>
            </p>
          </div>

          {/* Contact & City Phone */}
          <div className="flex items-center gap-4 text-xs text-blue-200/80 pt-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="h-3.5 w-3.5 text-cyan-400" /> {selectedBranch.phone}
            </span>
            <span className="text-blue-400">•</span>
            <span className="font-semibold text-emerald-300 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" /> City Hub Operational
            </span>
          </div>
        </div>

        {/* Right Side: City & Branch Detailed Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-black/25 p-4 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-purple-400" /> City Beds
            </span>
            <p className="text-lg font-black text-white">{selectedBranch.totalBeds}</p>
            <span className="text-[10px] text-blue-300/80 font-medium">Inpatient Beds</span>
          </div>

          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-emerald-400" /> City Doctors
            </span>
            <p className="text-lg font-black text-white">{selectedBranch.activeDoctors}</p>
            <span className="text-[10px] text-blue-300/80 font-medium">Attending Staff</span>
          </div>

          <div className="col-span-2 sm:col-span-1 space-y-0.5">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1">
              <PieChart className="h-3.5 w-3.5 text-blue-400" /> OPD / IPD Share
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 border border-blue-400/20">
                OPD {selectedBranch.opdShare}%
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 border border-purple-400/20">
                IPD {selectedBranch.ipdShare}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
