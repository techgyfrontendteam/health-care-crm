(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/features/leads/components/ChatMessageContent.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessageContent",
    ()=>ChatMessageContent,
    "parseLocationUrlOrData",
    ()=>parseLocationUrlOrData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
;
;
const parseLocationUrlOrData = (input)=>{
    if (!input || typeof input !== 'string') return null;
    const str = input.trim();
    // 1. JSON location object check
    if (str.startsWith('{') || str.startsWith('[')) {
        try {
            const parsed = JSON.parse(str);
            const locObj = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed.location || parsed.geo || parsed : null;
            if (locObj && typeof locObj === 'object') {
                const lat = Number(locObj.latitude ?? locObj.lat);
                const lng = Number(locObj.longitude ?? locObj.lng ?? locObj.lon);
                if (!isNaN(lat) && !isNaN(lng) && (lat !== 0 || lng !== 0)) {
                    const mapUrl = locObj.url || `https://www.google.com/maps?q=${lat},${lng}`;
                    return {
                        latitude: lat,
                        longitude: lng,
                        name: locObj.name || locObj.title || 'Shared Location',
                        address: locObj.address || locObj.location_address,
                        url: mapUrl
                    };
                }
            }
        } catch  {
        // ignore JSON parse error
        }
    }
    // 2. Google Maps / Apple Maps / Map URLs check
    const isMapHost = /maps\.google\.|google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|maps\.apple\.|openstreetmap\.org|waze\.com/i.test(str);
    const coordMatch = str.match(/(?:q=|ll=|loc:|center=|=|@)?\s*([-+]?\d{1,2}\.\d+)\s*,\s*([-+]?\d{1,3}\.\d+)/i) || str.match(/q=loc:([-+]?\d{1,2}\.\d+)\+([-+]?\d{1,3}\.\d+)/i);
    if (isMapHost || coordMatch) {
        let lat = null;
        let lng = null;
        if (coordMatch) {
            const parsedLat = parseFloat(coordMatch[1]);
            const parsedLng = parseFloat(coordMatch[2]);
            if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
                lat = parsedLat;
                lng = parsedLng;
            }
        }
        const mapUrl = str.startsWith('http://') || str.startsWith('https://') ? str : lat !== null && lng !== null ? `https://www.google.com/maps?q=${lat},${lng}` : `https://${str}`;
        return {
            latitude: lat,
            longitude: lng,
            name: 'Shared Location',
            address: isMapHost ? 'Google Maps Location' : undefined,
            url: mapUrl
        };
    }
    // 3. Plain coordinates string check e.g., "17.437462, 78.448288"
    const plainCoordMatch = str.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|(\d{1,2}))(\.\d+)?)$/);
    if (plainCoordMatch) {
        const parts = str.split(',').map((s)=>parseFloat(s.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return {
                latitude: parts[0],
                longitude: parts[1],
                name: 'Shared Location',
                url: `https://www.google.com/maps?q=${parts[0]},${parts[1]}`
            };
        }
    }
    return null;
};
const parseMessageContent = (content)=>{
    if (!content || typeof content !== 'string') {
        return {
            type: 'text',
            text: content || ''
        };
    }
    // 1. Check if it's a Location URL, JSON, or coordinates
    const locData = parseLocationUrlOrData(content);
    if (locData) {
        return {
            type: 'location',
            location: {
                latitude: locData.latitude ?? undefined,
                longitude: locData.longitude ?? undefined,
                name: locData.name,
                address: locData.address,
                url: locData.url
            }
        };
    }
    const trimmed = content.trim();
    if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
            const parsed = JSON.parse(trimmed);
            // 2. Check if it's a Contact array or object
            const items = Array.isArray(parsed) ? parsed : [
                parsed
            ];
            if (items.length > 0 && items.every((item)=>item && typeof item === 'object' && (item.name || item.phones || item.vcard))) {
                const contacts = items.map((item)=>{
                    let displayName = 'Shared Contact';
                    if (typeof item.name === 'string') {
                        displayName = item.name;
                    } else if (item.name && typeof item.name === 'object') {
                        displayName = item.name.formatted_name || item.name.first_name || item.name.last_name || 'Shared Contact';
                    }
                    const phonesList = [];
                    if (Array.isArray(item.phones)) {
                        item.phones.forEach((p)=>{
                            if (typeof p === 'string') {
                                phonesList.push({
                                    phone: p
                                });
                            } else if (p && typeof p === 'object') {
                                phonesList.push({
                                    phone: p.phone || p.wa_id || '',
                                    type: p.type,
                                    wa_id: p.wa_id
                                });
                            }
                        });
                    }
                    return {
                        name: displayName,
                        phones: phonesList,
                        vcard: typeof item.vcard === 'string' ? item.vcard : undefined
                    };
                });
                return {
                    type: 'contact',
                    contacts
                };
            }
        } catch  {
        // Not valid JSON, fall back to plain text
        }
    }
    return {
        type: 'text',
        text: content
    };
};
const handleDownloadVCard = (vcardText, contactName)=>{
    try {
        let decodedVCard = vcardText;
        if (!vcardText.trim().startsWith('BEGIN:VCARD')) {
            try {
                decodedVCard = atob(vcardText);
            } catch  {
                decodedVCard = vcardText;
            }
        }
        const blob = new Blob([
            decodedVCard
        ], {
            type: 'text/vcard;charset=utf-8;'
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const cleanName = contactName.replace(/[^a-zA-Z0-9_-]/g, '_') || 'contact';
        link.setAttribute('download', `${cleanName}.vcf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (err) {
        console.error('Failed to download vCard:', err);
    }
};
const renderTextWithLinks = (text)=>{
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/gi;
    const parts = text.split(urlRegex);
    return parts.map((part, index)=>{
        if (urlRegex.test(part)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: part,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 dark:text-blue-400 hover:underline break-all inline-flex items-center gap-0.5 font-semibold",
                onClick: (e)=>e.stopPropagation(),
                children: [
                    part,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                        className: "h-3 w-3 inline shrink-0"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, index, true, {
                fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                lineNumber: 258,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        return part;
    });
};
const ChatMessageContent = ({ content, isSent = false })=>{
    if (!content) return null;
    const parsed = parseMessageContent(content);
    if (parsed.type === 'contact') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-2 my-1",
            children: parsed.contacts.map((contact, idx)=>{
                const waPhone = contact.phones.length > 0 ? (contact.phones[0].wa_id || contact.phones[0].phone).replace(/\D/g, '') : '';
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-3 flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-[#00a884]/15 dark:bg-[#00a884]/20 flex items-center justify-center shrink-0 mt-0.5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                        className: "h-5 w-5 text-[#075E54] dark:text-[#00a884]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                        lineNumber: 305,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 304,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate",
                                            children: contact.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 308,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        contact.phones.map((phoneItem, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 mt-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "h-3 w-3 text-[#00a884] shrink-0"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                        lineNumber: 316,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "truncate",
                                                        children: phoneItem.phone || phoneItem.wa_id
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    phoneItem.type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-zinc-500 dark:text-zinc-400 uppercase",
                                                        children: phoneItem.type
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                        lineNumber: 321,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                                lineNumber: 312,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 307,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 303,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-t border-black/10 dark:border-white/10 divide-x divide-black/10 dark:divide-white/10 flex bg-black/[0.02] dark:bg-white/[0.02]",
                            children: [
                                waPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: `https://wa.me/${waPhone}`,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    className: "flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 339,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Message"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 340,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 333,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)),
                                contact.vcard && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        handleDownloadVCard(contact.vcard, contact.name);
                                    },
                                    className: "flex-1 py-2 px-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 351,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Save Contact"
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                            lineNumber: 352,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 344,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 331,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, idx, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 298,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0));
            })
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
            lineNumber: 290,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (parsed.type === 'location') {
        const { latitude, longitude, name, address, url } = parsed.location;
        const googleMapsUrl = url || (latitude != null && longitude != null ? `https://www.google.com/maps?q=${latitude},${longitude}` : '#');
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-28 relative bg-[#e5e0d8] dark:bg-[#1a2328] flex items-center justify-center overflow-hidden",
                    style: {
                        backgroundImage: 'radial-gradient(#00a884 0.75px, transparent 0.75px), radial-gradient(#00a884 0.75px, #e5e0d8 0.75px)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-[#ea4335] text-white flex items-center justify-center shadow-md z-10 border-2 border-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "h-5 w-5 fill-current"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                        lineNumber: 383,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 382,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-1.5 bg-black/20 rounded-full mt-0.5 blur-[1px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 385,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 381,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                    className: "h-2.5 w-2.5 text-[#4285f4]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 388,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Location"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                                    lineNumber: 389,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 387,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 371,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate",
                            children: name || 'Shared Location'
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 395,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-0.5",
                            children: address
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 399,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        latitude != null && longitude != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1",
                            children: [
                                latitude.toFixed(6),
                                ", ",
                                longitude.toFixed(6)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 404,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 394,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: googleMapsUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e)=>e.stopPropagation(),
                    className: "border-t border-black/10 dark:border-white/10 py-2.5 px-3 text-center text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 418,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "View on Google Maps"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                            lineNumber: 419,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
                    lineNumber: 411,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
            lineNumber: 369,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "whitespace-pre-wrap leading-relaxed",
        children: renderTextWithLinks(parsed.text)
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/ChatMessageContent.tsx",
        lineNumber: 425,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ChatMessageContent;
var _c;
__turbopack_context__.k.register(_c, "ChatMessageContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ChatMessageMedia.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatMessageMedia",
    ()=>ChatMessageMedia,
    "getMediaType",
    ()=>getMediaType
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/components/ChatMessageContent.tsx [app-client] (ecmascript)");
;
;
;
const getMediaType = (url)=>{
    if (!url) return 'unknown';
    try {
        const cleanUrl = url.split('?')[0].toLowerCase();
        if (/\.(jpg|jpeg|png|gif|webp|bmp|svg|tiff)$/i.test(cleanUrl)) {
            return 'image';
        }
        if (/\.(mp4|3gp|mov|avi|webm|mkv|flv|wmv)$/i.test(cleanUrl)) {
            return 'video';
        }
        if (/\.(mp3|ogg|wav|m4a|aac|flac|wma|opus)$/i.test(cleanUrl)) {
            return 'audio';
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLocationUrlOrData"])(url)) {
            return 'location';
        }
        return 'document';
    } catch  {
        return 'document';
    }
};
const ChatMessageMedia = ({ mediaUrl, isSent = false })=>{
    if (!mediaUrl) return null;
    const mediaType = getMediaType(mediaUrl);
    const cleanPath = mediaUrl.split('?')[0];
    const rawFileName = cleanPath.split('/').pop() || 'Attachment';
    const fileName = decodeURIComponent(rawFileName);
    const fileExt = fileName.includes('.') ? fileName.split('.').pop()?.toUpperCase() : 'FILE';
    if (mediaType === 'image') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 max-w-[260px] sm:max-w-[300px] bg-black/5 dark:bg-white/5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: mediaUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "block cursor-pointer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: mediaUrl,
                        alt: "WhatsApp Image",
                        className: "w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-200 max-h-[300px]",
                        loading: "lazy",
                        onError: (e)=>{
                            // If image fails to load as an img tag, hide img and show fallback link
                            e.currentTarget.style.display = 'none';
                            const fallback = e.currentTarget.parentElement?.nextElementSibling;
                            if (fallback) fallback.style.display = 'flex';
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                        lineNumber: 46,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: mediaUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                        display: 'none'
                    },
                    className: "p-3 items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                            className: "w-4 h-4 flex-shrink-0"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: "Open Image Attachment"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 59,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 44,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (mediaType === 'video') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-lg overflow-hidden border border-black/10 dark:border-white/10 max-w-[280px] sm:max-w-[320px] bg-black",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                src: mediaUrl,
                controls: true,
                className: "w-full h-auto max-h-[300px]",
                preload: "metadata",
                children: "Your browser does not support video playback."
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (mediaType === 'audio') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 py-1 min-w-[220px] max-w-[280px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("audio", {
                src: mediaUrl,
                controls: true,
                className: "w-full h-9",
                preload: "metadata"
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 90,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const locationData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$components$2f$ChatMessageContent$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseLocationUrlOrData"])(mediaUrl);
    if (mediaType === 'location' || locationData) {
        const { latitude, longitude, name, address, url } = locationData || {
            url: mediaUrl,
            name: 'Shared Location'
        };
        const googleMapsUrl = url || (latitude != null && longitude != null ? `https://www.google.com/maps?q=${latitude},${longitude}` : mediaUrl);
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-1 rounded-xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/[0.03] dark:bg-white/[0.05] min-w-[240px] max-w-[300px] shadow-sm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-28 relative bg-[#e5e0d8] dark:bg-[#1a2328] flex items-center justify-center overflow-hidden",
                    style: {
                        backgroundImage: 'radial-gradient(#00a884 0.75px, transparent 0.75px), radial-gradient(#00a884 0.75px, #e5e0d8 0.75px)',
                        backgroundSize: '20px 20px',
                        backgroundPosition: '0 0, 10px 10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-10 h-10 rounded-full bg-[#ea4335] text-white flex items-center justify-center shadow-md z-10 border-2 border-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "h-5 w-5 fill-current"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-3 h-1.5 bg-black/20 rounded-full mt-0.5 blur-[1px]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 122,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 118,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"], {
                                    className: "h-2.5 w-2.5 text-[#4285f4]"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Location"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                                    lineNumber: 126,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate",
                            children: name || 'Shared Location'
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs text-zinc-600 dark:text-zinc-300 line-clamp-2 mt-0.5",
                            children: address
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        latitude != null && longitude != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-1",
                            children: [
                                latitude.toFixed(6),
                                ", ",
                                longitude.toFixed(6)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: googleMapsUrl,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    onClick: (e)=>e.stopPropagation(),
                    className: "border-t border-black/10 dark:border-white/10 py-2.5 px-3 text-center text-xs font-semibold text-[#075E54] dark:text-[#00a884] hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-1.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 155,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "View on Google Maps"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                            lineNumber: 156,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
            lineNumber: 106,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // Document or fallback
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: mediaUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        className: `my-1 flex items-center gap-3 p-2.5 rounded-lg border transition-colors ${isSent ? 'bg-emerald-800/10 border-emerald-700/20 hover:bg-emerald-800/20 text-zinc-900 dark:text-zinc-100' : 'bg-zinc-100 dark:bg-zinc-700/50 border-zinc-200 dark:border-zinc-600 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100'}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-2 rounded-md bg-white dark:bg-zinc-800 shadow-sm flex-shrink-0",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                    className: "w-5 h-5 text-emerald-600 dark:text-emerald-400"
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                    lineNumber: 175,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold truncate",
                        title: fileName,
                        children: fileName
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] opacity-75 uppercase font-medium",
                        children: [
                            fileExt || 'DOCUMENT',
                            " • Click to view"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "w-4 h-4 opacity-75 flex-shrink-0 ml-1"
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/components/ChatMessageMedia.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ChatMessageMedia;
var _c;
__turbopack_context__.k.register(_c, "ChatMessageMedia");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/PointsToTalkDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PointsToTalkDialog",
    ()=>PointsToTalkDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$prompts$2f$api$2f$promptApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/prompts/api/promptApi.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
const defaultQuestions = [
    "Did the agent greet the customer professionally?",
    "Did the agent ask for the customer's requirement/needs?",
    "Did the agent explain the project or product details?",
    "Did the agent mention the price or budget clearly?",
    "Did the agent handle customer objections or questions effectively?",
    "Did the agent verify the customer's contact information (Phone/Email)?",
    "Did the agent introduce themselves and the company clearly?"
];
const PointsToTalkDialog = ({ project, status, projectLeadStatusId })=>{
    _s();
    const { data: pointsData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$prompts$2f$api$2f$promptApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetProjectStatusChecklistQuery"])({
        project_lead_status_id: Number(projectLeadStatusId)
    }, {
        skip: !projectLeadStatusId
    });
    const displayQuestions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "PointsToTalkDialog.useMemo[displayQuestions]": ()=>{
            if (pointsData && pointsData.success && Array.isArray(pointsData.data) && pointsData.data.length > 0) {
                return pointsData.data.map({
                    "PointsToTalkDialog.useMemo[displayQuestions]": (q)=>typeof q === "string" ? q : q?.description || ""
                }["PointsToTalkDialog.useMemo[displayQuestions]"]);
            }
            return defaultQuestions;
        }
    }["PointsToTalkDialog.useMemo[displayQuestions]"], [
        pointsData
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "flex items-center justify-center px-5 h-9 bg-[#063669] hover:bg-[#063669]/90 text-white rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Points to Talk"
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                        lineNumber: 44,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                align: "end",
                sideOffset: 10,
                alignOffset: 60,
                className: "relative w-[95vw] md:w-[720px] 2xl:w-[850px] max-h-[60vh] 2xl:max-h-[70vh] flex flex-col p-0 border border-zinc-100 bg-white shadow-[0px_20px_50px_rgba(0,21,73,0.05)] rounded-[24px] 2xl:rounded-[32px] [&>button:not(.edit-btn)]:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-none flex flex-row items-center px-6 py-6 2xl:px-8 2xl:py-8 gap-4 flex-wrap",
                        children: [
                            project && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-inter font-bold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] tracking-[1.6px] uppercase text-[rgba(0,21,73,0.6)]",
                                        children: "PROJECT:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                        lineNumber: 58,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center px-4 h-[40px] 2xl:h-[48px] bg-[#F2F4F6] rounded-lg min-w-[100px] 2xl:min-w-[120px] mr-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-inter font-semibold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] text-[#063669]",
                                            children: project
                                        }, void 0, false, {
                                            fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                            lineNumber: 62,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                        lineNumber: 61,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                lineNumber: 57,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-inter font-bold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] tracking-[1.6px] uppercase text-[rgba(0,21,73,0.6)]",
                                children: "LEAD STATUS:"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center px-4 h-[40px] 2xl:h-[48px] bg-[#F2F4F6] rounded-lg min-w-[100px] 2xl:min-w-[120px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-inter font-semibold text-[14px] 2xl:text-[16px] leading-[20px] 2xl:leading-[24px] text-[#063669]",
                                    children: status || "New Lead"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 flex flex-col gap-3 2xl:gap-4 px-8 2xl:px-12 pb-8 2xl:pb-12 overflow-y-auto",
                        children: displayQuestions.map((q, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-none flex flex-row items-center p-5 2xl:p-6 bg-[#F2F4F6] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-[12px] 2xl:rounded-[16px] min-h-[60px] 2xl:min-h-[70px]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-['Plus_Jakarta_Sans'] font-bold text-[14px] 2xl:text-[16px] leading-[18px] 2xl:leading-[20px] text-[#001549]",
                                    children: q
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                    lineNumber: 85,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, idx, false, {
                                fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/features/leads/components/PointsToTalkDialog.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PointsToTalkDialog, "7p3bpQlDiFgOhvsfN5UzbUW5k0g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$prompts$2f$api$2f$promptApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetProjectStatusChecklistQuery"]
    ];
});
_c = PointsToTalkDialog;
var _c;
__turbopack_context__.k.register(_c, "PointsToTalkDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScheduleSurgeryDialog",
    ()=>ScheduleSurgeryDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-check.js [app-client] (ecmascript) <export default as UserCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/indian-rupee.js [app-client] (ecmascript) <export default as IndianRupee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/doctors/api/doctorsApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
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
const ScheduleSurgeryDialog = ({ open, onOpenChange, onClose, lead, surgery, onSuccess })=>{
    _s();
    // Master Data
    const { data: masterData, isLoading: isLoadingMasterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    // Doctors list (fetch all doctors without filter as required)
    const { data: doctorsResp, isLoading: isLoadingDoctors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"])({
        branch_id: 0,
        specialization_id: 0
    });
    const [createSurgery, { isLoading: isCreating }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateSurgeryMutation"])();
    const [updateSurgery, { isLoading: isUpdating }] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateSurgeryMutation"])();
    const isSubmitting = isCreating || isUpdating;
    const handleClose = ()=>{
        if (onOpenChange) onOpenChange(false);
        if (onClose) onClose();
    };
    // Derived location / branch / specialization details for badge card
    const derivedBranchId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleSurgeryDialog.useMemo[derivedBranchId]": ()=>{
            const bId = surgery?.branch_id || surgery?.location_id || lead?.branch_id || lead?.location_id;
            if (bId && !isNaN(Number(bId)) && Number(bId) > 0) return Number(bId);
            const bName = surgery?.hospital_branch || surgery?.branch || lead?.hospital_branch || lead?.branch || lead?.branch_name;
            if (bName && masterData?.branches) {
                const found = masterData.branches.find({
                    "ScheduleSurgeryDialog.useMemo[derivedBranchId].found": (b)=>b.description?.toLowerCase() === String(bName).toLowerCase() || b.code?.toLowerCase() === String(bName).toLowerCase()
                }["ScheduleSurgeryDialog.useMemo[derivedBranchId].found"]);
                if (found) return found.id;
            }
            return null;
        }
    }["ScheduleSurgeryDialog.useMemo[derivedBranchId]"], [
        surgery,
        lead,
        masterData?.branches
    ]);
    const derivedSpecId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleSurgeryDialog.useMemo[derivedSpecId]": ()=>{
            const dept = surgery?.specialisation_id || surgery?.specialization_id || lead?.specialisation_id || lead?.specialization_id || lead?.department || lead?.specialization || "";
            if (!dept) return 0;
            if (!isNaN(Number(dept)) && Number(dept) > 0) return Number(dept);
            const found = masterData?.specialisations?.find({
                "ScheduleSurgeryDialog.useMemo[derivedSpecId]": (s)=>s.description?.toLowerCase() === String(dept).toLowerCase() || s.code?.toLowerCase() === String(dept).toLowerCase()
            }["ScheduleSurgeryDialog.useMemo[derivedSpecId]"]);
            return found ? found.id : 0;
        }
    }["ScheduleSurgeryDialog.useMemo[derivedSpecId]"], [
        surgery,
        lead,
        masterData?.specialisations
    ]);
    const branchObj = masterData?.branches?.find((b)=>b.id === derivedBranchId);
    const locationObj = masterData?.locations?.find((l)=>l.id === (branchObj?.location_id || lead?.location_id));
    const specObj = masterData?.specialisations?.find((s)=>s.id === derivedSpecId);
    // Doctors list normalization with fallback for selected doctor
    const doctorsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleSurgeryDialog.useMemo[doctorsList]": ()=>{
            let list = [];
            if (doctorsResp) {
                if (Array.isArray(doctorsResp)) list = doctorsResp;
                else if (Array.isArray(doctorsResp.data)) list = doctorsResp.data;
                else if (Array.isArray(doctorsResp.doctors)) list = doctorsResp.doctors;
            }
            if (surgery?.doctor_id && !list.some({
                "ScheduleSurgeryDialog.useMemo[doctorsList]": (d)=>Number(d.id) === Number(surgery.doctor_id)
            }["ScheduleSurgeryDialog.useMemo[doctorsList]"])) {
                list = [
                    {
                        id: surgery.doctor_id,
                        first_name: surgery.doctor_name || `Doctor #${surgery.doctor_id}`,
                        last_name: "",
                        specialization_id: derivedSpecId
                    },
                    ...list
                ];
            }
            return list;
        }
    }["ScheduleSurgeryDialog.useMemo[doctorsList]"], [
        doctorsResp,
        surgery,
        derivedSpecId
    ]);
    // Surgery Types from Master Data with fallback for selected surgery type
    const surgeryTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleSurgeryDialog.useMemo[surgeryTypes]": ()=>{
            let list = masterData?.surgery_types || masterData?.surgery_type || masterData?.lead_surgery_types || [];
            list = Array.isArray(list) ? [
                ...list
            ] : [];
            if (surgery?.surgery_type_id && !list.some({
                "ScheduleSurgeryDialog.useMemo[surgeryTypes]": (st)=>Number(st.id) === Number(surgery.surgery_type_id)
            }["ScheduleSurgeryDialog.useMemo[surgeryTypes]"])) {
                list = [
                    {
                        id: surgery.surgery_type_id,
                        description: surgery.surgery_type_name || `Surgery Type #${surgery.surgery_type_id}`
                    },
                    ...list
                ];
            }
            return list;
        }
    }["ScheduleSurgeryDialog.useMemo[surgeryTypes]"], [
        masterData,
        surgery
    ]);
    const DEFAULT_SURGERY_STATUSES = [
        {
            id: 1,
            code: "SCHDL",
            description: "Surgery Scheduled"
        },
        {
            id: 2,
            code: "CMP",
            description: "Surgery Completed"
        },
        {
            id: 3,
            code: "CANCEL",
            description: "Surgery Cancelled"
        },
        {
            id: 4,
            code: "RESCHD",
            description: "Surgery Rescheduled"
        }
    ];
    // Surgery Statuses from Master Data with fallback for selected status
    const surgeryStatuses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleSurgeryDialog.useMemo[surgeryStatuses]": ()=>{
            let list = masterData?.surgery_statuses || masterData?.surgery_status || masterData?.lead_surgery_statuses || [];
            if (!Array.isArray(list) || list.length === 0) {
                list = DEFAULT_SURGERY_STATUSES;
            } else {
                list = [
                    ...list
                ];
            }
            if (surgery?.surgery_status_id && !list.some({
                "ScheduleSurgeryDialog.useMemo[surgeryStatuses]": (st)=>Number(st.id) === Number(surgery.surgery_status_id)
            }["ScheduleSurgeryDialog.useMemo[surgeryStatuses]"])) {
                list = [
                    {
                        id: surgery.surgery_status_id,
                        code: surgery.surgery_status_code || "",
                        description: surgery.surgery_status_name || surgery.surgery_status_code || `Status #${surgery.surgery_status_id}`
                    },
                    ...list
                ];
            }
            return list;
        }
    }["ScheduleSurgeryDialog.useMemo[surgeryStatuses]"], [
        masterData,
        surgery
    ]);
    // Form State
    const [selectedDoctorId, setSelectedDoctorId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedSurgeryTypeId, setSelectedSurgeryTypeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedStatusId, setSelectedStatusId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [hour, setHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [minute, setMinute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [timeError, setTimeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [remarks, setRemarks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [surgeryCost, setSurgeryCost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    // Initialize values on dialog open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScheduleSurgeryDialog.useEffect": ()=>{
            if (open) {
                if (surgery) {
                    // Edit Mode: Prepopulate from surgery
                    if (surgery.doctor_id !== undefined && surgery.doctor_id !== null) {
                        setSelectedDoctorId(String(surgery.doctor_id));
                    } else if (surgery.doctor_name && doctorsList.length > 0) {
                        const docMatch = doctorsList.find({
                            "ScheduleSurgeryDialog.useEffect.docMatch": (d)=>{
                                const docFullName = `${d.first_name || ""} ${d.last_name || ""}`.trim().toLowerCase();
                                return docFullName.includes(surgery.doctor_name.toLowerCase()) || surgery.doctor_name.toLowerCase().includes(docFullName);
                            }
                        }["ScheduleSurgeryDialog.useEffect.docMatch"]);
                        setSelectedDoctorId(docMatch ? String(docMatch.id) : String(doctorsList[0]?.id || ""));
                    } else {
                        setSelectedDoctorId("");
                    }
                    if (surgery.surgery_type_id !== undefined && surgery.surgery_type_id !== null) {
                        setSelectedSurgeryTypeId(String(surgery.surgery_type_id));
                    } else if (surgeryTypes.length > 0) {
                        setSelectedSurgeryTypeId(String(surgeryTypes[0].id));
                    } else {
                        setSelectedSurgeryTypeId("");
                    }
                    if (surgery.surgery_status_id !== undefined && surgery.surgery_status_id !== null) {
                        setSelectedStatusId(String(surgery.surgery_status_id));
                    } else if (surgeryStatuses.length > 0) {
                        setSelectedStatusId(String(surgeryStatuses[0].id));
                    } else {
                        setSelectedStatusId("");
                    }
                    setRemarks(surgery.surgery_remarks || "");
                    setSurgeryCost(surgery.surgery_cost !== undefined && surgery.surgery_cost !== null ? String(surgery.surgery_cost) : "");
                    setTimeError("");
                    if (surgery.surgery_date_time) {
                        try {
                            const validStr = surgery.surgery_date_time.replace(/Z/g, "").split("+")[0].replace(" ", "T");
                            const d = new Date(validStr);
                            if (!isNaN(d.getTime())) {
                                setDate(d);
                                let h = d.getHours();
                                const p = h >= 12 ? "PM" : "AM";
                                h = h % 12;
                                h = h ? h : 12;
                                setHour(String(h).padStart(2, "0"));
                                setMinute(String(d.getMinutes()).padStart(2, "0"));
                                setPeriod(p);
                            }
                        } catch (e) {
                            console.error("Error parsing surgery date:", e);
                        }
                    }
                } else {
                    // Create Mode: Default to tomorrow 09:00 AM
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    setDate(tomorrow);
                    setHour("09");
                    setMinute("00");
                    setPeriod("AM");
                    setTimeError("");
                    // Default Doctor
                    if (lead?.doctor_name && doctorsList.length > 0) {
                        const docMatch = doctorsList.find({
                            "ScheduleSurgeryDialog.useEffect.docMatch": (d)=>{
                                const docFullName = `${d.first_name || ""} ${d.last_name || ""}`.trim().toLowerCase();
                                return docFullName.includes(lead.doctor_name.toLowerCase()) || lead.doctor_name.toLowerCase().includes(docFullName);
                            }
                        }["ScheduleSurgeryDialog.useEffect.docMatch"]);
                        if (docMatch) {
                            setSelectedDoctorId(String(docMatch.id));
                        } else {
                            setSelectedDoctorId(String(doctorsList[0]?.id || ""));
                        }
                    } else if (doctorsList.length > 0) {
                        setSelectedDoctorId(String(doctorsList[0]?.id || ""));
                    } else {
                        setSelectedDoctorId("");
                    }
                    // Default Surgery Type
                    if (surgeryTypes.length > 0) {
                        setSelectedSurgeryTypeId(String(surgeryTypes[0].id));
                    } else {
                        setSelectedSurgeryTypeId("");
                    }
                    // Default Surgery Status
                    if (surgeryStatuses.length > 0) {
                        const defaultStatus = surgeryStatuses.find({
                            "ScheduleSurgeryDialog.useEffect": (s)=>(s.code || s.description || "").toUpperCase().includes("SCHD") || (s.description || "").toUpperCase().includes("SCHEDULE")
                        }["ScheduleSurgeryDialog.useEffect"]) || surgeryStatuses[0];
                        setSelectedStatusId(String(defaultStatus.id));
                    } else {
                        setSelectedStatusId("");
                    }
                    setRemarks("");
                    setSurgeryCost("");
                }
            }
        }
    }["ScheduleSurgeryDialog.useEffect"], [
        open,
        surgery,
        lead,
        doctorsList,
        surgeryTypes,
        surgeryStatuses
    ]);
    // Form Submit Handler
    const handleFormSubmit = async (e)=>{
        e.preventDefault();
        if (!surgery && !lead?.uuid) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Invalid lead record. Please try again.");
            return;
        }
        if (!selectedDoctorId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a doctor");
            return;
        }
        if (!selectedSurgeryTypeId) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a surgery type");
            return;
        }
        if (!date || !hour || !minute || !period) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select both surgery date and time");
            return;
        }
        let hrs = parseInt(hour);
        if (period === "PM" && hrs !== 12) hrs += 12;
        if (period === "AM" && hrs === 12) hrs = 0;
        const now = new Date();
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(hrs);
        selectedDateTime.setMinutes(parseInt(minute));
        selectedDateTime.setSeconds(0);
        if (!surgery && selectedDateTime < now) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot schedule surgery in the past");
            return;
        }
        if (!surgeryCost || isNaN(Number(surgeryCost)) || Number(surgeryCost) < 0) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please enter a valid surgery cost");
            return;
        }
        const pad = (n)=>String(n).padStart(2, "0");
        const formattedDateTime = `${selectedDateTime.getFullYear()}-${pad(selectedDateTime.getMonth() + 1)}-${pad(selectedDateTime.getDate())} ${pad(selectedDateTime.getHours())}:${pad(selectedDateTime.getMinutes())}:${pad(selectedDateTime.getSeconds())}`;
        if (surgery) {
            const payload = {
                surgery_id: Number(surgery.surgery_id || surgery.id),
                doctor_id: Number(selectedDoctorId),
                surgery_type_id: Number(selectedSurgeryTypeId),
                surgery_date_time: formattedDateTime,
                surgery_status_id: Number(selectedStatusId || 1),
                surgery_remarks: remarks.trim(),
                surgery_cost: Number(surgeryCost),
                is_active: surgery.is_active ?? 1
            };
            console.log("=== [API] updateSurgery Payload ===", payload);
            try {
                const res = await updateSurgery(payload).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res?.message || "Surgery updated successfully!");
                handleClose();
                if (onSuccess) onSuccess();
            } catch (err) {
                console.error("Failed to update surgery:", err);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || err?.message || "Failed to update surgery");
            }
        } else {
            const payload = {
                lead_uuid: lead.uuid,
                doctor_id: Number(selectedDoctorId),
                surgery_type_id: Number(selectedSurgeryTypeId),
                surgery_date_time: selectedDateTime.toISOString(),
                surgery_status_id: Number(selectedStatusId || 1),
                surgery_remarks: remarks.trim(),
                surgery_cost: Number(surgeryCost)
            };
            console.log("=== [API] createSurgery Payload ===", payload);
            try {
                const res = await createSurgery(payload).unwrap();
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success(res?.message || "Surgery scheduled successfully!");
                handleClose();
                if (onSuccess) onSuccess();
            } catch (err) {
                console.error("Failed to schedule surgery:", err);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err?.data?.message || err?.message || "Failed to schedule surgery");
            }
        }
    };
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                        className: "h-5 w-5 text-[#063669] dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    surgery ? "Edit Surgery" : "Schedule Surgery"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 422,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500 mt-0.5",
                                children: surgery ? `Update surgery details for ${lead?.first_name || ""} ${lead?.last_name || ""}`.trim() : lead ? `Schedule a surgery for ${lead.first_name || ""} ${lead.last_name || ""}`.trim() : "Schedule a surgery for a lead"
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 426,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                        lineNumber: 421,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                    lineNumber: 420,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        id: "schedule-surgery-form",
                        onSubmit: handleFormSubmit,
                        className: "space-y-4 text-sm",
                        children: [
                            lead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-xs",
                                children: [
                                    locationObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 448,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Location: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: locationObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 449,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 449,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 447,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    branchObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 454,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Branch: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: branchObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 455,
                                                        columnNumber: 35
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 455,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 453,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    specObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 460,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Dept: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: specObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 461,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 461,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 459,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 445,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                                        className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Select Doctor ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 472,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 470,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isLoadingDoctors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-3 w-3 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 476,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Loading doctors..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 475,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 469,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: selectedDoctorId,
                                        onValueChange: setSelectedDoctorId,
                                        disabled: isSubmitting || isLoadingDoctors,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: isLoadingDoctors ? "Loading available doctors..." : doctorsList.length === 0 ? "No doctors found" : "-- Select Doctor * --"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                    lineNumber: 487,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 486,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60",
                                                children: doctorsList.map((doc)=>{
                                                    const specTitle = masterData?.specialisations?.find((s)=>s.id === doc.specialization_id)?.description || "";
                                                    const nameStr = doc.first_name?.startsWith("Dr.") ? `${doc.first_name} ${doc.last_name || ""}`.trim() : `Dr. ${doc.first_name || ""} ${doc.last_name || ""}`.trim();
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(doc.id),
                                                        className: "text-black dark:text-white cursor-pointer py-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-xs",
                                                                    children: nameStr
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                                    lineNumber: 512,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                (doc.education || specTitle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-zinc-400",
                                                                    children: [
                                                                        doc.education,
                                                                        specTitle
                                                                    ].filter(Boolean).join(" • ")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                                    lineNumber: 514,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                            lineNumber: 511,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, doc.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 506,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 497,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `doctor-${selectedDoctorId}-${doctorsList.length}`, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 468,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                                                        className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 530,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Surgery Type ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 32
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 529,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isLoadingMasterData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-3 w-3 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 535,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Loading types..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 534,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 528,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: selectedSurgeryTypeId,
                                        onValueChange: setSelectedSurgeryTypeId,
                                        disabled: isSubmitting || isLoadingMasterData,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: isLoadingMasterData ? "Loading surgery types..." : surgeryTypes.length === 0 ? "No surgery types found" : "-- Select Surgery Type * --"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                    lineNumber: 546,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 545,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60",
                                                children: surgeryTypes.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(st.id),
                                                        className: "text-black dark:text-white cursor-pointer text-xs py-2",
                                                        children: st.description || st.name || st.code || `Type ${st.id}`
                                                    }, st.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 558,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 556,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `type-${selectedSurgeryTypeId}-${surgeryTypes.length}`, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 527,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: [
                                                    "Surgery Date ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 32
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 574,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                value: date,
                                                onChange: (val, d)=>{
                                                    setDate(d);
                                                    setTimeError("");
                                                },
                                                disablePastDates: !surgery,
                                                placeholder: "Select surgery date"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 577,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 573,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: [
                                                    "Surgery Time ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 591,
                                                        columnNumber: 32
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 590,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePicker"], {
                                                value: hour && minute && period ? `${hour}:${minute} ${period}` : "",
                                                outputFormat: "12h",
                                                placeholder: "Select surgery time",
                                                onChange: (val)=>{
                                                    if (!val) {
                                                        setHour("");
                                                        setMinute("");
                                                        setPeriod("");
                                                        return;
                                                    }
                                                    const parts = val.split(" ");
                                                    const timeParts = parts[0]?.split(":") || [];
                                                    const h = timeParts[0] || "";
                                                    const m = timeParts[1] || "";
                                                    const p = parts[1]?.toUpperCase() || "AM";
                                                    setHour(h);
                                                    setMinute(m);
                                                    setPeriod(p);
                                                    setTimeError("");
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 593,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 589,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserCheck$3e$__["UserCheck"], {
                                                        className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 622,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Surgery Status ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 623,
                                                        columnNumber: 34
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 621,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isLoadingMasterData && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-3 w-3 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 627,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Loading statuses..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 626,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 620,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: selectedStatusId,
                                        onValueChange: setSelectedStatusId,
                                        disabled: isSubmitting || isLoadingMasterData,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: isLoadingMasterData ? "Loading statuses..." : surgeryStatuses.length === 0 ? "No surgery statuses found" : "Select Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 637,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60",
                                                children: surgeryStatuses.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(st.id),
                                                        className: "text-black dark:text-white cursor-pointer text-xs py-2",
                                                        children: st.description || st.name || st.code || `Status ${st.id}`
                                                    }, st.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                        lineNumber: 650,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 648,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `status-${selectedStatusId}-${surgeryStatuses.length}`, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 619,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "surgery_cost",
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$indian$2d$rupee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__IndianRupee$3e$__["IndianRupee"], {
                                                    className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Surgery Cost ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-red-500",
                                                    children: "*"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 32
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                            lineNumber: 665,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 664,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold",
                                                    children: "₹"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                    lineNumber: 672,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 671,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                id: "surgery_cost",
                                                type: "number",
                                                min: "0",
                                                step: "any",
                                                placeholder: "Enter surgery cost (e.g. 50000)",
                                                disabled: isSubmitting,
                                                value: surgeryCost,
                                                onChange: (e)=>setSurgeryCost(e.target.value),
                                                className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-8 pr-3 h-11 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all placeholder:text-zinc-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 674,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 670,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 663,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "surgery_remarks",
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: "Surgery Remarks"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 692,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 font-bold",
                                                children: [
                                                    remarks.length,
                                                    "/500"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                                lineNumber: 695,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 691,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "surgery_remarks",
                                        maxLength: 500,
                                        placeholder: "Enter surgery remarks (up to 500 characters)...",
                                        disabled: isSubmitting,
                                        value: remarks,
                                        onChange: (e)=>setRemarks(e.target.value),
                                        rows: 3,
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all resize-none placeholder:text-zinc-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                        lineNumber: 438,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                    lineNumber: 437,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            onClick: handleClose,
                            disabled: isSubmitting,
                            className: "rounded-xl text-xs font-bold h-10 px-5",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                            lineNumber: 715,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            form: "schedule-surgery-form",
                            disabled: isSubmitting,
                            className: "rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2",
                            children: [
                                isSubmitting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                                    lineNumber: 730,
                                    columnNumber: 30
                                }, ("TURBOPACK compile-time value", void 0)),
                                surgery ? "Update Surgery" : "Schedule Surgery"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                            lineNumber: 724,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
                    lineNumber: 714,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
            lineNumber: 418,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/ScheduleSurgeryDialog.tsx",
        lineNumber: 417,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ScheduleSurgeryDialog, "15VMVT96GeuIWcJUC+hFSZppxAA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCreateSurgeryMutation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateSurgeryMutation"]
    ];
});
_c = ScheduleSurgeryDialog;
var _c;
__turbopack_context__.k.register(_c, "ScheduleSurgeryDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/features/leads/components/ScheduleVisitDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScheduleVisitDialog",
    ()=>ScheduleVisitDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-hook-form/dist/index.esm.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@hookform/resolvers/zod/dist/zod.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/schemas.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building.js [app-client] (ecmascript) <export default as Building>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) <export default as Stethoscope>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/master/api/masterApi.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/doctors/api/doctorsApiSlice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/DatePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/shared/components/DateTimePicker/TimePicker.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/leads/api/leadsApi.ts [app-client] (ecmascript)");
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
const scheduleVisitSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["object"]({
    doctor_id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]({
        error: "Please select a doctor"
    }).min(1, "Please select a doctor"),
    visit_date_time: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().min(1, "Visit date and time are required"),
    visit_status: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["number"]().optional(),
    visit_remarks: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["string"]().max(500, "Remarks cannot exceed 500 characters").optional().or(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$schemas$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["literal"](""))
});
const DEFAULT_APPOINTMENT_STATUSES = [
    {
        id: 1,
        code: "OPDBKD",
        description: "OPD Booked"
    },
    {
        id: 2,
        code: "OPDCMP",
        description: "OPD Completed"
    },
    {
        id: 3,
        code: "NOTVIS",
        description: "Not Visited"
    },
    {
        id: 4,
        code: "CANCEL",
        description: "Appointment Cancelled"
    },
    {
        id: 5,
        code: "RESCHD",
        description: "Appointment Rescheduled"
    }
];
const ScheduleVisitDialog = ({ open, onClose, lead, siteVisitStatuses = [], onSubmit, isLoading, dialogType = "Appointment", appointment = null })=>{
    _s();
    const isEdit = !!appointment;
    const [isPopoverOpen, setIsPopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isTimePopoverOpen, setIsTimePopoverOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { data: masterData } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"])();
    const [selectedLeadUuid, setSelectedLeadUuid] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { data: leadsData, isLoading: isLoadingLeads } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"])({
        offset: 0
    }, {
        skip: !!lead
    });
    const allLeads = Array.isArray(leadsData) ? leadsData : leadsData?.data || [];
    const effectiveLead = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[effectiveLead]": ()=>{
            if (lead) return lead;
            if (selectedLeadUuid) {
                return allLeads.find({
                    "ScheduleVisitDialog.useMemo[effectiveLead]": (l)=>l.uuid === selectedLeadUuid
                }["ScheduleVisitDialog.useMemo[effectiveLead]"]) || null;
            }
            return null;
        }
    }["ScheduleVisitDialog.useMemo[effectiveLead]"], [
        lead,
        selectedLeadUuid,
        allLeads
    ]);
    // Derive Location & Branch IDs from Lead
    const derivedBranchId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[derivedBranchId]": ()=>{
            if (appointment?.location_id || appointment?.branch_id) {
                return Number(appointment.location_id || appointment.branch_id);
            }
            const bId = effectiveLead?.branch_id || effectiveLead?.location_id;
            if (bId && !isNaN(Number(bId)) && Number(bId) > 0) return Number(bId);
            const bName = effectiveLead?.hospital_branch || effectiveLead?.branch || effectiveLead?.branch_name;
            if (bName && masterData?.branches) {
                const found = masterData.branches.find({
                    "ScheduleVisitDialog.useMemo[derivedBranchId].found": (b)=>b.description?.toLowerCase() === String(bName).toLowerCase() || b.code?.toLowerCase() === String(bName).toLowerCase()
                }["ScheduleVisitDialog.useMemo[derivedBranchId].found"]);
                if (found) return found.id;
            }
            return null;
        }
    }["ScheduleVisitDialog.useMemo[derivedBranchId]"], [
        effectiveLead,
        masterData?.branches,
        appointment
    ]);
    // Derive Specialisation ID from Lead
    const derivedSpecId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[derivedSpecId]": ()=>{
            if (appointment?.specialisation_id || appointment?.specialization_id) {
                return Number(appointment.specialisation_id || appointment.specialization_id);
            }
            const dept = effectiveLead?.specialisation_id || effectiveLead?.specialization_id || effectiveLead?.department || effectiveLead?.specialization || "";
            if (!dept) return 0;
            if (!isNaN(Number(dept)) && Number(dept) > 0) return Number(dept);
            const found = masterData?.specialisations?.find({
                "ScheduleVisitDialog.useMemo[derivedSpecId]": (s)=>s.description?.toLowerCase() === String(dept).toLowerCase() || s.code?.toLowerCase() === String(dept).toLowerCase()
            }["ScheduleVisitDialog.useMemo[derivedSpecId]"]);
            return found ? found.id : 0;
        }
    }["ScheduleVisitDialog.useMemo[derivedSpecId]"], [
        effectiveLead,
        masterData?.specialisations,
        appointment
    ]);
    const [selectedLocationId, setSelectedLocationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedBranchId, setSelectedBranchId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Synchronize branch and location
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScheduleVisitDialog.useEffect": ()=>{
            if (derivedBranchId) {
                setSelectedBranchId(derivedBranchId);
                const foundBranch = masterData?.branches?.find({
                    "ScheduleVisitDialog.useEffect": (b)=>b.id === derivedBranchId
                }["ScheduleVisitDialog.useEffect"]);
                if (foundBranch) {
                    setSelectedLocationId(foundBranch.location_id);
                }
            } else if (effectiveLead?.location_id) {
                setSelectedLocationId(effectiveLead.location_id);
            }
        }
    }["ScheduleVisitDialog.useEffect"], [
        derivedBranchId,
        effectiveLead,
        masterData?.branches
    ]);
    // Fetch all doctors across the hospital
    const { data: doctorsResp, isLoading: isLoadingDoctors } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"])({
        branch_id: 0,
        specialization_id: 0
    });
    const doctorsList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ScheduleVisitDialog.useMemo[doctorsList]": ()=>{
            let list = [];
            if (doctorsResp) {
                if (Array.isArray(doctorsResp)) list = doctorsResp;
                else if (Array.isArray(doctorsResp.data)) list = doctorsResp.data;
                else if (Array.isArray(doctorsResp.doctors)) list = doctorsResp.doctors;
            }
            const currentDocId = appointment?.doctor_id;
            if (currentDocId && !list.some({
                "ScheduleVisitDialog.useMemo[doctorsList]": (d)=>Number(d.id) === Number(currentDocId)
            }["ScheduleVisitDialog.useMemo[doctorsList]"])) {
                list = [
                    {
                        id: Number(currentDocId),
                        first_name: appointment.doctor_name || `Doctor #${currentDocId}`,
                        last_name: "",
                        specialization_id: derivedSpecId
                    },
                    ...list
                ];
            }
            return list;
        }
    }["ScheduleVisitDialog.useMemo[doctorsList]"], [
        doctorsResp,
        appointment,
        derivedSpecId
    ]);
    const statuses = masterData?.appointment_status && masterData.appointment_status.length > 0 ? masterData.appointment_status : masterData?.appointment_statuses && masterData.appointment_statuses.length > 0 ? masterData.appointment_statuses : siteVisitStatuses.length > 0 ? siteVisitStatuses : DEFAULT_APPOINTMENT_STATUSES;
    const defaultStatus = statuses.find((s)=>s.code === "OPDBKD" || s.description?.toUpperCase()?.includes("BOOKED") || s.description?.toUpperCase()?.includes("SCHEDULED") || s.code === "SCHD");
    const defaultStatusId = defaultStatus?.id || 1;
    const { control, register, handleSubmit, setValue, reset, formState: { errors } } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"])({
        resolver: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$hookform$2f$resolvers$2f$zod$2f$dist$2f$zod$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["zodResolver"])(scheduleVisitSchema),
        defaultValues: {
            doctor_id: appointment?.doctor_id || undefined,
            visit_date_time: appointment?.visit_date_time || "",
            visit_status: appointment?.appointments_status_id || appointment?.appointment_status_id || appointment?.visit_status || defaultStatusId,
            visit_remarks: appointment?.visit_remarks || ""
        }
    });
    const watchDoctorId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: "doctor_id"
    });
    const watchRemarks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: "visit_remarks"
    });
    const watchStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"])({
        control,
        name: "visit_status"
    });
    const [date, setDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])();
    const [hour, setHour] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [minute, setMinute] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [timeError, setTimeError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScheduleVisitDialog.useEffect": ()=>{
            if (open) {
                if (appointment) {
                    if (appointment.visit_date_time) {
                        try {
                            const validStr = appointment.visit_date_time.replace(/Z/g, "").split("+")[0].replace(" ", "T");
                            const d = new Date(validStr);
                            if (!isNaN(d.getTime())) {
                                setDate(d);
                                let h = d.getHours();
                                const m = String(d.getMinutes()).padStart(2, "0");
                                const p = h >= 12 ? "PM" : "AM";
                                h = h % 12 || 12;
                                setHour(String(h).padStart(2, "0"));
                                setMinute(m);
                                setPeriod(p);
                            }
                        } catch  {
                        // fallback
                        }
                    }
                    reset({
                        doctor_id: appointment.doctor_id ? Number(appointment.doctor_id) : undefined,
                        visit_date_time: appointment.visit_date_time || "",
                        visit_status: appointment.appointments_status_id || appointment.appointment_status_id || appointment.visit_status || defaultStatusId,
                        visit_remarks: appointment.visit_remarks || ""
                    });
                } else {
                    setDate(undefined);
                    setHour("");
                    setMinute("");
                    setPeriod("");
                    setTimeError("");
                    reset({
                        doctor_id: undefined,
                        visit_date_time: "",
                        visit_status: defaultStatusId,
                        visit_remarks: ""
                    });
                }
            }
        }
    }["ScheduleVisitDialog.useEffect"], [
        open,
        appointment,
        reset,
        defaultStatusId
    ]);
    const handleFormSubmit = async (data)=>{
        if (!data.doctor_id) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select a doctor");
            return;
        }
        if (!date || !hour || !minute || !period || !effectiveLead && !selectedLeadUuid) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please select both visit date and time");
            return;
        }
        let hrs = parseInt(hour);
        if (period === "PM" && hrs !== 12) hrs += 12;
        if (period === "AM" && hrs === 12) hrs = 0;
        const now = new Date();
        const selectedDateTime = new Date(date);
        selectedDateTime.setHours(hrs);
        selectedDateTime.setMinutes(parseInt(minute));
        selectedDateTime.setSeconds(0);
        if (!isEdit && selectedDateTime < now) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot schedule visit in the past");
            return;
        }
        const finalRemarks = dialogType === "Surgery" ? data.visit_remarks ? data.visit_remarks.includes("[Surgery]") ? data.visit_remarks : `[Surgery] ${data.visit_remarks}` : "[Surgery]" : data.visit_remarks || "";
        const payload = {
            lead_uuid: effectiveLead ? effectiveLead.uuid : selectedLeadUuid,
            doctor_id: Number(data.doctor_id),
            visit_date_time: selectedDateTime.toISOString(),
            visit_remarks: finalRemarks,
            location_id: selectedBranchId ? Number(selectedBranchId) : undefined,
            visit_status: Number(data.visit_status || defaultStatusId),
            appointments_status_id: Number(data.visit_status || defaultStatusId)
        };
        if (appointment?.appointment_id || appointment?.id) {
            payload.id = appointment.appointment_id || appointment.id;
            payload.is_active = appointment.is_active ?? 1;
        }
        await onSubmit(payload);
    };
    const branchObj = masterData?.branches?.find((b)=>b.id === selectedBranchId);
    const locationObj = masterData?.locations?.find((l)=>l.id === (branchObj?.location_id || selectedLocationId));
    const specObj = masterData?.specialisations?.find((s)=>s.id === derivedSpecId);
    if (!open) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white dark:bg-zinc-950 w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 flex flex-col max-h-[90vh] relative overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60 flex items-center justify-between",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                        className: "h-5 w-5 text-[#063669] dark:text-blue-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 358,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    isEdit ? "Edit Appointment" : dialogType === "Surgery" ? "Schedule Surgery" : "Schedule Appointment"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 357,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-zinc-500 mt-0.5",
                                children: effectiveLead ? `${isEdit ? "Update appointment details" : "Schedule an appointment"} for ${effectiveLead.first_name || ""} ${effectiveLead.last_name || ""}`.trim() : `${isEdit ? "Update appointment details" : "Schedule an appointment"} for a lead`
                            }, void 0, false, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                        lineNumber: 356,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                    lineNumber: 355,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto p-6 custom-scrollbar space-y-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        id: "schedule-visit-form",
                        onSubmit: handleSubmit(handleFormSubmit),
                        className: "space-y-4 text-sm",
                        children: [
                            !lead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                        children: [
                                            "Select Lead ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-red-500",
                                                children: "*"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 386,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 385,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: selectedLeadUuid,
                                        onValueChange: setSelectedLeadUuid,
                                        disabled: isLoadingLeads,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Search / Select a lead"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                    lineNumber: 394,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999]",
                                                children: allLeads.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: l.uuid,
                                                        className: "text-black dark:text-white cursor-pointer",
                                                        children: [
                                                            l.first_name,
                                                            " ",
                                                            l.last_name,
                                                            " (",
                                                            l.lead_id,
                                                            ")"
                                                        ]
                                                    }, l.uuid, true, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 396,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 388,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 384,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            effectiveLead && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-3 rounded-2xl bg-blue-50/40 dark:bg-zinc-900/50 border border-blue-100 dark:border-zinc-800 flex flex-wrap items-center gap-3 text-xs",
                                children: [
                                    locationObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 416,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Location: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: locationObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 417,
                                                        columnNumber: 37
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 417,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 415,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    branchObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building$3e$__["Building"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 422,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Branch: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: branchObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 423,
                                                        columnNumber: 35
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 423,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 421,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    specObj && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 428,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "Dept: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: specObj.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 429,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 429,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 427,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 413,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Stethoscope$3e$__["Stethoscope"], {
                                                        className: "h-3.5 w-3.5 text-[#063669] dark:text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 439,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Select Doctor ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 440,
                                                        columnNumber: 33
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 438,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            isLoadingDoctors && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-3 w-3 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 444,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " Loading doctors..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 443,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 437,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: watchDoctorId ? String(watchDoctorId) : "",
                                        onValueChange: (val)=>setValue("doctor_id", Number(val), {
                                                shouldValidate: true
                                            }),
                                        disabled: isLoading || isLoadingDoctors,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: isLoadingDoctors ? "Loading available doctors..." : doctorsList.length === 0 ? "No doctors found" : "-- Select Doctor * --"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 454,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999] max-h-60",
                                                children: doctorsList.map((doc)=>{
                                                    const specTitle = masterData?.specialisations?.find((s)=>s.id === doc.specialization_id)?.description || "";
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(doc.id),
                                                        className: "text-black dark:text-white cursor-pointer py-2",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-xs",
                                                                    children: [
                                                                        "Dr. ",
                                                                        doc.first_name,
                                                                        " ",
                                                                        doc.last_name
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                                    lineNumber: 477,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                (doc.education || specTitle) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-zinc-400",
                                                                    children: [
                                                                        doc.education,
                                                                        specTitle
                                                                    ].filter(Boolean).join(" • ")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                            lineNumber: 476,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    }, doc.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 471,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 465,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, `doctor-select-${watchDoctorId || "none"}-${doctorsList.length}`, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    errors.doctor_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-red-500",
                                        children: errors.doctor_id.message
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 492,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: [
                                                    "Visit Date ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 500,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$DatePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DatePicker"], {
                                                value: date,
                                                onChange: (val, d)=>{
                                                    setDate(d);
                                                    setTimeError("");
                                                    if (d && hour && minute && period) {
                                                        let hrs = parseInt(hour);
                                                        if (period === "PM" && hrs !== 12) hrs += 12;
                                                        if (period === "AM" && hrs === 12) hrs = 0;
                                                        const selectedDateTime = new Date(d);
                                                        selectedDateTime.setHours(hrs);
                                                        selectedDateTime.setMinutes(parseInt(minute));
                                                        selectedDateTime.setSeconds(0);
                                                        if (!isEdit && selectedDateTime < new Date()) {
                                                            setTimeError("Cannot select a time in the past");
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot select a time in the past");
                                                            setHour("");
                                                            setMinute("");
                                                            setPeriod("");
                                                            setValue("visit_date_time", "");
                                                        } else {
                                                            setValue("visit_date_time", selectedDateTime.toISOString(), {
                                                                shouldValidate: true
                                                            });
                                                        }
                                                    } else {
                                                        setValue("visit_date_time", "");
                                                    }
                                                },
                                                disablePastDates: !isEdit,
                                                placeholder: "Select visit date",
                                                error: errors.visit_date_time?.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 503,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            errors.visit_date_time && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-500",
                                                children: errors.visit_date_time.message
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 537,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: [
                                                    "Visit Time ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-red-500",
                                                        children: "*"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 544,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$shared$2f$components$2f$DateTimePicker$2f$TimePicker$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TimePicker"], {
                                                value: hour && minute && period ? `${hour}:${minute} ${period}` : "",
                                                outputFormat: "12h",
                                                placeholder: "Select visit time",
                                                onChange: (val)=>{
                                                    if (!val) {
                                                        setHour("");
                                                        setMinute("");
                                                        setPeriod("");
                                                        setValue("visit_date_time", "");
                                                        return;
                                                    }
                                                    const parts = val.split(" ");
                                                    const timeParts = parts[0]?.split(":") || [];
                                                    const h = timeParts[0] || "";
                                                    const m = timeParts[1] || "";
                                                    const p = parts[1]?.toUpperCase() || "AM";
                                                    setHour(h);
                                                    setMinute(m);
                                                    setPeriod(p);
                                                    setTimeError("");
                                                    if (date && h && m && p) {
                                                        let hrs = parseInt(h);
                                                        if (p === "PM" && hrs !== 12) hrs += 12;
                                                        if (p === "AM" && hrs === 12) hrs = 0;
                                                        const selectedDateTime = new Date(date);
                                                        selectedDateTime.setHours(hrs);
                                                        selectedDateTime.setMinutes(parseInt(m));
                                                        selectedDateTime.setSeconds(0);
                                                        if (!isEdit && selectedDateTime < new Date()) {
                                                            setTimeError("Cannot select a time in the past");
                                                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Cannot select a time in the past");
                                                            setValue("visit_date_time", "");
                                                        } else {
                                                            setValue("visit_date_time", selectedDateTime.toISOString(), {
                                                                shouldValidate: true
                                                            });
                                                        }
                                                    } else {
                                                        setValue("visit_date_time", "");
                                                    }
                                                },
                                                error: timeError
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 546,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            timeError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-red-500",
                                                children: timeError
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 591,
                                                columnNumber: 31
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 542,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 497,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            isEdit && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                        children: "Appointment Status"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 598,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: watchStatus ? String(watchStatus) : String(defaultStatusId),
                                        onValueChange: (val)=>setValue("visit_status", Number(val)),
                                        disabled: isLoading,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "rounded-xl h-11 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-medium",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: "Select Status"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                    lineNumber: 607,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 606,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                className: "bg-white dark:bg-zinc-900 text-black dark:text-white z-[99999]",
                                                children: statuses.map((st)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: String(st.id),
                                                        className: "cursor-pointer",
                                                        children: st.description
                                                    }, st.id, false, {
                                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 609,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 601,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                htmlFor: "visit_remarks",
                                                className: "text-xs font-bold text-zinc-700 dark:text-zinc-300",
                                                children: "Visit Remarks"
                                            }, void 0, false, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 623,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] text-zinc-400 font-bold",
                                                children: [
                                                    (watchRemarks || "").length,
                                                    "/500"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                                lineNumber: 626,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 622,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        id: "visit_remarks",
                                        maxLength: 500,
                                        placeholder: "Enter appointment remarks (up to 500 characters)...",
                                        disabled: isLoading,
                                        ...register("visit_remarks"),
                                        rows: 3,
                                        className: "w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-2.5 text-xs font-medium focus:ring-1 focus:ring-[#063669] outline-none transition-all resize-none placeholder:text-zinc-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                        lineNumber: 630,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                lineNumber: 621,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                        lineNumber: 377,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                    lineNumber: 376,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-end gap-2.5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "button",
                            variant: "outline",
                            onClick: onClose,
                            disabled: isLoading,
                            className: "rounded-xl text-xs font-bold h-10 px-5",
                            children: "Cancel"
                        }, void 0, false, {
                            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                            lineNumber: 645,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            form: "schedule-visit-form",
                            disabled: isLoading,
                            className: "rounded-xl text-xs font-bold bg-[#063669] hover:bg-[#063669]/90 text-white h-10 px-6 gap-2",
                            children: [
                                isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                    className: "h-4 w-4 animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                                    lineNumber: 660,
                                    columnNumber: 27
                                }, ("TURBOPACK compile-time value", void 0)),
                                isEdit ? "Update Appointment" : dialogType === "Surgery" ? "Schedule Surgery" : "Schedule Appointment"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                            lineNumber: 654,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
                    lineNumber: 644,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
            lineNumber: 353,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/features/leads/components/ScheduleVisitDialog.tsx",
        lineNumber: 352,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ScheduleVisitDialog, "/byeaR4fAKPatiN1SAxT6hP8YWk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$master$2f$api$2f$masterApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllMasterDataQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$leads$2f$api$2f$leadsApi$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetLeadsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$doctors$2f$api$2f$doctorsApiSlice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGetAllDoctorsQuery"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useForm"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$hook$2d$form$2f$dist$2f$index$2e$esm$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useWatch"]
    ];
});
_c = ScheduleVisitDialog;
var _c;
__turbopack_context__.k.register(_c, "ScheduleVisitDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_features_leads_components_17xy0c6._.js.map