import React from 'react';
import { Badge } from '../../../components/ui/badge';
import { cn } from '../../../utils';

type LeadStatus = 'new' | 'assigned' | 'contacted' | 'interested' | 'not_interested' | 'converted' | string;

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  'NEW LEAD': { label: 'New Lead', className: 'bg-blue-100 text-blue-700 border-blue-200' },
  'CONTACTED': { label: 'Contacted', className: 'bg-purple-100 text-purple-700 border-purple-200' },
  'SITE VISIT PLANNED': { label: 'Site Visit Planned', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  'FOLLOW UP': { label: 'Follow Up', className: 'bg-orange-100 text-orange-700 border-orange-200' },
  'DETAILS SHARED': { label: 'Details Shared', className: 'bg-green-100 text-green-700 border-green-200' },
  'JUNK REVIEW': { label: 'Junk Review', className: 'bg-red-100 text-red-700 border-red-200' },
  'JUNK': { label: 'Junk', className: 'bg-red-200 text-red-800 border-red-300' },
  'CONVERTED': { label: 'Converted', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
};

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const upperStatus = status.toUpperCase();
  const config = STATUS_CONFIG[upperStatus] ?? { label: status, className: 'bg-zinc-100 text-zinc-600 border-zinc-200' };
  
  return (
    <Badge variant="outline" className={cn("font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full", config.className)}>
      {config.label}
    </Badge>
  );
};
