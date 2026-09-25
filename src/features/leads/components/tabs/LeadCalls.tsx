import React from "react";
import type { LeadCall } from "../../types";
import { LeadCallsTab } from "./LeadCallsTab";

interface LeadCallsProps {
  calls: LeadCall[];
  leadUuid?: string;
  refetch?: () => void;
}

const LeadCalls: React.FC<LeadCallsProps> = ({ calls, refetch }) => {
  return <LeadCallsTab calls={calls} refetch={refetch} />;
};

export default LeadCalls;
