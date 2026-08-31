import type { Report } from "../types";

export const reports: Report[] = [
  // {
  //   id: 1,
  //   title: "Daily Sales Report",
  //   description:
  //     "Track leads moving through booking milestones in a single day.",
  // },
  // {
  //   id: 2,
  //   title: "Project-wise Objection",
  //   description:
  //     "Break down buyer concerns and EM handling per project.",
  // },
  // {
  //   id: 3,
  //   title: "Persona Report",
  //   description:
  //     "Identify demographic segments and buyer profiles.",
  // },
  // {
  //   id: 4,
  //   title: "Lead Source & Quality",
  //   description:
  //     "Cross-reference lead sources with quality and junk rates.",
  // },
  // {
  //   id: 5,
  //   title: "Campaign Performance",
  //   description:
  //     "View Meta and Google ads funnel drop-offs and cost per booking.",
  // },
  {
    id: 101,
    title: "OP Reports",
    description:
      "Out-Patient consultation metrics, department visits, and analytics.",
    path: "/reports/op-reports",
  },
  {
    id: 102,
    title: "IP Reports",
    description:
      "In-Patient admission metrics, bed occupancy, and discharge analytics.",
    path: "/reports/ip-reports",
  },
  {
    id: 103,
    title: "Revenue Reports (OP & IP Combined)",
    description:
      "Comprehensive revenue analytics combining Out-Patient (OP) and In-Patient (IP) billing, consultation fees, and doctor earnings.",
    path: "/revenue",
  },
];
