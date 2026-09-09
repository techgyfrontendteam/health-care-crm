import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "../../../components/ui/button";

interface ComingSoonReportPageProps {
  title: string;
}

export const ComingSoonReportPage: React.FC<ComingSoonReportPageProps> = ({ title }) => {
  const navigate = useNavigate();

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

      {/* Simple Coming Soon Message */}
      <div className="flex flex-col items-center justify-center min-h-[300px] rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-8 text-center">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">
          Coming Soon
        </h2>
        <p className="text-sm text-zinc-500 mt-2">
          {title} is currently under development.
        </p>
      </div>
    </div>
  );
};
