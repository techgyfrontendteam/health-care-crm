(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/providers/AuthProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const { isAuthenticated, isFirstLogin, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AuthProvider.useSelector": (state)=>state.auth
    }["AuthProvider.useSelector"]);
    const login = (token, refreshToken, isFirstLevel, userData)=>{
        if (userData.agent_id !== undefined && userData.agent_id !== null) {
            try {
                sessionStorage.setItem('agent_id', String(userData.agent_id));
            } catch (e) {
                console.error('Error saving agent_id to sessionStorage:', e);
            }
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCredentials"])({
            user: userData,
            token,
            refreshToken,
            isFirstLogin: isFirstLevel
        }));
    };
    const logout = ()=>{
        try {
            sessionStorage.removeItem('agent_id');
        } catch (e) {
            console.error('Error removing agent_id from sessionStorage:', e);
        }
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])());
    };
    const completePasswordSetup = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setPasswordSuccess"])());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            isAuthenticated,
            isFirstLogin,
            user,
            login,
            logout,
            completePasswordSetup
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers/AuthProvider.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "0wGNpgwF10Fi+0dxZ7cg0K6Eo/w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "px-6 py-2.5",
            sm: "h-9 rounded-lg px-4 text-xs",
            lg: "h-12 rounded-lg px-10 text-base",
            icon: "h-10 w-10"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 47,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover,
    "PopoverAnchor",
    ()=>PopoverAnchor,
    "PopoverContent",
    ()=>PopoverContent,
    "PopoverTrigger",
    ()=>PopoverTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-popover/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
;
;
;
const Popover = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const PopoverTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const PopoverAnchor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Anchor"];
const PopoverContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, align = "center", sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            align: align,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/popover.tsx",
            lineNumber: 17,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/popover.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = PopoverContent;
PopoverContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "PopoverContent$React.forwardRef");
__turbopack_context__.k.register(_c1, "PopoverContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/permissions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// All permission keys used throughout the CRM
__turbopack_context__.s([
    "PERMISSIONS",
    ()=>PERMISSIONS,
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS
]);
const PERMISSIONS = {
    // Leads
    LEAD_VIEW: 'lead.view',
    LEAD_CREATE: 'lead.create',
    LEAD_EDIT: 'lead.edit',
    LEAD_DELETE: 'lead.delete',
    LEAD_ASSIGN: 'lead.assign',
    LEAD_STATUS_UPDATE: 'lead.status.update',
    LEAD_SCHEDULE_VISIT: 'lead.schedule_visit',
    LEAD_BULK_ACTIONS: 'lead.bulk_actions',
    // Agents (EXPMNG)
    AGENT_VIEW: 'agent.view',
    AGENT_CREATE: 'agent.create',
    AGENT_EDIT: 'agent.edit',
    AGENT_DELETE: 'agent.delete',
    AGENT_ASSIGN: 'agent.assign',
    // Managers (RELMNG)
    MANAGER_VIEW: 'manager.view',
    MANAGER_CREATE: 'manager.create',
    MANAGER_EDIT: 'manager.edit',
    MANAGER_DELETE: 'manager.delete',
    MANAGER_ASSIGN: 'manager.assign',
    // Customers
    CUSTOMER_VIEW: 'customer.view',
    CUSTOMER_EDIT: 'customer.edit',
    // Followups
    FOLLOWUP_VIEW: 'followup.view',
    FOLLOWUP_CREATE: 'followup.create'
};
const ROLE_PERMISSIONS = {
    // SADMIN — Read-only overview
    SADMIN: [
        PERMISSIONS.LEAD_VIEW,
        PERMISSIONS.AGENT_VIEW,
        PERMISSIONS.MANAGER_VIEW,
        PERMISSIONS.CUSTOMER_VIEW,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ],
    // ADMIN — Full control
    ADMIN: [
        PERMISSIONS.LEAD_VIEW,
        PERMISSIONS.LEAD_CREATE,
        PERMISSIONS.LEAD_EDIT,
        PERMISSIONS.LEAD_DELETE,
        PERMISSIONS.LEAD_ASSIGN,
        PERMISSIONS.LEAD_STATUS_UPDATE,
        PERMISSIONS.LEAD_SCHEDULE_VISIT,
        PERMISSIONS.LEAD_BULK_ACTIONS,
        PERMISSIONS.AGENT_VIEW,
        PERMISSIONS.AGENT_CREATE,
        PERMISSIONS.AGENT_EDIT,
        PERMISSIONS.AGENT_DELETE,
        PERMISSIONS.AGENT_ASSIGN,
        PERMISSIONS.MANAGER_VIEW,
        PERMISSIONS.MANAGER_CREATE,
        PERMISSIONS.MANAGER_EDIT,
        PERMISSIONS.MANAGER_DELETE,
        PERMISSIONS.MANAGER_ASSIGN,
        PERMISSIONS.CUSTOMER_VIEW,
        PERMISSIONS.CUSTOMER_EDIT,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ],
    // RELMNG — Relationship Manager: controls agents, manages leads
    RELMNG: [
        PERMISSIONS.LEAD_VIEW,
        // PERMISSIONS.LEAD_CREATE,
        PERMISSIONS.LEAD_EDIT,
        PERMISSIONS.LEAD_ASSIGN,
        PERMISSIONS.LEAD_STATUS_UPDATE,
        PERMISSIONS.LEAD_BULK_ACTIONS,
        PERMISSIONS.LEAD_SCHEDULE_VISIT,
        PERMISSIONS.AGENT_VIEW,
        PERMISSIONS.AGENT_CREATE,
        PERMISSIONS.AGENT_EDIT,
        PERMISSIONS.AGENT_DELETE,
        PERMISSIONS.AGENT_ASSIGN,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ],
    // EXPMNG — Site Experience Manager (Agent): minimal access
    EXPMNG: [
        PERMISSIONS.LEAD_VIEW,
        PERMISSIONS.LEAD_EDIT,
        PERMISSIONS.LEAD_STATUS_UPDATE,
        PERMISSIONS.FOLLOWUP_VIEW,
        PERMISSIONS.FOLLOWUP_CREATE
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "logoutUser",
    ()=>logoutUser,
    "setCredentials",
    ()=>setCredentials,
    "setCurrentRole",
    ()=>setCurrentRole,
    "setPasswordSuccess",
    ()=>setPasswordSuccess,
    "setRoles",
    ()=>setRoles,
    "updateToken",
    ()=>updateToken,
    "updateUserProfile",
    ()=>updateUserProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)");
;
;
// Keys for localStorage
const STORAGE_KEYS = {
    USER: 'crm_user',
    TOKEN: 'crm_token',
    REFRESH_TOKEN: 'crm_refresh_token',
    ROLES: 'crm_roles',
    CURRENT_ROLE: 'crm_current_role',
    IS_FIRST_LOGIN: 'crm_is_first_login'
};
const initialState = {
    user: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.USER, null),
    token: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.TOKEN, null),
    refreshToken: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.REFRESH_TOKEN, null),
    roles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.ROLES, []),
    currentRole: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.CURRENT_ROLE, null),
    isAuthenticated: !!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.TOKEN, null),
    isFirstLogin: Boolean(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get(STORAGE_KEYS.IS_FIRST_LOGIN, false))
};
const authSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action)=>{
            const { user, token, refreshToken, isFirstLogin } = action.payload;
            state.user = user;
            state.token = token;
            state.refreshToken = refreshToken;
            state.isAuthenticated = true;
            state.isFirstLogin = !!isFirstLogin;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.USER, user);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.TOKEN, token);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.IS_FIRST_LOGIN, !!isFirstLogin);
        },
        updateUserProfile: (state, action)=>{
            if (state.user) {
                state.user = {
                    ...state.user,
                    ...action.payload
                };
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.USER, state.user);
            }
        },
        setRoles: (state, action)=>{
            state.roles = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.ROLES, action.payload);
            if (action.payload.length > 0) {
                const matchingRole = action.payload.find((r)=>r.id === state.user?.role_id);
                const roleToSet = matchingRole || action.payload[0];
                state.currentRole = roleToSet;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.CURRENT_ROLE, roleToSet);
            }
        },
        setCurrentRole: (state, action)=>{
            state.currentRole = action.payload;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.CURRENT_ROLE, action.payload);
        },
        updateToken: (state, action)=>{
            state.token = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.TOKEN, action.payload.token);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
        },
        setPasswordSuccess: (state)=>{
            state.isFirstLogin = false;
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].set(STORAGE_KEYS.IS_FIRST_LOGIN, false);
        },
        logoutUser: (state)=>{
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.roles = [];
            state.currentRole = null;
            state.isFirstLogin = false;
            // Clear ALL localStorage and sessionStorage
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].clear();
            try {
                sessionStorage.removeItem('agent_id');
            } catch (e) {
                console.error('Error clearing sessionStorage:', e);
            }
        }
    }
});
const { setCredentials, updateUserProfile, setRoles, setCurrentRole, updateToken, setPasswordSuccess, logoutUser } = authSlice.actions;
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/follow-ups/api/followUpsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "followUpsApi",
    ()=>followUpsApi,
    "useCreateFollowUpMutation",
    ()=>useCreateFollowUpMutation,
    "useGetAllFollowupsByUserIdQuery",
    ()=>useGetAllFollowupsByUserIdQuery,
    "useLazyGetAllFollowupsByUserIdQuery",
    ()=>useLazyGetAllFollowupsByUserIdQuery,
    "useUpdateFollowUpMutation",
    ()=>useUpdateFollowUpMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const followUpsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllFollowupsByUserId: builder.query({
                query: (body)=>({
                        url: '/leadFollowups/getAllFollowupsByUserId',
                        method: 'POST',
                        body
                    }),
                providesTags: [
                    'FollowUps'
                ]
            }),
            createFollowUp: builder.mutation({
                query: (body)=>({
                        url: '/leadFollowups/createFollowUp',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'FollowUps',
                    'Leads'
                ]
            }),
            updateFollowUp: builder.mutation({
                query: (body)=>({
                        url: '/leadFollowups/updateFollowup',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'FollowUps',
                    'Leads'
                ]
            })
        })
});
const { useGetAllFollowupsByUserIdQuery, useLazyGetAllFollowupsByUserIdQuery, useCreateFollowUpMutation, useUpdateFollowUpMutation } = followUpsApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/follow-ups/api/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$followUpsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/follow-ups/api/followUpsApi.ts [app-client] (ecmascript)");
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/follow-ups/pages/FollowUpsPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FollowUpsPage",
    ()=>FollowUpsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-router/dist/development/chunk-LFPYN7LY.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/providers/AuthProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/features/follow-ups/api/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$followUpsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/follow-ups/api/followUpsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)");
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
// Date utility functions
const getDaysInMonth = (year, month)=>{
    const date = new Date(year, month, 1);
    const days = [];
    let firstDayIndex = date.getDay();
    firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // Map Sunday to 6, Mon to 0
    const prevMonth = new Date(year, month, 0);
    const prevMonthDaysCount = prevMonth.getDate();
    for(let i = firstDayIndex - 1; i >= 0; i--){
        days.push({
            date: new Date(year, month - 1, prevMonthDaysCount - i),
            isCurrentMonth: false
        });
    }
    const currentMonthDaysCount = new Date(year, month + 1, 0).getDate();
    for(let i = 1; i <= currentMonthDaysCount; i++){
        days.push({
            date: new Date(year, month, i),
            isCurrentMonth: true
        });
    }
    const totalCells = days.length > 35 ? 42 : 35;
    const nextDaysCount = totalCells - days.length;
    for(let i = 1; i <= nextDaysCount; i++){
        days.push({
            date: new Date(year, month + 1, i),
            isCurrentMonth: false
        });
    }
    return days;
};
const isSameDay = (d1, d2)=>{
    if (!d1 || !d2) return false;
    return d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};
const isWithinRange = (d, start, end)=>{
    if (!start || !end) return false;
    const time = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const startTime = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
    const endTime = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
    return time >= startTime && time <= endTime;
};
const formatSelectedSpan = (start, end)=>{
    if (!start) return "Select Date";
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const startMonth = months[start.getMonth()];
    const startDay = start.getDate();
    const startYear = start.getFullYear();
    if (!end) return `${startMonth} ${startDay}, ${startYear}`;
    const endMonth = months[end.getMonth()];
    const endDay = end.getDate();
    const endYear = end.getFullYear();
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${endYear}`;
};
const formatApiDate = (d)=>{
    if (!d) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const formatShortDateSpan = (start, end)=>{
    if (!start) return "Select Date";
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const startMonth = months[start.getMonth()];
    const startDay = start.getDate();
    if (!end) return `${startMonth} ${startDay}`;
    const endMonth = months[end.getMonth()];
    const endDay = end.getDate();
    if (start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }
    return `${startMonth} ${startDay} - ${endDay}`;
};
const formatMonthYear = (date)=>{
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
};
const formatFollowUpDate = (dateString)=>{
    if (!dateString) return {
        date: '',
        time: ''
    };
    const safeDateString = dateString.endsWith('Z') ? dateString.slice(0, -1) : dateString;
    const d = new Date(safeDateString);
    if (isNaN(d.getTime())) return {
        date: safeDateString,
        time: ''
    };
    const day = d.getDate();
    const monthShort = d.toLocaleDateString('en-US', {
        month: 'short'
    });
    const year = d.getFullYear();
    // Calculate suffix
    let suffix = 'th';
    if (day === 1 || day === 21 || day === 31) suffix = 'st';
    else if (day === 2 || day === 22) suffix = 'nd';
    else if (day === 3 || day === 23) suffix = 'rd';
    const monthsMap = {
        'Jan': 'Jan',
        'Feb': 'Feb',
        'Mar': 'March',
        'Apr': 'Apr',
        'May': 'May',
        'Jun': 'Jun',
        'Jul': 'Jul',
        'Aug': 'Aug',
        'Sep': 'Sep',
        'Oct': 'Oct',
        'Nov': 'Nov',
        'Dec': 'Dec'
    };
    const displayMonth = monthsMap[monthShort] || monthShort;
    const timeStr = d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    const displayDay = displayMonth === 'March' ? `${day}${suffix}` : day < 10 ? `0${day}` : `${day}`;
    return {
        date: `${displayDay} ${displayMonth}, ${year}`,
        time: timeStr
    };
};
const FollowUpsPage = ()=>{
    _s();
    const location = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const navigate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { rms, ems, masterData: lookupMasterData, getRmLabel, getEmLabel } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"])();
    const { roleCode } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"])();
    const isRM = roleCode === 'RELMNG';
    const isEM = roleCode === 'EXPMNG';
    const isSalesAdmin = roleCode === 'SADMIN' || user?.role_id === 2 || user?.email && user.email.toLowerCase().includes("mahidhar");
    const isRoleScoped = isRM || isEM; // either role sees only their own follow-ups
    // API Mutations/Queries
    const [createFollowUpApi, { isLoading: isCreating }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$followUpsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateFollowUpMutation"])();
    // State
    const [followUps, setFollowUps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    // Tab State: "Scheduled" or "Completed" or "Missed"
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(location.state?.tab || "Scheduled");
    // Create Follow-up Modal State (General page version)
    const [isGeneralCreateModalOpen, setIsGeneralCreateModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedLeadUuid, setSelectedLeadUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [createFormDate, setCreateFormDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('2026-06-25');
    const [createFormTime, setCreateFormTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [createAmPm, setCreateAmPm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('AM');
    const [createPurpose, setCreatePurpose] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('1');
    const [createRemarks, setCreateRemarks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [createFormRm, setCreateFormRm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [createFormEm, setCreateFormEm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // Fetch leads to select one
    const { data: leadsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"])({
        offset: 0
    });
    const leads = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[leads]": ()=>Array.isArray(leadsData) ? leadsData : leadsData?.data || []
    }["FollowUpsPage.useMemo[leads]"], [
        leadsData
    ]);
    // Filters State
    const [selectedRmIds, setSelectedRmIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [hasInitializedRms, setHasInitializedRms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedEm, setSelectedEm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("All Sales Executives");
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const rmDropdownRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Initialize selectedRmIds with all Sales Head IDs on load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FollowUpsPage.useEffect": ()=>{
            if (rms.length > 0 && !hasInitializedRms) {
                setSelectedRmIds(rms.map({
                    "FollowUpsPage.useEffect": (r)=>Number(r.id)
                }["FollowUpsPage.useEffect"]));
                setHasInitializedRms(true);
            }
        }
    }["FollowUpsPage.useEffect"], [
        rms,
        hasInitializedRms
    ]);
    // Click outside to close RM dropdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FollowUpsPage.useEffect": ()=>{
            const handleClickOutside = {
                "FollowUpsPage.useEffect.handleClickOutside": (event)=>{
                    if (rmDropdownRef.current && !rmDropdownRef.current.contains(event.target)) {
                        setIsRmDropdownOpen(false);
                    }
                }
            }["FollowUpsPage.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "FollowUpsPage.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["FollowUpsPage.useEffect"];
        }
    }["FollowUpsPage.useEffect"], []);
    const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[today]": ()=>new Date()
    }["FollowUpsPage.useMemo[today]"], []);
    const next7Days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[next7Days]": ()=>{
            const d = new Date(today);
            d.setDate(d.getDate() + 7);
            return d;
        }
    }["FollowUpsPage.useMemo[next7Days]"], [
        today
    ]);
    const last7Days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[last7Days]": ()=>{
            const d = new Date(today);
            d.setDate(d.getDate() - 6);
            return d;
        }
    }["FollowUpsPage.useMemo[last7Days]"], [
        today
    ]);
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today);
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(next7Days);
    const [tempStartDate, setTempStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(today);
    const [tempEndDate, setTempEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(next7Days);
    const [activeMonth, setActiveMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date(today.getFullYear(), today.getMonth(), 1));
    const [quickSelect, setQuickSelect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Next 7 Days");
    const [appliedQuickSelect, setAppliedQuickSelect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Next 7 Days");
    const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[calendarDays]": ()=>{
            return getDaysInMonth(activeMonth.getFullYear(), activeMonth.getMonth());
        }
    }["FollowUpsPage.useMemo[calendarDays]"], [
        activeMonth
    ]);
    // Dropdown UI Open/Close States
    const [isRmDropdownOpen, setIsRmDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEmDropdownOpen, setIsEmDropdownOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isDateModalOpen, setIsDateModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Multi-select RM helpers
    const isAllRmsSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[isAllRmsSelected]": ()=>{
            return rms.length > 0 && selectedRmIds.length === rms.length;
        }
    }["FollowUpsPage.useMemo[isAllRmsSelected]"], [
        rms,
        selectedRmIds
    ]);
    const isPartialRmsSelected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[isPartialRmsSelected]": ()=>{
            return selectedRmIds.length > 0 && selectedRmIds.length < rms.length;
        }
    }["FollowUpsPage.useMemo[isPartialRmsSelected]"], [
        rms,
        selectedRmIds
    ]);
    const handleToggleSelectAllRms = ()=>{
        if (isAllRmsSelected) {
            setSelectedRmIds([]);
        } else {
            setSelectedRmIds(rms.map((r)=>Number(r.id)));
        }
    };
    const handleToggleRm = (rmId)=>{
        setSelectedRmIds((prev)=>prev.includes(rmId) ? prev.filter((id)=>id !== rmId) : [
                ...prev,
                rmId
            ]);
    };
    // Quick Complete Modal State
    const [isCompleteModalOpen, setIsCompleteModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [completingFollowUp, setCompletingFollowUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [outcomeNotes, setOutcomeNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [scheduleNextFollowUp, setScheduleNextFollowUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [nextFollowUpDate, setNextFollowUpDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [nextFollowUpTime, setNextFollowUpTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [nextFollowUpRemarks, setNextFollowUpRemarks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // UI Toast Notification State
    const [toastMessage, setToastMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const showToast = (message)=>{
        setToastMessage(message);
        setTimeout(()=>{
            setToastMessage(null);
        }, 3000);
    };
    // Helper: Get Lead Initials
    const getInitials = (name)=>{
        return name.split(" ").map((n)=>n[0]).join("").slice(0, 2).toUpperCase();
    };
    // Date Formatting Helper YYYY-MM-DD
    const formatDateISO = (date)=>{
        return date.toISOString().split("T")[0];
    };
    // Date filters are controlled directly by startDate and endDate states
    // The user IDs to query the API for
    const queryUserIds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[queryUserIds]": ()=>{
            // For role-scoped users (RM/EM), always use their own ID silently
            if (isRoleScoped && user?.id) return [
                Number(user.id)
            ];
            // When specific RM checkboxes are selected:
            if (selectedRmIds.length > 0) {
                return selectedRmIds;
            }
            // When initialized but all checkboxes unselected:
            if (hasInitializedRms && selectedRmIds.length === 0) {
                return [
                    0
                ];
            }
            // Default initial load before state hydration: send all RM IDs
            if (rms.length > 0) {
                return rms.map({
                    "FollowUpsPage.useMemo[queryUserIds]": (r)=>Number(r.id)
                }["FollowUpsPage.useMemo[queryUserIds]"]);
            }
            return [
                0
            ];
        }
    }["FollowUpsPage.useMemo[queryUserIds]"], [
        isRoleScoped,
        user,
        selectedRmIds,
        hasInitializedRms,
        rms
    ]);
    // Format API start and end dates from calendar selection
    const apiStartDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[apiStartDate]": ()=>formatApiDate(startDate) || "2026-09-08"
    }["FollowUpsPage.useMemo[apiStartDate]"], [
        startDate
    ]);
    const apiEndDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[apiEndDate]": ()=>formatApiDate(endDate) || "2026-09-08"
    }["FollowUpsPage.useMemo[apiEndDate]"], [
        endDate
    ]);
    // Followup status ID based on tab selection
    const activeFollowupStatusId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[activeFollowupStatusId]": ()=>{
            const statuses = lookupMasterData?.lead_followup_statuses;
            if (activeTab === "Scheduled") {
                const found = statuses?.find({
                    "FollowUpsPage.useMemo[activeFollowupStatusId]": (s)=>s.code === 'SCHDLD' || s.description?.toUpperCase().includes('SCHEDULE')
                }["FollowUpsPage.useMemo[activeFollowupStatusId]"]);
                return found ? Number(found.id) : 1;
            }
            if (activeTab === "Completed") {
                const found = statuses?.find({
                    "FollowUpsPage.useMemo[activeFollowupStatusId]": (s)=>s.code === 'CMPLTD' || s.description?.toUpperCase().includes('COMPLETE')
                }["FollowUpsPage.useMemo[activeFollowupStatusId]"]);
                return found ? Number(found.id) : 2;
            }
            if (activeTab === "Missed") {
                const found = statuses?.find({
                    "FollowUpsPage.useMemo[activeFollowupStatusId]": (s)=>s.code === 'MISSED' || s.description?.toUpperCase().includes('MISSED')
                }["FollowUpsPage.useMemo[activeFollowupStatusId]"]);
                return found ? Number(found.id) : 4;
            }
            return 0;
        }
    }["FollowUpsPage.useMemo[activeFollowupStatusId]"], [
        activeTab,
        lookupMasterData
    ]);
    const queryPayload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[queryPayload]": ()=>({
                user_id: queryUserIds,
                followup_status_id: activeFollowupStatusId,
                start_date: apiStartDate,
                end_date: apiEndDate,
                offset: 0
            })
    }["FollowUpsPage.useMemo[queryPayload]"], [
        queryUserIds,
        activeFollowupStatusId,
        apiStartDate,
        apiEndDate
    ]);
    // Fetch Follow-ups from API dynamically
    const { data: apiData, isLoading: isFollowupsLoading, isFetching: isFollowupsFetching, error: followupsError, refetch } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$followUpsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllFollowupsByUserIdQuery"])(queryPayload);
    // Log API request payload & response to console as requested
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FollowUpsPage.useEffect": ()=>{
            console.log("=== [API] getAllFollowupsByUserId ===");
            console.log("Request Payload:", queryPayload);
            console.log("Response Data:", apiData);
            if (followupsError) {
                console.error("API Error:", followupsError);
            }
        }
    }["FollowUpsPage.useEffect"], [
        apiData,
        followupsError,
        queryPayload
    ]);
    // Extract raw followups list from response
    const rawFollowupsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[rawFollowupsList]": ()=>{
            if (!apiData) return [];
            if (Array.isArray(apiData)) return apiData;
            if (Array.isArray(apiData.followups)) return apiData.followups;
            if (Array.isArray(apiData.data)) return apiData.data;
            if (Array.isArray(apiData.data?.followups)) return apiData.data.followups;
            return [];
        }
    }["FollowUpsPage.useMemo[rawFollowupsList]"], [
        apiData
    ]);
    // Map API response to UI follow-ups format
    const apiFollowUps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[apiFollowUps]": ()=>{
            if (!rawFollowupsList || rawFollowupsList.length === 0) return [];
            const mapped = rawFollowupsList.map({
                "FollowUpsPage.useMemo[apiFollowUps].mapped": (item, idx)=>{
                    const dateDetails = formatFollowUpDate(item.followup_date_time);
                    const statusObj = lookupMasterData?.lead_followup_statuses?.find({
                        "FollowUpsPage.useMemo[apiFollowUps].mapped": (s)=>s.id === item.followup_status_id
                    }["FollowUpsPage.useMemo[apiFollowUps].mapped"]);
                    let status = "Pending";
                    if (statusObj) {
                        const desc = statusObj.description.toUpperCase();
                        if (desc.includes("COMPLETED") || desc.includes("DONE")) status = "Completed";
                        else if (desc.includes("MISSED") || desc.includes("OVERDUE")) status = "Overdue";
                        else if (desc.includes("CANCEL")) status = "Cancelled";
                        else status = "Pending";
                    } else {
                        if (item.followup_status_id === 2) status = "Completed";
                        else if (item.followup_status_id === 3) status = "Cancelled";
                        else if (item.followup_status_id === 4) status = "Overdue";
                        else status = "Pending";
                    }
                    const typeObj = lookupMasterData?.lead_followup_types?.find({
                        "FollowUpsPage.useMemo[apiFollowUps].mapped": (t)=>t.id === item.follow_type_id
                    }["FollowUpsPage.useMemo[apiFollowUps].mapped"]);
                    let type = "Call";
                    if (typeObj) {
                        const desc = typeObj.description.toUpperCase();
                        if (desc.includes("WHATSAPP")) type = "WhatsApp";
                        else if (desc.includes("EMAIL")) type = "Email";
                        else if (desc.includes("SITE VISIT")) type = "Site Visit";
                    } else {
                        if (item.follow_type_id === 2) type = "WhatsApp";
                        else if (item.follow_type_id === 3) type = "Email";
                        else if (item.follow_type_id === 4) type = "Site Visit";
                    }
                    const fn = item.first_name ? item.first_name.charAt(0).toUpperCase() + item.first_name.slice(1) : "";
                    const ln = item.last_name ? item.last_name.charAt(0).toUpperCase() + item.last_name.slice(1) : "";
                    const leadName = `${fn} ${ln}`.trim() || "Lead Name";
                    return {
                        id: `api-${item.lead_uuid}-${idx}`,
                        leadId: item.lead_id ? item.lead_id.startsWith("#") ? item.lead_id : `#${item.lead_id}` : "Lead ID",
                        leadUuid: item.lead_uuid,
                        leadName,
                        leadPhone: "",
                        leadEmail: "",
                        projectName: "Planet Green",
                        type,
                        status,
                        scheduledAt: dateDetails.date,
                        scheduledTime: dateDetails.time,
                        rawDate: item.followup_date_time,
                        assignedRm: ({
                            "FollowUpsPage.useMemo[apiFollowUps].mapped": ()=>{
                                if (item.user_id) {
                                    const rmLabel = getRmLabel(Number(item.user_id));
                                    if (rmLabel !== '--') return rmLabel;
                                    const emLabel = getEmLabel(Number(item.user_id));
                                    if (emLabel !== '--') return emLabel;
                                }
                                if (queryUserIds.length === 1 && queryUserIds[0] !== 0) {
                                    const label = getRmLabel(queryUserIds[0]);
                                    if (label !== '--') return label;
                                }
                                return "Sales Executive";
                            }
                        })["FollowUpsPage.useMemo[apiFollowUps].mapped"](),
                        assignedEm: ({
                            "FollowUpsPage.useMemo[apiFollowUps].mapped": ()=>{
                                if (item.user_id) {
                                    const emLabel = getEmLabel(Number(item.user_id));
                                    if (emLabel !== '--') return emLabel;
                                }
                                return "";
                            }
                        })["FollowUpsPage.useMemo[apiFollowUps].mapped"](),
                        remarks: item.remarks || "No remarks provided.",
                        lastAction: "Retrieved from server"
                    };
                }
            }["FollowUpsPage.useMemo[apiFollowUps].mapped"]);
            // Sort descending by rawDate
            return mapped.sort({
                "FollowUpsPage.useMemo[apiFollowUps]": (a, b)=>{
                    const dateA = new Date(a.rawDate || 0).getTime();
                    const dateB = new Date(b.rawDate || 0).getTime();
                    return dateB - dateA;
                }
            }["FollowUpsPage.useMemo[apiFollowUps]"]);
        }
    }["FollowUpsPage.useMemo[apiFollowUps]"], [
        rawFollowupsList,
        getRmLabel,
        getEmLabel,
        queryUserIds,
        lookupMasterData
    ]);
    // Render backend data only.
    const mergedFollowUps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[mergedFollowUps]": ()=>{
            return apiFollowUps;
        }
    }["FollowUpsPage.useMemo[mergedFollowUps]"], [
        apiFollowUps
    ]);
    // Filter Data based on Search Query
    const filteredFollowUps = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[filteredFollowUps]": ()=>{
            return mergedFollowUps.filter({
                "FollowUpsPage.useMemo[filteredFollowUps]": (item)=>{
                    // Search Query (Lead Name, Lead ID, RM)
                    if (searchQuery.trim()) {
                        const query = searchQuery.toLowerCase();
                        const nameMatch = item.leadName.toLowerCase().includes(query);
                        const idMatch = item.leadId.toLowerCase().includes(query);
                        const rmMatch = item.assignedRm.toLowerCase().includes(query);
                        return nameMatch || idMatch || rmMatch;
                    }
                    return true;
                }
            }["FollowUpsPage.useMemo[filteredFollowUps]"]);
        }
    }["FollowUpsPage.useMemo[filteredFollowUps]"], [
        mergedFollowUps,
        searchQuery
    ]);
    // Date Modal Handlers
    const handleQuickSelect = (option)=>{
        setQuickSelect(option);
        if (option === "Today") {
            setTempStartDate(today);
            setTempEndDate(today);
        } else if (option === "Next 7 Days") {
            setTempStartDate(today);
            setTempEndDate(next7Days);
        } else if (option === "Last 7 Days") {
            setTempStartDate(last7Days);
            setTempEndDate(today);
        } else if (option === "This Month") {
            setTempStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
            setTempEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
        }
    };
    const handleDayClick = (date)=>{
        setQuickSelect("");
        if (!tempStartDate || tempStartDate && tempEndDate) {
            setTempStartDate(date);
            setTempEndDate(null);
        } else {
            if (date < tempStartDate) {
                setTempStartDate(date);
            } else {
                setTempEndDate(date);
            }
        }
    };
    const prevMonth = ()=>{
        setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1));
    };
    const nextMonth = ()=>{
        setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1));
    };
    const handleApplyDateRange = ()=>{
        if (tempStartDate && tempEndDate) {
            setStartDate(tempStartDate);
            setEndDate(tempEndDate);
        } else if (tempStartDate) {
            setStartDate(tempStartDate);
            setEndDate(tempStartDate);
        }
        setAppliedQuickSelect(quickSelect);
        setIsDateModalOpen(false);
        showToast("Date range filter applied successfully!");
    };
    const handleClearDates = ()=>{
        setTempStartDate(last7Days);
        setTempEndDate(today);
        setQuickSelect("Last 7 Days");
    };
    // Open Log Outcome Modal
    const openCompleteModal = (item)=>{
        setCompletingFollowUp(item);
        setOutcomeNotes("");
        setScheduleNextFollowUp(false);
        // Default to tomorrow in YYYY-MM-DD format
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split("T")[0];
        setNextFollowUpDate(tomorrowStr);
        setNextFollowUpTime("10:00");
        setNextFollowUpRemarks("");
        setIsCompleteModalOpen(true);
    };
    // Save Outcome & Complete Call
    const handleCompleteSubmit = (e)=>{
        e.preventDefault();
        if (!outcomeNotes.trim()) {
            showToast("Please enter outcome notes.");
            return;
        }
        if (!completingFollowUp) return;
        let updatedList = followUps.map((item)=>item.id === completingFollowUp.id ? {
                ...item,
                status: "Completed",
                outcome: outcomeNotes.trim(),
                lastAction: `Completed call - ${outcomeNotes.substring(0, 30)}...`
            } : item);
        if (scheduleNextFollowUp && nextFollowUpDate) {
            // Build ISO Date Time
            const isoDateTime = `${nextFollowUpDate}T${nextFollowUpTime || "12:00"}:00.000Z`;
            createFollowUpApi({
                lead_uuid: completingFollowUp.leadUuid || "string",
                user_id: parseInt(user?.id || "0"),
                followup_type_id: 1,
                followup_date_time: isoDateTime,
                followup_status_id: 0,
                remarks: nextFollowUpRemarks.trim() || "Follow up after previous outcome."
            }).unwrap().then(()=>{
                showToast("Subsequent follow-up successfully scheduled on server.");
                refetch();
            }).catch((err)=>{
                console.error("Failed to create follow up:", err);
                showToast("Scheduled locally (server returned an error).");
            });
            const nextId = `fu-${Date.now()}`;
            const newFollowUp = {
                id: nextId,
                leadId: completingFollowUp.leadId,
                leadUuid: completingFollowUp.leadUuid,
                leadName: completingFollowUp.leadName,
                leadPhone: completingFollowUp.leadPhone,
                leadEmail: completingFollowUp.leadEmail,
                projectName: completingFollowUp.projectName,
                type: "Call",
                status: "Pending",
                scheduledAt: new Date(isoDateTime).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }),
                scheduledTime: new Date(isoDateTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true
                }),
                assignedRm: completingFollowUp.assignedRm,
                assignedEm: completingFollowUp.assignedEm,
                remarks: nextFollowUpRemarks.trim() || "Follow up after previous outcome.",
                lastAction: "Scheduled subsequent call"
            };
            updatedList = [
                newFollowUp,
                ...updatedList
            ];
        }
        setFollowUps(updatedList);
        setIsCompleteModalOpen(false);
        setCompletingFollowUp(null);
        showToast("Follow-up marked as completed.");
    };
    const handleGeneralCreateSubmit = async (e)=>{
        e.preventDefault();
        if (!selectedLeadUuid) {
            showToast("Please select a lead.");
            return;
        }
        try {
            const selectedLead = leads.find((l)=>l.uuid === selectedLeadUuid);
            // Parse custom 12-hour time if provided
            let formattedTime = '00:00:00';
            if (createFormTime) {
                let [hours, minutes] = createFormTime.split(':');
                let h = parseInt(hours || '0', 10);
                if (createAmPm === 'PM' && h < 12) h += 12;
                if (createAmPm === 'AM' && h === 12) h = 0;
                formattedTime = `${String(h).padStart(2, '0')}:${minutes || '00'}:00`;
            }
            const followup_date_time = `${createFormDate} ${formattedTime}`;
            await createFollowUpApi({
                lead_uuid: selectedLeadUuid,
                user_id: selectedLead?.assigned_to_rm || Number(user?.id) || 1,
                followup_type_id: Number(createPurpose),
                followup_date_time,
                followup_status_id: 1,
                remarks: createRemarks.trim() || lookupMasterData?.lead_followup_types?.find((t)=>t.id === Number(createPurpose))?.description || "Scheduled follow-up"
            }).unwrap();
            setIsGeneralCreateModalOpen(false);
            setSelectedLeadUuid("");
            setCreateRemarks("");
            showToast("Follow-up successfully created.");
            refetch();
        } catch (err) {
            console.error("Failed to create follow-up:", err);
            showToast("Failed to create follow-up.");
        }
    };
    // Dynamic Options lists
    const relationshipManagers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[relationshipManagers]": ()=>{
            const list = rms.map({
                "FollowUpsPage.useMemo[relationshipManagers].list": (r)=>`${r.first_name} ${r.last_name}`.trim()
            }["FollowUpsPage.useMemo[relationshipManagers].list"]);
            return [
                "All Sales Executives",
                ...list
            ];
        }
    }["FollowUpsPage.useMemo[relationshipManagers]"], [
        rms
    ]);
    const experienceManagers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FollowUpsPage.useMemo[experienceManagers]": ()=>{
            const list = (ems || []).map({
                "FollowUpsPage.useMemo[experienceManagers].list": (e)=>`${e.first_name} ${e.last_name}`.trim()
            }["FollowUpsPage.useMemo[experienceManagers].list"]);
            return [
                "All Sales Executives",
                ...list
            ];
        }
    }["FollowUpsPage.useMemo[experienceManagers]"], [
        ems
    ]);
    // Date range filter options
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full max-w-[1440px] xl:max-w-[1920px] mx-auto px-6 py-8 space-y-6 animate-in fade-in duration-300 relative text-slate-800",
        children: [
            toastMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-20 right-6 bg-[#0022ff] text-white px-5 py-3.5 rounded-md shadow-xl z-50 flex items-center gap-3 animate-in slide-in-from-top duration-300 font-bold text-xs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "w-4 h-4 text-emerald-400 shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 708,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: toastMessage
                    }, void 0, false, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 707,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-bold text-[#0022ff] tracking-tight",
                                children: "Followups"
                            }, void 0, false, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 716,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-400 font-medium",
                                children: "Track and manage lead follow-ups efficiently."
                            }, void 0, false, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 717,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 715,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            const todayStr = new Date().toISOString().split('T')[0];
                            setCreateFormDate(todayStr);
                            setIsGeneralCreateModalOpen(true);
                        },
                        className: "flex items-center gap-2 bg-[#0022ff] hover:bg-[#001bd1] text-white text-xs font-semibold px-5 py-2.5 rounded-md transition-colors shadow-sm self-start sm:self-auto cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 727,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            "Create Follow-Up"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 719,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 714,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-6",
                        children: [
                            !isRoleScoped && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative",
                                    ref: rmDropdownRef,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider",
                                            children: "SALES EXECUTIVE"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 739,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>{
                                                setIsRmDropdownOpen(!isRmDropdownOpen);
                                                setIsEmDropdownOpen(false);
                                            },
                                            className: "flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-sm cursor-pointer min-w-[170px] min-h-[42px] justify-between focus:outline-none focus:border-[#0022ff] focus:ring-2 focus:ring-[#0022ff]/10",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "truncate max-w-[125px]",
                                                    children: selectedRmIds.length === 0 ? "None Selected" : isAllRmsSelected ? "All Sales Executives" : selectedRmIds.length === 1 ? `${rms.find((r)=>Number(r.id) === selectedRmIds[0])?.first_name || ""} ${rms.find((r)=>Number(r.id) === selectedRmIds[0])?.last_name || ""}`.trim() : `${selectedRmIds.length} Selected`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 750,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5 shrink-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm bg-blue-50 text-[#0022ff]",
                                                            children: [
                                                                selectedRmIds.length,
                                                                "/",
                                                                rms.length
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 760,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                            className: "w-3.5 h-3.5 text-slate-500 ml-1 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 763,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 759,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 742,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        isRmDropdownOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute left-0 mt-2 w-64 max-h-72 overflow-y-auto scrollbar-thin bg-white border border-slate-100 rounded-2xl shadow-xl p-2 z-30 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: handleToggleSelectAllRms,
                                                    className: "flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold text-[#0022ff] hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-100 pb-2.5 mb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: `w-4 h-4 rounded-md border flex items-center justify-center transition-all ${isAllRmsSelected ? "bg-[#0022ff] border-[#0022ff] text-white" : isPartialRmsSelected ? "bg-blue-100 border-[#0022ff] text-[#0022ff]" : "border-slate-300 bg-white"}`,
                                                                    children: [
                                                                        isAllRmsSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: "w-3 h-3 stroke-[3]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                            lineNumber: 784,
                                                                            columnNumber: 48
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        isPartialRmsSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                            className: "w-3 h-3 stroke-[3]"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                            lineNumber: 785,
                                                                            columnNumber: 52
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                    lineNumber: 775,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Select All Sales Executives"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                    lineNumber: 787,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 774,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[10px] text-slate-400 font-semibold",
                                                            children: rms.length
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 789,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 770,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                rms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "px-3.5 py-4 text-center text-xs text-slate-400 font-medium",
                                                    children: "No Sales Executives found"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 794,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)) : rms.map((rm)=>{
                                                    const rmId = Number(rm.id);
                                                    const isSelected = selectedRmIds.includes(rmId);
                                                    const fullName = `${rm.first_name || ""} ${rm.last_name || ""}`.trim() || "Sales Executive";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        onClick: ()=>handleToggleRm(rmId),
                                                        className: "flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer select-none",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${isSelected ? "bg-[#0022ff] border-[#0022ff] text-white" : "border-slate-300 bg-white"}`,
                                                                children: isSelected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "w-3 h-3 stroke-[3]"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                    lineNumber: 815,
                                                                    columnNumber: 46
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 808,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0",
                                                                children: getInitials(fullName)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 817,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate flex-1 text-slate-800",
                                                                children: fullName
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 820,
                                                                columnNumber: 29
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, rmId, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 803,
                                                        columnNumber: 27
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 768,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 738,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 737,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider",
                                        children: "SELECT DATE RANGE"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 868,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setTempStartDate(startDate);
                                            setTempEndDate(endDate);
                                            setQuickSelect(appliedQuickSelect);
                                            setIsDateModalOpen(true);
                                        },
                                        className: "flex items-center gap-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-md text-xs font-semibold text-slate-700 shadow-sm transition-colors cursor-pointer min-w-[160px] min-h-[38px] focus:outline-none focus:border-[#0022ff] focus:ring-2 focus:ring-[#0022ff]/10",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                className: "w-4 h-4 text-slate-400 shrink-0"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 880,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: appliedQuickSelect ? appliedQuickSelect : formatShortDateSpan(startDate, endDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 881,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 871,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 867,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 734,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-[#eef2f6] p-1 rounded-md flex items-center shrink-0 self-end md:self-auto shadow-sm border border-slate-100",
                        children: [
                            "Scheduled",
                            "Completed",
                            "Missed"
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab(tab),
                                className: `px-6 py-2 rounded-sm text-xs font-extrabold transition-all cursor-pointer ${activeTab === tab ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-650"}`,
                                children: tab
                            }, tab, false, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 889,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 887,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 733,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative w-full pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                        className: "absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    }, void 0, false, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 905,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Search leads.....",
                        value: searchQuery,
                        onChange: (e)=>setSearchQuery(e.target.value),
                        className: "pl-13 pr-6 py-3 w-full rounded-md border border-slate-200/80 bg-white text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0022ff] placeholder-slate-400 shadow-sm transition-all"
                    }, void 0, false, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 906,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 904,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4 pt-2",
                children: isFollowupsLoading && apiFollowUps.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-slate-200/80 rounded-[20px] p-12 text-center text-xs font-semibold text-slate-500 shadow-xs flex flex-col items-center justify-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-7 h-7 border-3 border-[#0022ff] border-t-transparent rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 919,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Fetching follow-ups from server..."
                        }, void 0, false, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 920,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                    lineNumber: 918,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : filteredFollowUps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white border border-dashed border-slate-200 rounded-[20px] p-12 text-center text-xs font-bold text-slate-400 shadow-sm flex flex-col items-center justify-center gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                "No ",
                                activeTab.toLowerCase(),
                                " follow-ups found for your selection."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 924,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>{
                                const todayStr = new Date().toISOString().split('T')[0];
                                setCreateFormDate(todayStr);
                                setIsGeneralCreateModalOpen(true);
                            },
                            className: "flex items-center gap-1.5 bg-[#0022ff] hover:bg-[#001bd1] text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors cursor-pointer shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "w-3.5 h-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 933,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Create Follow-Up"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 925,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                    lineNumber: 923,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : filteredFollowUps.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white border border-[#e2e8f0] rounded-[24px] shadow-[0px_1px_3px_rgba(0,0,0,0.05)] p-5 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-md transition-shadow",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-14 h-14 rounded-[20px] flex items-center justify-center font-bold text-[16px] bg-[#f8f9fa] text-[#0022ff] shrink-0 border border-blue-50/50 shadow-sm",
                                        children: getInitials(item.leadName)
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 946,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-['Plus_Jakarta_Sans'] font-bold text-[16px] leading-[24px] text-[#0022ff]",
                                                        children: item.leadName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 953,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[12px] text-[#64748B] font-medium",
                                                        children: [
                                                            "• ",
                                                            item.leadId
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 956,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 952,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-xs text-[#64748B] font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 964,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            item.scheduledAt
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 963,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 967,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 969,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            item.scheduledTime
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 968,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 962,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-[#64748B] font-medium pt-0.5",
                                                children: item.assignedEm || item.assignedRm || "Sales Executive"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 975,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 951,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 944,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100",
                                children: [
                                    activeTab !== "Completed" ? isRM || isSalesAdmin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-400 font-bold text-[11px] uppercase tracking-wider cursor-default",
                                        children: "POST CALL FOLLOW UP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 985,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>openCompleteModal(item),
                                        className: "text-[#0022ff] hover:underline font-bold text-[11px] uppercase tracking-wider transition-colors cursor-pointer",
                                        children: "POST CALL FOLLOW UP"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 989,
                                        columnNumber: 21
                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-emerald-600 bg-emerald-55 font-bold text-[11px] uppercase tracking-wider cursor-default",
                                        children: "COMPLETED"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 997,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            // Navigate to details if uuid is present, or fallback
                                            if (item.leadUuid) {
                                                navigate(`/leads/${item.leadUuid}?tab=followups`);
                                            } else {
                                                navigate(`/leads`);
                                            }
                                        },
                                        className: "bg-[#0022ff] text-white text-xs font-semibold px-6 py-2.5 rounded-md hover:bg-[#001bd1] transition-colors shadow-md",
                                        children: "View Lead"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1002,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 982,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 939,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 916,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isCompleteModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-[24px] border border-slate-100 w-full max-w-xl p-6 shadow-2xl relative space-y-6 mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between border-b border-slate-50 pb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-base font-extrabold text-[#0022ff]",
                                            children: "Log Interaction Outcome"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1028,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[11px] text-slate-400 mt-0.5 font-medium",
                                            children: [
                                                "Log the results for lead: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-extrabold text-[#0022ff]",
                                                    children: completingFollowUp?.leadName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1032,
                                                    columnNumber: 45
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                " (",
                                                completingFollowUp?.leadId,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1031,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1027,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsCompleteModalOpen(false),
                                    className: "text-slate-400 hover:text-slate-600 cursor-pointer",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1039,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 1026,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleCompleteSubmit,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-[10px] font-bold text-slate-450 tracking-wider uppercase",
                                            children: "INTERACTION OUTCOME / NOTES *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            required: true,
                                            placeholder: "Detail the discussion points, client feedback, or outcome summary...",
                                            value: outcomeNotes,
                                            onChange: (e)=>setOutcomeNotes(e.target.value),
                                            rows: 3,
                                            className: "w-full px-4 py-3 rounded-2xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0022ff] resize-none"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1050,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1046,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-[#f8f9fa] p-4 rounded-2xl border border-slate-200/50 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "flex items-center gap-3 cursor-pointer select-none",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "checkbox",
                                                    checked: scheduleNextFollowUp,
                                                    onChange: (e)=>setScheduleNextFollowUp(e.target.checked),
                                                    className: "w-4 h-4 rounded text-[#0022ff] focus:ring-[#0022ff] border-slate-300"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1063,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-black text-slate-700",
                                                            children: "Schedule next follow-up action?"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1070,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-slate-400 mt-0.5 font-semibold",
                                                            children: "Automatically schedules the next communication touch for this lead."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1073,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1069,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1062,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        scheduleNextFollowUp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200/60 animate-in slide-in-from-top-2 duration-250",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold text-slate-400 tracking-wider uppercase",
                                                            children: "NEXT SCHEDULE DATE"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1083,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                            value: nextFollowUpDate,
                                                            onChange: (val)=>setNextFollowUpDate(val),
                                                            disablePastDates: true,
                                                            placeholder: "Select date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1086,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1082,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold text-slate-400 tracking-wider uppercase",
                                                            children: "NEXT SCHEDULE TIME"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1096,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePicker"], {
                                                            value: nextFollowUpTime,
                                                            onChange: (val)=>setNextFollowUpTime(val),
                                                            placeholder: "Select time"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1099,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1095,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1 col-span-1 md:col-span-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "text-[10px] font-bold text-slate-400 tracking-wider uppercase",
                                                            children: "NEXT OBJECTIVE / INSTRUCTIONS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1108,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                            placeholder: "What needs to be discussed next?",
                                                            value: nextFollowUpRemarks,
                                                            onChange: (e)=>setNextFollowUpRemarks(e.target.value),
                                                            rows: 2,
                                                            className: "w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#0022ff] resize-none"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1111,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1080,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1061,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-end gap-3 pt-4 border-t border-slate-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setIsCompleteModalOpen(false),
                                            className: "px-5 py-2.5 text-xs font-extrabold text-slate-500 hover:text-slate-700 cursor-pointer",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1125,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            className: "bg-[#0022ff] hover:bg-[#001bd1] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-md",
                                            children: "Save Outcome & Complete"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1132,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1124,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 1044,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                    lineNumber: 1024,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 1023,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isGeneralCreateModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0",
                        onClick: ()=>setIsGeneralCreateModalOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 1147,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative bg-white w-full max-w-[500px] mx-4 rounded-[20px] shadow-2xl p-6 md:p-8 flex flex-col gap-5 animate-in zoom-in-95 duration-200",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between pb-4 border-b border-slate-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-['Plus_Jakarta_Sans'] font-extrabold text-[18px] text-[#0022ff]",
                                        children: "Create a new follow-up"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1152,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setIsGeneralCreateModalOpen(false),
                                        className: "text-slate-400 hover:text-slate-600 transition-colors cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1160,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1155,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 1151,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleGeneralCreateSubmit,
                                className: "flex flex-col gap-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-semibold text-slate-600",
                                                children: "Select Lead"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1168,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                        className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1170,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                        required: true,
                                                        value: selectedLeadUuid,
                                                        onChange: (e)=>setSelectedLeadUuid(e.target.value),
                                                        className: "w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0022ff] appearance-none cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                value: "",
                                                                disabled: true,
                                                                children: "Search and select lead..."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1177,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            leads.map((l)=>{
                                                                const fn = l.first_name || "";
                                                                const ln = l.last_name || "";
                                                                const leadName = `${fn} ${ln}`.trim() || "Lead Name";
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: l.uuid,
                                                                    children: [
                                                                        leadName,
                                                                        " (",
                                                                        l.lead_id || `#LD-${l.id}`,
                                                                        ")"
                                                                    ]
                                                                }, l.uuid, true, {
                                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                    lineNumber: 1183,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1171,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                        className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1189,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1169,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1167,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold text-slate-600",
                                                        children: "Sales Executive"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1196,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: createFormRm,
                                                                onChange: (e)=>setCreateFormRm(e.target.value),
                                                                className: "w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0022ff] appearance-none cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select Sales Executive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                        lineNumber: 1203,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    rms.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: r.id,
                                                                            children: [
                                                                                r.first_name,
                                                                                " ",
                                                                                r.last_name
                                                                            ]
                                                                        }, r.id, true, {
                                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                            lineNumber: 1205,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1198,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1208,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1197,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1195,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold text-slate-600",
                                                        children: "Sales Executive"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1212,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                value: createFormEm,
                                                                onChange: (e)=>setCreateFormEm(e.target.value),
                                                                className: "w-full pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-200 bg-[#f8f9fa] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0022ff] appearance-none cursor-pointer",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        value: "",
                                                                        children: "Select Sales Executive"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                        lineNumber: 1219,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    ems.map((e)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: e.id,
                                                                            children: [
                                                                                e.first_name,
                                                                                " ",
                                                                                e.last_name
                                                                            ]
                                                                        }, e.id, true, {
                                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                            lineNumber: 1221,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1214,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                                                className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1224,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1213,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1211,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1194,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold text-slate-600",
                                                        children: "Follow-up Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1232,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                        value: createFormDate,
                                                        onChange: (val)=>setCreateFormDate(val),
                                                        disablePastDates: true,
                                                        placeholder: "Select date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1233,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1231,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-xs font-semibold text-slate-600",
                                                        children: "Follow-up Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1241,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePicker"], {
                                                        value: createFormTime ? `${createFormTime} ${createAmPm}` : "",
                                                        outputFormat: "12h",
                                                        placeholder: "Select time",
                                                        onChange: (val)=>{
                                                            if (!val) {
                                                                setCreateFormTime("");
                                                                return;
                                                            }
                                                            const parts = val.split(" ");
                                                            setCreateFormTime(parts[0] || "");
                                                            if (parts[1]) {
                                                                setCreateAmPm(parts[1]);
                                                            }
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                        lineNumber: 1242,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1240,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1230,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "text-xs font-semibold text-slate-600",
                                                children: "Follow-up Purpose"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1263,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                required: true,
                                                rows: 4,
                                                placeholder: "Briefly describe the objective...",
                                                value: createRemarks,
                                                onChange: (e)=>setCreateRemarks(e.target.value),
                                                className: "w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-[#f8f9fa] text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0022ff] resize-none"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                lineNumber: 1264,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1262,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: isCreating,
                                            className: "w-full bg-[#0022ff] text-white text-sm font-bold py-3.5 rounded-xl hover:bg-[#001bd1] transition-all disabled:opacity-50 cursor-pointer shadow-md",
                                            children: isCreating ? 'Scheduling...' : 'Create follow-up'
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1276,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1275,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                lineNumber: 1165,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                        lineNumber: 1149,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 1146,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            isDateModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white dark:bg-zinc-950 w-full max-w-[680px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col border border-zinc-150 dark:border-zinc-800/80 animate-in zoom-in-95 duration-200",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-8 py-6 border-b border-zinc-100 dark:border-zinc-850",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-xl font-bold text-slate-800 dark:text-zinc-100",
                                    children: "Select Date Range"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1294,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setIsDateModalOpen(false),
                                    className: "p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-850 text-slate-400 dark:text-zinc-500 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                        lineNumber: 1299,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1295,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 1293,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-1 min-h-[320px]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-[220px] border-r border-zinc-100 dark:border-zinc-850 p-5 bg-zinc-50/50 dark:bg-zinc-900/30 flex flex-col justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "w-full flex items-center gap-2.5 px-4 py-3 bg-[#0022ff] text-white rounded-xl text-sm font-semibold shadow-sm transition-all duration-200",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                                            className: "w-4 h-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1309,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "Date Range"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1308,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-2",
                                                            children: "QUICK SELECTS"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1314,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "space-y-1",
                                                            children: [
                                                                "Today",
                                                                "Last 7 Days",
                                                                "This Month"
                                                            ].map((opt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>handleQuickSelect(opt),
                                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("w-full text-left px-3 py-2 rounded-lg text-xs font-bold transition-all duration-150", quickSelect === opt ? "bg-slate-50 text-slate-850 border border-zinc-150 dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-700" : "text-slate-500 hover:text-slate-800 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:text-zinc-200 dark:hover:bg-zinc-800/40"),
                                                                    children: opt
                                                                }, opt, false, {
                                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                    lineNumber: 1319,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1317,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1313,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1307,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "border-t border-zinc-150 dark:border-zinc-800 pt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-zinc-500 px-2 mb-1",
                                                    children: "SELECTED SPAN"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1337,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "block text-xs font-extrabold text-[#0022ff] dark:text-blue-400 px-2",
                                                    children: formatSelectedSpan(tempStartDate, tempEndDate)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1340,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1336,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1306,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 p-6 flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4 px-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-bold text-slate-800 dark:text-zinc-200",
                                                    children: formatMonthYear(activeMonth)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1350,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: prevMonth,
                                                            className: "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1358,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1354,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: nextMonth,
                                                            className: "p-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                                lineNumber: 1364,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1360,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1353,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1349,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-7 gap-y-2 text-center mb-2",
                                            children: [
                                                "MO",
                                                "TU",
                                                "WE",
                                                "TH",
                                                "FR",
                                                "SA",
                                                "SU"
                                            ].map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-extrabold text-slate-400 dark:text-zinc-500 tracking-wider",
                                                    children: day
                                                }, day, false, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1372,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1370,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-7 gap-y-1 text-center",
                                            children: calendarDays.map(({ date, isCurrentMonth }, idx)=>{
                                                const isFuture = new Date(date.getFullYear(), date.getMonth(), date.getDate()) > new Date(today.getFullYear(), today.getMonth(), today.getDate());
                                                const isSelectedStart = isSameDay(date, tempStartDate);
                                                const isSelectedEnd = isSameDay(date, tempEndDate);
                                                const isInRange = isWithinRange(date, tempStartDate, tempEndDate);
                                                let bgClass = "";
                                                if (isSelectedStart && tempEndDate && !isSelectedEnd) {
                                                    bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-l-full";
                                                } else if (isSelectedEnd && tempStartDate && !isSelectedStart) {
                                                    bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20 rounded-r-full";
                                                } else if (isInRange) {
                                                    bgClass = "bg-[#f4f7fb] dark:bg-blue-950/20";
                                                }
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    onClick: ()=>handleDayClick(date),
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative py-2 text-xs font-bold select-none flex items-center justify-center transition-all duration-150 cursor-pointer", isCurrentMonth ? "text-slate-800 dark:text-zinc-200" : "text-slate-300 dark:text-zinc-600/60", bgClass),
                                                    children: [
                                                        (isSelectedStart || isSelectedEnd) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute inset-0 m-auto w-8 h-8 rounded-full bg-[#0022ff] dark:bg-[#0022ff] z-0 shadow-sm animate-in zoom-in-75 duration-150"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1407,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative z-10", (isSelectedStart || isSelectedEnd) && "text-white font-bold"),
                                                            children: date.getDate()
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                            lineNumber: 1409,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                                    lineNumber: 1396,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1379,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1347,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 1304,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between px-8 py-5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-850",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClearDates,
                                    className: "text-sm font-extrabold text-slate-500 hover:text-slate-850 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors",
                                    children: "Clear Filters"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1424,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsDateModalOpen(false),
                                            className: "px-6 py-2.5 rounded-md border border-zinc-200 dark:border-zinc-750 text-sm font-bold text-slate-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850 transition-colors",
                                            children: "Dismiss"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1431,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleApplyDateRange,
                                            className: "px-6 py-2.5 bg-[#0022ff] hover:bg-[#001bd1] text-white rounded-md text-sm font-bold shadow-md transition-colors animate-in fade-in duration-200",
                                            children: "Apply Selection"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                            lineNumber: 1437,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                                    lineNumber: 1430,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                            lineNumber: 1423,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                    lineNumber: 1291,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
                lineNumber: 1290,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/follow-ups/pages/FollowUpsPage.tsx",
        lineNumber: 703,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(FollowUpsPage, "nff+A5OYsyphu3EhURTN4WLqChA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$LFPYN7LY$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNavigate"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$providers$2f$AuthProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$useMasterDataLookup$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMasterDataLookup"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$hooks$2f$usePermissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePermissions"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$followUpsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateFollowUpMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$follow$2d$ups$2f$api$2f$followUpsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllFollowupsByUserIdQuery"]
    ];
});
_c = FollowUpsPage;
var _c;
__turbopack_context__.k.register(_c, "FollowUpsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "leadsApi",
    ()=>leadsApi,
    "useAddLeadActivityMutation",
    ()=>useAddLeadActivityMutation,
    "useBulkAssignLeadsToEmMutation",
    ()=>useBulkAssignLeadsToEmMutation,
    "useBulkAssignLeadsToRmMutation",
    ()=>useBulkAssignLeadsToRmMutation,
    "useBulkImportLeadsMutation",
    ()=>useBulkImportLeadsMutation,
    "useCreateLeadConsolidatedCallSummaryMutation",
    ()=>useCreateLeadConsolidatedCallSummaryMutation,
    "useCreateLeadMutation",
    ()=>useCreateLeadMutation,
    "useCreateLeadNextBestActionsMutation",
    ()=>useCreateLeadNextBestActionsMutation,
    "useCreateLeadProjectScoreMutation",
    ()=>useCreateLeadProjectScoreMutation,
    "useCreateSurgeryMutation",
    ()=>useCreateSurgeryMutation,
    "useDeleteLeadMutation",
    ()=>useDeleteLeadMutation,
    "useDeleteLeadProjectScoreByIdMutation",
    ()=>useDeleteLeadProjectScoreByIdMutation,
    "useDeleteLeadProjectScoresByLeadMutation",
    ()=>useDeleteLeadProjectScoresByLeadMutation,
    "useGetAllProjectEmAndRmDataQuery",
    ()=>useGetAllProjectEmAndRmDataQuery,
    "useGetEmLeadsByRmIdQuery",
    ()=>useGetEmLeadsByRmIdQuery,
    "useGetLeadByIdQuery",
    ()=>useGetLeadByIdQuery,
    "useGetLeadDetailsByLeadUuidQuery",
    ()=>useGetLeadDetailsByLeadUuidQuery,
    "useGetLeadDetailsByPhoneNumberQuery",
    ()=>useGetLeadDetailsByPhoneNumberQuery,
    "useGetLeadObjectionDetailsAndChecklistQuery",
    ()=>useGetLeadObjectionDetailsAndChecklistQuery,
    "useGetLeadProjectScoresByLeadQuery",
    ()=>useGetLeadProjectScoresByLeadQuery,
    "useGetLeadStatsByUserIdQuery",
    ()=>useGetLeadStatsByUserIdQuery,
    "useGetLeadsAndObjectionsByCustomerIdQuery",
    ()=>useGetLeadsAndObjectionsByCustomerIdQuery,
    "useGetLeadsByCustomerUuidQuery",
    ()=>useGetLeadsByCustomerUuidQuery,
    "useGetLeadsByEmIdQuery",
    ()=>useGetLeadsByEmIdQuery,
    "useGetLeadsByRmIdQuery",
    ()=>useGetLeadsByRmIdQuery,
    "useGetLeadsQuery",
    ()=>useGetLeadsQuery,
    "useGetSurgeriesByLeadUuidQuery",
    ()=>useGetSurgeriesByLeadUuidQuery,
    "useGetVisitsByUserIdQuery",
    ()=>useGetVisitsByUserIdQuery,
    "useLazyGetLeadByIdQuery",
    ()=>useLazyGetLeadByIdQuery,
    "useLazyGetLeadsQuery",
    ()=>useLazyGetLeadsQuery,
    "useLazyGetSurgeriesByLeadUuidQuery",
    ()=>useLazyGetSurgeriesByLeadUuidQuery,
    "useScheduleVisitMutation",
    ()=>useScheduleVisitMutation,
    "useSendCallSummaryCompleteNotificationMutation",
    ()=>useSendCallSummaryCompleteNotificationMutation,
    "useSendWhatsappMessageNotificationMutation",
    ()=>useSendWhatsappMessageNotificationMutation,
    "useUpdateLeadMutation",
    ()=>useUpdateLeadMutation,
    "useUpdateLeadObjectionsMutation",
    ()=>useUpdateLeadObjectionsMutation,
    "useUpdateLeadProjectScoreMutation",
    ()=>useUpdateLeadProjectScoreMutation,
    "useUpdateSurgeryMutation",
    ()=>useUpdateSurgeryMutation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const leadsApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getLeads: builder.query({
                query: (body)=>({
                        url: "/leads/getLeads",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadById: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadById",
                        method: "POST",
                        body
                    }),
                providesTags: (result, error, arg)=>[
                        {
                            type: "Leads",
                            id: arg.uuid
                        }
                    ]
            }),
            getLeadObjectionDetailsAndChecklist: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadObjectionDetailsAndChecklist",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadDetailsByLeadUuid: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadDetailsByLeadUuid",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            updateLeadObjections: builder.mutation({
                query: (body)=>({
                        url: "/leads/updatedLeadObjections",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getLeadDetailsByPhoneNumber: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadDetailsByPhoneNumber",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getEmLeadsByRmId: builder.query({
                query: (body)=>({
                        url: "/leads/getEmLeadsByRmId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadStatsByUserId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadStatsByUserId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsAndObjectionsByCustomerId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadDetailsbycustomer_id",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsByCustomerUuid: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadsByCustomerUuid",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsByRmId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadsByRmId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getLeadsByEmId: builder.query({
                query: (body)=>({
                        url: "/leads/getLeadsByEmId",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            createLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/createLead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            updateLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/updateLead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: (result, error, arg)=>[
                        "Leads",
                        {
                            type: "Leads",
                            id: arg.uuid
                        }
                    ],
                async onQueryStarted (arg, { dispatch, queryFulfilled, getState }) {
                    try {
                        await queryFulfilled;
                        const state = getState();
                        const queries = state.baseApi?.queries || {};
                        for (const key of Object.keys(queries)){
                            if (key.startsWith("getLeads(")) {
                                dispatch(leadsApi.util.updateQueryData("getLeads", queries[key].originalArgs, (draft)=>{
                                    const list = Array.isArray(draft) ? draft : Array.isArray(draft?.data) ? draft.data : [];
                                    const index = list.findIndex((l)=>l.uuid === arg.uuid);
                                    if (index !== -1) Object.assign(list[index], arg);
                                }));
                            }
                            if (key.startsWith("getLeadsByCustomerUuid(")) {
                                dispatch(leadsApi.util.updateQueryData("getLeadsByCustomerUuid", queries[key].originalArgs, (draft)=>{
                                    const list = Array.isArray(draft) ? draft : Array.isArray(draft?.data) ? draft.data : [];
                                    const index = list.findIndex((l)=>l.uuid === arg.uuid);
                                    if (index !== -1) Object.assign(list[index], arg);
                                }));
                            }
                            if (key.startsWith("getLeadById(")) {
                                dispatch(leadsApi.util.updateQueryData("getLeadById", queries[key].originalArgs, (draft)=>{
                                    if (draft?.uuid === arg.uuid) {
                                        Object.assign(draft, arg);
                                    } else if (draft?.data?.uuid === arg.uuid) {
                                        Object.assign(draft.data, arg);
                                    }
                                }));
                            }
                        }
                    } catch  {
                    // If the mutation fails, we don't apply the optimistic update anyway
                    }
                }
            }),
            bulkAssignLeadsToRm: builder.mutation({
                query: (body)=>({
                        url: "/leads/bulkAssignLeadsToRm",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            bulkAssignLeadsToEm: builder.mutation({
                query: (body)=>({
                        url: "/leads/bulkAssignLeadsToEm",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            deleteLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/deleteLead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            scheduleVisit: builder.mutation({
                query: (body)=>({
                        url: "/leadSiteVisits/createSiteVisit",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            addLeadActivity: builder.mutation({
                query: (body)=>({
                        url: "/leads/addLeadActivity",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            sendWhatsappMessageNotification: builder.mutation({
                query: (body)=>({
                        url: "/leads/sendWhatsappMessageNotification",
                        method: "POST",
                        body
                    })
            }),
            sendCallSummaryCompleteNotification: builder.mutation({
                query: (body)=>({
                        url: "/leads/sendCallSummeryCompleteNotification",
                        method: "POST",
                        body
                    })
            }),
            createLeadNextBestActions: builder.mutation({
                query: (body)=>({
                        url: "/leads/createLeadNextBestActions",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            createLeadConsolidatedCallSummary: builder.mutation({
                query: (body)=>({
                        url: "/leads/createLeadConsolidatedCallSummary",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            createLeadProjectScore: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/create",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            updateLeadProjectScore: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/update",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            deleteLeadProjectScoreById: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/delete-by-id",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            deleteLeadProjectScoresByLead: builder.mutation({
                query: (body)=>({
                        url: "/leads/project-scores/delete-by-lead",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getLeadProjectScoresByLead: builder.query({
                query: (body)=>({
                        url: "/leads/project-scores/get-by-lead",
                        method: "POST",
                        body
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            getVisitsByUserId: builder.query({
                query: (params)=>({
                        url: "/appointments/getVisitsByUserId",
                        method: "POST",
                        body: params
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            bulkImportLeads: builder.mutation({
                query: (body)=>({
                        url: "/leads/bulkImport",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getAllProjectEmAndRmData: builder.query({
                query: ()=>({
                        url: "/leads/getAllProjectEmAndRmData",
                        method: "POST",
                        body: {}
                    }),
                providesTags: [
                    "Leads"
                ]
            }),
            createSurgery: builder.mutation({
                query: (body)=>({
                        url: "/leadSurgeries/createSurgery",
                        method: "POST",
                        body
                    }),
                invalidatesTags: (result, error, arg)=>[
                        "Leads",
                        {
                            type: "Leads",
                            id: arg.lead_uuid
                        },
                        {
                            type: "Leads",
                            id: `surgeries-${arg.lead_uuid}`
                        }
                    ]
            }),
            updateSurgery: builder.mutation({
                query: (body)=>({
                        url: "/leadSurgeries/updateSurgery",
                        method: "POST",
                        body
                    }),
                invalidatesTags: [
                    "Leads"
                ]
            }),
            getSurgeriesByLeadUuid: builder.query({
                query: (body)=>({
                        url: "/leadSurgeries/getSurgeriesByLeadUuid",
                        method: "POST",
                        body: {
                            offset: 0,
                            ...body
                        }
                    }),
                providesTags: (result, error, arg)=>[
                        {
                            type: "Leads",
                            id: `surgeries-${arg.lead_uuid}`
                        },
                        "Leads"
                    ]
            })
        }),
    // Turbopack can re-evaluate this module during Fast Refresh. Replacing the
    // identical definitions prevents duplicate endpoint warnings in dev.
    overrideExisting: ("TURBOPACK compile-time value", "development") === "development"
});
const { useGetLeadsQuery, useGetLeadByIdQuery, useGetLeadObjectionDetailsAndChecklistQuery, useGetLeadDetailsByLeadUuidQuery, useUpdateLeadObjectionsMutation, useGetLeadDetailsByPhoneNumberQuery, useGetEmLeadsByRmIdQuery, useGetLeadStatsByUserIdQuery, useGetLeadsAndObjectionsByCustomerIdQuery, useCreateLeadMutation, useUpdateLeadMutation, useBulkAssignLeadsToRmMutation, useBulkAssignLeadsToEmMutation, useDeleteLeadMutation, useScheduleVisitMutation, useGetLeadsByCustomerUuidQuery, useGetLeadsByRmIdQuery, useGetLeadsByEmIdQuery, useAddLeadActivityMutation, useSendWhatsappMessageNotificationMutation, useSendCallSummaryCompleteNotificationMutation, useCreateLeadNextBestActionsMutation, useCreateLeadConsolidatedCallSummaryMutation, useCreateLeadProjectScoreMutation, useUpdateLeadProjectScoreMutation, useDeleteLeadProjectScoreByIdMutation, useDeleteLeadProjectScoresByLeadMutation, useGetLeadProjectScoresByLeadQuery, useGetVisitsByUserIdQuery, useBulkImportLeadsMutation, useLazyGetLeadByIdQuery, useLazyGetLeadsQuery, useGetAllProjectEmAndRmDataQuery, useCreateSurgeryMutation, useUpdateSurgeryMutation, useGetSurgeriesByLeadUuidQuery, useLazyGetSurgeriesByLeadUuidQuery } = leadsApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "masterApi",
    ()=>masterApi,
    "useGetAllMasterDataQuery",
    ()=>useGetAllMasterDataQuery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const masterApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllMasterData: builder.query({
                query: ()=>({
                        url: '/master/getAllMasterData',
                        method: 'POST'
                    }),
                transformResponse: (response)=>({
                        ...response,
                        projects: response?.projects?.filter((project)=>project.code !== 'PLTGRN') ?? []
                    }),
                providesTags: [
                    'Master'
                ]
            })
        })
});
const { useGetAllMasterDataQuery } = masterApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCreateUserMutation",
    ()=>useCreateUserMutation,
    "useDeleteUserMutation",
    ()=>useDeleteUserMutation,
    "useGetAllUsersByRoleIdQuery",
    ()=>useGetAllUsersByRoleIdQuery,
    "useGetAllUsersQuery",
    ()=>useGetAllUsersQuery,
    "useGetEmDashboardDateWiseDataQuery",
    ()=>useGetEmDashboardDateWiseDataQuery,
    "useGetEmDashboardTodaysDataQuery",
    ()=>useGetEmDashboardTodaysDataQuery,
    "useGetEscalatedLeadsQuery",
    ()=>useGetEscalatedLeadsQuery,
    "useGetReporteesQuery",
    ()=>useGetReporteesQuery,
    "useGetRmDashboardDateWiseDataQuery",
    ()=>useGetRmDashboardDateWiseDataQuery,
    "useGetStaleLeadsQuery",
    ()=>useGetStaleLeadsQuery,
    "useGetUsersQuery",
    ()=>useGetUsersQuery,
    "useUpdateUserMutation",
    ()=>useUpdateUserMutation,
    "usersApi",
    ()=>usersApi
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)");
;
const usersApi = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$api$2f$baseApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["baseApi"].injectEndpoints({
    endpoints: (builder)=>({
            getAllUsersByRoleId: builder.query({
                query: (body)=>({
                        url: '/users/getAllUsersByRoleId',
                        method: 'POST',
                        body
                    }),
                transformResponse: normalizeUsersResponse,
                providesTags: [
                    'Users'
                ]
            }),
            getUsers: builder.query({
                query: (params)=>({
                        url: '/users/getUsers',
                        method: 'GET',
                        params
                    }),
                providesTags: [
                    'Users'
                ]
            }),
            createUser: builder.mutation({
                query: (body)=>({
                        url: '/users/createUser',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Users'
                ]
            }),
            updateUser: builder.mutation({
                query: (body)=>({
                        url: '/users/updateUser',
                        method: 'POST',
                        body
                    }),
                invalidatesTags: [
                    'Users'
                ]
            }),
            deleteUser: builder.mutation({
                query: (id)=>({
                        url: '/users/deleteUser',
                        method: 'POST',
                        body: {
                            id
                        }
                    }),
                invalidatesTags: [
                    'Users'
                ]
            }),
            getReportees: builder.query({
                query: (body)=>({
                        url: '/users/getReportees',
                        method: 'POST',
                        body
                    }),
                transformResponse: normalizeUsersResponse,
                providesTags: [
                    'Users'
                ]
            }),
            getAllUsers: builder.query({
                query: (body)=>({
                        url: '/users/getAllUsers',
                        method: 'POST',
                        body
                    }),
                transformResponse: normalizeUsersResponse,
                providesTags: [
                    'Users'
                ]
            }),
            getEmDashboardDateWiseData: builder.query({
                query: (body)=>({
                        url: '/dashBoard/getEmDashboardDateWiseData',
                        method: 'POST',
                        body
                    })
            }),
            getEmDashboardTodaysData: builder.query({
                query: (body)=>({
                        url: '/dashBoard/getEmDashboardtodaysData',
                        method: 'POST',
                        body
                    })
            }),
            getRmDashboardDateWiseData: builder.query({
                query: (body)=>({
                        url: '/dashBoard/getRmDashboardDateWiseData',
                        method: 'POST',
                        body
                    })
            }),
            getStaleLeads: builder.query({
                query: (body)=>({
                        url: '/leads/getStaleLeads',
                        method: 'POST',
                        body
                    })
            }),
            getEscalatedLeads: builder.query({
                query: (body)=>({
                        url: '/leads/getEscallatedLeads',
                        method: 'POST',
                        body
                    })
            })
        })
});
function normalizeUsersResponse(response) {
    if (Array.isArray(response)) return response;
    if (!response || typeof response !== 'object') return [];
    const envelope = response;
    if (Array.isArray(envelope.users)) return envelope.users;
    if (Array.isArray(envelope.data)) return envelope.data;
    if (envelope.data && !Array.isArray(envelope.data) && Array.isArray(envelope.data.users)) {
        return envelope.data.users;
    }
    if (Array.isArray(envelope.result)) return envelope.result;
    return [];
}
const { useGetUsersQuery, useGetAllUsersByRoleIdQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetReporteesQuery, useGetAllUsersQuery, useGetEmDashboardDateWiseDataQuery, useGetEmDashboardTodaysDataQuery, useGetRmDashboardDateWiseDataQuery, useGetStaleLeadsQuery, useGetEscalatedLeadsQuery } = usersApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/api/baseApi.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseApi",
    ()=>baseApi,
    "baseQueryWithReauth",
    ()=>baseQueryWithReauth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/rtk-query.modern.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/auth/store/authSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$mutex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/async-mutex/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@reduxjs/toolkit/dist/query/react/rtk-query-react.modern.mjs [app-client] (ecmascript) <locals>");
;
;
;
;
// Create a new mutex
const mutex = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$async$2d$mutex$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Mutex"]();
const baseQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$rtk$2d$query$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fetchBaseQuery"])({
    baseUrl: ("TURBOPACK compile-time value", "https://upload-uncouple-rephrase.ngrok-free.dev") || 'https://y7lidobvl7.execute-api.ap-south-1.amazonaws.com',
    prepareHeaders: (headers, { getState })=>{
        const stateToken = getState()?.auth?.token;
        const localToken = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$utils$2f$localStorage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["storage"].get('crm_token', null) || localStorage.getItem('token') || localStorage.getItem('crm_token');
        const token = stateToken || localToken;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});
const baseQueryWithReauth = async (args, api, extraOptions)=>{
    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
    const url = typeof args === 'string' ? args : args.url;
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/refreshToken') || url.includes('/auth/forgotPassword');
    if (result.error && result.error.status === 401 && !isAuthEndpoint) {
        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshToken = api.getState().auth.refreshToken;
                if (refreshToken) {
                    const refreshResult = await baseQuery({
                        url: '/auth/refreshToken',
                        method: 'POST',
                        body: {
                            token: refreshToken
                        }
                    }, api, extraOptions);
                    if (refreshResult.data) {
                        const data = refreshResult.data;
                        // Store the new tokens
                        api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setCredentials"])({
                            user: api.getState().auth.user,
                            token: data.token,
                            refreshToken: data.refreshToken || refreshToken,
                            isFirstLogin: api.getState().auth.isFirstLogin
                        }));
                        // Retry the initial query
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])());
                        if (window.location.pathname !== '/login') {
                            window.location.href = '/login';
                        }
                    }
                } else {
                    api.dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$auth$2f$store$2f$authSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logoutUser"])());
                    if (window.location.pathname !== '/login') {
                        window.location.href = '/login';
                    }
                }
            } finally{
                release();
            }
        } else {
            // Wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }
    return result;
};
;
const baseApi = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$query$2f$react$2f$rtk$2d$query$2d$react$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createApi"])({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: [
        'Users',
        'Leads',
        'Customers',
        'Master',
        'FollowUps',
        'Appointments',
        'Doctors',
        'Templates',
        'Telephony'
    ],
    endpoints: ()=>({})
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DatePicker",
    ()=>DatePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const formatTwoDigits = (n)=>String(n).padStart(2, "0");
const formatDateOnly = (d)=>{
    const yyyy = d.getFullYear();
    const mm = formatTwoDigits(d.getMonth() + 1);
    const dd = formatTwoDigits(d.getDate());
    return `${yyyy}-${mm}-${dd}`;
};
const formatReadableDate = (date)=>{
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const m = months[date.getMonth()];
    const d = date.getDate();
    const y = date.getFullYear();
    return `${d} ${m} ${y}`;
};
const DatePicker = ({ value, onChange, outputFormat = "date-only", placeholder = "Select date", disabled = false, disablePastDates = false, className, error, minDate, maxDate, showQuickPresets = true })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeMonth, setActiveMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DatePicker.useEffect": ()=>{
            if (!value) {
                setSelectedDate(null);
                return;
            }
            try {
                let d;
                if (value instanceof Date) {
                    d = value;
                } else if (typeof value === "string") {
                    const clean = value.replace(/Z/g, "").split("+")[0].replace(" ", "T");
                    d = new Date(clean);
                    if (isNaN(d.getTime())) d = new Date(value);
                } else {
                    d = new Date(value);
                }
                if (!isNaN(d.getTime())) {
                    setSelectedDate(d);
                    setActiveMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                }
            } catch  {
            // Ignore
            }
        }
    }["DatePicker.useEffect"], [
        value
    ]);
    const emitDate = (d)=>{
        if (!d) {
            onChange?.("", undefined);
            return;
        }
        if (outputFormat === "iso") {
            onChange?.(d.toISOString(), d);
        } else if (outputFormat === "datetime-string") {
            const yyyy = d.getFullYear();
            const mm = formatTwoDigits(d.getMonth() + 1);
            const dd = formatTwoDigits(d.getDate());
            onChange?.(`${yyyy}-${mm}-${dd} 00:00:00`, d);
        } else {
            onChange?.(formatDateOnly(d), d);
        }
    };
    const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DatePicker.useMemo[calendarDays]": ()=>{
            const year = activeMonth.getFullYear();
            const month = activeMonth.getMonth();
            const firstDay = new Date(year, month, 1);
            let firstDayIndex = firstDay.getDay();
            firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
            const prevMonthLastDate = new Date(year, month, 0).getDate();
            const days = [];
            for(let i = firstDayIndex - 1; i >= 0; i--){
                days.push({
                    date: new Date(year, month - 1, prevMonthLastDate - i),
                    isCurrentMonth: false
                });
            }
            const currentMonthLastDate = new Date(year, month + 1, 0).getDate();
            for(let i = 1; i <= currentMonthLastDate; i++){
                days.push({
                    date: new Date(year, month, i),
                    isCurrentMonth: true
                });
            }
            const remaining = (days.length > 35 ? 42 : 35) - days.length;
            for(let i = 1; i <= remaining; i++){
                days.push({
                    date: new Date(year, month + 1, i),
                    isCurrentMonth: false
                });
            }
            return days;
        }
    }["DatePicker.useMemo[calendarDays]"], [
        activeMonth
    ]);
    const isDateDisabled = (d)=>{
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(d);
        target.setHours(0, 0, 0, 0);
        if (disablePastDates && target < today) return true;
        if (minDate && target < new Date(new Date(minDate).setHours(0, 0, 0, 0))) return true;
        if (maxDate && target > new Date(new Date(maxDate).setHours(23, 59, 59, 999))) return true;
        return false;
    };
    const handleSelectDay = (d)=>{
        if (isDateDisabled(d)) return;
        setSelectedDate(d);
        emitDate(d);
        setIsOpen(false);
    };
    const handleClear = (e)=>{
        e.stopPropagation();
        setSelectedDate(null);
        emitDate(null);
    };
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        open: isOpen,
        onOpenChange: setIsOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    disabled: disabled,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("group w-full h-11 px-3.5 flex items-center justify-between rounded-xl bg-white dark:bg-zinc-900 border text-xs font-semibold text-slate-800 dark:text-zinc-100 transition-all duration-200 outline-none shadow-xs text-left cursor-pointer", error ? "border-red-400 focus:ring-2 focus:ring-red-400/20" : "border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 focus:ring-2 focus:ring-[#063669]/15 focus:border-[#063669]", disabled && "opacity-50 cursor-not-allowed bg-slate-50/80 dark:bg-zinc-900/40", className),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5 truncate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    className: "w-4 h-4 text-slate-400 group-hover:text-[#063669] dark:group-hover:text-blue-400 transition-colors shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                    lineNumber: 184,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("truncate", !selectedDate && "text-slate-400 dark:text-zinc-500 font-normal"),
                                    children: selectedDate ? formatReadableDate(selectedDate) : placeholder
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                            lineNumber: 183,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        selectedDate && !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            onClick: handleClear,
                            className: "p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer shrink-0",
                            title: "Clear date",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                lineNumber: 196,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                            lineNumber: 191,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                align: "start",
                sideOffset: 6,
                className: "w-[300px] p-4 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800/90 shadow-2xl z-[99999] overflow-hidden space-y-3.5 animate-in fade-in zoom-in-95 duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-bold text-slate-800 dark:text-zinc-100 tracking-tight",
                                children: activeMonth.toLocaleDateString("en-US", {
                                    month: "long",
                                    year: "numeric"
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1)),
                                        className: "p-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                            lineNumber: 218,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                        lineNumber: 213,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1)),
                                        className: "p-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 transition-colors",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                            lineNumber: 225,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                        lineNumber: 220,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 gap-1 text-center",
                        children: [
                            "Mo",
                            "Tu",
                            "We",
                            "Th",
                            "Fr",
                            "Sa",
                            "Su"
                        ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase",
                                children: d
                            }, d, false, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                lineNumber: 233,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                        lineNumber: 231,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-7 gap-1 text-center",
                        children: calendarDays.map(({ date: dayDate, isCurrentMonth }, idx)=>{
                            const disabledDay = isDateDisabled(dayDate);
                            const isSelected = selectedDate && dayDate.getDate() === selectedDate.getDate() && dayDate.getMonth() === selectedDate.getMonth() && dayDate.getFullYear() === selectedDate.getFullYear();
                            const isToday = dayDate.getDate() === todayDate.getDate() && dayDate.getMonth() === todayDate.getMonth() && dayDate.getFullYear() === todayDate.getFullYear();
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: disabledDay,
                                onClick: ()=>handleSelectDay(dayDate),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative h-8 w-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-150 cursor-pointer", !isCurrentMonth && "text-slate-300 dark:text-zinc-700 opacity-60", isCurrentMonth && "text-slate-700 dark:text-zinc-200", disabledDay && "opacity-25 cursor-not-allowed hover:bg-transparent", !disabledDay && !isSelected && "hover:bg-slate-100 dark:hover:bg-zinc-850", isSelected && "bg-[#063669] dark:bg-blue-600 text-white font-bold shadow-md scale-105", isToday && !isSelected && "border border-[#063669]/40 dark:border-blue-500/50 font-bold"),
                                children: [
                                    dayDate.getDate(),
                                    isToday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("absolute bottom-1 w-1 h-1 rounded-full", isSelected ? "bg-white" : "bg-[#063669] dark:bg-blue-400")
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                        lineNumber: 271,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, idx, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                                lineNumber: 254,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
                lineNumber: 202,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/DateTimePicker/DatePicker.tsx",
        lineNumber: 169,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DatePicker, "zIJqiOs/Ss8XJRYprXc89we+zb8=");
_c = DatePicker;
var _c;
__turbopack_context__.k.register(_c, "DatePicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DateTimePicker",
    ()=>DateTimePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$WheelTimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const formatTwoDigits = (n)=>String(n).padStart(2, "0");
const formatDateString = (date)=>{
    const yyyy = date.getFullYear();
    const mm = formatTwoDigits(date.getMonth() + 1);
    const dd = formatTwoDigits(date.getDate());
    const hh = formatTwoDigits(date.getHours());
    const min = formatTwoDigits(date.getMinutes());
    const ss = formatTwoDigits(date.getSeconds());
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};
const formatReadable = (date)=>{
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];
    const m = months[date.getMonth()];
    const d = date.getDate();
    const y = date.getFullYear();
    let h = date.getHours();
    const period = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const mins = formatTwoDigits(date.getMinutes());
    return `${d} ${m} ${y}, ${formatTwoDigits(h)}:${mins} ${period}`;
};
const DateTimePicker = ({ value, onChange, outputFormat = "datetime-string", placeholder = "Select date & time", disabled = false, disablePastDates = false, className, error, minDate, maxDate, showQuickPresets = true })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeMonth, setActiveMonth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("date");
    // Time state (12-hour format)
    const [hour, setHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [minute, setMinute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("AM");
    // Parse initial or controlled value
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DateTimePicker.useEffect": ()=>{
            if (!value) {
                setSelectedDate(null);
                return;
            }
            try {
                let d;
                if (value instanceof Date) {
                    d = value;
                } else if (typeof value === "string") {
                    const clean = value.replace(/Z/g, "").split("+")[0].replace(" ", "T");
                    d = new Date(clean);
                    if (isNaN(d.getTime())) d = new Date(value);
                } else {
                    d = new Date(value);
                }
                if (!isNaN(d.getTime())) {
                    setSelectedDate(d);
                    setActiveMonth(new Date(d.getFullYear(), d.getMonth(), 1));
                    let h = d.getHours();
                    const p = h >= 12 ? "PM" : "AM";
                    h = h % 12 || 12;
                    setHour(h);
                    setMinute(d.getMinutes());
                    setPeriod(p);
                }
            } catch  {
            // Ignore parse error
            }
        }
    }["DateTimePicker.useEffect"], [
        value
    ]);
    const emitChange = (d)=>{
        if (!d) {
            onChange?.("", undefined);
            return;
        }
        if (outputFormat === "iso") {
            onChange?.(d.toISOString(), d);
        } else if (outputFormat === "date-only") {
            const yyyy = d.getFullYear();
            const mm = formatTwoDigits(d.getMonth() + 1);
            const dd = formatTwoDigits(d.getDate());
            onChange?.(`${yyyy}-${mm}-${dd}`, d);
        } else {
            onChange?.(formatDateString(d), d);
        }
    };
    const computeCurrentDateTime = (baseDate, h, m, p)=>{
        const target = baseDate ? new Date(baseDate) : new Date();
        let hours24 = h % 12;
        if (p === "PM") hours24 += 12;
        target.setHours(hours24);
        target.setMinutes(m);
        target.setSeconds(0);
        target.setMilliseconds(0);
        return target;
    };
    // Calendar matrix calculation
    const calendarDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DateTimePicker.useMemo[calendarDays]": ()=>{
            const year = activeMonth.getFullYear();
            const month = activeMonth.getMonth();
            const firstDay = new Date(year, month, 1);
            let firstDayIndex = firstDay.getDay(); // 0 = Sun
            firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // 0 = Mon, 6 = Sun
            const prevMonthLastDate = new Date(year, month, 0).getDate();
            const days = [];
            for(let i = firstDayIndex - 1; i >= 0; i--){
                days.push({
                    date: new Date(year, month - 1, prevMonthLastDate - i),
                    isCurrentMonth: false
                });
            }
            const currentMonthLastDate = new Date(year, month + 1, 0).getDate();
            for(let i = 1; i <= currentMonthLastDate; i++){
                days.push({
                    date: new Date(year, month, i),
                    isCurrentMonth: true
                });
            }
            const remaining = (days.length > 35 ? 42 : 35) - days.length;
            for(let i = 1; i <= remaining; i++){
                days.push({
                    date: new Date(year, month + 1, i),
                    isCurrentMonth: false
                });
            }
            return days;
        }
    }["DateTimePicker.useMemo[calendarDays]"], [
        activeMonth
    ]);
    const isDateDisabled = (d)=>{
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(d);
        target.setHours(0, 0, 0, 0);
        if (disablePastDates && target < today) return true;
        if (minDate && target < new Date(new Date(minDate).setHours(0, 0, 0, 0))) return true;
        if (maxDate && target > new Date(new Date(maxDate).setHours(23, 59, 59, 999))) return true;
        return false;
    };
    const handleSelectDay = (day)=>{
        if (isDateDisabled(day)) return;
        const combined = computeCurrentDateTime(day, hour, minute, period);
        setSelectedDate(combined);
        emitChange(combined);
    };
    const handleApplyHour = (h)=>{
        setHour(h);
        const combined = computeCurrentDateTime(selectedDate, h, minute, period);
        setSelectedDate(combined);
        emitChange(combined);
    };
    const handleApplyMinute = (m)=>{
        setMinute(m);
        const combined = computeCurrentDateTime(selectedDate, hour, m, period);
        setSelectedDate(combined);
        emitChange(combined);
    };
    const handleApplyPeriod = (p)=>{
        setPeriod(p);
        const combined = computeCurrentDateTime(selectedDate, hour, minute, p);
        setSelectedDate(combined);
        emitChange(combined);
    };
    const handleClear = (e)=>{
        e.stopPropagation();
        setSelectedDate(null);
        emitChange(null);
    };
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        open: isOpen,
        onOpenChange: setIsOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    disabled: disabled,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("group w-full h-11 px-3.5 flex items-center justify-between rounded-xl bg-white dark:bg-zinc-900 border text-xs font-semibold text-slate-800 dark:text-zinc-100 transition-all duration-200 outline-none shadow-xs text-left cursor-pointer", error ? "border-red-400 focus:ring-2 focus:ring-red-400/20" : "border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 focus:ring-2 focus:ring-[#063669]/15 focus:border-[#063669]", disabled && "opacity-50 cursor-not-allowed bg-slate-50/80 dark:bg-zinc-900/40", className),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5 truncate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                    className: "w-4 h-4 text-slate-400 group-hover:text-[#063669] dark:group-hover:text-blue-400 transition-colors shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("truncate", !selectedDate && "text-slate-400 dark:text-zinc-500 font-normal"),
                                    children: selectedDate ? formatReadable(selectedDate) : placeholder
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                    lineNumber: 240,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                            lineNumber: 238,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1.5 shrink-0",
                            children: [
                                selectedDate && !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    onClick: handleClear,
                                    className: "p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer",
                                    title: "Clear date",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                    lineNumber: 247,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-3.5 h-3.5 text-slate-350 dark:text-zinc-600"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                    lineNumber: 226,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                lineNumber: 225,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                align: "start",
                sideOffset: 6,
                className: "w-[340px] sm:w-[580px] p-0 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800/90 shadow-2xl z-[99999] overflow-hidden animate-in fade-in zoom-in-95 duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex sm:hidden border-b border-slate-100 dark:border-zinc-850 bg-slate-50/60 dark:bg-zinc-900/40 p-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveTab("date"),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5", activeTab === "date" ? "bg-white dark:bg-zinc-900 text-[#063669] dark:text-blue-400 shadow-xs" : "text-slate-500 hover:text-slate-800 dark:text-zinc-400"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 277,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Date"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 278,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                lineNumber: 267,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setActiveTab("time"),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5", activeTab === "time" ? "bg-white dark:bg-zinc-900 text-[#063669] dark:text-blue-400 shadow-xs" : "text-slate-500 hover:text-slate-800 dark:text-zinc-400"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "Time (",
                                            formatTwoDigits(hour),
                                            ":",
                                            formatTwoDigits(minute),
                                            " ",
                                            period,
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                lineNumber: 280,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 sm:grid-cols-12 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-zinc-850",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("p-4 sm:p-5 sm:col-span-7 space-y-3.5", activeTab !== "date" && "hidden sm:block"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between px-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs font-bold text-slate-800 dark:text-zinc-100 tracking-tight",
                                                children: activeMonth.toLocaleDateString("en-US", {
                                                    month: "long",
                                                    year: "numeric"
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 302,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() - 1, 1)),
                                                        className: "p-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                            lineNumber: 311,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setActiveMonth(new Date(activeMonth.getFullYear(), activeMonth.getMonth() + 1, 1)),
                                                        className: "p-1.5 rounded-lg border border-slate-200/70 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-850 text-slate-600 dark:text-zinc-400 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                            lineNumber: 318,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                        lineNumber: 313,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 305,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 301,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-7 gap-1 text-center",
                                        children: [
                                            "Mo",
                                            "Tu",
                                            "We",
                                            "Th",
                                            "Fr",
                                            "Sa",
                                            "Su"
                                        ].map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase",
                                                children: d
                                            }, d, false, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 326,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 324,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-7 gap-1 text-center",
                                        children: calendarDays.map(({ date: dayDate, isCurrentMonth }, idx)=>{
                                            const disabledDay = isDateDisabled(dayDate);
                                            const isSelected = selectedDate && dayDate.getDate() === selectedDate.getDate() && dayDate.getMonth() === selectedDate.getMonth() && dayDate.getFullYear() === selectedDate.getFullYear();
                                            const isToday = dayDate.getDate() === todayDate.getDate() && dayDate.getMonth() === todayDate.getMonth() && dayDate.getFullYear() === todayDate.getFullYear();
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                disabled: disabledDay,
                                                onClick: ()=>handleSelectDay(dayDate),
                                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative h-8 w-8 mx-auto rounded-full text-xs font-semibold flex items-center justify-center transition-all duration-150 cursor-pointer", !isCurrentMonth && "text-slate-300 dark:text-zinc-700 opacity-60", isCurrentMonth && "text-slate-700 dark:text-zinc-200", disabledDay && "opacity-25 cursor-not-allowed hover:bg-transparent", !disabledDay && !isSelected && "hover:bg-slate-100 dark:hover:bg-zinc-850", isSelected && "bg-[#063669] dark:bg-blue-600 text-white font-bold shadow-md scale-105", isToday && !isSelected && "border border-[#063669]/40 dark:border-blue-500/50 font-bold"),
                                                children: [
                                                    dayDate.getDate(),
                                                    isToday && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("absolute bottom-1 w-1 h-1 rounded-full", isSelected ? "bg-white" : "bg-[#063669] dark:bg-blue-400")
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                        lineNumber: 364,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 333,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("p-4 sm:p-5 sm:col-span-5 bg-slate-50/40 dark:bg-zinc-900/20 space-y-3.5", activeTab !== "time" && "hidden sm:block"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between pb-1 border-b border-slate-100 dark:border-zinc-850",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                        className: "w-3.5 h-3.5 text-[#063669] dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                        lineNumber: 383,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-slate-800 dark:text-zinc-100",
                                                        children: "Time"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 382,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-850 text-slate-700 dark:text-zinc-200 text-xs font-black",
                                                children: [
                                                    formatTwoDigits(hour),
                                                    ":",
                                                    formatTwoDigits(minute),
                                                    " ",
                                                    period
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 386,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 381,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-2xl bg-white dark:bg-zinc-900/60 p-1 border border-slate-200/50 dark:border-zinc-800/60",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$WheelTimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WheelTimePicker"], {
                                            hour: hour,
                                            minute: minute,
                                            period: period,
                                            onHourChange: handleApplyHour,
                                            onMinuteChange: handleApplyMinute,
                                            onPeriodChange: handleApplyPeriod
                                        }, void 0, false, {
                                            fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                            lineNumber: 393,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 392,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                lineNumber: 378,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-3 sm:px-5 sm:py-3.5 bg-slate-50 dark:bg-zinc-900/60 border-t border-slate-100 dark:border-zinc-850 flex items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "truncate",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] font-bold text-slate-500 dark:text-zinc-400",
                                    children: selectedDate ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400 mr-1",
                                                children: "Set:"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 411,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#063669] dark:text-blue-400 font-extrabold",
                                                children: formatReadable(selectedDate)
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 412,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 410,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)) : "No date selected"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                    lineNumber: 408,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                lineNumber: 407,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>setIsOpen(false),
                                        className: "h-8 px-3 rounded-lg text-xs font-bold border-slate-200 dark:border-zinc-800",
                                        children: "Close"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 421,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        type: "button",
                                        size: "sm",
                                        onClick: ()=>{
                                            if (!selectedDate) {
                                                const now = computeCurrentDateTime(new Date(), hour, minute, period);
                                                setSelectedDate(now);
                                                emitChange(now);
                                            }
                                            setIsOpen(false);
                                        },
                                        className: "h-8 px-4 rounded-lg text-xs font-bold bg-[#063669] hover:bg-[#052b53] text-white shadow-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                className: "w-3.5 h-3.5 mr-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                                lineNumber: 443,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Done"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                        lineNumber: 406,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx",
        lineNumber: 224,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(DateTimePicker, "+D19T+ilTMGA7D91Su4w72IGY0s=");
_c = DateTimePicker;
var _c;
__turbopack_context__.k.register(_c, "DateTimePicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TimePicker",
    ()=>TimePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$WheelTimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
const formatTwoDigits = (n)=>String(n).padStart(2, "0");
const TimePicker = ({ value, onChange, outputFormat = "24h", placeholder = "Select time", disabled = false, className, error, minuteStep = 1 })=>{
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hour, setHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(10);
    const [minute, setMinute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("AM");
    const [hasSelected, setHasSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TimePicker.useEffect": ()=>{
            if (!value) {
                setHasSelected(false);
                return;
            }
            const valStr = String(value).trim();
            if (valStr.toUpperCase().includes("AM") || valStr.toUpperCase().includes("PM")) {
                // 12-hour string (e.g., "10:30 AM")
                const parts = valStr.split(" ");
                const timeParts = parts[0]?.split(":") || [];
                const h = parseInt(timeParts[0] || "10", 10);
                const m = parseInt(timeParts[1] || "0", 10);
                const p = parts[1]?.toUpperCase() === "PM" ? "PM" : "AM";
                setHour(h || 12);
                setMinute(m || 0);
                setPeriod(p);
                setHasSelected(true);
            } else if (valStr.includes(":")) {
                // 24-hour string (e.g., "14:30" or "14:30:00")
                const timeParts = valStr.split(":");
                let h = parseInt(timeParts[0] || "10", 10);
                const m = parseInt(timeParts[1] || "0", 10);
                const p = h >= 12 ? "PM" : "AM";
                h = h % 12 || 12;
                setHour(h);
                setMinute(m || 0);
                setPeriod(p);
                setHasSelected(true);
            }
        }
    }["TimePicker.useEffect"], [
        value
    ]);
    const emitValue = (h, m, p)=>{
        setHasSelected(true);
        if (outputFormat === "12h") {
            onChange?.(`${formatTwoDigits(h)}:${formatTwoDigits(m)} ${p}`);
        } else {
            let h24 = h % 12;
            if (p === "PM") h24 += 12;
            onChange?.(`${formatTwoDigits(h24)}:${formatTwoDigits(m)}:00`);
        }
    };
    const handleHourChange = (newHour)=>{
        setHour(newHour);
        emitValue(newHour, minute, period);
    };
    const handleMinuteChange = (newMinute)=>{
        setMinute(newMinute);
        emitValue(hour, newMinute, period);
    };
    const handlePeriodChange = (newPeriod)=>{
        setPeriod(newPeriod);
        emitValue(hour, minute, newPeriod);
    };
    const handleClear = (e)=>{
        e.stopPropagation();
        setHasSelected(false);
        onChange?.("");
    };
    const displayTime = hasSelected ? `${formatTwoDigits(hour)}:${formatTwoDigits(minute)} ${period}` : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        open: isOpen,
        onOpenChange: setIsOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    disabled: disabled,
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("group w-full h-11 px-3.5 flex items-center justify-between rounded-xl bg-white dark:bg-zinc-900 border text-xs font-semibold text-slate-800 dark:text-zinc-100 transition-all duration-200 outline-none shadow-xs text-left cursor-pointer", error ? "border-red-400 focus:ring-2 focus:ring-red-400/20" : "border-slate-200/90 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 focus:ring-2 focus:ring-[#063669]/15 focus:border-[#063669]", disabled && "opacity-50 cursor-not-allowed bg-slate-50/80 dark:bg-zinc-900/40", className),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2.5 truncate",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "w-4 h-4 text-slate-400 group-hover:text-[#063669] dark:group-hover:text-blue-400 transition-colors shrink-0"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("truncate", !hasSelected && "text-slate-400 dark:text-zinc-500 font-normal"),
                                    children: displayTime || placeholder
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                            lineNumber: 117,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        hasSelected && !disabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            onClick: handleClear,
                            className: "p-1 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 transition-colors cursor-pointer shrink-0",
                            title: "Clear time",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                    lineNumber: 105,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                align: "start",
                sideOffset: 6,
                className: "w-[280px] p-4 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-150 dark:border-zinc-800/90 shadow-2xl z-[99999] overflow-hidden space-y-3.5 animate-in fade-in zoom-in-95 duration-200",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-1 pb-1 border-b border-slate-100 dark:border-zinc-850",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                        className: "w-3.5 h-3.5 text-[#063669] dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs font-bold text-slate-800 dark:text-zinc-100",
                                        children: "Select Time"
                                    }, void 0, false, {
                                        fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                        lineNumber: 145,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-zinc-850 text-slate-700 dark:text-zinc-200 text-xs font-black",
                                children: [
                                    formatTwoDigits(hour),
                                    ":",
                                    formatTwoDigits(minute),
                                    " ",
                                    period
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                        lineNumber: 142,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl bg-slate-50/70 dark:bg-zinc-900/40 p-1 border border-slate-200/50 dark:border-zinc-800/60",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$WheelTimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WheelTimePicker"], {
                            hour: hour,
                            minute: minute,
                            period: period,
                            minuteStep: minuteStep,
                            onHourChange: handleHourChange,
                            onMinuteChange: handleMinuteChange,
                            onPeriodChange: handlePeriodChange
                        }, void 0, false, {
                            fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pt-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            size: "sm",
                            onClick: ()=>{
                                emitValue(hour, minute, period);
                                setIsOpen(false);
                            },
                            className: "w-full h-8 rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#052b53] text-white shadow-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                    className: "w-3.5 h-3.5 mr-1"
                                }, void 0, false, {
                                    fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                                    lineNumber: 176,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                "Done (",
                                formatTwoDigits(hour),
                                ":",
                                formatTwoDigits(minute),
                                " ",
                                period,
                                ")"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                        lineNumber: 166,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/DateTimePicker/TimePicker.tsx",
        lineNumber: 103,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(TimePicker, "FT2/C+6T+ywk0SgzQRC7HIYJa4o=");
_c = TimePicker;
var _c;
__turbopack_context__.k.register(_c, "TimePicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WheelColumn",
    ()=>WheelColumn,
    "WheelTimePicker",
    ()=>WheelTimePicker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/utils/index.ts [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function WheelColumn({ items, value, onChange, formatLabel = (item)=>String(item), itemHeight = 38, containerHeight = 190, className, pillClassName, showArrows = false }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastUserInteraction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isDraggingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const startYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const startScrollTopRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const spacerHeight = (containerHeight - itemHeight) / 2;
    const currentIndex = items.indexOf(value);
    const scrollToItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WheelColumn.useCallback[scrollToItem]": (index, smooth = true)=>{
            if (!containerRef.current) return;
            const targetScroll = Math.max(0, index * itemHeight);
            containerRef.current.scrollTo({
                top: targetScroll,
                behavior: smooth ? "smooth" : "auto"
            });
        }
    }["WheelColumn.useCallback[scrollToItem]"], [
        itemHeight
    ]);
    // Position on mount or when value changes externally
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WheelColumn.useEffect": ()=>{
            if (Date.now() - lastUserInteraction.current > 350 && currentIndex >= 0) {
                const timer = setTimeout({
                    "WheelColumn.useEffect.timer": ()=>{
                        scrollToItem(currentIndex, false);
                    }
                }["WheelColumn.useEffect.timer"], 40);
                return ({
                    "WheelColumn.useEffect": ()=>clearTimeout(timer)
                })["WheelColumn.useEffect"];
            }
        }
    }["WheelColumn.useEffect"], [
        currentIndex,
        scrollToItem
    ]);
    // Handle scroll events with debounce to snap & emit
    const handleScroll = ()=>{
        if (!containerRef.current) return;
        lastUserInteraction.current = Date.now();
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(()=>{
            if (!containerRef.current) return;
            const scrollTop = containerRef.current.scrollTop;
            const rawIndex = Math.round(scrollTop / itemHeight);
            const clampedIndex = Math.max(0, Math.min(items.length - 1, rawIndex));
            if (items[clampedIndex] !== undefined && items[clampedIndex] !== value) {
                onChange(items[clampedIndex]);
            }
            scrollToItem(clampedIndex, true);
        }, 70);
    };
    // Mouse wheel handler
    const handleWheel = (e)=>{
        if (!containerRef.current) return;
        lastUserInteraction.current = Date.now();
        e.stopPropagation();
        containerRef.current.scrollTop += e.deltaY * 0.7;
    };
    // Drag to scroll support (mouse)
    const handleMouseDown = (e)=>{
        if (!containerRef.current) return;
        isDraggingRef.current = true;
        startYRef.current = e.clientY;
        startScrollTopRef.current = containerRef.current.scrollTop;
        lastUserInteraction.current = Date.now();
    };
    const handleMouseMove = (e)=>{
        if (!isDraggingRef.current || !containerRef.current) return;
        const deltaY = e.clientY - startYRef.current;
        containerRef.current.scrollTop = startScrollTopRef.current - deltaY;
        lastUserInteraction.current = Date.now();
    };
    const handleMouseUp = ()=>{
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        handleScroll();
    };
    const handleStep = (direction, e)=>{
        e.stopPropagation();
        lastUserInteraction.current = Date.now();
        let newIdx = currentIndex;
        if (direction === "up") {
            newIdx = Math.max(0, currentIndex - 1);
        } else {
            newIdx = Math.min(items.length - 1, currentIndex + 1);
        }
        onChange(items[newIdx]);
        scrollToItem(newIdx, true);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative flex-1 flex flex-col items-center select-none touch-pan-y group", className),
        style: {
            height: containerHeight
        },
        onMouseMove: handleMouseMove,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseUp,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("absolute left-1 right-1 pointer-events-none rounded-xl bg-slate-100 dark:bg-zinc-800/90 border border-slate-200/60 dark:border-zinc-700/60 transition-all duration-150 shadow-2xs", pillClassName),
                style: {
                    top: spacerHeight,
                    height: itemHeight
                }
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            showArrows && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: (e)=>handleStep("up", e),
                className: "absolute top-1 z-20 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                    className: "w-3.5 h-3.5"
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                    lineNumber: 152,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 147,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: containerRef,
                onScroll: handleScroll,
                onWheel: handleWheel,
                onMouseDown: handleMouseDown,
                className: "w-full h-full overflow-y-auto overscroll-contain text-center z-2 cursor-grab active:cursor-grabbing no-scrollbar",
                style: {
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    scrollBehavior: "smooth"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: spacerHeight
                        },
                        className: "shrink-0 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    items.map((item, idx)=>{
                        const isSelected = item === value;
                        const diff = Math.abs(idx - (currentIndex >= 0 ? currentIndex : 0));
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: (e)=>{
                                e.stopPropagation();
                                lastUserInteraction.current = Date.now();
                                onChange(item);
                                scrollToItem(idx, true);
                            },
                            style: {
                                height: itemHeight
                            },
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("h-[38px] flex items-center justify-center transition-all duration-150 text-sm font-semibold cursor-pointer select-none", isSelected ? "text-slate-900 dark:text-zinc-50 font-black scale-105" : diff === 1 ? "text-slate-500 dark:text-zinc-400 font-medium scale-95 opacity-75 hover:text-slate-800 dark:hover:text-zinc-200" : "text-slate-400 dark:text-zinc-500 font-normal scale-90 opacity-40 hover:opacity-80"),
                            children: formatLabel(item)
                        }, String(item), false, {
                            fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            height: spacerHeight
                        },
                        className: "shrink-0 pointer-events-none"
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            showArrows && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: (e)=>handleStep("down", e),
                className: "absolute bottom-1 z-20 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "w-3.5 h-3.5"
                }, void 0, false, {
                    fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                    lineNumber: 211,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 206,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
_s(WheelColumn, "KEjFXB9ZwcZjVq1bAmMS9nUCGFo=");
_c = WheelColumn;
const WheelTimePicker = ({ hour, minute, period, onHourChange, onMinuteChange, onPeriodChange, minuteStep = 1, className, showArrows = false })=>{
    const hours = Array.from({
        length: 12
    }, (_, i)=>i + 1);
    const minutes = Array.from({
        length: Math.floor(60 / minuteStep)
    }, (_, i)=>i * minuteStep);
    const periods = [
        "AM",
        "PM"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["cn"])("relative w-full py-1 bg-transparent select-none overflow-hidden", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent z-10"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center gap-2 px-2 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WheelColumn, {
                        items: hours,
                        value: hour,
                        onChange: onHourChange,
                        formatLabel: (h)=>String(h),
                        showArrows: showArrows
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WheelColumn, {
                        items: minutes,
                        value: minute,
                        onChange: onMinuteChange,
                        formatLabel: (m)=>String(m).padStart(2, "0"),
                        showArrows: showArrows
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(WheelColumn, {
                        items: periods,
                        value: period,
                        onChange: onPeriodChange,
                        formatLabel: (p)=>p,
                        showArrows: showArrows
                    }, void 0, false, {
                        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 254,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80 dark:to-transparent z-10"
            }, void 0, false, {
                fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
                lineNumber: 284,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = WheelTimePicker;
var _c, _c1;
__turbopack_context__.k.register(_c, "WheelColumn");
__turbopack_context__.k.register(_c1, "WheelTimePicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/components/DateTimePicker/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DateTimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DateTimePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$WheelTimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/WheelTimePicker.tsx [app-client] (ecmascript)");
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/hooks/useMasterDataLookup.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useMasterDataLookup",
    ()=>useMasterDataLookup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/users/api/usersApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$projectLeadStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/projectLeadStatus.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
const useMasterDataLookup = ()=>{
    _s();
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const { data: liveRms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 3,
        offset: 0
    });
    const { data: liveEms = [] } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"])({
        role_id: 4,
        offset: 0
    });
    const rms = liveRms;
    const ems = liveEms;
    const projectLeadStatuses = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "useMasterDataLookup.useMemo[projectLeadStatuses]": ()=>{
            const rawData = masterData?.project_lead_status || masterData?.project_lead_statuses || masterData?.project_lead_statusifications || masterData?.project_statusifications || [];
            const converted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$projectLeadStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["convertProjectLeadStatusToObject"])(rawData, masterData?.lead_statuses || []);
            return converted;
        }
    }["useMasterDataLookup.useMemo[projectLeadStatuses]"], [
        masterData
    ]);
    const getStatusLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getStatusLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.lead_statuses.find({
                "useMasterDataLookup.useCallback[getStatusLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getStatusLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getStatusLabel]"], [
        masterData
    ]);
    const getProjectLeadStatusLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getProjectLeadStatusLabel]": (projectLeadStatusId)=>{
            if (!projectLeadStatusId) return '--';
            for (const project of projectLeadStatuses){
                if (Array.isArray(project.status)) {
                    const match = project.status.find({
                        "useMasterDataLookup.useCallback[getProjectLeadStatusLabel].match": (s)=>Number(s.id) === Number(projectLeadStatusId)
                    }["useMasterDataLookup.useCallback[getProjectLeadStatusLabel].match"]);
                    if (match) return match.description;
                }
            }
            return '--';
        }
    }["useMasterDataLookup.useCallback[getProjectLeadStatusLabel]"], [
        projectLeadStatuses
    ]);
    const getCustomerStatusLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getCustomerStatusLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.customer_statuses.find({
                "useMasterDataLookup.useCallback[getCustomerStatusLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getCustomerStatusLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getCustomerStatusLabel]"], [
        masterData
    ]);
    const getProjectLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getProjectLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.projects.find({
                "useMasterDataLookup.useCallback[getProjectLabel]": (p)=>p.id === id
            }["useMasterDataLookup.useCallback[getProjectLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getProjectLabel]"], [
        masterData
    ]);
    const getSourceLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getSourceLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.sources.find({
                "useMasterDataLookup.useCallback[getSourceLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getSourceLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getSourceLabel]"], [
        masterData
    ]);
    const getRmLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getRmLabel]": (id)=>{
            if (!id) return '--';
            const rm = rms.find({
                "useMasterDataLookup.useCallback[getRmLabel].rm": (r)=>r.id === id
            }["useMasterDataLookup.useCallback[getRmLabel].rm"]);
            return rm ? `${rm.first_name} ${rm.last_name}` : '--';
        }
    }["useMasterDataLookup.useCallback[getRmLabel]"], [
        rms
    ]);
    const getEmLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getEmLabel]": (id)=>{
            if (!id) return '--';
            const em = ems.find({
                "useMasterDataLookup.useCallback[getEmLabel].em": (e)=>e.id === id
            }["useMasterDataLookup.useCallback[getEmLabel].em"]);
            return em ? `${em.first_name} ${em.last_name}` : '--';
        }
    }["useMasterDataLookup.useCallback[getEmLabel]"], [
        ems
    ]);
    const getBranchLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getBranchLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.branches?.find({
                "useMasterDataLookup.useCallback[getBranchLabel]": (b)=>b.id === id
            }["useMasterDataLookup.useCallback[getBranchLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getBranchLabel]"], [
        masterData
    ]);
    const getSpecialisationLabel = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "useMasterDataLookup.useCallback[getSpecialisationLabel]": (id)=>{
            if (!id) return '--';
            return masterData?.specialisations?.find({
                "useMasterDataLookup.useCallback[getSpecialisationLabel]": (s)=>s.id === id
            }["useMasterDataLookup.useCallback[getSpecialisationLabel]"])?.description || `ID: ${id}`;
        }
    }["useMasterDataLookup.useCallback[getSpecialisationLabel]"], [
        masterData
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "useMasterDataLookup.useMemo": ()=>({
                getStatusLabel,
                getProjectLeadStatusLabel,
                getCustomerStatusLabel,
                getProjectLabel,
                getSourceLabel,
                getBranchLabel,
                getSpecialisationLabel,
                getRmLabel,
                getEmLabel,
                rms,
                ems,
                masterData,
                projectLeadStatuses,
                isLoading: !masterData && (rms.length === 0 || ems.length === 0)
            })
    }["useMasterDataLookup.useMemo"], [
        getStatusLabel,
        getProjectLeadStatusLabel,
        getCustomerStatusLabel,
        getProjectLabel,
        getSourceLabel,
        getBranchLabel,
        getSpecialisationLabel,
        getRmLabel,
        getEmLabel,
        masterData,
        projectLeadStatuses,
        rms.length,
        ems.length
    ]);
};
_s(useMasterDataLookup, "q9QcMsfQBlXOKEipNMu91V5VZEM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$users$2f$api$2f$usersApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllUsersByRoleIdQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/hooks/usePermissions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "usePermissions",
    ()=>usePermissions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/permissions.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
const usePermissions = ()=>{
    _s();
    const { currentRole, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "usePermissions.useSelector": (state)=>state.auth
    }["usePermissions.useSelector"]);
    const roleCode = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "usePermissions.useMemo[roleCode]": ()=>currentRole?.code ?? ''
    }["usePermissions.useMemo[roleCode]"], [
        currentRole
    ]);
    const permissions = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "usePermissions.useMemo[permissions]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$permissions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][roleCode] ?? []
    }["usePermissions.useMemo[permissions]"], [
        roleCode
    ]);
    const can = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useCallback({
        "usePermissions.useCallback[can]": (permission)=>permissions.includes(permission)
    }["usePermissions.useCallback[can]"], [
        permissions
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "usePermissions.useMemo": ()=>({
                can,
                currentRole,
                roleCode,
                permissions,
                user
            })
    }["usePermissions.useMemo"], [
        can,
        currentRole,
        roleCode,
        permissions,
        user
    ]);
};
_s(usePermissions, "fcB8mzexKzouMrkpPTZGy+e0uZI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/shared/utils/localStorage.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * A type-safe wrapper for localStorage with JSON parsing/stringifying
 */ __turbopack_context__.s([
    "storage",
    ()=>storage
]);
const storage = {
    /**
   * Get an item from localStorage
   */ get: (key, defaultValue)=>{
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return defaultValue;
        }
    },
    /**
   * Set an item in localStorage
   */ set: (key, value)=>{
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error writing localStorage key "${key}":`, error);
        }
    },
    /**
   * Remove an item from localStorage
   */ remove: (key)=>{
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error);
        }
    },
    /**
   * Clear all items from localStorage
   */ clear: ()=>{
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getProjectStatusOptions",
    ()=>getProjectStatusOptions
]);
const getProjectStatusOptions = (projectId, projectLeadStatuses)=>{
    const project = (projectLeadStatuses || []).find((item)=>Number(item.project_id) === Number(projectId));
    if (!project || !Array.isArray(project.status)) return [];
    return project.status.map((projectStatus)=>({
            id: projectStatus.id,
            value: projectStatus.lead_status_id,
            label: projectStatus.description || "",
            lead_status_id: projectStatus.lead_status_id
        }));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$projectLeadStatus$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/projectLeadStatus.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$getProjectStatusOptions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/getProjectStatusOptions.ts [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const formatDate = (dateString)=>{
    if (!dateString) return '---';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '---';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/projectLeadStatus.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "convertProjectLeadStatusToObject",
    ()=>convertProjectLeadStatusToObject
]);
const convertProjectLeadStatusToObject = (projectLeadStatuses, leadStatuses)=>{
    return (projectLeadStatuses || []).map((project)=>({
            project_id: project.project_id,
            status: Array.isArray(project.status) ? project.status.slice(1) // remove header row ["id", "lead_status_id"]
            .map(([id, lead_status_id])=>{
                const parsedId = Number(id);
                const parsedLeadStatusId = Number(lead_status_id);
                const leadStatus = (leadStatuses || []).find((item)=>Number(item.id) === parsedLeadStatusId);
                return {
                    id: parsedId,
                    lead_status_id: parsedLeadStatusId,
                    description: leadStatus?.description || ""
                };
            }) : []
        }));
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_16uvb_0._.js.map