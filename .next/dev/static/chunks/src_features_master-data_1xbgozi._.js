(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/master-data/data/contentData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "contentTypesList",
    ()=>contentTypesList,
    "initialGlobalContent",
    ()=>initialGlobalContent,
    "initialProjectContent",
    ()=>initialProjectContent
]);
const initialGlobalContent = [
    {
        id: "master-brochure",
        title: "Master Brochure",
        fileName: "Skyvillas_Brochure_V4.pdf",
        fileSize: "24.5 MB",
        uploadedDate: "12 Oct 2023",
        fileType: "pdf",
        contentType: "Brochures"
    },
    {
        id: "price-list-oct-23",
        title: "Price List - Oct 23",
        fileName: "Inventory_Matrix_Final.xlsx",
        fileSize: "1.2 MB",
        uploadedDate: "08 Oct 2023",
        fileType: "xlsx",
        contentType: "Brochures"
    },
    {
        id: "floor-plans-3bhk",
        title: "Floor Plans (3BHK)",
        fileName: "Plan_Type_A_3BHK.dwg",
        fileSize: "158 MB",
        uploadedDate: "15 Oct 2023",
        fileType: "dwg",
        contentType: "Brochures"
    },
    {
        id: "aerial-renderings",
        title: "Aerial Renderings",
        fileName: "Skyview_Night_01.png",
        fileSize: "8.4 MB",
        uploadedDate: "20 Oct 2023",
        fileType: "png",
        contentType: "Brochures"
    },
    {
        id: "legal-documents",
        title: "Legal Documents",
        fileName: "RERA_Approval_Cert.pdf",
        fileSize: "4.1 MB",
        uploadedDate: "02 Oct 2023",
        fileType: "pdf",
        contentType: "Legal document samples"
    },
    {
        id: "marketing-video",
        title: "Marketing Video",
        fileName: "Walkthrough_4K.mp4",
        fileSize: "412 MB",
        uploadedDate: "25 Oct 2023",
        fileType: "mp4",
        contentType: "Project videos"
    }
];
const initialProjectContent = {
    "planet-green": [
        "master-brochure",
        "price-list-oct-23",
        "floor-plans-3bhk"
    ],
    "farmnatura": [
        "price-list-oct-23",
        "aerial-renderings"
    ],
    "eco-world": [
        "legal-documents",
        "marketing-video"
    ]
};
const contentTypesList = [
    "Brochures",
    "Testimonials",
    "Location maps",
    "Project videos",
    "FAQs",
    "Legal document samples",
    "Founder message",
    "Customer stories"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/contentTypesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalContentTypes",
    ()=>initialGlobalContentTypes,
    "initialProjectContentTypes",
    ()=>initialProjectContentTypes
]);
const initialGlobalContentTypes = [
    {
        code: "BROCHE",
        name: "Brochures"
    },
    {
        code: "TESTMN",
        name: "Testimonials"
    },
    {
        code: "LMAP",
        name: "Location Maps"
    },
    {
        code: "PRIC",
        name: "Price Sheets"
    },
    {
        code: "PVID",
        name: "Project Videos"
    },
    {
        code: "FAQS",
        name: "FAQs"
    },
    {
        code: "LEGD",
        name: "Legal Document Samples"
    },
    {
        code: "FMSG",
        name: "Founder Message"
    },
    {
        code: "CSTR",
        name: "Customer Stories"
    }
];
const initialProjectContentTypes = {
    "planet-green": [
        "BROCHE",
        "TESTMN",
        "LMAP",
        "PRIC",
        "PVID",
        "FAQS"
    ],
    "farmnatura": [
        "BROCHE",
        "TESTMN",
        "PRIC",
        "FAQS",
        "CSTR"
    ],
    "eco-world": [
        "LMAP",
        "PVID",
        "LEGD",
        "FMSG"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/followUpStatusesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalFollowUpStatuses",
    ()=>initialGlobalFollowUpStatuses,
    "initialProjectFollowUpStatuses",
    ()=>initialProjectFollowUpStatuses
]);
const initialGlobalFollowUpStatuses = [
    {
        code: "NLEAD",
        name: "New lead"
    },
    {
        code: "CNTD",
        name: "Contacted"
    },
    {
        code: "STP",
        name: "Site Visit Planned"
    },
    {
        code: "NGTN",
        name: "Negotiation"
    },
    {
        code: "INRSD",
        name: "Interested"
    },
    {
        code: "DSRD",
        name: "Details Shared"
    },
    {
        code: "FWUP",
        name: "Follow Up"
    },
    {
        code: "BOKD",
        name: "Booking Done"
    },
    {
        code: "QUAL",
        name: "Qualified"
    },
    {
        code: "DEMO",
        name: "Demo Completed"
    },
    {
        code: "PROP",
        name: "Proposal Sent"
    }
];
const initialProjectFollowUpStatuses = {
    "planet-green": [
        "NLEAD",
        "CNTD",
        "STP",
        "NGTN"
    ],
    "farmnatura": [
        "INRSD",
        "DSRD",
        "FWUP"
    ],
    "eco-world": [
        "BOKD",
        "QUAL",
        "DEMO",
        "PROP"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/leadStatusesData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalStatuses",
    ()=>initialGlobalStatuses,
    "initialProjectStatuses",
    ()=>initialProjectStatuses
]);
const initialGlobalStatuses = [
    {
        code: "INRSD",
        name: "Interested"
    },
    {
        code: "DSRD",
        name: "Details Shared"
    },
    {
        code: "FWUP",
        name: "Follow Up"
    },
    {
        code: "BOKD",
        name: "Booking Done"
    },
    {
        code: "NLEAD",
        name: "New lead"
    },
    {
        code: "CNTD",
        name: "Contacted"
    },
    {
        code: "STP",
        name: "Site Visit Planned"
    },
    {
        code: "NGTN",
        name: "Negotiation"
    },
    {
        code: "QUAL",
        name: "Qualified Lead"
    },
    {
        code: "APPT",
        name: "Appointment Scheduled"
    },
    {
        code: "DEMO",
        name: "Demo Completed"
    },
    {
        code: "PROP",
        name: "Proposal Sent"
    },
    {
        code: "UNDR",
        name: "Under Review"
    },
    {
        code: "HLD",
        name: "On Hold"
    },
    {
        code: "CLSD",
        name: "Closed Won"
    },
    {
        code: "LOST",
        name: "Closed Lost"
    },
    {
        code: "REJ",
        name: "Rejected"
    },
    {
        code: "JUNK",
        name: "Junk Lead"
    },
    {
        code: "SPAM",
        name: "Spam Report"
    },
    {
        code: "ARC",
        name: "Archived"
    },
    {
        code: "NP",
        name: "No Pick Up"
    },
    {
        code: "CB",
        name: "Call Back"
    },
    {
        code: "VM",
        name: "Voicemail Left"
    },
    {
        code: "WN",
        name: "Wrong Number"
    }
];
const initialProjectStatuses = {
    "planet-green": [
        "NLEAD",
        "CNTD",
        "STP",
        "NGTN",
        "QUAL",
        "APPT"
    ],
    "farmnatura": [
        "INRSD",
        "DSRD",
        "FWUP",
        "DEMO",
        "PROP"
    ],
    "eco-world": [
        "BOKD",
        "UNDR",
        "HLD",
        "CLSD"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/masterData.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "masterDataCards",
    ()=>masterDataCards
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$projectsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/projectsData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$leadStatusesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/leadStatusesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$contentData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/contentData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$contentTypesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/contentTypesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$followUpStatusesData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/followUpStatusesData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$objectionsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/objectionsData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$projectScoresData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/projectScoresData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$pointsData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master-data/data/pointsData.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
const masterDataCards = [
    {
        id: "lead-statuses",
        title: "Lead statuses",
        description: "Define and manage the distinct stages of your sales funnel, tracking progression from initial inquiry to final booking.",
        iconName: "radio",
        path: "/master-data/lead-statuses"
    },
    {
        id: "content",
        title: "Content",
        description: "Centralise project resources, marketing collateral, brochures, videos, and supporting documents for quick access and distribution.",
        iconName: "file-text",
        path: "/master-data/content"
    },
    {
        id: "content-types",
        title: "Content types",
        description: "Standardise content classifications to ensure consistent organisation and management of project assets across teams.",
        iconName: "layers",
        path: "/master-data/content-types"
    },
    {
        id: "lead-follow-up-statuses",
        title: "Lead follow up statuses",
        description: "Configure standard communication cadences, SLA breach parameters, and mandatory next action triggers for the team.",
        iconName: "clock",
        path: "/master-data/follow-up-statuses"
    },
    {
        id: "objections",
        title: "Objections",
        description: "Maintain a central directory of common buyer concerns and resistance points to accurately track sales blockers.",
        iconName: "alert-circle",
        path: "/master-data/objections"
    },
    {
        id: "project-score",
        title: "Project score",
        description: "Adjust the algorithmic weightings, demographic criteria, and intent signals the AI uses to prioritize inbound leads.",
        iconName: "hash-100",
        path: "/master-data/project-score"
    },
    {
        id: "points",
        title: "Points",
        description: "Manage and generate AI communication Points for your leads.",
        iconName: "sparkles",
        path: "/master-data/points"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/objectionsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialGlobalObjections",
    ()=>initialGlobalObjections,
    "initialProjectObjections",
    ()=>initialProjectObjections
]);
const initialGlobalObjections = [
    {
        id: "road-issue",
        name: "Road Issue"
    },
    {
        id: "water-problem",
        name: "Water Problem"
    },
    {
        id: "nature-related",
        name: "Nature Related Issues"
    },
    {
        id: "expensive",
        name: "Expensive"
    },
    {
        id: "loan-issue",
        name: "Loan Issue"
    },
    {
        id: "facilities",
        name: "Facilities"
    }
];
const initialProjectObjections = {
    "planet-green": [
        "road-issue",
        "expensive",
        "loan-issue"
    ],
    "farmnatura": [
        "water-problem",
        "nature-related"
    ],
    "eco-world": [
        "facilities",
        "expensive"
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/pointsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialProjectPoints",
    ()=>initialProjectPoints
]);
const initialProjectPoints = {
    "planet-green": {
        "NLEAD": [
            {
                id: "1",
                point: "Did the agent greet the customer professionally?"
            },
            {
                id: "2",
                point: "Did the agent ask for the customer's requirement/needs?"
            },
            {
                id: "3",
                point: "Did the agent explain the project or product details?"
            },
            {
                id: "4",
                point: "Did the agent mention the price or budget clearly?"
            },
            {
                id: "5",
                point: "Did the agent handle customer objections or questions effectively?"
            },
            {
                id: "6",
                point: "Did the agent verify the customer's contact information (Phone/Email)?"
            },
            {
                id: "7",
                point: "Did the agent introduce themselves and the company clearly?"
            }
        ],
        "CNTD": [
            {
                id: "8",
                point: "Did the agent follow up on the previous discussion points?"
            },
            {
                id: "9",
                point: "Did the agent schedule a site visit or next conversation?"
            }
        ]
    },
    "farmnatura": {
        "NLEAD": [
            {
                id: "10",
                point: "Did the agent explain the farmnatura organic farming concept?"
            },
            {
                id: "11",
                point: "Did the agent verify lead location and budget range?"
            }
        ]
    },
    "eco-world": {
        "NLEAD": [
            {
                id: "12",
                point: "Did the agent introduce the eco-friendly amenities of Eco World?"
            },
            {
                id: "13",
                point: "Did the agent ask if the customer is buying for self-use or investment?"
            }
        ]
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/projectScoresData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialProjectScores",
    ()=>initialProjectScores
]);
const initialProjectScores = {
    "planet-green": [
        {
            id: "1",
            category: "Telangana",
            description: "Weightage assigned based on geographical proximity to project locations and regional purchasing power.",
            marks: 25
        },
        {
            id: "2",
            category: "Software Engineer",
            description: "Scores based on employment sectors such as IT, Finance, and Public Service with high investment intent.",
            marks: 20
        },
        {
            id: "3",
            category: "40-50 Years",
            description: "Demographic segments targeting first-time buyers and experienced real estate investors.",
            marks: 10
        },
        {
            id: "4",
            category: "50L Avg Income",
            description: "Annual household income tiers derived from self-declared data and historical lead behavior.",
            marks: 10
        }
    ],
    "farmnatura": [
        {
            id: "5",
            category: "Karnataka",
            description: "Proximity to Bangalore tech hubs and surrounding districts.",
            marks: 30
        },
        {
            id: "6",
            category: "Doctor / Healthcare",
            description: "Professionals with high savings rate and interest in secondary farm homes.",
            marks: 25
        },
        {
            id: "7",
            category: "30-40 Years",
            description: "Younger professionals looking for investment opportunities.",
            marks: 15
        }
    ],
    "eco-world": [
        {
            id: "8",
            category: "Maharashtra",
            description: "Targeting premium buyers in Mumbai and Pune regions.",
            marks: 40
        },
        {
            id: "9",
            category: "Business Owner",
            description: "Self-employed individuals with high net worth.",
            marks: 35
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/data/projectsData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "initialProjects",
    ()=>initialProjects
]);
const initialProjects = [
    {
        id: "planet-green",
        name: "Planet Green"
    },
    {
        id: "farmnatura",
        name: "Farmnatura"
    },
    {
        id: "eco-world",
        name: "Eco World"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master-data/pages/MasterDataPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MasterDataPage",
    ()=>MasterDataPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/radio.js [app-client] (ecmascript) <export default as Radio>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$masterData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/master-data/data/masterData.ts [app-client] (ecmascript) <locals>");
;
;
;
;
const getCardIcon = (iconName)=>{
    switch(iconName){
        case "radio":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$radio$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Radio$3e$__["Radio"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 9,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        case "file-text":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 11,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        case "layers":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 13,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        case "clock":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 15,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        case "alert-circle":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 17,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        case "hash-100":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm font-black text-[#00236F] dark:text-blue-400 leading-none",
                children: "100"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 19,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        case "sparkles":
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 21,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                className: "w-6 h-6 text-[#00236F] dark:text-blue-400"
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 23,
                columnNumber: 14
            }, ("TURBOPACK compile-time value", void 0));
    }
};
const MasterDataPage = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-[1440px] xl:max-w-[1920px] 2xl:max-w-[2560px] mx-auto px-4 sm:px-6 md:px-8 py-6 space-y-8 animate-in fade-in duration-300",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[11.38px] max-w-[672px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[32px] leading-[40px] text-[#001549] dark:text-zinc-100",
                        children: "Master Data"
                    }, void 0, false, {
                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-['Inter'] font-normal text-[14px] leading-[21px] text-[#575E70] dark:text-zinc-400",
                        children: "Select a report to view live metrics, filter by project, and export data. Your dashboard is configured for real time tracking across all residential pipelines."
                    }, void 0, false, {
                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2d$data$2f$data$2f$masterData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["masterDataCards"].map((card)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Link"], {
                        to: card.path,
                        className: "group block bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/80 rounded-[24px] p-6 hover:shadow-md hover:scale-[1.005] hover:border-slate-200 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between min-h-[190px] cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[48px] h-[48px] rounded-[12px] bg-[#F1F5F9] dark:bg-zinc-950/40 border border-slate-100/50 dark:border-zinc-800 flex items-center justify-center shadow-sm shrink-0",
                                        children: getCardIcon(card.iconName)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-[48px] h-[20px] inline-flex items-center justify-end text-[11px] font-black text-[#002d62] group-hover:text-[#063669] dark:text-blue-400 dark:group-hover:text-blue-300 transition-colors gap-1 shrink-0",
                                        children: [
                                            "View",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                                lineNumber: 57,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                        lineNumber: 53,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                lineNumber: 49,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-5 space-y-2 flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-['Plus_Jakarta_Sans'] font-semibold text-[16px] leading-[24px] text-[#191C1E] dark:text-zinc-100",
                                        children: card.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                        lineNumber: 63,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-['Inter'] font-normal text-[14px] leading-[21px] text-[#575E70] dark:text-zinc-400",
                                        children: card.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, card.id, true, {
                        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/master-data/pages/MasterDataPage.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = MasterDataPage;
var _c;
__turbopack_context__.k.register(_c, "MasterDataPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_master-data_1xbgozi._.js.map