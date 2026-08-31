import React from 'react';
import { Dialog, DialogContent } from '../../../components/ui/dialog';
import { Lock, XCircle, X, Loader2, Trash2 } from 'lucide-react';
import type { Lead } from '../types';
import { Button } from '../../../components/ui/button';
import { cn } from '../../../utils';

interface JunkValidationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lead: Lead | null;
  attemptsCount?: number;
  minAttemptsRequired?: number;
  projectLabel?: string;
  isLoading?: boolean;
  error?: string | null;
}

export const JunkValidationDialog = ({
  open,
  onClose,
  onConfirm,
  lead,
  attemptsCount = 0,
  minAttemptsRequired = 5,
  projectLabel = 'PLANET GREEN',
  isLoading = false,
  error = null,
}: JunkValidationDialogProps) => {
  if (!lead) return null;

  const isBlocked = attemptsCount < minAttemptsRequired || !!error;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[480px] p-8 rounded-[24px] border-none shadow-2xl flex flex-col items-center text-center gap-6">
        {isLoading ? (
          <div className="py-8 flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#00236F]" />
            <p className="text-[14px] font-medium text-[#575E70]">Verifying call attempts...</p>
          </div>
        ) : (
          <>
            {/* Icon */}
            {isBlocked ? (
              <div className="w-[64px] h-[64px] bg-[#FFF8ED] rounded-full flex items-center justify-center mb-[-8px]">
                <Lock className="h-[28px] w-[28px] text-[#F59E0B]" strokeWidth={2} />
              </div>
            ) : (
              <div className="w-[64px] h-[64px] bg-[#FEF2F2] rounded-full flex items-center justify-center mb-[-8px]">
                <Trash2 className="h-[28px] w-[28px] text-[#D92D20]" strokeWidth={2} />
              </div>
            )}

            {/* Text Section */}
            <div className="space-y-2">
              <h2 className="text-[20px] font-bold text-[#191C1E]">
                {isBlocked ? 'Action Blocked' : 'Mark Lead as Junk?'}
              </h2>
              <p className="text-[14px] leading-[22px] text-[#575E70] font-normal max-w-[280px] mx-auto">
                {isBlocked 
                  ? `This action requires a minimum of ${minAttemptsRequired} contact attempts before a lead can be marked as junk.`
                  : "Are you sure you want to move this lead to the junk?"}
              </p>
            </div>

            {/* Lead Card Info */}
            <div className="w-full bg-[#F8FAFC] rounded-[16px] p-5 text-left border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h3 className="font-bold text-[#191C1E] text-[16px] leading-none">
                    {lead.first_name} {lead.last_name}
                  </h3>
                  <p className="text-[12px] text-[#575E70] font-normal">#{lead.lead_id || 'LD-9915'}</p>
                </div>
                <div className="px-3 py-1.5 bg-[#F0F4F8] text-[#00236F] font-semibold text-[10px] uppercase tracking-wider rounded-full">
                  {projectLabel}
                </div>
              </div>

              <div className="h-[1px] w-full bg-slate-200 my-4" />

              <div className="flex items-center gap-3">
                {error ? (
                  <div className="w-[24px] h-[24px] rounded-full bg-[#FEF2F2] flex items-center justify-center shrink-0">
                    <X className="h-3.5 w-3.5 text-[#D92D20]" strokeWidth={3} />
                  </div>
                ) : isBlocked ? (
                  <div className="w-[24px] h-[24px] rounded-full bg-[#191C1E] flex items-center justify-center shrink-0">
                    <X className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-[24px] h-[24px] rounded-full bg-[#DCFCE7] flex items-center justify-center shrink-0">
                    <svg className="h-3.5 w-3.5 text-[#16A34A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <span className={cn("font-semibold text-[14px]", error ? "text-[#D92D20]" : "text-[#191C1E]")}>
                  {error ? error : `${attemptsCount} / ${minAttemptsRequired} Attempts Completed`}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full flex items-center gap-3 mt-2">
              <Button
                variant="ghost"
                className="flex-1 rounded-[12px] h-[48px] font-bold text-slate-800 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                className={cn(
                  "flex-1 rounded-full h-[48px] font-bold transition-all shadow-none",
                  isBlocked 
                    ? "bg-slate-200 text-white hover:bg-slate-200 cursor-not-allowed opacity-100" 
                    : "bg-[#D92D20] hover:bg-[#B42318] text-white"
                )}
                disabled={isBlocked}
                onClick={onConfirm}
              >
                Mark as Junk
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
