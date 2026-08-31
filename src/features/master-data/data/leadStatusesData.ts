export interface Status {
  code: string;
  name: string;
  id?: number;
  is_editable?: number;
}

export const initialGlobalStatuses: Status[] = [
  { code: "INRSD", name: "Interested" },
  { code: "DSRD", name: "Details Shared" },
  { code: "FWUP", name: "Follow Up" },
  { code: "BOKD", name: "Booking Done" },
  { code: "NLEAD", name: "New lead" },
  { code: "CNTD", name: "Contacted" },
  { code: "STP", name: "Site Visit Planned" },
  { code: "NGTN", name: "Negotiation" },
  { code: "QUAL", name: "Qualified Lead" },
  { code: "APPT", name: "Appointment Scheduled" },
  { code: "DEMO", name: "Demo Completed" },
  { code: "PROP", name: "Proposal Sent" },
  { code: "UNDR", name: "Under Review" },
  { code: "HLD", name: "On Hold" },
  { code: "CLSD", name: "Closed Won" },
  { code: "LOST", name: "Closed Lost" },
  { code: "REJ", name: "Rejected" },
  { code: "JUNK", name: "Junk Lead" },
  { code: "SPAM", name: "Spam Report" },
  { code: "ARC", name: "Archived" },
  { code: "NP", name: "No Pick Up" },
  { code: "CB", name: "Call Back" },
  { code: "VM", name: "Voicemail Left" },
  { code: "WN", name: "Wrong Number" },
];

export const initialProjectStatuses: Record<string, string[]> = {
  "planet-green": ["NLEAD", "CNTD", "STP", "NGTN", "QUAL", "APPT"],
  "farmnatura": ["INRSD", "DSRD", "FWUP", "DEMO", "PROP"],
  "eco-world": ["BOKD", "UNDR", "HLD", "CLSD"],
};
