export interface Objection {
  id: string;
  name: string;
}

export const initialGlobalObjections: Objection[] = [
  { id: "road-issue", name: "Road Issue" },
  { id: "water-problem", name: "Water Problem" },
  { id: "nature-related", name: "Nature Related Issues" },
  { id: "expensive", name: "Expensive" },
  { id: "loan-issue", name: "Loan Issue" },
  { id: "facilities", name: "Facilities" },
];

export const initialProjectObjections: Record<string, string[]> = {
  "planet-green": ["road-issue", "expensive", "loan-issue"],
  "farmnatura": ["water-problem", "nature-related"],
  "eco-world": ["facilities", "expensive"],
};
