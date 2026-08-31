# RBAC — Role-Based Access Control

## Table of Contents

1. [Overview](#1-overview)
2. [Roles](#2-roles)
3. [Functional Behaviour Per Role](#3-functional-behaviour-per-role)
   - [Super Admin (SADMIN)](#31-super-admin-sadmin)
   - [Admin (ADMIN)](#32-admin-admin)
   - [Relationship Manager (RELMNG)](#33-relationship-manager-relmng)
   - [Experience Manager (EXPMNG)](#34-experience-manager-expmng)
4. [Sidebar Navigation Matrix](#4-sidebar-navigation-matrix)
5. [Post-Login Redirect Behaviour](#5-post-login-redirect-behaviour)
6. [Data Scoping Rules](#6-data-scoping-rules)
7. [Technical Architecture](#7-technical-architecture)
   - [Auth State — Redux Store](#71-auth-state--redux-store)
   - [Permission Hook — `usePermissions`](#72-permission-hook--usepermissions)
   - [Permission Config — `ROLE_PERMISSIONS`](#73-permission-config--role_permissions)
   - [Sidebar Config — `MainLayout`](#74-sidebar-config--mainlayout)
   - [Post-Login Redirect — `AuthLayout`](#75-post-login-redirect--authlayout)
   - [Route Registration — `PrivateRoutes`](#76-route-registration--privateroutes)
8. [New Pages & Wrappers](#8-new-pages--wrappers)
   - [RmDashboardPage](#81-rmdashboardpage)
   - [EmDashboardPage](#82-emdashboardpage)
   - [AgentsPage](#83-agentspage)
9. [Scoped Pages — How Locking Works](#9-scoped-pages--how-locking-works)
   - [RelationshipManagersPage — `lockedRmId`](#91-relationshipmanagerspage--lockedrmid)
   - [ExperienceManagersPage — `lockedEmId` / `lockedRmId`](#92-experiencemanagerspage--lockedemid--lockedrmid)
   - [WarRoomPage — RELMNG scoping](#93-warrooompage--relmng-scoping)
   - [FollowUpsPage — RELMNG / EXPMNG scoping](#94-followupspage--relmng--expmng-scoping)
10. [File Reference Map](#10-file-reference-map)
11. [How to Extend Roles / Add Permissions](#11-how-to-extend-roles--add-permissions)

---

## 1. Overview

The CRM implements a **frontend Role-Based Access Control (RBAC)** system that controls:

- **Which sidebar items** are visible to a logged-in user
- **Which route** the user is redirected to after login
- **What data** is shown on pages that have user-selectable filters (the filter UI is hidden and the user's own ID is injected silently)

> [!IMPORTANT]
> The RBAC system is **frontend-only**. It controls visibility and filters only. Actual data security is enforced by the backend API. Never rely solely on frontend RBAC for sensitive data protection.

---

## 2. Roles

| Role Code | Display Name | Who They Are |
|---|---|---|
| `SADMIN` | Super Admin / Sales Head | Top-level stakeholder with read-only overview access |
| `ADMIN` | Admin | Full CRM control — creates users, manages all data |
| `RELMNG` | Relationship Manager | Manages a team of EMs and handles lead pipeline |
| `EXPMNG` | Experience Manager | Site agent assigned to leads; minimal permissions |

Role codes are stored in the Redux auth slice as `currentRole.code` and are returned by the login API.

---

## 3. Functional Behaviour Per Role

### 3.1 Super Admin (`SADMIN`)

- Sees **all 11 sidebar items** in full order
- Has **read-only** access to most entities (cannot create/delete)
- No data filtering — views aggregate data across all RMs and EMs
- Logs in → redirected to **`/leads`**

### 3.2 Admin (`ADMIN`)

- Sees **all 11 sidebar items** in full order
- Has **full CRUD** control over leads, users, master data, reports
- Can assign leads to any RM or EM using dropdowns
- Logs in → redirected to **`/leads`**

### 3.3 Relationship Manager (`RELMNG`)

- Sees **7 sidebar items** in their specific order (see matrix below)
- Their "Dashboard" shows **only their own RM data** — no RM selector visible
- On the Experience Managers page (`/agents`), only sees **EMs under their own team** (fetched via `useGetReporteesQuery`)
- **War Room** — RM selector dropdown is hidden; data is fetched only for their own `user.id`
- **Follow Ups** — RM/EM dropdowns are hidden; follow-ups are scoped to their own `user.id`
- Logs in → redirected to **`/relationship-managers/dashboard`**
- No access to: Project Analytics, Reports, Master Data, Marketing Dashboard

### 3.4 Experience Manager (`EXPMNG`)

- Sees **5 sidebar items** in their specific order (see matrix below)
- Their "Dashboard" shows **only their own EM data** — no EM selector visible
- **Follow Ups** — both RM and EM dropdowns are hidden; follow-ups are scoped to their own `user.id`
- Logs in → redirected to **`/agents/dashboard`**
- No access to: Project Analytics, Relationship Managers section, Reports, War Room, Master Data, Marketing Dashboard

---

## 4. Sidebar Navigation Matrix

| # | Sidebar Item | Route | SADMIN | ADMIN | RELMNG | EXPMNG |
|---|---|---|:---:|:---:|:---:|:---:|
| 1 | Project Analytics Hub | `/project-analytics` | ✅ | ✅ | ❌ | ❌ |
| 2 | Manage Leads / Leads Dashboard / Leads | `/leads` | ✅ | ✅ | ✅ | ✅ |
| 3 | Customers | `/customers` | ✅ | ✅ | ✅ | ✅ |
| 4 | Relationship Managers | `/relationship-managers` | ✅ | ✅ | ❌ | ❌ |
| — | **Dashboard** *(RM's own view)* | `/relationship-managers/dashboard` | ❌ | ❌ | ✅ *(item #1)* | ❌ |
| 5 | Experience Managers | `/agents` | ✅ | ✅ | ✅ *(scoped to their EMs)* | ❌ |
| — | **Dashboard** *(EM's own view)* | `/agents/dashboard` | ❌ | ❌ | ❌ | ✅ *(item #1)* |
| 6 | Scheduled Visits | `/scheduled-visits` | ✅ | ✅ | ✅ | ✅ |
| 7 | Follow ups | `/follow-ups` | ✅ | ✅ | ✅ | ✅ |
| 8 | Reports | `/reports` | ✅ | ✅ | ❌ | ❌ |
| 9 | War Room | `/war-room` | ✅ | ✅ | ✅ | ❌ |
| 10 | Master Data | `/master-data` | ✅ | ✅ | ❌ | ❌ |
| 11 | Marketing Dashboard | `/marketing-dashboard` | ✅ | ✅ | ❌ | ❌ |

**RELMNG sidebar order:** Dashboard → Leads Dashboard → Customers → Experience Managers → Scheduled Visits → Follow ups → War Room

**EXPMNG sidebar order:** Dashboard → Leads → Customers → Scheduled Visits → Follow ups

---

## 5. Post-Login Redirect Behaviour

Handled in [`AuthLayout.tsx`](src/layouts/AuthLayout.tsx):

```
Login success
    │
    ├── isFirstLogin = true  →  /set-password
    │
    └── isFirstLogin = false
            │
            ├── roleCode === 'RELMNG'  →  /relationship-managers/dashboard
            ├── roleCode === 'EXPMNG'  →  /agents/dashboard
            └── (SADMIN / ADMIN)       →  /leads
```

---

## 6. Data Scoping Rules

When a role-scoped user (RELMNG or EXPMNG) visits a page that normally has user-selectable filter dropdowns, the following happens:

| Page | Admin/SADMIN Behaviour | RELMNG Behaviour | EXPMNG Behaviour |
|---|---|---|---|
| RM Dashboard (`/relationship-managers`) | Full dropdown, all RMs selectable | Hidden dropdown, data fetched for `user.id` only | N/A (not in sidebar) |
| EM Dashboard (`/agents`) | Full dropdown, all EMs selectable | Dropdown hidden; EMs limited to `useGetReporteesQuery(user.id)` | Redirected to `/agents/dashboard` |
| War Room (`/war-room`) | RM picker dropdown visible | Dropdown hidden; `user_id = Number(user.id)` passed to API | N/A (not in sidebar) |
| Follow Ups (`/follow-ups`) | RM + EM dropdowns visible | Both dropdowns hidden; `queryUserId = user.id` | Both dropdowns hidden; `queryUserId = user.id` |

> [!NOTE]
> "Silent injection" means `user.id` from the Redux auth store is passed directly as an API parameter — there is no UI element the user can interact with to change the filter.

---

## 7. Technical Architecture

### 7.1 Auth State — Redux Store

**File:** [`src/features/auth/store/authSlice.ts`](src/features/auth/store/authSlice.ts)

The auth slice stores:
```ts
interface AuthState {
  user: User | null;        // { id: string, email: string, ... }
  currentRole: Role | null; // { id: number, code: 'SADMIN'|'ADMIN'|'RELMNG'|'EXPMNG', ... }
  isAuthenticated: boolean;
  isFirstLogin: boolean;
}
```

> [!IMPORTANT]
> `user.id` is typed as `string` in Redux but the backend API expects a `number`. Always cast with `Number(user.id)` before passing to API calls.

---

### 7.2 Permission Hook — `usePermissions`

**File:** [`src/hooks/usePermissions.ts`](src/hooks/usePermissions.ts)

```ts
const { roleCode, user, can, permissions } = usePermissions();
```

| Return Value | Type | Description |
|---|---|---|
| `roleCode` | `string` | e.g. `'RELMNG'`, `'EXPMNG'`, `'ADMIN'`, `'SADMIN'` |
| `user` | `User \| null` | The logged-in user object from Redux (`user.id` is the key field) |
| `can(permission)` | `(p: Permission) => boolean` | Returns `true` if the current role has the given permission |
| `permissions` | `Permission[]` | Full list of permissions the current role has |

**Usage pattern in pages:**
```tsx
const { roleCode, user } = usePermissions();
const isRM = roleCode === 'RELMNG';
const isEM = roleCode === 'EXPMNG';
```

---

### 7.3 Permission Config — `ROLE_PERMISSIONS`

**File:** [`src/config/permissions.ts`](src/config/permissions.ts)

Maps role codes to arrays of granular permission strings:

```ts
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  SADMIN: [ PERMISSIONS.LEAD_VIEW, PERMISSIONS.AGENT_VIEW, ... ],
  ADMIN:  [ PERMISSIONS.LEAD_VIEW, PERMISSIONS.LEAD_CREATE, ..., /* all */ ],
  RELMNG: [ PERMISSIONS.LEAD_VIEW, PERMISSIONS.LEAD_EDIT, PERMISSIONS.AGENT_VIEW, ... ],
  EXPMNG: [ PERMISSIONS.LEAD_VIEW, PERMISSIONS.LEAD_EDIT, PERMISSIONS.FOLLOWUP_VIEW, ... ],
};
```

> [!TIP]
> To grant or revoke a specific action for a role (e.g. allow RELMNG to create leads), add or remove the permission key in `ROLE_PERMISSIONS` only. No other files need to change for permission-level changes.

---

### 7.4 Sidebar Config — `MainLayout`

**File:** [`src/layouts/MainLayout.tsx`](src/layouts/MainLayout.tsx)

The sidebar is built from a `navItemsByRole` map keyed by `roleCode`:

```ts
const { roleCode } = usePermissions();

const navItemsByRole: Record<string, NavItem[]> = {
  SADMIN: [ /* 11 items */ ],
  ADMIN:  [ /* 11 items */ ],
  RELMNG: [ /* 7 items — Dashboard first */ ],
  EXPMNG: [ /* 5 items — Dashboard first */ ],
};

const navItems = navItemsByRole[roleCode] ?? navItemsByRole['ADMIN'];
```

Each `NavItem` is `{ label: string; path: string; icon: ReactNode }`. The active sidebar item is highlighted via `location.pathname === item.path` (exact match).

---

### 7.5 Post-Login Redirect — `AuthLayout`

**File:** [`src/layouts/AuthLayout.tsx`](src/layouts/AuthLayout.tsx)

```ts
const currentRole = useSelector((state: RootState) => state.auth.currentRole);

if (isAuthenticated && !isFirstLogin) {
  const roleCode = currentRole?.code ?? '';
  if (roleCode === 'RELMNG') return <Navigate to="/relationship-managers/dashboard" replace />;
  if (roleCode === 'EXPMNG') return <Navigate to="/agents/dashboard" replace />;
  return <Navigate to="/leads" replace />;
}
```

---

### 7.6 Route Registration — `PrivateRoutes`

**File:** [`src/routes/PrivateRoutes.tsx`](src/routes/PrivateRoutes.tsx)

All new role-scoped routes are lazy-loaded:

```tsx
// New RELMNG dashboard route
<Route path="/relationship-managers/dashboard" element={<RmDashboardPage />} />

// Smart /agents wrapper (role-aware)
<Route path="/agents" element={<AgentsPage />} />

// New EXPMNG dashboard route
<Route path="/agents/dashboard" element={<EmDashboardPage />} />
```

---

## 8. New Pages & Wrappers

### 8.1 `RmDashboardPage`

**File:** [`src/features/relationship-managers/pages/RmDashboardPage.tsx`](src/features/relationship-managers/pages/RmDashboardPage.tsx)

```tsx
export const RmDashboardPage: React.FC = () => {
  const { user } = usePermissions();
  const lockedRmId = user?.id ? Number(user.id) : undefined;
  return <RelationshipManagersPage lockedRmId={lockedRmId} />;
};
```

- Route: `/relationship-managers/dashboard`
- Used by: RELMNG (their sidebar "Dashboard" item)
- Effect: Renders the full `RelationshipManagersPage` with the logged-in RM's ID pre-locked. The RM dropdown is hidden.

---

### 8.2 `EmDashboardPage`

**File:** [`src/features/experience-managers/pages/EmDashboardPage.tsx`](src/features/experience-managers/pages/EmDashboardPage.tsx)

```tsx
export const EmDashboardPage: React.FC = () => {
  const { user } = usePermissions();
  const lockedEmId = user?.id ? Number(user.id) : undefined;
  return <ExperienceManagersPage lockedEmId={lockedEmId} />;
};
```

- Route: `/agents/dashboard`
- Used by: EXPMNG (their sidebar "Dashboard" item)
- Effect: Renders the full `ExperienceManagersPage` scoped to just the logged-in EM's data. The EM dropdown is hidden.

---

### 8.3 `AgentsPage`

**File:** [`src/features/experience-managers/pages/AgentsPage.tsx`](src/features/experience-managers/pages/AgentsPage.tsx)

```tsx
export const AgentsPage: React.FC = () => {
  const { roleCode, user } = usePermissions();

  if (roleCode === 'RELMNG') {
    const lockedRmId = user?.id ? Number(user.id) : undefined;
    return <ExperienceManagersPage lockedRmId={lockedRmId} />;
  }

  return <ExperienceManagersPage />;
};
```

- Route: `/agents`
- Used by: ADMIN, SADMIN (full EM list), RELMNG (EMs under their team only)
- Effect: Smart wrapper — for RELMNG it passes `lockedRmId` so only EMs returned by `useGetReporteesQuery` are shown. For admin roles it renders without restrictions.

---

## 9. Scoped Pages — How Locking Works

### 9.1 `RelationshipManagersPage` — `lockedRmId`

**File:** [`src/features/relationship-managers/pages/RelationshipManagersPage.tsx`](src/features/relationship-managers/pages/RelationshipManagersPage.tsx)

**New prop:**
```ts
interface RelationshipManagersPageProps {
  lockedRmId?: number; // When set: hides the RM dropdown, fixes data to this RM
}
```

**Behaviour when `lockedRmId` is set:**
1. `selectedRmId` state is initialised to `lockedRmId` instead of `null`
2. The RM dropdown is conditionally hidden: `{!lockedRmId && <DropdownMenu>…</DropdownMenu>}`
3. All API calls (`useGetRmDashboardDateWiseDataQuery`) receive `rm_ids: [lockedRmId]`

---

### 9.2 `ExperienceManagersPage` — `lockedEmId` / `lockedRmId`

**File:** [`src/features/experience-managers/pages/ExperienceManagersPage.tsx`](src/features/experience-managers/pages/ExperienceManagersPage.tsx)

**New props:**
```ts
interface ExperienceManagersPageProps {
  lockedEmId?: number; // EXPMNG login: fix to this EM, hide dropdown
  lockedRmId?: number; // RELMNG login: limit EM list to this RM's reportees
}
```

**Behaviour:**

| Prop Set | EM List Source | Dropdown Shown |
|---|---|---|
| Neither | `useGetAllUsersByRoleIdQuery({ role_id: 4 })` — all EMs | ✅ Yes |
| `lockedRmId` | `useGetReporteesQuery({ reporting_manager_id: lockedRmId })` | ❌ Hidden |
| `lockedEmId` | `useGetAllUsersByRoleIdQuery({ role_id: 4 })` (but `selectedEmId` fixed) | ❌ Hidden |

**EM list resolution logic:**
```ts
const { data: allEmUsers = [] } = useGetAllUsersByRoleIdQuery(
  { role_id: 4, offset: 0 },
  { skip: !!lockedRmId }      // skip global fetch when RM-locked
);

const { data: rmReportees = [] } = useGetReporteesQuery(
  { reporting_manager_id: lockedRmId as number, offset: 0 },
  { skip: !lockedRmId }       // only fetch when RM-locked
);

const emUsers = lockedRmId ? rmReportees : allEmUsers;
```

---

### 9.3 `WarRoomPage` — RELMNG scoping

**File:** [`src/features/war-room/pages/WarRoomPage.tsx`](src/features/war-room/pages/WarRoomPage.tsx)

```ts
const { roleCode } = usePermissions();
const { user } = useAuth();
const isRmLocked = roleCode === 'RELMNG';

// Skip fetching RM list when locked
const { data: rms = [] } = useGetAllUsersByRoleIdQuery(
  { role_id: 3, offset: 0 },
  { skip: isRmLocked }
);

// Inject the locked user's ID directly into the query
const selectedRm = useMemo(() => {
  if (isRmLocked) return { id: Number(user?.id) };
  return rms.find(r => `${r.first_name} ${r.last_name}`.trim() === selectedRmName);
}, [rms, selectedRmName, isRmLocked, user]);
```

The dropdown is hidden in the JSX: `{!isRmLocked && (<div>…dropdown…</div>)}`

---

### 9.4 `FollowUpsPage` — RELMNG / EXPMNG scoping

**File:** [`src/features/follow-ups/pages/FollowUpsPage.tsx`](src/features/follow-ups/pages/FollowUpsPage.tsx)

```ts
const { roleCode } = usePermissions();
const isRM = roleCode === 'RELMNG';
const isEM = roleCode === 'EXPMNG';
const isRoleScoped = isRM || isEM;

const queryUserId = useMemo(() => {
  if (isRoleScoped) return String(user?.id || '0'); // always own ID
  if (selectedRmUser) return String(selectedRmUser.id);
  if (selectedEmUser) return String(selectedEmUser.id);
  return user?.id || '0';
}, [selectedRmUser, selectedEmUser, user, isRoleScoped]);
```

The RM dropdown is hidden in the JSX: `{!isRoleScoped && (<div>…RM dropdown…</div>)}`

---

## 10. File Reference Map

| File | Role in RBAC |
|---|---|
| [`src/config/permissions.ts`](src/config/permissions.ts) | Permission constants & role→permission mapping |
| [`src/hooks/usePermissions.ts`](src/hooks/usePermissions.ts) | Hook to read `roleCode`, `user`, `can()` anywhere |
| [`src/features/auth/store/authSlice.ts`](src/features/auth/store/authSlice.ts) | Redux slice storing `currentRole` and `user` |
| [`src/layouts/AuthLayout.tsx`](src/layouts/AuthLayout.tsx) | Post-login role-aware redirect |
| [`src/layouts/MainLayout.tsx`](src/layouts/MainLayout.tsx) | Role-keyed sidebar navigation config |
| [`src/routes/PrivateRoutes.tsx`](src/routes/PrivateRoutes.tsx) | Route registration for all pages including new dashboard routes |
| [`src/features/relationship-managers/pages/RelationshipManagersPage.tsx`](src/features/relationship-managers/pages/RelationshipManagersPage.tsx) | RM dashboard — accepts `lockedRmId` prop |
| [`src/features/relationship-managers/pages/RmDashboardPage.tsx`](src/features/relationship-managers/pages/RmDashboardPage.tsx) | Thin wrapper: RELMNG personal dashboard at `/relationship-managers/dashboard` |
| [`src/features/experience-managers/pages/ExperienceManagersPage.tsx`](src/features/experience-managers/pages/ExperienceManagersPage.tsx) | EM dashboard — accepts `lockedEmId` and `lockedRmId` props |
| [`src/features/experience-managers/pages/EmDashboardPage.tsx`](src/features/experience-managers/pages/EmDashboardPage.tsx) | Thin wrapper: EXPMNG personal dashboard at `/agents/dashboard` |
| [`src/features/experience-managers/pages/AgentsPage.tsx`](src/features/experience-managers/pages/AgentsPage.tsx) | Smart wrapper for `/agents` — scopes EMs by RM for RELMNG logins |
| [`src/features/war-room/pages/WarRoomPage.tsx`](src/features/war-room/pages/WarRoomPage.tsx) | War Room — hides RM dropdown & silently injects `user.id` for RELMNG |
| [`src/features/follow-ups/pages/FollowUpsPage.tsx`](src/features/follow-ups/pages/FollowUpsPage.tsx) | Follow-ups — hides dropdowns & silently injects `user.id` for RELMNG/EXPMNG |

---

## 11. How to Extend Roles / Add Permissions

### Add a new permission to an existing role

Edit [`src/config/permissions.ts`](src/config/permissions.ts) only:

```ts
RELMNG: [
  ...existingPermissions,
  PERMISSIONS.LEAD_CREATE,  // ← add here
],
```

No other file needs to change.

### Add a new sidebar item to a specific role

Edit the `navItemsByRole` map in [`src/layouts/MainLayout.tsx`](src/layouts/MainLayout.tsx):

```ts
RELMNG: [
  ...existingItems,
  { label: 'New Feature', path: '/new-feature', icon: <NavIcon name="new" /> },
],
```

### Add a brand-new role

1. Add the role code and permissions to [`src/config/permissions.ts`](src/config/permissions.ts)
2. Add the sidebar items to `navItemsByRole` in [`src/layouts/MainLayout.tsx`](src/layouts/MainLayout.tsx)
3. Add the redirect in [`src/layouts/AuthLayout.tsx`](src/layouts/AuthLayout.tsx)
4. Add any data-scoping logic to relevant pages following the existing `isRmLocked` / `isRoleScoped` patterns

### Add data scoping to a new page

Follow the established pattern:

```tsx
// 1. Detect role
const { roleCode, user } = usePermissions();
const isScoped = roleCode === 'RELMNG' || roleCode === 'EXPMNG';

// 2. Inject user ID silently into API call
const queryParam = isScoped ? Number(user?.id) : selectedId;

// 3. Hide the UI selector
{!isScoped && <DropdownSelector />}
```
