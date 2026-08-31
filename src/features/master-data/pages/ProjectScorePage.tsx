import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, ChevronDown, Check, X } from "lucide-react";
import { toast } from "sonner";
import { useMasterDataLookup } from "../../../shared/hooks/useMasterDataLookup";
import {
  useGetProjectBasedScoringRulesQuery,
  useCreateProjectScoringRulesMutation,
  useUpdateProjectScoringRulesMutation,
} from "../api/manageMasterDataSlice";

export interface ScoreCriteria {
  id: string;
  category: string;
  description: string; 
  marks: number;
}

export const ProjectScorePage: React.FC = () => {
  const navigate = useNavigate();
  const { masterData } = useMasterDataLookup();
  const { data: apiRulesData } = useGetProjectBasedScoringRulesQuery();
  const [createProjectScoringRules] = useCreateProjectScoringRulesMutation();
  const [updateProjectScoringRules] = useUpdateProjectScoringRulesMutation();

  const projects = useMemo(() => {
    if (!masterData?.projects) return [];
    return masterData.projects.map((p: any) => ({
      id: p.id.toString(),
      name: p.description || `Project ${p.id}`,
    }));
  }, [masterData]);

  const projectScores = useMemo(() => {
    const scores: Record<string, ScoreCriteria[]> = {};
    
    // Safely extract the list of rules
    const rawList = Array.isArray(apiRulesData)
      ? apiRulesData
      : (apiRulesData && Array.isArray(apiRulesData.data) ? apiRulesData.data : null);

    if (rawList) {
      rawList.forEach((item: any) => {
        if (!item) return;

        // Case 1: Grouped structure (each item represents a project with a 'rules' array)
        if (item.project_id !== undefined && Array.isArray(item.rules)) {
          const projectIdStr = item.project_id.toString();
          scores[projectIdStr] = item.rules.map((r: any, index: number) => ({
            id: r.masterProjectScoringRulesId ? r.masterProjectScoringRulesId.toString() : (Date.now().toString() + index),
            category: r.rule || "",
            description: r.rule || "",
            marks: typeof r.points === 'number' ? r.points : Number(r.points || 0),
          }));
        } 
        // Case 2: Flat structure (each item is a single rule with project_id, rule/desc, points/score)
        else if (item.project_id !== undefined) {
          const projectIdStr = item.project_id.toString();
          if (!scores[projectIdStr]) {
            scores[projectIdStr] = [];
          }
          const ruleId = item.masterProjectScoringRulesId || item.id;
          scores[projectIdStr].push({
            id: ruleId ? ruleId.toString() : (Date.now().toString() + Math.random().toString()),
            category: item.rule || item.desc || "",
            description: item.rule || item.desc || "",
            marks: typeof item.points === 'number' 
              ? item.points 
              : (typeof item.score === 'number' ? item.score : Number(item.points || item.score || 0)),
          });
        }
      });
    }
    return scores;
  }, [apiRulesData]);

  // Filter & Selection States
  const [selectedProjectId, setSelectedProjectIdState] = useState<string>(() => {
    return localStorage.getItem("crm_selected_project_id") || "";
  });

  useEffect(() => {
    if (projects.length > 0) {
      const isValid = projects.some((p) => p.id === selectedProjectId);
      if (!selectedProjectId || !isValid) {
        setSelectedProjectId(projects[0].id);
      }
    }
  }, [projects, selectedProjectId]);

  const setSelectedProjectId = (id: string) => {
    setSelectedProjectIdState(id);
    localStorage.setItem("crm_selected_project_id", id);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingScoreId, setEditingScoreId] = useState<string>("");
  const [categoryName, setCategoryName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [scoreMarks, setScoreMarks] = useState<number>(0);

  // Find label of active project
  const selectedProjectLabel = useMemo(() => {
    const proj = projects.find((p) => p.id === selectedProjectId);
    return proj ? proj.name : "Select Project";
  }, [selectedProjectId, projects]);

  // Current project's active criteria list
  const activeScores = useMemo(() => {
    if (!selectedProjectId) return [];
    return projectScores[selectedProjectId] || [];
  }, [selectedProjectId, projectScores]);

  // Calculation of allocated marks
  const totalAllocatedMarks = useMemo(() => {
    return activeScores.reduce((sum, item) => sum + item.marks, 0);
  }, [activeScores]);

  const remainingMarks = 100 - totalAllocatedMarks;

  // Maximum marks available for current modal edit/add operation
  const maxAvailableMarks = useMemo(() => {
    if (modalMode === "add") {
      return remainingMarks;
    } else {
      const currentItem = activeScores.find((s) => s.id === editingScoreId);
      const otherTotal = totalAllocatedMarks - (currentItem ? currentItem.marks : 0);
      return 100 - otherTotal;
    }
  }, [modalMode, activeScores, editingScoreId, remainingMarks, totalAllocatedMarks]);

  // Dynamically calculated remaining marks as the user types
  const dynamicAvailableMarks = useMemo(() => {
    return maxAvailableMarks - (Number(scoreMarks) || 0);
  }, [maxAvailableMarks, scoreMarks]);

  // Open Modal for adding a score rule
  const openAddModal = () => {
    if (!selectedProjectId) {
      toast.error("Please select a project first.");
      return;
    }
    if (remainingMarks <= 0) {
      toast.error("No marks remaining. Edit or delete an existing rule first.");
      return;
    }
    setModalMode("add");
    setCategoryName("");
    setShortDescription("");
    setScoreMarks(Math.min(remainingMarks, 10)); // Default to remaining marks or 10
    setIsModalOpen(true);
  };

  // Open Modal for editing an existing score rule
  const openEditModal = (score: ScoreCriteria) => {
    setModalMode("edit");
    setEditingScoreId(score.id);
    setCategoryName(score.category);
    setShortDescription(score.description);
    setScoreMarks(score.marks);
    setIsModalOpen(true);
  };

  // Handle Add/Edit Form Submit
  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      toast.error("Please enter a category name.");
      return;
    }
    if (!shortDescription.trim()) {
      toast.error("Please enter a short description.");
      return;
    }

    if (scoreMarks <= 0) {
      toast.error("Marks must be greater than 0.");
      return;
    }

    if (scoreMarks > maxAvailableMarks) {
      toast.error(`Cannot allocate more than ${maxAvailableMarks} marks for this category.`);
      return;
    }

    try {
      const combinedDesc = `${categoryName.trim()}||${shortDescription.trim()}`;

      if (modalMode === "add") {
        await createProjectScoringRules({
          project_id: Number(selectedProjectId),
          desc: combinedDesc,
          score: Number(scoreMarks),
          user_id: null
        }).unwrap();
        toast.success("Rule created successfully.");
      } else {
        await updateProjectScoringRules({
          id: Number(editingScoreId),
          project_id: Number(selectedProjectId),
          desc: combinedDesc,
          score: Number(scoreMarks),
          user_id: null
        }).unwrap();
        toast.success("Rule updated successfully.");
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error("Modal Submit Error:", err);
      toast.error("Failed to save changes. Please try again.");
    }
  };

  // Computed filtered list
  const filteredScores = useMemo(() => {
    return activeScores.filter(
      (s) =>
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [activeScores, searchQuery]);

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Project Score
        </button>

        <button
          onClick={openAddModal}
          disabled={!selectedProjectId || remainingMarks <= 0}
          className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Add New Score
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Project Dropdown */}
          <div className="flex items-center relative z-20">
            <span className="text-[10px] tracking-wider font-extrabold text-slate-400 dark:text-zinc-550 uppercase mr-3">
              PROJECT
            </span>
            <div className="relative">
              <button
                onClick={() => setIsProjectDropdownOpen(!isProjectDropdownOpen)}
                className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/20 px-4 py-2 rounded-xl text-xs font-extrabold text-[#002d62] dark:text-blue-450 transition-colors shadow-sm cursor-pointer min-w-[150px] justify-between"
              >
                <span>{selectedProjectLabel}</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#002d62] dark:text-blue-450" />
              </button>

              {isProjectDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-30">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setIsProjectDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          selectedProjectId === p.id ? "bg-blue-600" : "bg-slate-350"
                        }`}
                      />
                      {p.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-[401px]">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-[#434653]" />
            <input
              type="text"
              placeholder="Search Scores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={!selectedProjectId}
              className="w-full h-[48px] pl-[40px] pr-4 rounded-full border-none bg-[#F2F4F6] dark:bg-zinc-800 text-[14px] font-normal text-[#434653] dark:text-zinc-200 placeholder-[#434653] focus:outline-none focus:ring-1 focus:ring-[#002d62] disabled:opacity-60"
            />
          </div>
        </div>

        <div className="border-b border-slate-100 dark:border-zinc-800/80" />

        {/* Content Area */}
        {!selectedProjectId ? (
          <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-3xl p-12 text-center space-y-2">
            <p className="text-sm font-extrabold text-slate-400 dark:text-zinc-500">
              Please select a project to view and configure its scoring criteria.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Allocation Status Indicator & Progress Bar */}
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[10px] tracking-wider font-extrabold text-slate-400 dark:text-zinc-550 uppercase block">
                    ALLOCATION STATUS
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-slate-850 dark:text-zinc-100">
                      {totalAllocatedMarks}
                    </span>
                    <span className="text-sm font-bold text-slate-450 dark:text-zinc-550">
                      / 100 Marks Allocated
                    </span>
                  </div>
                </div>

                <span className="text-xs font-extrabold text-slate-500 dark:text-zinc-450 mb-1">
                  ({remainingMarks} Marks Remaining)
                </span>
              </div>

              {/* Dynamic Sleek Progress Bar */}
              <div className="w-full h-4 bg-slate-100 dark:bg-zinc-800/80 rounded-full overflow-hidden">
                <div
                  style={{ width: `${Math.min(totalAllocatedMarks, 100)}%` }}
                  className="h-full bg-[#002d62] dark:bg-blue-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            <div className="border-b border-slate-100 dark:border-zinc-800/80 pt-2" />

            {/* Criteria Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800 dark:text-zinc-200">
                Active Scoring Criteria
              </h3>

              {filteredScores.length === 0 ? (
                <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-6 text-center text-xs font-bold text-slate-400">
                  No criteria match your search.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredScores.map((score) => (
                    <div
                      key={score.id}
                      className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow min-h-[160px] relative"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-extrabold text-sm text-slate-850 dark:text-zinc-150">
                            {score.category}
                          </h4>
                          <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-450 text-[10px] font-black px-2.5 py-1 rounded-[6px] uppercase shrink-0">
                            {score.marks} Marks
                          </span>
                        </div>

                        <p className="text-xs text-slate-450 dark:text-zinc-550 leading-relaxed mt-3 max-w-[90%]">
                          {score.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-50 dark:border-zinc-850/50">
                        <button
                          onClick={() => openEditModal(score)}
                          className="text-xs font-extrabold text-[#002d62] dark:text-blue-450 hover:underline cursor-pointer transition-colors"
                        >
                          Edit Score
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Score Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-md p-6 shadow-2xl relative space-y-6 mx-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4">
              <h2 className="text-base font-extrabold text-[#002d62] dark:text-blue-450">
                {modalMode === "add" ? "Create Score" : "Edit Score"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-350 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleModalSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                  CATEGORY NAME
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lead Source"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-none bg-[#f4f7f9] dark:bg-zinc-800 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                  SHORT DESCRIPTION
                </label>
                <textarea
                  placeholder="Enter short description"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-none bg-[#f4f7f9] dark:bg-zinc-800 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                  MARKS
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min={1}
                    max={maxAvailableMarks}
                    value={scoreMarks || ""}
                    onKeyDown={(e) => {
                      if (["-", "+", "e", "E"].includes(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    onPaste={(e) => {
                      const pasteData = e.clipboardData.getData("text");
                      if (pasteData.includes("-") || pasteData.includes("e") || pasteData.includes("E")) {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => {
                      const num = Number(e.target.value);
                      if (num < 0) {
                        setScoreMarks(0);
                      } else {
                        setScoreMarks(num);
                      }
                    }}
                    className="w-24 px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-950 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] text-center"
                  />
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-450">
                    Marks available:{" "}
                    <span
                      className={`font-black ${
                        dynamicAvailableMarks < 0
                          ? "text-red-600 dark:text-red-400"
                          : "text-[#002d62] dark:text-blue-450"
                      }`}
                    >
                      {dynamicAvailableMarks}
                    </span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-extrabold text-slate-550 dark:text-zinc-450 hover:text-slate-750 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                >
                  {modalMode === "add" ? "Create Rule" : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
