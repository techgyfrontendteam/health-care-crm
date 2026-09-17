import { Phone, PhoneCall } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../components/ui/alert-dialog";

interface CallConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  leadName: string;
  phoneNumber: string;
}

const getInitials = (name: string) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "LD";
};

export const CallConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  leadName,
  phoneNumber,
}: CallConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AlertDialogContent className="w-[calc(100%_-_2rem)] max-w-[440px] gap-0 overflow-hidden border-0 bg-white p-0 shadow-[0_28px_80px_-24px_rgba(15,26,58,0.5)] sm:rounded-[28px] dark:bg-zinc-950">
        <div className="relative overflow-hidden bg-[#0F1A3A] px-6 pb-11 pt-8 text-center sm:px-8">
          <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-7 -top-11 h-32 w-32 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-44 rounded-full bg-[#0022FF]/30 blur-2xl" />

          <div className="relative mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center">
            <span className="absolute inset-0 rounded-full bg-[#4058FF]/25 motion-safe:animate-ping motion-reduce:animate-none" />
            <span className="absolute inset-2 rounded-full border border-white/15 bg-white/10" />
            <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#0022FF] text-white shadow-[0_12px_30px_rgba(0,34,255,0.45)]">
              <PhoneCall className="h-5 w-5" strokeWidth={2.25} />
            </span>
          </div>

          <AlertDialogHeader className="relative space-y-2 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
              Outbound call
            </p>
            <AlertDialogTitle className="text-[24px] font-bold tracking-[-0.02em] text-white">
              Ready to connect?
            </AlertDialogTitle>
            <AlertDialogDescription className="mx-auto max-w-[300px] text-[14px] leading-6 text-slate-300">
              Confirm the contact below before starting the call.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        <div className="relative -mt-5 px-5 sm:px-7">
          <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_30px_-18px_rgba(15,26,58,0.45)] dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF1FF] text-sm font-extrabold text-[#0022FF] dark:bg-blue-950 dark:text-blue-300">
              {getInitials(leadName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold text-[#0F1A3A] dark:text-zinc-100">
                {leadName}
              </p>
              <div className="mt-1 flex items-center gap-1.5 text-[14px] font-medium text-slate-500 dark:text-zinc-400">
                <Phone className="h-3.5 w-3.5 text-[#0022FF]" />
                <span>{phoneNumber}</span>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-[#EEF1FF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0022FF] dark:bg-blue-950 dark:text-blue-300">
              Lead
            </span>
          </div>
        </div>

        <AlertDialogFooter className="gap-3 px-5 pb-6 pt-6 sm:px-7 sm:space-x-0">
          <AlertDialogCancel className="mt-0 h-12 flex-1 rounded-full border-slate-200 bg-white text-sm font-bold text-slate-700 shadow-none hover:bg-slate-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
            Not now
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="h-12 flex-1 rounded-full bg-[#0022FF] text-sm font-bold text-white shadow-none transition-all hover:-translate-y-0.5 hover:bg-[#001BD6] hover:shadow-none focus-visible:ring-[#0022FF] motion-reduce:transform-none motion-reduce:transition-none"
          >
            <Phone className="h-4 w-4" strokeWidth={2.4} />
            Call now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
