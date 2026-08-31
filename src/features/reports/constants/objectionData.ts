import type { ObjectionRow } from "../types";

export const getInitialObjectionData = (
  resolvedProjectId: number,
  resolvedRms: number[]
): ObjectionRow[] => {
  const firstRmId = resolvedRms[0] || 1;
  const secondRmId = resolvedRms[1] || 2;
  const thirdRmId = resolvedRms[2] || 3;

  return [
    {
      id: 1,
      name: "Rahul Kulkarni",
      projectId: resolvedProjectId,
      projectName: "Planet Green",
      rmId: firstRmId,
      emId: 10,
      objectionsCount: 124,
      uniqueTypesCount: 6,
      primaryConcern: "POSSESSION DELAY",
      conversionRate: 28.5,
      objectionTypes: [
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
      ],
    },
    {
      id: 2,
      name: "Sneha Mehta",
      projectId: resolvedProjectId,
      projectName: "Planet Green",
      rmId: firstRmId,
      emId: 11,
      objectionsCount: 98,
      uniqueTypesCount: 4,
      primaryConcern: "FLOOR PLAN",
      conversionRate: 32.4,
      objectionTypes: [
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
      ],
    },
    {
      id: 3,
      name: "Raju Yadav",
      projectId: resolvedProjectId,
      projectName: "Planet Green",
      rmId: secondRmId,
      emId: 12,
      objectionsCount: 82,
      uniqueTypesCount: 4,
      primaryConcern: "ROAD ISSUE",
      conversionRate: 42.1,
      objectionTypes: [
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
      ],
    },
    {
      id: 4,
      name: "Vikram Das",
      projectId: resolvedProjectId,
      projectName: "Planet Green",
      rmId: secondRmId,
      emId: 13,
      objectionsCount: 210,
      uniqueTypesCount: 4,
      primaryConcern: "TOTAL OUTFLOW",
      conversionRate: 31.2,
      objectionTypes: [
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
      ],
    },
    {
      id: 5,
      name: "Pooja Iyer",
      projectId: resolvedProjectId,
      projectName: "Planet Green",
      rmId: thirdRmId,
      emId: 14,
      objectionsCount: 87,
      uniqueTypesCount: 4,
      primaryConcern: "SPECIFICATIONS",
      conversionRate: 55.0,
      objectionTypes: [
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
      ],
    },
    {
      id: 6,
      name: "Rohan Sharma",
      projectId: resolvedProjectId,
      projectName: "Planet Green",
      rmId: thirdRmId,
      emId: 15,
      objectionsCount: 164,
      uniqueTypesCount: 4,
      primaryConcern: "PARKING ALLOTMENT",
      conversionRate: 22.4,
      objectionTypes: [
        "Objection Name",
        "Objection Name",
        "Objection Name",
        "Objection Name",
      ],
    },
  ];
};
