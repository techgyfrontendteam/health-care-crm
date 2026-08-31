export interface FollowUp {
  id: string;
  leadId: string; // e.g. #LD-9021
  leadUuid?: string; // for details navigation
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  projectName: string;
  type: "Call" | "WhatsApp" | "Email" | "Site Visit";
  status: "Pending" | "Completed" | "Overdue" | "Cancelled";
  scheduledAt: string; // Date string or formatted
  scheduledTime: string; // e.g. 1:30 PM
  assignedRm: string; // Vikram Singh, etc.
  assignedEm?: string; // Aditya Roy, etc.
  remarks: string;
  lastAction: string;
  outcome?: string;
}

export const initialFollowUps: FollowUp[] = [
  {
    id: "fu-1",
    leadId: "#LD-9021",
    leadUuid: "9021-uuid",
    leadName: "Aarav Sharma",
    leadPhone: "+91 98765 43210",
    leadEmail: "aarav.sharma@gmail.com",
    projectName: "Planet Green",
    type: "Call",
    status: "Pending",
    scheduledAt: "24th March, 2024",
    scheduledTime: "1:30 PM",
    assignedRm: "Vikram Singh",
    assignedEm: "All Managers",
    remarks: "Client requested callbacks regarding home loan approvals.",
    lastAction: "Call scheduled by system",
  },
  {
    id: "fu-2",
    leadId: "#LD-9025",
    leadUuid: "9025-uuid",
    leadName: "Aarav Sharma",
    leadPhone: "+91 91234 56789",
    leadEmail: "aarav.sharma@gmail.com",
    projectName: "Farmnatura",
    type: "Call",
    status: "Pending",
    scheduledAt: "24th March, 2024",
    scheduledTime: "2:30 PM",
    assignedRm: "Ananya Iyer",
    assignedEm: "All Managers",
    remarks: "Discuss Farmnatura boundary wall construction schedule.",
    lastAction: "Call scheduled by Ananya",
  },
  {
    id: "fu-3",
    leadId: "#LD-9030",
    leadUuid: "9030-uuid",
    leadName: "Priya Kapoor",
    leadPhone: "+91 88888 77777",
    leadEmail: "priya.kapoor@outlook.com",
    projectName: "Eco World",
    type: "Call",
    status: "Pending",
    scheduledAt: "24th March, 2024",
    scheduledTime: "4:15 PM",
    assignedRm: "Priya Sharma",
    assignedEm: "All Managers",
    remarks: "Discuss price list for 1200 sqft East facing plot.",
    lastAction: "Details shared over WhatsApp",
  },
  {
    id: "fu-4",
    leadId: "#LD-9034",
    leadUuid: "9034-uuid",
    leadName: "Aarav Sharma",
    leadPhone: "+91 99000 11223",
    leadEmail: "aarav.sharma@gmail.com",
    projectName: "Planet Green",
    type: "Call",
    status: "Pending",
    scheduledAt: "24th March, 2024",
    scheduledTime: "5:00 PM",
    assignedRm: "Rahul Verma",
    assignedEm: "All Managers",
    remarks: "Send customized quotation with payment schedule options.",
    lastAction: "Details shared over call",
  },
  {
    id: "fu-5",
    leadId: "#LD-9035",
    leadUuid: "9035-uuid",
    leadName: "Aarav Sharma",
    leadPhone: "+91 77665 54433",
    leadEmail: "aarav.sharma@gmail.com",
    projectName: "Planet Green",
    type: "Call",
    status: "Completed",
    scheduledAt: "24th March, 2024",
    scheduledTime: "5:00 PM",
    assignedRm: "Rahul Verma",
    assignedEm: "All Managers",
    remarks: "Confirm site visit for upcoming Saturday morning.",
    lastAction: "Completed call",
    outcome: "Site visit confirmed for Saturday 10:00 AM.",
  },
  {
    id: "fu-6",
    leadId: "#LD-9036",
    leadUuid: "9036-uuid",
    leadName: "Aarav Sharma",
    leadPhone: "+91 95432 10987",
    leadEmail: "aarav.sharma@gmail.com",
    projectName: "Planet Green",
    type: "Call",
    status: "Completed",
    scheduledAt: "24th March, 2024",
    scheduledTime: "5:00 PM",
    assignedRm: "Rahul Verma",
    assignedEm: "All Managers",
    remarks: "First introduction call and interest mapping.",
    lastAction: "Intro call logged",
    outcome: "Interested in Planet Green Phase 2.",
  }
];
