import React from "react";
import { PageHeader } from "../../../shared/components/PageHeader/PageHeader";
import { ReportsGrid } from "../components/ReportsGrid";

export const ReportsPage = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <PageHeader
        title="Reports & Analytics"
        description="Select a report to view live metrics, filter by project, and export data. Your dashboard is configured for real-time tracking across all residential pipelines."
      />
      <ReportsGrid />
    </div>
  );
};
