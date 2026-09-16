import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, CalendarCheck, FileSpreadsheet } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface ComingSoonReportPageProps {
  title: string;
}

export const ComingSoonReportPage: React.FC<ComingSoonReportPageProps> = ({ title }) => {
  const navigate = useNavigate();
  const isOpReport = title.toLowerCase().startsWith("op");
  const metrics = isOpReport
    ? [
        { label: "Total OP visits", value: "1,280", detail: "+12.4% this month" },
        { label: "Completed consultations", value: "1,146", detail: "89.5% completion" },
        { label: "Average wait time", value: "18 min", detail: "3 min faster" },
        { label: "Follow-up conversion", value: "23.8%", detail: "305 follow-ups" },
      ]
    : [
        { label: "Total admissions", value: "312", detail: "+8.6% this month" },
        { label: "Bed occupancy", value: "78%", detail: "195 of 250 beds" },
        { label: "Average length of stay", value: "4.2 days", detail: "0.4 day improvement" },
        { label: "Discharges", value: "276", detail: "88.5% discharge rate" },
      ];
  const rows = isOpReport
    ? [
        ["Cardiology", "286", "258", "₹3,09,600"],
        ["Orthopedics", "241", "216", "₹3,88,800"],
        ["Pediatrics", "224", "207", "₹1,65,600"],
        ["Neurology", "198", "174", "₹2,61,000"],
        ["Dermatology", "176", "162", "₹1,45,800"],
      ]
    : [
        ["Cardiology", "72", "82%", "₹18,00,000"],
        ["Orthopedics", "64", "76%", "₹19,20,000"],
        ["Neurology", "58", "80%", "₹17,40,000"],
        ["Oncology", "49", "74%", "₹22,05,000"],
        ["General Surgery", "42", "69%", "₹12,60,000"],
      ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/reports")}
          className="h-10 w-10 rounded-xl"
        >
          <ArrowLeft className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-[#0f3d6b] dark:text-white tracking-tight">
            {title}
          </h1>
          <p className="text-xs text-zinc-500 font-medium">Reports & Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <div key={metric.label} className={`rounded-md border p-5 shadow-sm ${index === 0 ? "dashboard-focus-card border-[#0f1a34] bg-[#0f1a34] text-white" : "border-[#e2e8f0] bg-white"}`}>
            <div className="mb-5 flex items-center justify-between">
              <p className={`text-xs font-bold uppercase tracking-wider ${index === 0 ? "text-white/70" : "text-slate-500"}`}>{metric.label}</p>
              {index === 0 ? <Activity className="h-5 w-5 text-white" /> : <CalendarCheck className="h-5 w-5 text-[#0022ff]" />}
            </div>
            <p className={`text-3xl font-black ${index === 0 ? "text-white" : "text-[#0f1a3a]"}`}>{metric.value}</p>
            <p className={`mt-2 text-xs font-semibold ${index === 0 ? "text-white/70" : "text-slate-500"}`}>{metric.detail}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-md border border-[#e2e8f0] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#e2e8f0] px-6 py-5">
          <div>
            <h2 className="text-lg font-black text-[#0f1a3a]">Department performance</h2>
            <p className="mt-1 text-xs font-medium text-slate-500">Temporary September 2026 operational data</p>
          </div>
          <Button variant="outline" className="h-10 gap-2 rounded-md border-[#e2e8f0] text-[#0f1a3a]">
            <FileSpreadsheet className="h-4 w-4" /> Export
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left">
            <thead className="bg-[#f8f9fa] text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">{isOpReport ? "Visits" : "Admissions"}</th>
                <th className="px-6 py-4">{isOpReport ? "Completed" : "Occupancy"}</th>
                <th className="px-6 py-4">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] text-sm">
              {rows.map((row) => (
                <tr key={row[0]} className="hover:bg-[#f8f9fa]/70">
                  <td className="px-6 py-4 font-bold text-[#0f1a3a]">{row[0]}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{row[1]}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{row[2]}</td>
                  <td className="px-6 py-4 font-bold text-[#0022ff]">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
