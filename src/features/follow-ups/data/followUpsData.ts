export interface FollowUp {
  id: string;
  leadId: string;
  leadUuid?: string;
  leadName: string;
  leadPhone: string;
  leadEmail: string;
  projectName: string;
  type: "Call" | "WhatsApp" | "Email" | "Site Visit";
  status: "Pending" | "Completed" | "Overdue" | "Cancelled";
  scheduledAt: string;
  scheduledTime: string;
  assignedRm: string;
  assignedEm?: string;
  remarks: string;
  lastAction: string;
  outcome?: string;
}

const demoDate = (dayOffset: number) => {
  const date = new Date();
  date.setDate(date.getDate() + dayOffset);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

export const initialFollowUps: FollowUp[] = [
  {
    id: "fu-1", leadId: "#2005", leadUuid: "demo-lead-2005", leadName: "Kavya Iyer",
    leadPhone: "+91 94444 55667", leadEmail: "kavya.iyer@example.com",
    projectName: "Nizampet", type: "Call", status: "Pending",
    scheduledAt: demoDate(0), scheduledTime: "10:30 AM", assignedRm: "Rahul Mehta",
    assignedEm: "Nisha Kapoor", remarks: "Confirm fasting instructions before the cardiology consultation.",
    lastAction: "Appointment reminder shared",
  },
  {
    id: "fu-2", leadId: "#2006", leadUuid: "demo-lead-2006", leadName: "Aditya Menon",
    leadPhone: "+91 90123 45678", leadEmail: "aditya.menon@example.com",
    projectName: "Kondapur", type: "WhatsApp", status: "Pending",
    scheduledAt: demoDate(1), scheduledTime: "12:15 PM", assignedRm: "Priya Sharma",
    assignedEm: "Arjun Nair", remarks: "Share gastroenterology package details and available appointment slots.",
    lastAction: "Patient requested package information",
  },
  {
    id: "fu-3", leadId: "#2007", leadUuid: "demo-lead-2007", leadName: "Meera Kapoor",
    leadPhone: "+91 98760 12345", leadEmail: "meera.kapoor@example.com",
    projectName: "KPHB", type: "Call", status: "Pending",
    scheduledAt: demoDate(2), scheduledTime: "03:00 PM", assignedRm: "Karan Verma",
    assignedEm: "Sneha Rao", remarks: "Check child vaccination history before the pediatric OPD visit.",
    lastAction: "Vaccination records requested",
  },
  {
    id: "fu-4", leadId: "#2008", leadUuid: "demo-lead-2008", leadName: "Vikram Shah",
    leadPhone: "+91 98220 33445", leadEmail: "vikram.shah@example.com",
    projectName: "Nizampet", type: "Email", status: "Completed",
    scheduledAt: demoDate(-1), scheduledTime: "11:45 AM", assignedRm: "Rahul Mehta",
    assignedEm: "Asha Patel", remarks: "Send treatment plan and estimated procedure cost.",
    lastAction: "Treatment plan emailed", outcome: "Patient confirmed receipt and requested a callback.",
  },
  {
    id: "fu-5", leadId: "#2002", leadUuid: "demo-lead-2002", leadName: "Diya Reddy",
    leadPhone: "+91 91234 56789", leadEmail: "diya.reddy@example.com",
    projectName: "Kondapur", type: "Call", status: "Completed",
    scheduledAt: demoDate(-2), scheduledTime: "04:20 PM", assignedRm: "Priya Sharma",
    assignedEm: "Arjun Nair", remarks: "Discuss knee replacement consultation preparation.",
    lastAction: "Consultation explained", outcome: "OPD consultation booked for next week.",
  },
  {
    id: "fu-6", leadId: "#2003", leadUuid: "demo-lead-2003", leadName: "Rohan Mehta",
    leadPhone: "+91 99887 76655", leadEmail: "rohan.mehta@example.com",
    projectName: "KPHB", type: "Call", status: "Overdue",
    scheduledAt: demoDate(-1), scheduledTime: "09:30 AM", assignedRm: "Karan Verma",
    assignedEm: "Sneha Rao", remarks: "Follow up on MRI reports and neurologist availability.",
    lastAction: "Callback not completed",
  },
  {
    id: "fu-7", leadId: "#2004", leadUuid: "demo-lead-2004", leadName: "Ishita Nair",
    leadPhone: "+91 90000 11223", leadEmail: "ishita.nair@example.com",
    projectName: "Nizampet", type: "WhatsApp", status: "Overdue",
    scheduledAt: demoDate(-2), scheduledTime: "02:10 PM", assignedRm: "Rahul Mehta",
    assignedEm: "Asha Patel", remarks: "Confirm oncology second-opinion document checklist.",
    lastAction: "Documents pending",
  },
];
