import React from "react";
import { ReportCard } from "./ReportCard";
import { reports } from "../constants/reportsData";

export const ReportsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <ReportCard key={report.id} report={report} />
      ))}
    </div>
  );
};
