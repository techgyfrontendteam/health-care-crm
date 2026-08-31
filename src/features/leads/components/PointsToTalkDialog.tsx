import React, { useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { useGetProjectStatusChecklistQuery } from "../../../features/prompts/api/promptApi";

const defaultQuestions = [
  "Did the agent greet the customer professionally?",
  "Did the agent ask for the customer's requirement/needs?",
  "Did the agent explain the project or product details?",
  "Did the agent mention the price or budget clearly?",
  "Did the agent handle customer objections or questions effectively?",
  "Did the agent verify the customer's contact information (Phone/Email)?",
  "Did the agent introduce themselves and the company clearly?",
];

interface PointsToTalkDialogProps {
  project?: string;
  status?: string;
  projectLeadStatusId?: number;
}

export const PointsToTalkDialog = ({ project, status, projectLeadStatusId }: PointsToTalkDialogProps) => {
  const { data: pointsData } = useGetProjectStatusChecklistQuery(
    { project_lead_status_id: Number(projectLeadStatusId) },
    { skip: !projectLeadStatusId }
  );

  const displayQuestions = useMemo(() => {
    if (pointsData && pointsData.success && Array.isArray(pointsData.data) && pointsData.data.length > 0) {
      return pointsData.data.map((q: any) => (typeof q === "string" ? q : q?.description || ""));
    }
    return defaultQuestions;
  }, [pointsData]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 24px",
            width: "175px",
            height: "40px",
            background: "#063669",
            borderRadius: "9999px",
            boxShadow:
              "0px 10px 15px -3px rgba(6, 54, 105, 0.2), 0px 4px 6px -4px rgba(6, 54, 105, 0.2)",
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "20px",
              color: "#FFFFFF",
            }}
          >
            Points to Talk
          </span>
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={10}
        alignOffset={60}
        className="relative w-[95vw] md:w-[720px] 2xl:w-[850px] max-h-[60vh] 2xl:max-h-[70vh] flex flex-col p-0 border border-zinc-100 bg-white shadow-[0px_20px_50px_rgba(0,21,73,0.05)] rounded-[24px] 2xl:rounded-[32px] [&>button:not(.edit-btn)]:hidden"
      >
        {/* Contextual Controls Header (No borders) */}
        <div className="flex-none flex flex-row items-center px-6 py-6 2xl:px-8 2xl:py-8 gap-4 flex-wrap">
          {project && (
            <>
              <span className="font-inter font-bold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] tracking-[1.6px] uppercase text-[rgba(0,21,73,0.6)]">
                PROJECT:
              </span>
              <div className="flex items-center justify-center px-4 h-[40px] 2xl:h-[48px] bg-[#F2F4F6] rounded-lg min-w-[100px] 2xl:min-w-[120px] mr-2">
                <span className="font-inter font-semibold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] text-[#063669]">
                  {project}
                </span>
              </div>
            </>
          )}
          <span className="font-inter font-bold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] tracking-[1.6px] uppercase text-[rgba(0,21,73,0.6)]">
            LEAD STATUS:
          </span>
          <div className="flex items-center justify-center px-4 h-[40px] 2xl:h-[48px] bg-[#F2F4F6] rounded-lg min-w-[100px] 2xl:min-w-[120px]">
            <span className="font-inter font-semibold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] text-[#063669]">
              {status || "New Lead"}
            </span>
          </div>
        </div>

        {/* List of points */}
        <div className="flex-1 flex flex-col gap-3 2xl:gap-4 px-8 2xl:px-12 pb-8 2xl:pb-12 overflow-y-auto">
          {displayQuestions.map((q: string, idx: number) => (
            <div
              key={idx}
              className="flex-none flex flex-row items-center p-5 2xl:p-6 bg-[#F2F4F6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] 2xl:rounded-[16px] min-h-[60px] 2xl:min-h-[70px]"
            >
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-[14px] 2xl:text-[16px] leading-[18px] 2xl:leading-[20px] text-[#001549]">
                {q}
              </span>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
