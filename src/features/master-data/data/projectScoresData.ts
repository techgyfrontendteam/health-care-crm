export interface ScoreCriteria {
  id: string;
  category: string;
  description: string;
  marks: number;
}

export const initialProjectScores: Record<string, ScoreCriteria[]> = {
  "planet-green": [
    {
      id: "1",
      category: "Telangana",
      description: "Weightage assigned based on geographical proximity to project locations and regional purchasing power.",
      marks: 25,
    },
    {
      id: "2",
      category: "Software Engineer",
      description: "Scores based on employment sectors such as IT, Finance, and Public Service with high investment intent.",
      marks: 20,
    },
    {
      id: "3",
      category: "40-50 Years",
      description: "Demographic segments targeting first-time buyers and experienced real estate investors.",
      marks: 10,
    },
    {
      id: "4",
      category: "50L Avg Income",
      description: "Annual household income tiers derived from self-declared data and historical lead behavior.",
      marks: 10,
    },
  ],
  "farmnatura": [
    {
      id: "5",
      category: "Karnataka",
      description: "Proximity to Bangalore tech hubs and surrounding districts.",
      marks: 30,
    },
    {
      id: "6",
      category: "Doctor / Healthcare",
      description: "Professionals with high savings rate and interest in secondary farm homes.",
      marks: 25,
    },
    {
      id: "7",
      category: "30-40 Years",
      description: "Younger professionals looking for investment opportunities.",
      marks: 15,
    },
  ],
  "eco-world": [
    {
      id: "8",
      category: "Maharashtra",
      description: "Targeting premium buyers in Mumbai and Pune regions.",
      marks: 40,
    },
    {
      id: "9",
      category: "Business Owner",
      description: "Self-employed individuals with high net worth.",
      marks: 35,
    },
  ],
};
