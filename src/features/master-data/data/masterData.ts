export * from "./projectsData";
export * from "./leadStatusesData";
export * from "./contentData";
export * from "./contentTypesData";
export * from "./followUpStatusesData";
export * from "./objectionsData";
export * from "./projectScoresData";
export * from "./pointsData";

export interface MasterDataCard {
  id: string;
  title: string;
  description: string;
  iconName: string;
  path: string;
}

export const masterDataCards: MasterDataCard[] = [
  {
    id: "lead-statuses",
    title: "Lead statuses",
    description: "Define and manage the distinct stages of your sales funnel, tracking progression from initial inquiry to final booking.",
    iconName: "radio",
    path: "/master-data/lead-statuses",
  },
  {
    id: "content",
    title: "Content",
    description: "Centralise project resources, marketing collateral, brochures, videos, and supporting documents for quick access and distribution.",
    iconName: "file-text",
    path: "/master-data/content",
  },
  {
    id: "content-types",
    title: "Content types",
    description: "Standardise content classifications to ensure consistent organisation and management of project assets across teams.",
    iconName: "layers",
    path: "/master-data/content-types",
  },
  {
    id: "lead-follow-up-statuses",
    title: "Lead follow up statuses",
    description: "Configure standard communication cadences, SLA breach parameters, and mandatory next action triggers for the team.",
    iconName: "clock",
    path: "/master-data/follow-up-statuses",
  },
  {
    id: "objections",
    title: "Objections",
    description: "Maintain a central directory of common buyer concerns and resistance points to accurately track sales blockers.",
    iconName: "alert-circle",
    path: "/master-data/objections",
  },
  {
    id: "project-score",
    title: "Project score",
    description: "Adjust the algorithmic weightings, demographic criteria, and intent signals the AI uses to prioritize inbound leads.",
    iconName: "hash-100",
    path: "/master-data/project-score",
  },
  {
    id: "points",
    title: "Points",
    description: "Manage and generate AI communication Points for your leads.",
    iconName: "sparkles",
    path: "/master-data/points",
  },
];
