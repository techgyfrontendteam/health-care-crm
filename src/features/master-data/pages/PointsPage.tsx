import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, ChevronDown, Check, X, Sparkles, Trash2 } from "lucide-react";
import { useGetAllMasterDataQuery } from "@/features/master/api/masterApi";
import { convertProjectLeadStatusToObject } from "@/utils/projectLeadStatus";
import {
  useLazyGetProjectStatusChecklistQuery,
  useCreateProjectStatusChecklistMutation,
  useUpdateProjectStatusChecklistMutation,
  useDeleteProjectStatusChecklistMutation,
  useCreateMultipleProjectStatusChecklistMutation,
  useGenerateQuestionsMutation,
} from "@/features/prompts/api/promptApi";

export const PointsPage: React.FC = () => {
  const navigate = useNavigate();

  // RTK Query API calls
  const { data: masterData } = useGetAllMasterDataQuery();
  const [triggerGetPoints] = useLazyGetProjectStatusChecklistQuery();
  const [createProjectStatusChecklist] = useCreateProjectStatusChecklistMutation();
  const [updateProjectStatusChecklist] = useUpdateProjectStatusChecklistMutation();
  const [deleteProjectStatusChecklist] = useDeleteProjectStatusChecklistMutation();
  const [createMultipleProjectStatusChecklist] = useCreateMultipleProjectStatusChecklistMutation();
  const [generateQuestions, { isLoading: isGenerating }] = useGenerateQuestionsMutation();

  // Dropdown Filter Selection States
  const [selectedProjectId, setSelectedProjectIdState] = useState<string>(() => {
    return localStorage.getItem("crm_selected_project_id") || "";
  });

  const setSelectedProjectId = (id: string) => {
    setSelectedProjectIdState(id);
    localStorage.setItem("crm_selected_project_id", id);
  };

  const [selectedStatusId, setSelectedStatusId] = useState<string>("");
  const [checklistData, setChecklistData] = useState<Record<string, any[]>>({});

  // Dropdown UI Open/Close States
  const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Modal Dialog States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPointText, setNewPointText] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingPointId, setDeletingPointId] = useState<string>("");

  // Inline Editing States
  const [editingPointId, setEditingPointId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");

  // AI Prompt text input state
  const [aiPromptText, setAiPromptText] = useState("");

  // UI Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show toast notification
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Convert project_lead_statuses matrix to project object mapping
  const projectLeadStatuses = useMemo(() => {
    return convertProjectLeadStatusToObject(
      masterData?.project_lead_statuses || [],
      masterData?.lead_statuses || []
    );
  }, [masterData]);

  // Compute available statuses based on selected project
  const availableStatuses = useMemo(() => {
    if (!selectedProjectId || !projectLeadStatuses) return [];
    const proj = projectLeadStatuses.find(
      (item) => Number(item.project_id) === Number(selectedProjectId)
    );
    return proj && Array.isArray(proj.status) ? proj.status : [];
  }, [selectedProjectId, projectLeadStatuses]);

  // Compute selected project_lead_status_id
  const currentProjectLeadStatusId = useMemo(() => {
    if (!selectedProjectId || !selectedStatusId || !projectLeadStatuses) return null;
    const proj = projectLeadStatuses.find(
      (item) => Number(item.project_id) === Number(selectedProjectId)
    );
    if (!proj || !Array.isArray(proj.status)) return null;

    const match = proj.status.find(
      (s) => Number(s.lead_status_id) === Number(selectedStatusId)
    );
    return match ? match.id : null;
  }, [selectedProjectId, selectedStatusId, projectLeadStatuses]);

  // Default selection effects
  useEffect(() => {
    if (masterData?.projects && masterData.projects.length > 0) {
      if (!selectedProjectId || !masterData.projects.some((p) => p.id.toString() === selectedProjectId)) {
        setSelectedProjectId(masterData.projects[0].id.toString());
      }
    }
  }, [masterData, selectedProjectId]);

  // Sync selected status when project changes
  useEffect(() => {
    if (availableStatuses && availableStatuses.length > 0) {
      const isValid = availableStatuses.some(
        (s) => s.lead_status_id.toString() === selectedStatusId
      );
      if (!isValid) {
        setSelectedStatusId(availableStatuses[0].lead_status_id.toString());
      }
    } else {
      setSelectedStatusId("");
    }
  }, [selectedProjectId, availableStatuses, selectedStatusId]);

  // Fetch checklist when project_lead_status_id changes
  useEffect(() => {
    const fetchChecklist = async () => {
      if (currentProjectLeadStatusId) {
        try {
          const response = await triggerGetPoints({
            project_lead_status_id: currentProjectLeadStatusId,
          }).unwrap();
          if (response && response.success && Array.isArray(response.data)) {
            setChecklistData((prev) => ({
              ...prev,
              [currentProjectLeadStatusId]: response.data,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch project status checklist:", error);
        }
      }
    };
    fetchChecklist();
  }, [currentProjectLeadStatusId, triggerGetPoints]);

  // Find active project label
  const selectedProjectLabel = useMemo(() => {
    const proj = masterData?.projects?.find((p) => p.id.toString() === selectedProjectId);
    return proj ? proj.description : "Select Project";
  }, [selectedProjectId, masterData]);

  // Find active status label
  const selectedStatusLabel = useMemo(() => {
    const stat = masterData?.lead_statuses?.find((s) => s.id.toString() === selectedStatusId);
    return stat ? stat.description : "Select Lead Status";
  }, [selectedStatusId, masterData]);

  // Retrieve current active points list based on computed project_lead_status_id
  const currentPoints = useMemo(() => {
    if (!currentProjectLeadStatusId) return [];
    return checklistData[currentProjectLeadStatusId] || [];
  }, [currentProjectLeadStatusId, checklistData]);

  // Inline Edit handlers
  const handleStartEdit = (item: any) => {
    setEditingPointId(item.id.toString());
    setEditingText(item.description || "");
  };

  const handleSaveEdit = async (id: string) => {
    if (!editingText.trim()) {
      showToast("Point content cannot be empty.");
      return;
    }
    if (!currentProjectLeadStatusId) return;

    try {
      await updateProjectStatusChecklist({
        checklist_id: Number(id),
        description: editingText.trim(),
      }).unwrap();

      const updated = currentPoints.map((p) =>
        p.id.toString() === id ? { ...p, description: editingText.trim() } : p
      );
      setChecklistData((prev) => ({
        ...prev,
        [currentProjectLeadStatusId]: updated,
      }));

      setEditingPointId(null);
      setEditingText("");
      showToast("Point updated successfully.");
    } catch (error) {
      console.error("Failed to update status point:", error);
      showToast("Failed to update point.");
    }
  };

  const handleCancelEdit = () => {
    setEditingPointId(null);
    setEditingText("");
  };

  // Add Point handlers
  const handleAddPointSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectId) {
      showToast("Please select a project first.");
      return;
    }
    if (!selectedStatusId) {
      showToast("Please select a lead status first.");
      return;
    }
    if (!currentProjectLeadStatusId) {
      showToast("Selected project and lead status configuration is invalid.");
      return;
    }
    if (!newPointText.trim()) {
      showToast("Please enter point content.");
      return;
    }

    try {
      await createProjectStatusChecklist({
        project_lead_status_id: currentProjectLeadStatusId,
        description: newPointText.trim(),
      }).unwrap();

      // Trigger fetch call to refresh points list
      const fetchResponse = await triggerGetPoints({
        project_lead_status_id: currentProjectLeadStatusId,
      }).unwrap();
      if (fetchResponse && fetchResponse.success && Array.isArray(fetchResponse.data)) {
        setChecklistData((prev) => ({
          ...prev,
          [currentProjectLeadStatusId]: fetchResponse.data,
        }));
      }

      setNewPointText("");
      setIsAddModalOpen(false);
      showToast("New point added successfully.");
    } catch (error) {
      console.error("Failed to create status point:", error);
      showToast("Failed to add point.");
    }
  };

  // Delete Point handlers
  const openDeleteModal = (id: string) => {
    setDeletingPointId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeletePoint = async () => {
    if (!currentProjectLeadStatusId) return;

    try {
      await deleteProjectStatusChecklist({
        checklist_id: Number(deletingPointId),
      }).unwrap();

      // Trigger fetch call to refresh points list
      const fetchResponse = await triggerGetPoints({
        project_lead_status_id: currentProjectLeadStatusId,
      }).unwrap();
      if (fetchResponse && fetchResponse.success && Array.isArray(fetchResponse.data)) {
        setChecklistData((prev) => ({
          ...prev,
          [currentProjectLeadStatusId]: fetchResponse.data,
        }));
      }

      setIsDeleteModalOpen(false);
      setDeletingPointId("");
      showToast("Point deleted successfully.");
    } catch (error) {
      console.error("Failed to delete status point:", error);
      showToast("Failed to delete point.");
    }
  };

  // AI Generation simulation handler
  const handleGenerateAI = async () => {
    if (!selectedProjectId) {
      showToast("Please select a project first.");
      return;
    }
    if (!selectedStatusId) {
      showToast("Please select a lead status first.");
      return;
    }
    if (!currentProjectLeadStatusId) {
      showToast("Invalid project lead status configuration.");
      return;
    }
    if (!aiPromptText.trim()) {
      showToast("Please enter prompt text first.");
      return;
    }

    try {
      // 1. Generate AI Questions
      const genResponse = await generateQuestions({
        text: aiPromptText,
        lead_status: selectedStatusLabel,
        project_id: String(selectedProjectId),
      }).unwrap();

      // Extract the questions array
      const questions = genResponse?.questions || genResponse?.data?.questions;
      if (Array.isArray(questions) && questions.length > 0) {
        // 2. Call multiple points creation API (Newly generated questions only)
        await createMultipleProjectStatusChecklist({
          project_lead_status_id: currentProjectLeadStatusId,
          descriptions: questions,
        }).unwrap();

        // 3. Call the fetch call and update points
        const fetchResponse = await triggerGetPoints({
          project_lead_status_id: currentProjectLeadStatusId,
        }).unwrap();
        if (fetchResponse && fetchResponse.success && Array.isArray(fetchResponse.data)) {
          setChecklistData((prev) => ({
            ...prev,
            [currentProjectLeadStatusId]: fetchResponse.data,
          }));
        }

        setAiPromptText("");
        showToast("AI Questions generated and points created successfully.");
      } else {
        showToast("Failed to generate valid questions.");
      }
    } catch (error) {
      console.error("Failed to generate and create status points:", error);
      showToast("AI generation failed.");
    }
  };

  return (
    <div className="w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-6 animate-in fade-in duration-300 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 bg-[#002d62] text-white px-5 py-3.5 rounded-2xl shadow-xl z-50 flex items-center gap-3 animate-in slide-in-from-top duration-300 font-bold text-xs border border-blue-400/20">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/master-data")}
          className="flex items-center gap-[8px] font-['Plus_Jakarta_Sans'] font-bold text-[24px] leading-[28px] tracking-[-0.5px] text-[#001549] dark:text-blue-400 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-0 h-[44px]"
        >
          <ArrowLeft className="w-6 h-6 text-[#001549] dark:text-blue-400" />
          Points
        </button>

        <button
          onClick={() => currentProjectLeadStatusId && setIsAddModalOpen(true)}
          disabled={!currentProjectLeadStatusId}
          className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add New Point
        </button>
      </div>

      {/* Main Container Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-3xl p-6 xl:p-8 shadow-sm space-y-6 flex flex-col min-h-[500px] justify-between">
        <div className="space-y-6">
          {/* Filters Row */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 z-25 relative">
            {/* Project Filter */}
            <div className="flex items-center relative z-30">
              <span className="text-[10px] tracking-wider font-extrabold text-slate-400 dark:text-zinc-550 uppercase mr-3">
                PROJECT:
              </span>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsProjectDropdownOpen(!isProjectDropdownOpen);
                    setIsStatusDropdownOpen(false);
                  }}
                  className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/20 px-4 py-2 rounded-xl text-xs font-extrabold text-[#002d62] dark:text-blue-450 transition-colors shadow-sm cursor-pointer min-w-[160px] justify-between"
                >
                  <span>{selectedProjectLabel}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#002d62] dark:text-blue-450" />
                </button>

                {isProjectDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-30">
                    {masterData?.projects?.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProjectId(p.id.toString());
                          setIsProjectDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            selectedProjectId === p.id.toString() ? "bg-blue-600" : "bg-slate-350"
                          }`}
                        />
                        {p.description}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lead Status Filter */}
            <div className="flex items-center relative z-20">
              <span className="text-[10px] tracking-wider font-extrabold text-slate-400 dark:text-zinc-550 uppercase mr-3">
                LEAD STATUS:
              </span>
              <div className="relative">
                <button
                  onClick={() => {
                    setIsStatusDropdownOpen(!isStatusDropdownOpen);
                    setIsProjectDropdownOpen(false);
                  }}
                  disabled={!selectedProjectId}
                  className="flex items-center gap-2 bg-[#f0f4f8] dark:bg-zinc-850 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/20 px-4 py-2 rounded-xl text-xs font-extrabold text-[#002d62] dark:text-blue-450 transition-colors shadow-sm cursor-pointer min-w-[160px] justify-between disabled:opacity-50"
                >
                  <span>{selectedStatusLabel}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#002d62] dark:text-blue-450" />
                </button>

                {isStatusDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 rounded-xl shadow-lg py-2 z-30 max-h-[300px] overflow-y-auto">
                    {availableStatuses.map((s) => (
                      <button
                        key={s.lead_status_id}
                        onClick={() => {
                          setSelectedStatusId(s.lead_status_id.toString());
                          setIsStatusDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors flex items-center gap-2"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            selectedStatusId === s.lead_status_id.toString() ? "bg-blue-600" : "bg-slate-300"
                          }`}
                        />
                        {s.description}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-b border-slate-100 dark:border-zinc-800/80" />

          {/* Points List Grid */}
          <div className="space-y-4">
            {!selectedProjectId ? (
              <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-xs font-bold text-slate-400">
                Please select a project to view call audit points.
              </div>
            ) : !currentProjectLeadStatusId ? (
              <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-xs font-bold text-slate-400">
                No project status mapping found for the selected configuration.
              </div>
            ) : currentPoints.length === 0 ? (
              <div className="bg-slate-50/50 dark:bg-zinc-950/20 border border-dashed border-slate-200 dark:border-zinc-800 rounded-2xl p-12 text-center text-xs font-bold text-slate-400">
                No audit points created for {selectedStatusLabel}. Click "+ Add New Point" or use AI generation below.
              </div>
            ) : (
              <div className="space-y-4">
                {currentPoints.map((item) => {
                  const isEditing = editingPointId === item.id.toString();
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between rounded-2xl px-6 py-5 border transition-all ${
                        isEditing
                          ? "border-[#002d62] bg-white ring-2 ring-[#002d62]/10"
                          : "bg-slate-50/70 hover:bg-slate-50 border-slate-100/50 dark:bg-zinc-900 dark:border-zinc-850"
                      }`}
                    >
                      <div className="flex-1 pr-6 min-w-0">
                        {isEditing ? (
                          <textarea
                            className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none resize-none text-sm font-semibold text-[#002d62] dark:text-zinc-200 p-0"
                            rows={2}
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSaveEdit(item.id.toString());
                              }
                            }}
                            autoFocus
                          />
                        ) : (
                          <p className="font-semibold text-sm text-[#002d62] dark:text-zinc-200 leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-4 shrink-0">
                        {isEditing ? (
                          <>
                            <button
                              onClick={handleCancelEdit}
                              className="text-sm font-semibold text-slate-450 hover:text-slate-600 transition-colors cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveEdit(item.id.toString())}
                              className="bg-[#002d62] hover:bg-[#063669] text-white rounded-lg px-4 py-2 font-bold text-xs cursor-pointer shadow-sm"
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => openDeleteModal(item.id.toString())}
                              className="text-sm font-semibold text-slate-450 hover:text-red-500 transition-colors cursor-pointer"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => handleStartEdit(item)}
                              className="bg-[#002d62] hover:bg-[#063669] text-white rounded-lg px-4 py-2 font-bold text-xs cursor-pointer shadow-sm"
                            >
                              Edit
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Bottom AI Generation Bar */}
        {selectedProjectId && (
          <div className="pt-6 border-t border-slate-100 dark:border-zinc-800/80 mt-6">
            <div className="border border-slate-200/60 dark:border-zinc-800 rounded-2xl p-3 flex items-center gap-4 shadow-sm bg-white dark:bg-zinc-955 flex-col sm:flex-row">
              <textarea
                placeholder={
                  selectedStatusId
                    ? `Ask AI to generate a new template for ${selectedStatusLabel} status...`
                    : "Select lead status first..."
                }
                value={aiPromptText}
                onChange={(e) => setAiPromptText(e.target.value)}
                disabled={!selectedStatusId || isGenerating}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (aiPromptText.trim() && !isGenerating && selectedStatusId) {
                      handleGenerateAI();
                    }
                  }
                }}
                className="flex-1 bg-transparent border-0 focus:ring-0 focus:outline-none resize-none text-xs font-semibold text-slate-800 dark:text-zinc-200 p-2 placeholder-slate-400"
              />
              <button
                onClick={handleGenerateAI}
                disabled={!selectedStatusId || isGenerating || !aiPromptText.trim()}
                className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-full text-xs font-black transition-all shadow-sm cursor-pointer flex items-center gap-1.5 shrink-0 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
                {isGenerating ? "Generating..." : "Generate with AI"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add New Point Dialog Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[24px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-md p-6 shadow-2xl relative space-y-6 mx-4 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-zinc-850 pb-4">
              <h2 className="text-base font-extrabold text-[#002d62] dark:text-blue-450">
                Add New Point
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-350 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleAddPointSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 dark:text-zinc-550 tracking-wider uppercase">
                  POINT CONTENT
                </label>
                <textarea
                  placeholder="Enter your Point here..."
                  value={newPointText}
                  onChange={(e) => setNewPointText(e.target.value)}
                  rows={4}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-955 text-xs font-semibold text-slate-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#002d62] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-50 dark:border-zinc-850">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-extrabold text-slate-550 dark:text-zinc-450 hover:text-slate-750 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#002d62] hover:bg-[#063669] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer"
                >
                  Add Point
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-900 rounded-[32px] border border-slate-100 dark:border-zinc-800/80 w-full max-w-[400px] p-8 shadow-2xl relative text-center space-y-6 mx-4 animate-in zoom-in-95 duration-200">
            {/* Trash Icon */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-955 flex items-center justify-center text-red-500">
                <Trash2 className="w-6 h-6" />
              </div>
            </div>

            {/* Modal Heading & Subtext */}
            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#002d62] dark:text-zinc-150 tracking-tight">
                Delete Point?
              </h3>
              <p className="text-xs text-slate-450 dark:text-zinc-550 font-semibold max-w-[280px] mx-auto">
                This action is permanent and cannot be undone.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 w-full pt-4 border-t border-slate-50 dark:border-zinc-850">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-xs font-black text-slate-550 dark:text-zinc-450 hover:text-[#002d62] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeletePoint}
                className="bg-[#002d62] hover:bg-[#063669] text-white text-xs font-black py-2.5 px-8 rounded-full transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
