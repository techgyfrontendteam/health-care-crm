(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/leads/pages/LeadDetailsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LeadDetailsPage",
    ()=>LeadDetailsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-client] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/callsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$api$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/api/authApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/s3ApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$call$2d$analyzer$2f$api$2f$callAnalyzerApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/call-analyzer/api/callAnalyzerApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$AppDrawer$2f$AppDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/AppDrawer/AppDrawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/LeadForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tabs.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadRemarksTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadRemarksTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadCallsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadCallsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadVisitsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadVisitsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadSurgeriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadSurgeriesTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadChatsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadChatsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadEnquiriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadEnquiriesTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadFollowUpsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/tabs/LeadFollowUpsTab.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$PointsToTalkDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/PointsToTalkDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const formatDateTimeForTataTele = (date)=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
;
;
;
;
;
;
;
;
;
;
;
;
;
/* ── Reusable label style (Figma: Inter 600 11px uppercase #64748B) ── */ const labelStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "11px",
    lineHeight: "16.5px",
    letterSpacing: "0.55px",
    textTransform: "uppercase",
    color: "#64748B"
};
/* ── Reusable value style (Figma: Inter 600 14px #191C1E) ── */ const valueStyle = {
    fontFamily: "Inter, sans-serif",
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "20px",
    letterSpacing: "0px",
    color: "#191C1E"
};
/* ── Field component ── */ const DetailField = ({ label, value, icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                style: labelStyle,
                className: "flex items-center gap-1.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                lineNumber: 97,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                style: valueStyle,
                className: "flex items-center gap-2",
                children: [
                    icon,
                    value || /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "#94A3B8"
                        },
                        children: "--"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 102,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                lineNumber: 100,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
        lineNumber: 96,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = DetailField;
const formatNoteDate = (d = new Date())=>{
    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) + ", " + d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};
const parseNotes = (rawNotes)=>{
    if (!rawNotes || !rawNotes.trim()) return [];
    const trimmed = rawNotes.trim();
    // 1. Check if stored as JSON
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed) && parsed.every((p)=>typeof p === "object" && p !== null && "text" in p)) {
                return parsed.map((item, idx)=>({
                        id: item.id || String(idx + 1),
                        text: String(item.text).trim(),
                        date: item.date || item.createdAt || undefined
                    }));
            }
        } catch  {
        // Fall through to other formats
        }
    }
    // 2. Check for delimiter `---`
    const delimiterRegex = /[\r\n]+---[\r\n]+/;
    if (delimiterRegex.test(trimmed)) {
        const chunks = trimmed.split(delimiterRegex);
        return chunks.map((chunk, idx)=>{
            const cTrim = chunk.trim();
            const dateMatch = cTrim.match(/^\[(.*?)\]\s*[\r\n]+([\s\S]*)$/);
            if (dateMatch) {
                return {
                    id: String(idx + 1),
                    date: dateMatch[1],
                    text: dateMatch[2].trim()
                };
            }
            return {
                id: String(idx + 1),
                text: cTrim
            };
        }).filter((n)=>n.text.length > 0);
    }
    // 3. Single note starting with [Date]
    const singleDateMatch = trimmed.match(/^\[(.*?)\]\s*[\r\n]+([\s\S]*)$/);
    if (singleDateMatch) {
        return [
            {
                id: "1",
                date: singleDateMatch[1],
                text: singleDateMatch[2].trim()
            }
        ];
    }
    // 4. Default plain note
    return [
        {
            id: "1",
            text: trimmed
        }
    ];
};
const serializeNotes = (notes)=>{
    if (notes.length === 0) return "";
    return notes.map((n)=>{
        const header = n.date ? `[${n.date}]\n` : "";
        return `${header}${n.text.trim()}`;
    }).join("\n\n---\n\n");
};
const LeadDetailsPage = ()=>{
    _s();
    const { leadId } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const [searchParams, setSearchParams] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const fromCustomer = location.state?.fromCustomer;
    const stateLead = location.state?.lead;
    const stateBranchId = location.state?.branch_id ?? stateLead?.branch_id;
    const stateBranchName = location.state?.branch ?? location.state?.branch_name ?? location.state?.hospital_branch ?? stateLead?.branch ?? stateLead?.branch_name ?? stateLead?.hospital_branch;
    const stateSpecialisationId = location.state?.specialisation_id ?? stateLead?.specialisation_id;
    const initialTab = searchParams.get('tab') || 'activity';
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialTab);
    const chatRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const enquiriesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const followupsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadDetailsPage.useEffect": ()=>{
            if (activeTab === 'chats') {
                setTimeout({
                    "LeadDetailsPage.useEffect": ()=>{
                        chatRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }["LeadDetailsPage.useEffect"], 500);
            } else if (activeTab === 'enquiries') {
                setTimeout({
                    "LeadDetailsPage.useEffect": ()=>{
                        enquiriesRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }["LeadDetailsPage.useEffect"], 500);
            } else if (activeTab === 'followups') {
                setTimeout({
                    "LeadDetailsPage.useEffect": ()=>{
                        followupsRef.current?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }["LeadDetailsPage.useEffect"], 500);
            }
        }
    }["LeadDetailsPage.useEffect"], [
        activeTab
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadDetailsPage.useEffect": ()=>{
            const tab = searchParams.get('tab') || 'activity';
            setActiveTab(tab);
        }
    }["LeadDetailsPage.useEffect"], [
        searchParams
    ]);
    const handleTabChange = (value)=>{
        setActiveTab(value);
        setSearchParams({
            tab: value
        });
    };
    const { data: apiLead, isLoading: isLeadLoading, isError: isLeadError, error, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadByIdQuery"])({
        uuid: leadId || ""
    }, {
        skip: !leadId,
        refetchOnMountOrArgChange: true
    });
    const lead = apiLead || stateLead;
    const isLoading = isLeadLoading && !stateLead;
    const isError = isLeadError && !stateLead;
    const [isDrawerOpen, setIsDrawerOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFollowupModalOpen, setIsFollowupModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [updateLead, { isLoading: isUpdating }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateLeadMutation"])();
    const [initiateClickToCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInitiateClickToCallMutation"])();
    const [getUserById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$api$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetUserByIdMutation"])();
    const [getCallRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCallRecordsMutation"])();
    const [createCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateCallMutation"])();
    const [uploadFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUploadFileMutation"])();
    const [analyzeCall] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$call$2d$analyzer$2f$api$2f$callAnalyzerApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalyzeCallMutation"])();
    const callRecordsPollingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [localNote, setLocalNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LeadDetailsPage.useEffect": ()=>{
            return ({
                "LeadDetailsPage.useEffect": ()=>{
                    if (callRecordsPollingRef.current) {
                        clearInterval(callRecordsPollingRef.current);
                        callRecordsPollingRef.current = null;
                    }
                }
            })["LeadDetailsPage.useEffect"];
        }
    }["LeadDetailsPage.useEffect"], []);
    const cleanLeadNote = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadDetailsPage.useMemo[cleanLeadNote]": ()=>{
            if (localNote !== null) return localNote;
            if (!lead) return "";
            const note = (lead.appointment_note || lead.lead_note || lead.notes || lead.note || "").trim();
            // Exclude address and accidental Kukatpally fallback
            if (note && lead.address && note.toLowerCase() === lead.address.trim().toLowerCase()) {
                return "";
            }
            if (note.toLowerCase() === "kukatpally") {
                return "";
            }
            return note;
        }
    }["LeadDetailsPage.useMemo[cleanLeadNote]"], [
        lead,
        localNote
    ]);
    const [isAddingNote, setIsAddingNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newNoteText, setNewNoteText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingNoteId, setEditingNoteId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingNoteText, setEditingNoteText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isSavingNote, setIsSavingNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const parsedNotes = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadDetailsPage.useMemo[parsedNotes]": ()=>{
            if (!cleanLeadNote) return [];
            return parseNotes(cleanLeadNote);
        }
    }["LeadDetailsPage.useMemo[parsedNotes]"], [
        cleanLeadNote
    ]);
    const saveNotesPayload = async (updatedNotes)=>{
        if (!lead?.uuid) return false;
        setIsSavingNote(true);
        const serialized = serializeNotes(updatedNotes);
        try {
            const payload = {
                ...lead,
                uuid: lead.uuid,
                appointment_note: serialized,
                lead_note: serialized,
                notes: serialized,
                source_id: Number(lead.source_id || 1),
                project_id: lead.project_id,
                lead_priority_id: lead.lead_priority_id || 1,
                lead_status_id: lead.lead_status_id || 1,
                first_name: lead.first_name || "",
                last_name: lead.last_name || "",
                phone_number: lead.phone_number || "",
                email_address: lead.email_address || lead.email || "",
                source_employee_user_id: lead.source_employee_user_id ?? null,
                assigned_to_rm: lead.assigned_to_rm ?? null,
                assigned_to_em: lead.assigned_to_em ?? null,
                occupation: lead.occupation || "",
                address: lead.address || "",
                city: lead.city || "",
                state: lead.state || "",
                country: lead.country || "",
                zip: lead.zip || ""
            };
            await updateLead(payload).unwrap();
            setLocalNote(serialized);
            refetch();
            return true;
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to save note");
            return false;
        } finally{
            setIsSavingNote(false);
        }
    };
    const handleAddNote = async ()=>{
        const trimmed = newNoteText.trim();
        if (!trimmed) return;
        const newNote = {
            id: String(Date.now()),
            text: trimmed,
            date: formatNoteDate(new Date())
        };
        const updated = [
            newNote,
            ...parsedNotes
        ];
        const ok = await saveNotesPayload(updated);
        if (ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Note added successfully");
            setIsAddingNote(false);
            setNewNoteText("");
        }
    };
    const handleUpdateNote = async (noteId)=>{
        const trimmed = editingNoteText.trim();
        if (!trimmed) return;
        const updated = parsedNotes.map((n)=>n.id === noteId ? {
                ...n,
                text: trimmed
            } : n);
        const ok = await saveNotesPayload(updated);
        if (ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Note updated successfully");
            setEditingNoteId(null);
            setEditingNoteText("");
        }
    };
    const handleDeleteNote = async (noteId)=>{
        const updated = parsedNotes.filter((n)=>n.id !== noteId);
        const ok = await saveNotesPayload(updated);
        if (ok) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Note deleted successfully");
        }
    };
    const handleEditSubmit = async (values)=>{
        try {
            if (lead) {
                await updateLead({
                    ...values,
                    uuid: lead.uuid
                }).unwrap();
                if (values.appointment_note !== undefined) {
                    setLocalNote(values.appointment_note.trim());
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead updated successfully");
                refetch();
            }
            setIsDrawerOpen(false);
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to update lead");
        }
    };
    const handleViewLead = (uuid)=>{
        navigate(`/leads/${uuid}`);
        if (uuid === leadId) {
            refetch();
        }
    };
    const { getStatusLabel, getProjectLeadStatusLabel, getCustomerStatusLabel, getProjectLabel, getSourceLabel, getBranchLabel, getSpecialisationLabel, getRmLabel, getEmLabel, masterData, projectLeadStatuses } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const { roleCode, user: currentUser, currentRole } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const projectLeadStatusId = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadDetailsPage.useMemo[projectLeadStatusId]": ()=>{
            if (lead?.project_lead_status_id) return lead.project_lead_status_id;
            if (!lead?.project_id || !lead?.lead_status_id || !projectLeadStatuses) return undefined;
            const proj = projectLeadStatuses.find({
                "LeadDetailsPage.useMemo[projectLeadStatusId].proj": (item)=>Number(item.project_id) === Number(lead.project_id)
            }["LeadDetailsPage.useMemo[projectLeadStatusId].proj"]);
            if (!proj || !Array.isArray(proj.status)) return undefined;
            const match = proj.status.find({
                "LeadDetailsPage.useMemo[projectLeadStatusId].match": (s)=>Number(s.lead_status_id) === Number(lead.lead_status_id)
            }["LeadDetailsPage.useMemo[projectLeadStatusId].match"]);
            return match ? match.id : undefined;
        }
    }["LeadDetailsPage.useMemo[projectLeadStatusId]"], [
        lead?.project_lead_status_id,
        lead?.project_id,
        lead?.lead_status_id,
        projectLeadStatuses
    ]);
    const displayStatusLabel = lead?.project_lead_status_id ? getProjectLeadStatusLabel(lead.project_lead_status_id) : getStatusLabel(lead?.lead_status_id);
    const statusOptions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadDetailsPage.useMemo[statusOptions]": ()=>{
            if (lead?.project_id && projectLeadStatuses) {
                const opts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getProjectStatusOptions"])(lead.project_id, projectLeadStatuses);
                if (opts && opts.length > 0) return opts;
            }
            return (masterData?.lead_statuses || []).map({
                "LeadDetailsPage.useMemo[statusOptions]": (s)=>({
                        id: s.id,
                        value: s.id,
                        label: s.description || s.status_name || s.name || `Status ${s.id}`,
                        lead_status_id: s.id
                    })
            }["LeadDetailsPage.useMemo[statusOptions]"]);
        }
    }["LeadDetailsPage.useMemo[statusOptions]"], [
        lead?.project_id,
        projectLeadStatuses,
        masterData?.lead_statuses
    ]);
    const currentStatusValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadDetailsPage.useMemo[currentStatusValue]": ()=>{
            if (projectLeadStatusId) {
                const match = statusOptions.find({
                    "LeadDetailsPage.useMemo[currentStatusValue].match": (opt)=>Number(opt.id) === Number(projectLeadStatusId)
                }["LeadDetailsPage.useMemo[currentStatusValue].match"]);
                if (match) return String(match.id);
            }
            if (lead?.lead_status_id) {
                const match = statusOptions.find({
                    "LeadDetailsPage.useMemo[currentStatusValue].match": (opt)=>Number(opt.lead_status_id || opt.value) === Number(lead.lead_status_id)
                }["LeadDetailsPage.useMemo[currentStatusValue].match"]);
                if (match) return String(match.id || match.value);
            }
            return statusOptions[0] ? String(statusOptions[0].id || statusOptions[0].value) : "";
        }
    }["LeadDetailsPage.useMemo[currentStatusValue]"], [
        projectLeadStatusId,
        lead?.lead_status_id,
        statusOptions
    ]);
    const handleStatusChange = async (newVal)=>{
        if (!lead) return;
        const selectedOpt = statusOptions.find((opt)=>String(opt.id || opt.value) === newVal);
        const updatedPayload = {
            ...lead,
            uuid: lead.uuid,
            source_id: Number(lead.source_id || 1),
            project_id: lead.project_id,
            lead_priority_id: lead.lead_priority_id || 1,
            first_name: lead.first_name || '',
            last_name: lead.last_name || '',
            phone_number: lead.phone_number,
            email_address: lead.email_address || lead.email || '',
            source_employee_user_id: lead.source_employee_user_id ?? null,
            assigned_to_rm: lead.assigned_to_rm ?? null,
            assigned_to_em: lead.assigned_to_em ?? null,
            occupation: lead.occupation || '',
            address: lead.address || '',
            city: lead.city || '',
            state: lead.state || '',
            country: lead.country || '',
            zip: lead.zip || ''
        };
        if (selectedOpt) {
            if (selectedOpt.id) {
                updatedPayload.project_lead_status_id = Number(selectedOpt.id);
            }
            if (selectedOpt.lead_status_id || selectedOpt.value) {
                updatedPayload.lead_status_id = Number(selectedOpt.lead_status_id || selectedOpt.value);
            }
        } else {
            updatedPayload.lead_status_id = Number(newVal);
        }
        try {
            await updateLead(updatedPayload).unwrap();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Lead status updated successfully");
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || "Failed to update lead status");
        }
    };
    const upcomingVisitText = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "LeadDetailsPage.useMemo[upcomingVisitText]": ()=>{
            if (lead?.visits && Array.isArray(lead.visits) && lead.visits.length > 0) {
                const now = new Date();
                const upcoming = lead.visits.filter({
                    "LeadDetailsPage.useMemo[upcomingVisitText].upcoming": (v)=>{
                        if (!v.visit_date_time) return false;
                        const vDate = new Date(v.visit_date_time.replace(/Z/g, '').split('+')[0].replace(' ', 'T'));
                        return vDate >= now || v.visit_status === 1;
                    }
                }["LeadDetailsPage.useMemo[upcomingVisitText].upcoming"]);
                if (upcoming.length > 0 && upcoming[0].visit_date_time) {
                    return `${upcoming.length} Scheduled (${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(upcoming[0].visit_date_time)})`;
                }
            }
            const leadAny = lead;
            if (leadAny?.appointment_date) {
                return `${leadAny.appointment_date} ${leadAny.appointment_time || ''}`.trim();
            }
            return "No Upcoming Visits";
        }
    }["LeadDetailsPage.useMemo[upcomingVisitText]"], [
        lead
    ]);
    const sourceObj = masterData?.sources?.find((s)=>s.id === lead?.source_id);
    const isInternalEmployeeSource = lead?.source_id === 4 || sourceObj?.code === "INTEMP";
    const { data: users = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersQuery"])({
        offset: 0
    });
    const getSourceEmployeeName = ()=>{
        if (!lead?.source_employee_user_id) return "--";
        const user = users.find((u)=>u.id === lead.source_employee_user_id);
        return user ? `${user.first_name} ${user.last_name}` : `ID: ${lead.source_employee_user_id}`;
    };
    const dummyChats = [
        {
            id: 1,
            chat_summary: "Hi Vikram, I reviewed the brochure for the penthouse in SkyGardens. The floor plan looks interesting, but I have concerns about the parking space allocation. Does it come with 3 dedicated slots?",
            created_on: new Date().toISOString(),
            lead_uuid: "",
            chat_file_location: ""
        },
        {
            id: 2,
            chat_summary: "Hello Mr. Sharma! Yes, the SkyGardens penthouses are specifically allotted 3 covered car parking slots. I can also arrange a site visit for this Thursday at 4 PM if you're available?",
            created_on: new Date().toISOString(),
            lead_uuid: "",
            chat_file_location: ""
        },
        {
            id: 3,
            chat_summary: "Thursday 4 PM works for me. Can you also bring the documentation regarding the RERA approval and land titles during the visit?",
            created_on: new Date().toISOString(),
            lead_uuid: "",
            chat_file_location: ""
        },
        {
            id: 4,
            chat_summary: "Absolutely. I'll have the complete folder ready. I'll send you the location pin for the site office right away.",
            created_on: new Date().toISOString(),
            lead_uuid: "",
            chat_file_location: ""
        }
    ];
    /* ── Avatar initials ── */ const initials = `${(lead?.first_name || "")[0] || ""}${(lead?.last_name || "")[0] || ""}`.toUpperCase() || "?";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6 pb-12",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    onClick: ()=>navigate(fromCustomer ? "/customers" : "/leads"),
                    className: "gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                            lineNumber: 593,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        fromCustomer ? "Back to Customers" : "Back to Leads Dashboard"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                    lineNumber: 587,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                lineNumber: 586,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center min-h-[400px]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-zinc-500 animate-pulse",
                    children: "Fetching lead details..."
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                    lineNumber: 601,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                lineNumber: 600,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center justify-center min-h-[400px] text-red-500",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Failed to load lead details."
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 610,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-zinc-500 mt-2",
                        children: error?.data?.message || "Check connection or lead existence."
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 611,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                lineNumber: 609,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            lead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shrink-0 flex items-center justify-center rounded-xl text-white font-bold text-base",
                                        style: {
                                            width: 44,
                                            height: 44,
                                            backgroundColor: "#0f3d6b"
                                        },
                                        children: initials
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 626,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-bold text-lg text-[#191C1E] dark:text-zinc-100 font-['Plus_Jakarta_Sans'] capitalize leading-tight",
                                                children: [
                                                    lead.first_name || "",
                                                    " ",
                                                    lead.last_name || ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 635,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-wrap items-center gap-2 sm:gap-2.5 mt-1 text-xs text-[#64748B] font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: [
                                                            "Lead ID:",
                                                            " ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-bold text-[#0f3d6b] dark:text-blue-400",
                                                                children: [
                                                                    "#",
                                                                    lead.lead_id
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                lineNumber: 641,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 639,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#CBD5E1]",
                                                        children: "·"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                                        delayDuration: 200,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                                    asChild: true,
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "flex items-center gap-1.5 cursor-pointer hover:text-[#0f3d6b] transition-colors",
                                                                        onClick: ()=>console.log("call is clicked"),
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                                className: "h-3 w-3 text-[#0f3d6b] dark:text-blue-400"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                                lineNumber: 653,
                                                                                columnNumber: 27
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            lead.phone_number || lead.phone || "N/A"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                        lineNumber: 649,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                    lineNumber: 648,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        children: "Call"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                        lineNumber: 658,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                    lineNumber: 657,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                            lineNumber: 647,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 646,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    (lead.email_address || lead.email) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[#CBD5E1]",
                                                                children: "·"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                lineNumber: 664,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                                        className: "h-3 w-3 text-[#0f3d6b] dark:text-blue-400"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                        lineNumber: 666,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    lead.email_address || lead.email
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 638,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 634,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                lineNumber: 624,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
                                        delayDuration: 200,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                                    asChild: true,
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                        variant: "outline",
                                                        size: "icon",
                                                        onClick: async ()=>{
                                                            console.log("call is clicked");
                                                            const customerUuid = lead.customer_uuid || lead.customer_uuid;
                                                            const leadUuid = lead.uuid || leadId || lead.lead_uuid;
                                                            if (!customerUuid) {
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Customer UUID not available for this lead");
                                                                return;
                                                            }
                                                            const sessionAgentId = ("TURBOPACK compile-time truthy", 1) ? sessionStorage.getItem('agent_id') : "TURBOPACK unreachable";
                                                            let agentId = currentUser?.agent_id ? Number(currentUser.agent_id) : sessionAgentId ? Number(sessionAgentId) : null;
                                                            // If agent_id is not already present, fetch from getUserById
                                                            if (!agentId && currentUser?.id) {
                                                                try {
                                                                    const userDetails = await getUserById({
                                                                        id: Number(currentUser.id)
                                                                    }).unwrap();
                                                                    if (userDetails?.agent_id !== undefined && userDetails?.agent_id !== null) {
                                                                        agentId = Number(userDetails.agent_id);
                                                                        try {
                                                                            sessionStorage.setItem('agent_id', String(agentId));
                                                                        } catch (e) {
                                                                            console.error('Error saving agent_id to sessionStorage:', e);
                                                                        }
                                                                    }
                                                                } catch (err) {
                                                                    console.error("Failed to fetch user details for agent_id", err);
                                                                }
                                                            }
                                                            if (!agentId) {
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Telephony Agent ID is not configured for your account. Please contact your administrator.");
                                                                return;
                                                            }
                                                            try {
                                                                await initiateClickToCall({
                                                                    customer_uuid: customerUuid,
                                                                    lead_uuid: leadUuid || "",
                                                                    agent_id: agentId
                                                                }).unwrap();
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Call initiated successfully");
                                                                // Clear previous polling interval if any
                                                                if (callRecordsPollingRef.current) {
                                                                    clearInterval(callRecordsPollingRef.current);
                                                                    callRecordsPollingRef.current = null;
                                                                }
                                                                const now = new Date();
                                                                const fromDate = new Date(now.getTime() - 1 * 60 * 1000); // current time - 1 min
                                                                const toDate = new Date(now.getTime() + 5 * 60 * 1000); // current time + 5 mins
                                                                const from_date = formatDateTimeForTataTele(fromDate);
                                                                const to_date = formatDateTimeForTataTele(toDate);
                                                                const pollRecords = async ()=>{
                                                                    try {
                                                                        const res = await getCallRecords({
                                                                            from_date,
                                                                            to_date,
                                                                            limit: 20,
                                                                            offset: 0
                                                                        }).unwrap();
                                                                        const recordsList = Array.isArray(res?.data?.results) ? res.data.results : Array.isArray(res?.results) ? res.results : Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
                                                                        const foundRecord = recordsList.find((r)=>Boolean(r && (r.answered_seconds !== undefined || r.call_id || r.id || r.recording_url)));
                                                                        if (foundRecord) {
                                                                            console.log("Found call record:", foundRecord);
                                                                            const callId = String(foundRecord.call_id || foundRecord.id || "1");
                                                                            const cleanPhone = (num)=>String(num || "").trim().replace(/^\+91/, "").replace(/^\+/, "").trim();
                                                                            const fromNumber = cleanPhone(foundRecord.agent_number || foundRecord.from_number || lead.phone_number || lead.phone || "");
                                                                            const toNumber = cleanPhone(foundRecord.client_number || foundRecord.to_number || "1800-123-4567");
                                                                            const leadName = `${lead.first_name || ""} ${lead.last_name || ""}`.trim() || "Lead";
                                                                            const answeredSeconds = Number(foundRecord.answered_seconds ?? 0);
                                                                            if (foundRecord.answered_seconds !== undefined && answeredSeconds <= 0) {
                                                                                // 1. MISSED / UNANSWERED / DISCONNECTED CALL (answered_seconds === 0)
                                                                                if (callRecordsPollingRef.current) {
                                                                                    clearInterval(callRecordsPollingRef.current);
                                                                                    callRecordsPollingRef.current = null;
                                                                                }
                                                                                try {
                                                                                    const callerUserId = currentUser?.id ? Number(currentUser.id) : 0;
                                                                                    const callerRoleId = currentUser?.role_id ? Number(currentUser.role_id) : currentRole?.id ? Number(currentRole.id) : 0;
                                                                                    const createdOnDate = foundRecord.created_on || foundRecord.start_time || foundRecord.call_start_time || new Date().toISOString();
                                                                                    await createCall({
                                                                                        lead_uuid: lead.uuid || leadUuid,
                                                                                        call_id: callId,
                                                                                        from_number: fromNumber,
                                                                                        to_number: toNumber,
                                                                                        call_duration_in_seconds: 0,
                                                                                        call_summary: "",
                                                                                        call_remarks: "",
                                                                                        manual_call_notes: "",
                                                                                        caller_user_id: callerUserId,
                                                                                        caller_role_id: callerRoleId,
                                                                                        call_s3_data: "",
                                                                                        lead_call_status_id: 2,
                                                                                        created_on: createdOnDate
                                                                                    }).unwrap();
                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Call was not answered / disconnected. Missed call record saved.");
                                                                                    refetch();
                                                                                } catch (createCallErr) {
                                                                                    console.error("Failed to create missed call record:", createCallErr);
                                                                                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(createCallErr?.data?.message || "Failed to log missed call");
                                                                                }
                                                                            } else {
                                                                                // 2. ANSWERED CALL (answered_seconds > 0) -> Wait for recording_url to be ready
                                                                                const cleanUrl = foundRecord.recording_url ? String(foundRecord.recording_url).replace(/["']+/g, "").trim() : "";
                                                                                if (!cleanUrl) {
                                                                                    console.log("Call was answered, waiting for recording_url to become available...");
                                                                                    return; // Continue polling next cycle
                                                                                }
                                                                                if (callRecordsPollingRef.current) {
                                                                                    clearInterval(callRecordsPollingRef.current);
                                                                                    callRecordsPollingRef.current = null;
                                                                                }
                                                                                const payload = {
                                                                                    call_id: callId,
                                                                                    lead_uuid: lead.uuid || leadUuid,
                                                                                    lead_name: leadName,
                                                                                    from_number: fromNumber,
                                                                                    to_number: toNumber,
                                                                                    file: cleanUrl
                                                                                };
                                                                                const maxRetries = 3;
                                                                                const delayMs = 5000;
                                                                                // Wait initial 5 seconds before first call
                                                                                await new Promise((resolve)=>setTimeout(resolve, delayMs));
                                                                                for(let attempt = 1; attempt <= maxRetries; attempt++){
                                                                                    try {
                                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info(attempt === 1 ? "Analyzing call recording with AI..." : `Retrying AI call analysis (${attempt}/${maxRetries})...`);
                                                                                        await analyzeCall(payload).unwrap();
                                                                                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Call analysis completed successfully!");
                                                                                        refetch();
                                                                                        break;
                                                                                    } catch (processErr) {
                                                                                        console.error(`Error analyzing call recording (Attempt ${attempt}/${maxRetries}):`, processErr);
                                                                                        if (attempt < maxRetries) {
                                                                                            await new Promise((resolve)=>setTimeout(resolve, delayMs));
                                                                                        } else {
                                                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(processErr?.data?.message || processErr?.message || "Failed to analyze call recording after 3 attempts");
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    } catch (pollErr) {
                                                                        console.error("Error polling call records:", pollErr);
                                                                    }
                                                                };
                                                                // Poll every 10 seconds
                                                                callRecordsPollingRef.current = setInterval(pollRecords, 10000);
                                                            } catch (err) {
                                                                console.error("Call failed", err);
                                                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Failed to initiate call");
                                                            }
                                                        },
                                                        className: "h-9 w-9 rounded-full border-zinc-200 hover:bg-zinc-100 text-[#0f3d6b] dark:border-zinc-800 dark:hover:bg-zinc-900 transition-all cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            className: "h-3.5 w-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                            lineNumber: 870,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 678,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Call"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 873,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 677,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 676,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$PointsToTalkDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PointsToTalkDialog"], {
                                        project: getProjectLabel(lead.project_id),
                                        status: displayStatusLabel,
                                        projectLeadStatusId: projectLeadStatusId
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 880,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                lineNumber: 675,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 623,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-8 pt-7 pb-4 border-b border-zinc-100 dark:border-zinc-800",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"], {
                                                    className: "h-4 w-4 text-[#0f3d6b]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 896,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 895,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                style: {
                                                    fontFamily: "Inter, sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: "18px",
                                                    lineHeight: "24px",
                                                    color: "#191C1E"
                                                },
                                                children: "Patient Details"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 898,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 894,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    roleCode !== 'EXPMNG' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsDrawerOpen(true),
                                        className: "w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-700 flex items-center justify-center hover:bg-zinc-50 transition-colors cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                            className: "h-4 w-4 text-zinc-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 915,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 911,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                lineNumber: 893,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 xl:gap-x-12 gap-y-7 px-8 py-7",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Source",
                                        value: getSourceLabel(lead.source_id)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 922,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isInternalEmployeeSource && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Source Employee",
                                        value: getSourceEmployeeName()
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 927,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Creation Date",
                                        value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(lead.created_on)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 932,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                            value: currentStatusValue,
                                            onValueChange: handleStatusChange,
                                            disabled: isUpdating,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                    className: "w-full text-left bg-transparent border-none p-0 shadow-none focus:ring-0 focus:outline-none group cursor-pointer h-auto [&>svg]:hidden",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                                                style: labelStyle,
                                                                className: "flex items-center gap-1.5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "LEAD STATUS"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                        lineNumber: 945,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                                        className: "h-3.5 w-3.5 text-zinc-400 group-hover:text-[#0f3d6b] shrink-0 transition-colors"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                        lineNumber: 946,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                lineNumber: 944,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                                                style: valueStyle,
                                                                className: "flex items-center gap-2",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    style: valueStyle,
                                                                    className: "truncate max-w-[200px] block",
                                                                    title: displayStatusLabel,
                                                                    children: displayStatusLabel
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                    lineNumber: 949,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                lineNumber: 948,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                        lineNumber: 943,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 942,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                    className: "w-[260px] max-h-[240px] overflow-y-auto p-1 shadow-lg border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 rounded-xl",
                                                    children: statusOptions.map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                            value: String(opt.id || opt.value),
                                                            className: "py-1.5 px-2 text-xs font-medium cursor-pointer rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-full max-w-[200px] truncate",
                                                                title: opt.label,
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "truncate text-xs text-zinc-800 dark:text-zinc-200",
                                                                    children: opt.label
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                    lineNumber: 963,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                                lineNumber: 962,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, opt.id || opt.value, false, {
                                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                            lineNumber: 957,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 955,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 937,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 936,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Upcoming Visits",
                                        value: upcomingVisitText,
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "h-4 w-4 text-[#0f3d6b]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 981,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 978,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Assigned RM",
                                        value: lead.assigned_to_rm ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-6 h-6 rounded-full bg-[#0f3d6b] text-white flex items-center justify-center text-[9px] font-bold shrink-0",
                                                    children: getRmLabel(lead.assigned_to_rm).split(" ").map((n)=>n[0]).join("").toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 994,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                getRmLabel(lead.assigned_to_rm)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 993,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)) : null
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 989,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Branch",
                                        value: lead?.branch_id ?? stateBranchId ? getBranchLabel(lead?.branch_id ?? stateBranchId) : lead?.hospital_branch || lead?.branch || lead?.branch_name || stateBranchName || getProjectLabel(lead?.project_id) || "--"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1041,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Follow Up Date",
                                        value: lead?.followup_date || lead?.next_followup_date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(lead?.followup_date || lead?.next_followup_date) : lead?.follow_ups && lead?.follow_ups.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(lead?.follow_ups[0].date_time) : lead?.followups && lead?.followups.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(lead?.followups[0].date_time) : "--",
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "h-4 w-4 text-[#0f3d6b]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1060,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1049,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Appointment Date",
                                        value: lead?.appointment_date ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(lead?.appointment_date) : lead?.visits && lead?.visits.length > 0 && lead?.visits[0].visit_date_time ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["formatDate"])(lead?.visits[0].visit_date_time) : "--",
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                            className: "h-4 w-4 text-[#0f3d6b]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1071,
                                            columnNumber: 23
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1062,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DetailField, {
                                        label: "Department",
                                        value: lead?.specialisation_id ?? stateSpecialisationId ? getSpecialisationLabel(lead?.specialisation_id ?? stateSpecialisationId) : lead?.department || lead?.specialization || "--"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1073,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                lineNumber: 921,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 891,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: followupsRef,
                        className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden max-h-[85vh] flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-full bg-[#EFF6FF] flex items-center justify-center shrink-0",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                    className: "h-4 w-4 text-[#0f3d6b]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 1108,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    style: {
                                                        fontFamily: "Inter, sans-serif",
                                                        fontWeight: 700,
                                                        fontSize: "17px",
                                                        lineHeight: "22px",
                                                        color: "#191C1E"
                                                    },
                                                    children: "Lead Followups & Notes"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 1111,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setIsFollowupModalOpen(true),
                                        className: "flex items-center justify-center gap-1.5 px-5 h-9 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-full text-xs font-semibold transition-all cursor-pointer active:scale-95",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                className: "w-3.5 h-3.5 stroke-[2.5]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1129,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Create Follow-Up"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1130,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1124,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                lineNumber: 1105,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-y-auto flex-1 p-4 sm:p-5",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadFollowUpsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadFollowUpsTab"], {
                                    lead: lead ? {
                                        ...lead,
                                        branch_id: lead.branch_id ?? stateBranchId,
                                        specialisation_id: lead.specialisation_id ?? stateSpecialisationId
                                    } : lead,
                                    masterData: masterData,
                                    hideHeader: true,
                                    createModalOpen: isFollowupModalOpen,
                                    setCreateModalOpen: setIsFollowupModalOpen
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                    lineNumber: 1136,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                lineNumber: 1135,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 1103,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tabs"], {
                            value: activeTab,
                            onValueChange: handleTabChange,
                            className: "w-full flex flex-col",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-b border-zinc-200 dark:border-zinc-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsList"], {
                                        className: "w-full bg-transparent p-0 h-auto rounded-none grid grid-cols-6",
                                        children: [
                                            "activity",
                                            "calls",
                                            "chats",
                                            "visits",
                                            "surgeries",
                                            "enquiries"
                                        ].map((tab)=>{
                                            const label = tab === "visits" ? "Appointments" : tab === "surgeries" ? "Surgeries" : tab.charAt(0).toUpperCase() + tab.slice(1);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsTrigger"], {
                                                value: tab,
                                                className: "\n                          py-4 text-sm font-medium capitalize rounded-none border-b-2 border-transparent\n                          text-zinc-400\n                          data-[state=active]:text-[#0f3d6b]\n                          data-[state=active]:border-b-[#0f3d6b]\n                          data-[state=active]:font-semibold\n                          data-[state=active]:shadow-none\n                          transition-all\n                          flex items-center justify-center gap-1\n                          cursor-pointer\n                        ",
                                                children: label
                                            }, tab, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1167,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                        lineNumber: 1157,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                    lineNumber: 1156,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "activity",
                                            className: "mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadRemarksTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadRemarksTab"], {
                                                remarks: lead?.remarks
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1192,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1191,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "calls",
                                            className: "mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadCallsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadCallsTab"], {
                                                calls: lead?.calls,
                                                leadPhoneNumber: lead?.phone_number,
                                                objections: lead?.objections,
                                                masterObjections: masterData?.objections
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1196,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1195,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "chats",
                                            className: "mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: chatRef,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadChatsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadChatsTab"], {
                                                    chats: lead?.chats?.length ? lead.chats : dummyChats,
                                                    leadUuid: lead?.uuid,
                                                    phoneNumber: lead?.phone_number,
                                                    selectedChatType: "CM"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 1206,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1205,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1204,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "visits",
                                            className: "mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadVisitsTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadVisitsTab"], {
                                                visits: lead?.visits,
                                                lead: lead ? {
                                                    ...lead,
                                                    branch_id: lead.branch_id ?? stateBranchId,
                                                    specialisation_id: lead.specialisation_id ?? stateSpecialisationId
                                                } : lead,
                                                siteVisitStatuses: masterData?.appointment_status || masterData?.appointment_statuses || masterData?.site_visit_status || [],
                                                getSiteVisitStatusLabel: (id)=>{
                                                    const allStatuses = masterData?.appointment_status || masterData?.appointment_statuses || masterData?.site_visit_status || [];
                                                    return allStatuses.find((s)=>Number(s.id) === Number(id))?.description || String(id);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1216,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1215,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "surgeries",
                                            className: "mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadSurgeriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadSurgeriesTab"], {
                                                lead: lead ? {
                                                    ...lead,
                                                    branch_id: lead.branch_id ?? stateBranchId,
                                                    specialisation_id: lead.specialisation_id ?? stateSpecialisationId
                                                } : lead
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1244,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1243,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tabs$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TabsContent"], {
                                            value: "enquiries",
                                            className: "mt-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                ref: enquiriesRef,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$tabs$2f$LeadEnquiriesTab$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadEnquiriesTab"], {
                                                    leadId: leadId,
                                                    enquiries: lead?.enquires,
                                                    onView: handleViewLead
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                    lineNumber: 1255,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                                lineNumber: 1254,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                            lineNumber: 1253,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                                    lineNumber: 1190,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                            lineNumber: 1154,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 1153,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$AppDrawer$2f$AppDrawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppDrawer"], {
                        open: isDrawerOpen,
                        onClose: ()=>setIsDrawerOpen(false),
                        title: "Edit Lead",
                        description: "Update the details for this lead",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$LeadForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LeadForm"], {
                            initialValues: lead ? {
                                ...lead,
                                branch_id: lead.branch_id ?? stateBranchId,
                                specialisation_id: lead.specialisation_id ?? stateSpecialisationId
                            } : undefined,
                            onSubmit: handleEditSubmit,
                            isLoading: isUpdating,
                            isEdit: true
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                            lineNumber: 1268,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                        lineNumber: 1262,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
                lineNumber: 619,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/pages/LeadDetailsPage.tsx",
        lineNumber: 584,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LeadDetailsPage, "4qA6ySMgD4ET8EGa314K7aPtaCk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadByIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateLeadMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useInitiateClickToCallMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$api$2f$authApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetUserByIdMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetCallRecordsMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$callsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateCallMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$s3ApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUploadFileMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$call$2d$analyzer$2f$api$2f$callAnalyzerApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAnalyzeCallMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersQuery"]
    ];
});
_c1 = LeadDetailsPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "DetailField");
__turbopack_context__.k.register(_c1, "LeadDetailsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_leads_pages_LeadDetailsPage_tsx_045xzm2._.js.map