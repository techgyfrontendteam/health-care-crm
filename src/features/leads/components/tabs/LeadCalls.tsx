import React from "react";
import type { LeadCall } from "../../types";
import { LeadCallsTab } from "./LeadCallsTab";

interface LeadCallsProps {
  calls: LeadCall[];
  leadUuid?: string;
}

const LeadCalls: React.FC<LeadCallsProps> = ({ calls }) => {
  return <LeadCallsTab calls={calls} />;
};

export default LeadCalls;
