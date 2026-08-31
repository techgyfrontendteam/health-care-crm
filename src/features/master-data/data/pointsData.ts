export interface AuditPoint {
  id: string;
  point: string;
}

export const initialProjectPoints: Record<string, Record<string, AuditPoint[]>> = {
  "planet-green": {
    "NLEAD": [
      { id: "1", point: "Did the agent greet the customer professionally?" },
      { id: "2", point: "Did the agent ask for the customer's requirement/needs?" },
      { id: "3", point: "Did the agent explain the project or product details?" },
      { id: "4", point: "Did the agent mention the price or budget clearly?" },
      { id: "5", point: "Did the agent handle customer objections or questions effectively?" },
      { id: "6", point: "Did the agent verify the customer's contact information (Phone/Email)?" },
      { id: "7", point: "Did the agent introduce themselves and the company clearly?" },
    ],
    "CNTD": [
      { id: "8", point: "Did the agent follow up on the previous discussion points?" },
      { id: "9", point: "Did the agent schedule a site visit or next conversation?" },
    ]
  },
  "farmnatura": {
    "NLEAD": [
      { id: "10", point: "Did the agent explain the farmnatura organic farming concept?" },
      { id: "11", point: "Did the agent verify lead location and budget range?" }
    ]
  },
  "eco-world": {
    "NLEAD": [
      { id: "12", point: "Did the agent introduce the eco-friendly amenities of Eco World?" },
      { id: "13", point: "Did the agent ask if the customer is buying for self-use or investment?" }
    ]
  }
};
