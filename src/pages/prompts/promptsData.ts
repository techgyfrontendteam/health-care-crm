// Lead status configurations and options
export const leadStatusOptions = [
  { value: "new_lead", label: "New Lead" },
  { value: "contacted", label: "Contacted" },
  { value: "interested", label: "Interested" },
  { value: "details_shared", label: "Details Shared" },
  { value: "site_visit_planned", label: "Site Visit Planned" },
  { value: "site_visit_done", label: "Site Visit Done" },
  { value: "negotiation", label: "Negotiation" },
  { value: "follow_up", label: "Follow Up" },
  { value: "booking_done", label: "Booking Done" },
];

// Proportional dummy questions based on lead status
export const dummyQuestionsMap: Record<string, string[]> = {
  new_lead: [
    "Did the agent greet the customer professionally?",
    "Did the agent ask for the customer’s requirement/needs?",
    "Did the agent explain the project or product details?",
    "Did the agent mention the price or budget clearly?",
    "Did the agent handle customer objections or questions effectively?",
    "Did the agent verify the customer’s contact information (Phone/Email)?",
    "Did the agent introduce themselves and the company clearly?",
  ],
  contacted: [
    "Did the agent contact the customer within the standard timeline?",
    "Did the agent speak politely and establish a positive tone?",
    "Did the agent verify the customer's identity and contact details?",
    "Did the agent check if it was a good time to talk?",
    "Did the agent briefly present the main value proposition?",
    "Did the agent schedule a follow-up conversation?",
  ],
  interested: [
    "Did the agent identify the specific interests of the customer?",
    "Did the agent explain product benefits custom to the customer's needs?",
    "Did the agent respond to objection with verified data?",
    "Did the agent confirm the customer's budget range?",
    "Did the agent suggest sharing details over email/WhatsApp?",
  ],
  details_shared: [
    "Did the agent send the brochures or details immediately after the call?",
    "Did the agent follow up to confirm receipt of the documents?",
    "Did the agent explain the contents of the shared details clearly?",
    "Did the agent ask if the customer had any questions on the brochure?",
    "Did the agent gauge the customer's reaction to the pricing structure?",
  ],
  site_visit_planned: [
    "Did the agent coordinate the date and time of the site visit?",
    "Did the agent share the location map and manager's contact details?",
    "Did the agent arrange transport if requested by the customer?",
    "Did the agent explain what the customer will see during the visit?",
    "Did the agent send a reminder message one day before the visit?",
  ],
  site_visit_done: [
    "Did the site manager receive the customer warmly at the project site?",
    "Did the manager showcase the model villa/apartment and amenities?",
    "Did the manager address location advantages and key highlights?",
    "Did the manager note the customer's feedback after the walkthrough?",
    "Did the manager discuss initial booking offers or customized plans?",
  ],
  negotiation: [
    "Did the agent explain the discount policies or flexible payment plans?",
    "Did the agent document the customer's proposed counter-offers?",
    "Did the agent maintain a cooperative and professional stance?",
    "Did the agent discuss optional upgrades and standard package inclusions?",
    "Did the agent schedule a closing meeting with the sales director?",
  ],
  follow_up: [
    "Did the agent follow up at the agreed date and time?",
    "Did the agent address unresolved queries from previous conversations?",
    "Did the agent create urgency regarding limited availability or pricing?",
    "Did the agent check if there are other decision-makers involved?",
    "Did the agent propose the next concrete step in the buying process?",
  ],
  booking_done: [
    "Did the agent thank the customer for choosing Planet Green?",
    "Did the agent assist in completing the application and KYC documents?",
    "Did the agent collect the booking amount check/online transaction?",
    "Did the agent provide a official receipt for the payment received?",
    "Did the agent explain the post-booking schedule and agreement timeline?",
  ],
};
