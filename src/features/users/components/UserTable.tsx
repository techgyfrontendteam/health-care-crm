import React from 'react';
import { DataTable } from '../../../shared/components/DataTable/DataTable';
import { usePermissions } from '../../../hooks/usePermissions';
import { useMasterDataLookup } from '../../../shared/hooks/useMasterDataLookup';
import { Pencil, Users, Phone, LayoutList, Mail, Eye } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { formatDate, cn } from '../../../utils';
import { ExperienceManagerListDialog } from './ExperienceManagerListDialog';
import { UserLeadsDialog } from './UserLeadsDialog';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types';
import type { ColumnDef } from '../../../shared/components/DataTable/DataTable';
import type { Permission } from '../../../config/permissions';

interface UserTableProps {
  data: User[];
  isLoading: boolean;
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  permissionPrefix: 'manager' | 'agent';
  sortField?: 'created_on' | 'first_name';
  sortOrder?: 'asc' | 'desc';
  onSort?: (field: 'created_on' | 'first_name') => void;
  offset?: number;
  onNameClick?: (user: User) => void;
  headerActions?: React.ReactNode;
}

const AVATAR_PALETTE = [
  { bg: '#FEF3C7', text: '#92400E' },
  { bg: '#DBEAFE', text: '#1D4ED8' },
  { bg: '#D1FAE5', text: '#065F46' },
  { bg: '#FCE7F3', text: '#9D174D' },
  { bg: '#EDE9FE', text: '#5B21B6' },
  { bg: '#CFFAFE', text: '#155E75' },
  { bg: '#FEE2E2', text: '#991B1B' },
];

function avatarStyle(id: number) {
  return AVATAR_PALETTE[id % AVATAR_PALETTE.length];
}

const TRAY = '#F3F4F6';
const WHITE = '#ffffff';

export const UserTable = ({
  data,
  isLoading,
  page,
  limit,
  total,
  onPageChange,
  onLimitChange,
  onEdit,
  onDelete,
  permissionPrefix,
  sortField,
  sortOrder,
  onSort,
  offset = 0,
  onNameClick,
  headerActions,
}: UserTableProps) => {
  const { can } = usePermissions();
  const navigate = useNavigate();
  const { getRmLabel, isLoading: isLookupLoading } = useMasterDataLookup();
  const [viewAgentsManager, setViewAgentsManager] = React.useState<User | null>(null);
  const [selectedLeadsUser, setSelectedLeadsUser] = React.useState<User | null>(null);

  const columns: ColumnDef<User>[] = [
    {
      key: 'first_name',
      header: permissionPrefix === 'manager' ? 'Sales Executive' : 'Experience Manager',
      sortable: true,
      render: (user) => {
        const initials = `${user.first_name?.[0] ?? ''}${user.last_name?.[0] ?? ''}`.toUpperCase();
        const s = avatarStyle(user.id);
        return (
          <div className="flex items-center gap-3">
            <div style={{
              width: 42, height: 42, borderRadius: '50%',
              background: s.bg, color: s.text,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, flexShrink: 0,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}>
              {initials || '??'}
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <div
                className={cn(
                  "max-w-[200px] truncate whitespace-nowrap overflow-hidden font-semibold text-sm",
                  onNameClick
                    ? "cursor-pointer text-blue-600 hover:underline"
                    : "text-zinc-900 dark:text-zinc-100"
                )}
                title={`${user.first_name || ''} ${user.last_name || ''}`.trim()}
                onClick={() => onNameClick?.(user)}
              >
                {user.first_name} {user.last_name}
              </div>
              {can(`${permissionPrefix}.edit` as Permission) && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(user);
                  }}
                  className="p-1 rounded-md text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition cursor-pointer shrink-0"
                  title="Edit user"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        );
      },
    },
    {
      key: 'phone_number',
      header: 'Contact Info',
      render: (user) => (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <Phone size={12} className="text-zinc-400 shrink-0" />
            <span className="font-medium text-sm text-zinc-700 dark:text-zinc-300">{user.phone_number || '—'}</span>
          </div>
          {user.caller_id && (
            <span className="text-[11px] pl-[18px] text-zinc-400 font-medium">
              Caller ID: {user.caller_id}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Mail',
      render: (user) => (
        <div className="flex items-center gap-1.5">
          <Mail size={13} className="text-zinc-400 shrink-0" />
          <span className="font-medium text-sm text-zinc-600 dark:text-zinc-300 truncate max-w-[200px]" title={user.email || ''}>
            {user.email || '—'}
          </span>
        </div>
      ),
    },
    {
      key: 'created_on',
      header: 'Creation Date',
      sortable: true,
      render: (user) => (
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{formatDate(user.created_on)}</span>
      ),
    },
    ...(permissionPrefix === 'agent' ? [{
      key: 'reporting_manager_id' as keyof User,
      header: 'Assigned Sales Executive',
      render: (user: User) => {
        const rmName = getRmLabel(user.reporting_manager_id);
        return (
          <div className="max-w-[220px]">
            <div
              className="truncate whitespace-nowrap overflow-hidden text-ellipsis text-zinc-500 font-medium text-sm"
              title={rmName}
            >
              {rmName}
            </div>
          </div>
        );
      },
    }] : []),
    {
      key: 'actions',
      header: 'Actions',
      width: '130px',
      render: (user: User) => (
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedLeadsUser(user)}
            className="h-8 px-3 rounded-lg text-xs font-semibold text-[#0f3d6b] dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 bg-blue-50/60 hover:bg-blue-100/80 dark:bg-blue-950/40 dark:hover:bg-blue-900/60 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
            title="View Leads"
          >
            <Eye className="h-3.5 w-3.5" />
            View Leads
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div
      className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[32px] overflow-hidden shadow-sm user-table-wrapper"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <style>{`
        .user-table-wrapper thead th {
          color: #64748B !important;
          text-transform: uppercase !important;
          font-size: 11px !important;
          letter-spacing: 0.05em !important;
          font-weight: 700 !important;
        }
      `}</style>

      {/* Integrated Header */}
      <div className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Active {permissionPrefix === "manager" ? "Sales Executives" : "Experience Managers"}
          </h2>
          <div className="h-2 w-2 rounded-full bg-red-500 mt-1" />
        </div>
        {headerActions && <div>{headerActions}</div>}
      </div>

      <DataTable
        columns={columns as any}
        data={data}
        isLoading={isLoading || isLookupLoading}
        page={page}
        limit={limit}
        total={total}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        rowKey={(u) => u.id}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={onSort as any}
        offset={offset}
        variant="embed"
      />

      <ExperienceManagerListDialog
        open={!!viewAgentsManager}
        onClose={() => setViewAgentsManager(null)}
        manager={viewAgentsManager}
      />
      <UserLeadsDialog
        open={!!selectedLeadsUser}
        onClose={() => setSelectedLeadsUser(null)}
        user={selectedLeadsUser}
      />
    </div>
  );
};