# TechGy Healthcare CRM — Master Design System & Architectural Transformation Specification (v2.0)
> **File:** `design.md`  
> **Target Application:** TechGy Healthcare CRM (`planet-green-crm`)  
> **Status:** Authoritative Design Contract & Complete Overhaul Blueprint  
> **Version:** 2.0.0 (Unified Enterprise Healthcare Design System)  

---

## 1. Executive Manifesto & Purpose of This Document

This document is the **single source of truth** for the visual identity, UI/UX architecture, component behavior, styling rules, and layout standards across the TechGy Healthcare CRM.

### The Transformation Mandate
When this file is referenced by an AI agent or development team with the instruction:
> *"Transform the project according to `design.md`"*

**The entire project MUST be refactored systematically to adhere 100% to this specification.** No legacy CSS overrides, arbitrary hex classes, mismatched border radiuses, or inconsistent component structures are permitted to survive the transformation.

### Core Visual Principles
1. **Clinical Precision & Trust**: Clean, high-contrast healthcare aesthetics. Crisp typography, clinical white and soft slate surfaces, authoritative deep blue accents, and medical status semantics.
2. **Restrained Corporate Geometry**: Unified border radiuses (6px inputs/buttons, 8px cards, 12px modals, 9999px status pills). No erratic pill buttons next to sharp square cards.
3. **Zero Arbitrary CSS Hacks**: Eradicate all `!important` rules, arbitrary color classes (e.g. `text-[#063669]`, `bg-[#0022ff]`), and selector overrides in `src/index.css`. Replace entirely with standardized Tailwind v4 theme variables and semantic design tokens.
4. **Information Density with Breathing Room**: Data tables and forms are high-density for healthcare operations (doctors, relationship managers, clinic coordinators) while maintaining clear visual hierarchy and generous micro-spacing.
5. **Seamless Role-Based Experience**: Visual cues, navigation items, and action bars cleanly adapt across Super Admin (`SADMIN`), Admin (`ADMIN`), Relationship Manager (`RELMNG`), and Experience Manager (`EXPMNG`).

---

## 2. Global Design Tokens & Theme Architecture

All styles must derive strictly from the following token architecture in `src/index.css` using Tailwind CSS v4 `@theme` and CSS custom variables.

### 2.1. Semantic Color System

```css
@theme {
  /* Brand Primary - Healthcare Trust Royal */
  --color-primary: #1e40af;            /* blue-800: Authoritative, medical trust */
  --color-primary-hover: #1d4ed8;      /* blue-700 */
  --color-primary-active: #172554;     /* blue-950 */
  --color-primary-subtle: #eff6ff;     /* blue-50 */
  --color-primary-foreground: #ffffff;

  /* Neutrals & Surfaces */
  --color-canvas: #f8fafc;             /* slate-50: Main application background */
  --color-surface: #ffffff;            /* Pure white for cards, tables, popovers */
  --color-surface-subtle: #f1f5f9;     /* slate-100: Table headers, input backgrounds */
  --color-surface-hover: #f8fafc;      /* slate-50 */

  /* Text & Hierarchy */
  --color-text-title: #0f172a;         /* slate-900: Titles, headings, values */
  --color-text-body: #334155;          /* slate-700: Main readable text */
  --color-text-muted: #64748b;         /* slate-500: Subtitles, helper text */
  --color-text-disabled: #94a3b8;      /* slate-400 */

  /* Structural Borders */
  --color-border: #e2e8f0;             /* slate-200: Default element borders */
  --color-border-subtle: #f1f5f9;      /* slate-100: Secondary dividers */
  --color-border-focus: #3b82f6;       /* blue-500: Input focus rings */

  /* Healthcare Domain Semantic Tokens */
  --color-status-new: #0284c7;         /* sky-600: New Lead / In-Queue */
  --color-status-new-bg: #f0f9ff;
  --color-status-new-border: #bae6fd;

  --color-status-scheduled: #7c3aed;   /* violet-600: Appointment / Visit Booked */
  --color-status-scheduled-bg: #f5f3ff;
  --color-status-scheduled-border: #ddd6fe;

  --color-status-progress: #d97706;    /* amber-600: In Consultation / In Progress */
  --color-status-progress-bg: #fffbeb;
  --color-status-progress-border: #fde68a;

  --color-status-success: #059669;     /* emerald-600: Converted / Completed / Active */
  --color-status-success-bg: #ecfdf5;
  --color-status-success-border: #a7f3d0;

  --color-status-danger: #e11d48;      /* rose-600: Critical / Escalated / Junk / Cancelled */
  --color-status-danger-bg: #fff1f2;
  --color-status-danger-border: #fecdd3;

  --color-status-neutral: #475569;     /* slate-600: Inactive / Closed */
  --color-status-neutral-bg: #f8fafc;
  --color-status-neutral-border: #e2e8f0;

  /* Department Tokens */
  --color-dept-opd: #0891b2;           /* cyan-600 */
  --color-dept-opd-bg: #ecfeff;
  --color-dept-ipd: #4f46e5;           /* indigo-600 */
  --color-dept-ipd-bg: #eef2ff;
  --color-dept-both: #0d9488;          /* teal-600 */
  --color-dept-both-bg: #f0fdfa;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 6px;                    /* Buttons, text inputs, table action items */
  --radius-md: 8px;                    /* Cards, filter bars, alert boxes */
  --radius-lg: 12px;                   /* Modals, sheets, floating popovers */
  --radius-full: 9999px;               /* Badges, avatars, pills */
}
```

### 2.2. Typography Hierarchy

| Token / Role | Family | Size | Weight | Line Height | Tracking | Target Usage |
|---|---|---|---|---|---|---|
| **Display Title** | Plus Jakarta Sans | 24px (`text-2xl`) | Bold (700) | 32px | `-0.025em` | Page Header main title (`PageHeader`) |
| **Section Title** | Plus Jakarta Sans | 18px (`text-lg`) | SemiBold (600) | 26px | `-0.015em` | Card titles, modal headers, tabs |
| **Subsection** | Plus Jakarta Sans | 15px (`text-base`)| SemiBold (600) | 22px | `-0.01em` | Table group headers, drawer subheaders |
| **Body Primary** | Inter | 13px (`text-[13px]`) | Medium (500) | 20px | `normal` | Primary table data, form labels, inputs |
| **Body Secondary** | Inter | 12px (`text-xs`) | Regular (400) | 18px | `normal` | Subtext, timestamps, phone numbers |
| **Micro Caption** | Inter | 11px (`text-[11px]`) | Medium (500) | 16px | `+0.01em` | Helper notes, field validation errors |
| **Status Tag** | Inter | 11px (`text-[11px]`) | SemiBold (600) | 14px | `+0.02em` | Status pills, department badges |
| **Code / Data ID** | JetBrains Mono / font-mono | 12px (`text-xs`) | Medium (500) | 16px | `normal` | Lead IDs (`#LD-1049`), Doctor Codes |

### 2.3. Elevation & Shadow Geometry
Replace all ad-hoc shadows and resets with clean, diffused ambient elevations:
* **Level 0 (Flat)**: `border border-border bg-surface` (Standard cards, inputs).
* **Level 1 (Card Elevation)**: `box-shadow: 0 1px 3px 0 rgb(15 23 42 / 0.05), 0 1px 2px -1px rgb(15 23 42 / 0.05);` (Stat cards, active panels).
* **Level 2 (Dropdown / Popover)**: `box-shadow: 0 4px 6px -1px rgb(15 23 42 / 0.07), 0 2px 4px -2px rgb(15 23 42 / 0.05);` (Select menus, tooltips).
* **Level 3 (Modal / Sheet)**: `box-shadow: 0 20px 25px -5px rgb(15 23 42 / 0.1), 0 8px 10px -6px rgb(15 23 42 / 0.05);` (Dialogs, slide-overs).

---

## 3. Global Application Shell (`src/layouts/MainLayout.tsx`)

The application layout must be clean, stable, and eliminate jarring shifts.

```
+---------------------------------------------------------------------------------------+
|  [Logo] TechGy Link     |  [Global Search: Leads, Doctors, Phone (Cmd+K)]  | [Bell] [User] |
+-------------------------+-------------------------------------------------------------+
| [=] Dashboard           | Page Header (Title + Subtitle + Action Buttons)             |
| [=] Manage Leads        |-------------------------------------------------------------|
| [=] Doctors             | Filter Bar (Search, Branch, Status, Date Range, Reset)       |
| [=] Appointments        |-------------------------------------------------------------|
| [=] Follow Ups          |                                                             |
| [=] Sales Dashboard     | [ Data Table / Content Grid ]                               |
| [=] Reports             |                                                             |
|                         |                                                             |
|                         |-------------------------------------------------------------|
| [Shield] Secure Session | Pagination (Showing 1-20 of 3,420 | Prev [1 2 3] Next)       |
+-------------------------+-------------------------------------------------------------+
```

### 3.1. Navigation Sidebar Specs
* **Width**: `248px` (Expanded), `68px` (Collapsed). Smooth `transition-all duration-200 ease-in-out`.
* **Brand Header**:
  * Height: `64px` with bottom border `border-border`.
  * Expanded: Full TechGy Link logo (`height: 40px`).
  * Collapsed: TechGy Mark emblem (`height: 36px`, centered).
* **Sidebar Toggle Button**: Floating pill button mounted on sidebar right border, centered vertically on the divider line. Hover state transitions cleanly to `border-primary text-primary`.
* **Nav Items**:
  * Height: `40px` with `rounded-sm (6px)` border radius.
  * Inactive state: `text-text-body hover:bg-surface-subtle hover:text-text-title`.
  * Active state: `bg-primary text-white font-semibold shadow-xs`.
  * Icon styling: 20px x 20px, stroke width `1.8px`, perfectly centered when collapsed.
  * Tooltips: Radix tooltip shows item label when sidebar is collapsed.
* **Footer Security Badge**:
  * Displays "HIPAA / Encrypted Session" with `ShieldCheck` icon in `text-muted`.

### 3.2. Top Navigation Bar (Header)
* **Height**: Fixed `64px`, sticky top with `bg-surface border-b border-border z-40`.
* **Global Omni-Search**:
  * Centered or left-aligned with `max-w-md` (400px).
  * Height `38px`, background `bg-canvas`, border `border-border`, `rounded-sm`.
  * Placeholder: `"Search leads, patients, doctors, phone..."`.
  * Shortcut pill on right: `<kbd>⌘K</kbd>` or `<kbd>Ctrl K</kbd>`.
* **Action Cluster (Right)**:
  * Notification Bell with unread counter badge (`bg-status-danger text-white text-[10px] font-bold`).
  * User Profile Trigger: Clean circular avatar (`h-9 w-9`) with active ring on hover.
  * Shows user name and role badge (`SADMIN`, `ADMIN`, `RM`, `EM`) next to avatar on desktop viewports (`w >= 1024px`).

### 3.3. Profile & Account Management Modal
* **Replace the static inline fixed modal with an accessible Slide-Over Drawer (`Sheet`)** or clean centered dialog:
  * Header: Profile photo upload with hover overlay, user full name, email, and role badge.
  * Body:
    * **Personal Information**: Editable First Name, Last Name, Phone Number (clean floating or stacked form fields).
    * **Security Settings**: Direct password update flow with inline password strength validation (12+ characters, uppercase, number, symbol).
    * **Session Information**: Active role, assigned branch/clinic, last login time.
  * Footer: Prominent destructive button "Log Out" (`bg-status-danger-bg text-status-danger hover:bg-status-danger hover:text-white`).

---

## 4. Reusable Component Standards

Every UI component in `src/components/ui/` and `src/shared/components/` must strictly comply with these specs.

### 4.1. Buttons (`src/components/ui/button.tsx`)
* **Radii**: Strict `rounded-sm` (`6px`).
* **Variants**:
  * `default` (Primary): `bg-primary text-white hover:bg-primary-hover shadow-xs active:bg-primary-active`
  * `secondary`: `bg-surface-subtle text-text-title hover:bg-slate-200/70 border border-border`
  * `outline`: `border border-border bg-surface text-text-body hover:bg-surface-subtle hover:text-text-title`
  * `ghost`: `text-text-body hover:bg-surface-subtle hover:text-text-title`
  * `destructive`: `bg-status-danger text-white hover:bg-rose-700 shadow-xs`
  * `subtle-destructive`: `bg-status-danger-bg text-status-danger border border-status-danger-border hover:bg-status-danger hover:text-white`
* **Sizes**:
  * `sm`: `h-8 px-3 text-xs gap-1.5`
  * `default`: `h-9 px-4 text-xs font-medium gap-2`
  * `lg`: `h-10 px-5 text-sm font-medium gap-2`
  * `icon`: `h-9 w-9 p-0 justify-center`
* **Loading State**: Automatic `Loader2` spin icon, auto-disables click, maintains fixed width.

### 4.2. Form Inputs & Selects
* **Text Input (`src/components/ui/input.tsx`)**:
  * Height: `38px` (`h-[38px]`).
  * Background: `bg-surface`. Border: `border-border`. Radius: `rounded-sm` (6px).
  * Typography: `text-[13px] text-text-title placeholder:text-text-disabled`.
  * Focus ring: `focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none`.
* **Select & MultiSelect (`src/components/ui/select.tsx`, `multi-select.tsx`)**:
  * Height: `38px`. Matches input styling identically.
  * Dropdown Menu: `bg-surface border border-border shadow-md rounded-md p-1 z-50`.
  * Selected item: `bg-primary-subtle text-primary font-semibold`.

### 4.3. Data Table (`src/shared/components/DataTable/DataTable.tsx`)
Data tables represent the operational core of the CRM.
* **Container**: `bg-surface border border-border rounded-md overflow-hidden shadow-xs`.
* **Table Header (`thead`)**:
  * Background: `bg-surface-subtle border-b border-border`.
  * Text: `text-[11px] font-bold uppercase tracking-wider text-text-muted py-3 px-4 text-left`.
  * Sorting indicators: Compact `ArrowUpDown`, `ArrowUp`, or `ArrowDown` (14px).
* **Table Rows (`tbody tr`)**:
  * Height: `48px` minimum.
  * Border: `border-b border-border/60 last:border-0`.
  * Hover state: `hover:bg-slate-50/80 transition-colors`.
  * Selected state: `bg-blue-50/50`.
* **Table Cells (`td`)**:
  * Padding: `py-3 px-4 text-[13px] text-text-body align-middle`.
* **Pagination Bar**:
  * Background: `bg-surface border-t border-border px-4 py-3 flex items-center justify-between`.
  * Record counter: `"Showing 1 to 25 of 1,248 entries"` in `text-xs text-text-muted`.
  * Page buttons: Compact outlined buttons (`h-8 px-3 text-xs`) with active page highlighted in `bg-primary text-white`.
  * Page size selector: Dropdown (`10`, `25`, `50`, `100` per page).

### 4.4. Metric & KPI Card (`src/shared/components/MetricCard/MetricCard.tsx`)
* **Layout**: Clean white card (`bg-surface border border-border rounded-md p-5 shadow-xs`).
* **Visual Structure**:
  ```
  +---------------------------------------------+
  | [ICON PILL]                    [TREND BADGE]|
  | ACTIVE LEADS                   +12.4% vs lw |
  | 1,420                                       |
  | 38 pending response today                   |
  +---------------------------------------------+
  ```
* **Title**: `text-[11px] font-bold text-text-muted uppercase tracking-wider`.
* **Metric Value**: `text-2xl lg:text-3xl font-bold text-text-title tracking-tight`.
* **Trend Badge**: Pill shape with green (`+X%`) or red (`-X%`) tint.

### 4.5. Status Badge & Tags (`src/shared/components/StatusBadge/StatusBadge.tsx`)
Unified status pill for Leads, Appointments, Follow-ups, and Doctors:
* **Geometry**: `inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border`.
* **Statuses**:
  * **New / Pending**: `bg-status-new-bg text-status-new border-status-new-border`
  * **Scheduled / Booked**: `bg-status-scheduled-bg text-status-scheduled border-status-scheduled-border`
  * **In Progress / Follow-Up**: `bg-status-progress-bg text-status-progress border-status-progress-border`
  * **Completed / Converted**: `bg-status-success-bg text-status-success border-status-success-border`
  * **Junk / Cancelled / Lost**: `bg-status-danger-bg text-status-danger border-status-danger-border`
  * **OPD Department**: `bg-cyan-50 text-cyan-700 border-cyan-200`
  * **IPD Department**: `bg-indigo-50 text-indigo-700 border-indigo-200`

### 4.6. Page Header (`src/shared/components/PageHeader/PageHeader.tsx`)
Standardized header for every top-level view:
* **Left**:
  * Breadcrumb trace: `Home / Leads / Lead Details` in `text-xs text-text-muted`.
  * Title: `text-2xl font-bold text-text-title tracking-tight mt-1`.
  * Description: `text-xs text-text-muted max-w-2xl mt-0.5`.
* **Right**:
  * Action Cluster: Secondary buttons (Export, Import, Filters) + Primary Action (`+ Add Lead`, `+ Add Doctor`).

---

## 5. Feature-by-Feature Transformation Blueprint

### 5.1. Leads Management (`src/features/leads`)
* **Pipeline Status Tabs**:
  * Top navigation tabs: `All Leads`, `New Leads`, `Assigned`, `Follow-up Due`, `Visits Scheduled`, `Junk Review`.
  * Pill style or modern underline indicator with active counter badge: `New Leads (42)`.
* **Filter Bar**:
  * Stacked or sticky single-line bar with Quick Search, Project/Branch Select, Assigned RM Select, Assigned EM Select, Date Picker, and `Clear All` button.
* **Dynamic Lead Status Dropdowns**:
  * Adhere strictly to the Phase 2 architecture documented in `README.md`:
    * Dropdown options generated via `getProjectStatusOptions(lead.project_id, masterData)`.
    * State binds to `lead.project_lead_status_id`.
    * Changing status to Junk (`JUNKPE`) prompts mandatory `JunkReasonDialog`.
* **Bulk Actions Bar**:
  * Slides up from bottom when rows are selected: `"X leads selected" | [Assign RM] [Assign EM] [Mark Status] [Export] [Deselect]`.
* **Lead Details Drawer / Page**:
  * 2-column clinical view:
    * Left (65%): Timeline of patient interactions, call recordings, WhatsApp messages, visit history.
    * Right (35%): Patient vitals/demographics card, assigned doctors, appointment scheduler, quick action notes.

### 5.2. Doctors Directory (`src/features/doctors`)
* **Directory Controls**:
  * Branch filter, Specialization multi-select, Department filter (`All`, `OPD`, `IPD`), Search by doctor name or phone.
* **Doctor Table & Card Presentation**:
  * Doctor cell: Avatar/Photo thumbnail + Doctor Name (`Dr. First Last`) + Specialization subtitle.
  * Department badge: Clear OPD / IPD pill.
  * Consultation Fee: Formatted with Indian Rupee symbol (`₹500`).
  * Availability Schedule: Clean visual chip (`09:00 AM - 05:00 PM`).
  * Actions: View Profile, Edit Details, Book Appointment directly.
* **Doctor Details & Add/Edit Modal**:
  * Standardized modal (`max-w-2xl`) with clear 2-column input grid for personal details, specialization, branch assignment, working hours, and profile photo upload.

### 5.3. Appointments & Scheduled Visits (`src/features/scheduled-visits`)
* **View Switching**: Toggle between Table List View and Calendar / Day Agenda view.
* **Appointment Cards / Rows**:
  * Patient details + Assigned Doctor + Time Slot + Branch/Room.
  * Status Lifecycle: `Scheduled -> Patient Arrived / Checked-in -> In Consultation -> Consultation Completed -> Follow-up Scheduled -> Cancelled / No-show`.
  * Quick Audit Action: Direct launch of `VisitFeedbackAuditPage`.

### 5.4. Follow-ups Management (`src/features/follow-ups`)
* **Priority Queue Sections**:
  1. **Overdue Follow-ups**: Highlighted with soft rose border/background and urgent call-to-action.
  2. **Today's Follow-ups**: Prominent operational queue for RM/EM.
  3. **Upcoming Follow-ups**: Grouped by Next 7 Days.
* **Action Integration**:
  * Direct "Call Now" (initiates click-to-call or copies number).
  * "Send WhatsApp" (opens template picker).
  * "Log Outcome" (opens modal to record notes and advance status).

### 5.5. Executive & Role Dashboards (`relationship-managers`, `experience-managers`, `sales`, `revenue`)
* **Top KPI Grid**: 4 to 6 `MetricCard` units with uniform height.
* **Charts Architecture (Recharts)**:
  * Unified color palette: Primary Blue (`#1e40af`), Sky (`#0284c7`), Emerald (`#059669`), Violet (`#7c3aed`), Amber (`#d97706`).
  * Custom tooltip styled with `bg-surface border border-border rounded-md shadow-md p-2 text-xs`.
  * Grid lines: Subtle `stroke="#f1f5f9"`.
* **Leaderboards & Tables**:
  * Top RMs / EMs ranked with rank badges (`#1`, `#2`, `#3` in gold/silver/bronze tints), conversion percentage bar, and total visits completed.

### 5.6. Call Analyzer (`src/features/call-analyzer`)
* **Audio Player**: Custom minimal waveform or scrub bar matching `--color-primary`.
* **Speaker Diarization**:
  * Agent/Doctor bubbles on right (blue accent).
  * Patient/Customer bubbles on left (slate accent).
* **AI Insights Card**: Call duration, sentiment analysis pill (Positive / Neutral / Negative), key objections identified, recommended next action.

---

## 6. Legacy Code Cleanup & Anti-Patterns to Eliminate

During the transformation, all instances of the following anti-patterns **MUST be excised**:

### 6.1. Eradicate `src/index.css` Overrides
Delete lines 239–305 and 415–430 of `src/index.css`. Specifically remove:
```css
/* DELETE ALL ARBITRARY COMPATIBILITY BRIDGES */
[class*="text-[#063669]"],
[class*="text-[#002d62]"],
[class*="text-[#00236F]"],
[class*="text-[#001549]"],
[class*="text-[#0f3d6b]"] { color: #0022ff !important; }

/* DELETE ALL FORCED GEOMETRY OVERRIDES */
button, a[role="button"], [role="button"] { border-radius: 0.375rem !important; }
div.rounded-xl, div.rounded-2xl ... { border-radius: 0.375rem !important; }

/* DELETE ALL FORCED SHADOW SUPPRESSIONS */
[class*="hover:shadow"]:hover { ... !important; }
```
**Reason:** These hacks override components at runtime and cause styling wars. The design system must be natively styled in the components and theme.

### 6.2. Replace Hardcoded Arbitrary Colors
Find and replace all arbitrary hex classes across all `.tsx` files:
* Replace `text-[#0022ff]`, `text-[#002d62]`, `text-[#063669]`, `text-[#0f1a3a]` with `text-primary` or `text-text-title`.
* Replace `bg-[#0022ff]`, `bg-[#002d62]` with `bg-primary`.
* Replace `border-[#e2e8f0]` with `border-border`.
* Replace `bg-[#f8f9fa]`, `bg-[#f1f5f9]` with `bg-surface-subtle` or `bg-canvas`.

### 6.3. Replace Custom Ad-hoc Modals with Shadcn Dialogs
In multiple pages (including `MainLayout.tsx` profile modal, password update modal, and feature dialogs), custom `fixed inset-0` implementations exist. Replace them with standardized `@radix-ui/react-dialog` or `@radix-ui/react-sheet` components from `src/components/ui/dialog.tsx` and `src/components/ui/sheet.tsx`.

---

## 7. Phased Transformation Protocol (Agent Runbook)

When executing the whole-project change, follow this sequence strictly to guarantee zero regressions and 100% build integrity:

```
[Phase 1: Token & Theme Foundation]
               │
               ▼
[Phase 2: Core UI Primitives Overhaul]
               │
               ▼
[Phase 3: Shell & Global Layout (MainLayout)]
               │
               ▼
[Phase 4: Shared Components (DataTable, PageHeader, Metrics)]
               │
               ▼
[Phase 5: Feature Modules Overhaul (Leads, Doctors, Visits, etc.)]
               │
               ▼
[Phase 6: Verification, Type-check & Build Validation]
```

### Phase 1: Token & Theme Foundation
1. Update `src/index.css`:
   * Clean out all `!important` selector hacks and arbitrary overrides.
   * Inject the complete `@theme` block defined in Section 2.1.
   * Define clean base layer styles (`body`, headings, scrollbars).
2. Verify font imports: Inter and Plus Jakarta Sans loaded cleanly.

### Phase 2: Core UI Primitives Overhaul
1. Refactor `src/components/ui/button.tsx` to support the variants and radii in Section 4.1.
2. Refactor `src/components/ui/input.tsx`, `textarea.tsx`, `select.tsx`, `multi-select.tsx`.
3. Standardize `src/components/ui/card.tsx`, `badge.tsx`, `dialog.tsx`, `sheet.tsx`.

### Phase 3: Shell & Global Layout Overhaul
1. Refactor `src/layouts/MainLayout.tsx`:
   * Implement the new navigation sidebar geometry, logo branding, and active state styles.
   * Modernize the top header with the omni-search bar and user profile trigger.
   * Migrate the profile and update-password modals to Radix Sheet / Dialog.
   * Apply the clean content frame `crm-page-frame` with responsive padding.

### Phase 4: Shared Components Overhaul
1. Refactor `src/shared/components/DataTable/DataTable.tsx` to match Section 4.3 (headers, pagination, sticky behavior, skeletons).
2. Refactor `src/shared/components/PageHeader/PageHeader.tsx`.
3. Refactor `src/shared/components/MetricCard/MetricCard.tsx` and `StatusBadge/StatusBadge.tsx`.

### Phase 5: Feature Modules Overhaul
1. **Leads (`src/features/leads`)**: Standardize `LeadsPage.tsx`, `LeadTable.tsx`, filter bars, status dropdowns, and drawers.
2. **Doctors (`src/features/doctors`)**: Update `DoctorsPage.tsx`, `DoctorTable.tsx`, doctor modals, and stats cards.
3. **Scheduled Visits (`src/features/scheduled-visits`)**: Update `ScheduledVisitsPage.tsx` and appointment cards.
4. **Follow-ups (`src/features/follow-ups`)**: Update `FollowUpsPage.tsx` priority queues and action triggers.
5. **Dashboards (`rm`, `em`, `sales`, `revenue`)**: Update metric grids, Recharts themes, and leaderboard tables.
6. **Reports & Analyzer (`reports`, `call-analyzer`)**: Align reporting tables and audio player layouts.

### Phase 6: Verification & Quality Gate
1. Run `npm run build` or `next build` to verify zero TypeScript errors.
2. Run `npm run lint` to verify code quality.
3. Verify responsiveness on Mobile (375px), Tablet (768px), Desktop (1280px), and Ultra-wide (1920px).

---

## 8. Master Agent Overhaul Command Prompt

To trigger an autonomous agent to execute this overhaul, copy and paste the following instruction:

```markdown
You are an expert Frontend Architect. 
Please read `design.md` in the project root. It contains the authoritative Master Design System and Transformation Blueprint for this CRM.
Your objective is to execute the complete project overhaul following the phased protocol in Section 7 of `design.md`:
1. Phase 1: Clean `src/index.css` of all legacy overrides and implement the new theme tokens.
2. Phase 2: Update all components in `src/components/ui/`.
3. Phase 3: Update `src/layouts/MainLayout.tsx` and the application shell.
4. Phase 4: Update `src/shared/components/` (DataTable, PageHeader, MetricCard, StatusBadge).
5. Phase 5: Transform the feature modules (`leads`, `doctors`, `scheduled-visits`, `follow-ups`, dashboards).
6. Ensure no arbitrary CSS hacks or '!important' remain, maintain all business logic and RBAC rules, and confirm the project builds cleanly without errors.
```

---
*End of Design System Specification (`design.md`)*

