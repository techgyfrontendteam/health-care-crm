export interface FollowUpStatus {
  code: string;
  name: string;
}

export const initialGlobalFollowUpStatuses: FollowUpStatus[] = [
  { code: "NLEAD", name: "New lead" },
  { code: "CNTD", name: "Contacted" },
  { code: "STP", name: "Site Visit Planned" },
  { code: "NGTN", name: "Negotiation" },
  { code: "INRSD", name: "Interested" },
  { code: "DSRD", name: "Details Shared" },
  { code: "FWUP", name: "Follow Up" },
  { code: "BOKD", name: "Booking Done" },
  { code: "QUAL", name: "Qualified" },
  { code: "DEMO", name: "Demo Completed" },
  { code: "PROP", name: "Proposal Sent" },
];

export const initialProjectFollowUpStatuses: Record<string, string[]> = {
  "planet-green": ["NLEAD", "CNTD", "STP", "NGTN"],
  "farmnatura": ["INRSD", "DSRD", "FWUP"],
  "eco-world": ["BOKD", "QUAL", "DEMO", "PROP"],
};
