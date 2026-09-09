import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PageHeader } from '../../../shared/components/PageHeader/PageHeader';
import { FilterBar, SearchInput } from '../../../shared/components/FilterBar/FilterBar';
import { AppDrawer } from '../../../shared/components/AppDrawer/AppDrawer';
import { ConfirmDialog } from '../../../shared/components/ConfirmDialog/ConfirmDialog';
import { Button } from '../../../components/ui/button';
import { UserPlus } from "lucide-react";
import { UserTable } from '../components/UserTable';
import { UserForm } from '../components/UserForm';
import { TelephonyAgentDialog } from '../components/TelephonyAgentDialog';
import {
  useGetAllUsersByRoleIdQuery,
  useGetReporteesQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} from '../api/usersApi';
import { usePermissions } from '../../../hooks/usePermissions';
import { toast } from 'sonner';
import type { User } from '../types';

interface UsersFeaturePageProps {
  roleId: number;
  roleLabel: string;
  title: string;
  description: string;
  permissionPrefix: 'manager' | 'agent';
}

export const UsersFeaturePage = ({
  roleId,
  roleLabel,
  title,
  description,
  permissionPrefix
}: UsersFeaturePageProps) => {
  const { can } = usePermissions();
  const navigate = useNavigate();


  const [serverOffset, setServerOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState<'created_on' | 'first_name'>('created_on');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [createdUserData, setCreatedUserData] = useState<{ id: number; name: string; phone: string } | null>(null);
  const [isTelephonyDialogOpen, setIsTelephonyDialogOpen] = useState(false);

  const { currentRole, user: currentUser } = usePermissions();
  const isRM = currentRole?.code === 'RELMNG';
  const isAdmin = currentRole?.code === 'ADMIN' || currentRole?.code === 'SADMIN';
  const isEMScreen = roleId === 4;

  const { data: allUsers = [], isLoading: isAllLoading, isFetching: isAllFetching } = useGetAllUsersByRoleIdQuery({
    role_id: roleId,
    offset: serverOffset,
  }, { skip: isRM && isEMScreen });

  const { data: reportees = [], isLoading: isReporteesLoading, isFetching: isReporteesFetching } = useGetReporteesQuery({
    reporting_manager_id: Number(currentUser?.id || 0),
    offset: serverOffset,
  }, { skip: !isRM || !isEMScreen });

  const serverUsers = isRM && isEMScreen ? reportees : allUsers;
  const isLoading = isRM && isEMScreen ? isReporteesLoading : isAllLoading;
  const isFetching = isRM && isEMScreen ? isReporteesFetching : isAllFetching;

  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const sortedAndFilteredData = React.useMemo(() => {
    let result = [...serverUsers];
    if (search) {
      const normalize = (str: string) => str.replace(/\s+/g, "").toLowerCase();
      const searchValue = normalize(search);
      const lowerSearch = search.toLowerCase();

      result = result.filter((u: User) => {
        const fullName = normalize(`${u.first_name || ""} ${u.last_name || ""}`);
        const phoneDigits = u.phone_number?.replace(/\D/g, "") || "";
        const searchDigits = search.replace(/\D/g, "");
        const isNumericSearch = searchDigits.length > 0 && !/[a-zA-Z]/.test(search);

        return (
          fullName.includes(searchValue) ||
          u.first_name?.toLowerCase().includes(lowerSearch) ||
          u.last_name?.toLowerCase().includes(lowerSearch) ||
          u.login_id?.toLowerCase().includes(lowerSearch) ||
          u.email?.toLowerCase().includes(lowerSearch) ||
          u.project_name?.toLowerCase().includes(lowerSearch) ||
          u.projectName?.toLowerCase().includes(lowerSearch) ||
          (u.phone_number && u.phone_number.includes(search)) ||
          (isNumericSearch && phoneDigits.includes(searchDigits))
        );
      });
    }
    result.sort((a, b) => {
      let valA: any, valB: any;
      if (sortField === 'created_on') {
        valA = a.created_on ? new Date(a.created_on).getTime() : 0;
        valB = b.created_on ? new Date(b.created_on).getTime() : 0;
      } else {
        valA = a.first_name.toLowerCase();
        valB = b.first_name.toLowerCase();
      }
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    return result;
  }, [serverUsers, search, sortField, sortOrder]);

  const totalItems = sortedAndFilteredData.length < 200
    ? serverOffset + sortedAndFilteredData.length
    : serverOffset + 201;

  const handlePageChange = (newPage: number) => {
    const targetIndex = (newPage - 1) * limit;
    const newServerOffset = Math.floor(targetIndex / 200) * 200;
    if (newServerOffset !== serverOffset) setServerOffset(newServerOffset);
    setPage(newPage);
  };

  const handleSort = (field: 'created_on' | 'first_name') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const actions = (can(`${permissionPrefix}.create`) || isAdmin) && (
    <Button
      onClick={() => { setEditingUser(null); setIsDrawerOpen(true); }}
      className="bg-[#0f3d6b] hover:bg-[#0c2f54] text-white rounded-full px-5 py-2 flex items-center gap-2 
       shadow-[0px_4px_6px_-4px_rgba(6,54,105,0.1),0px_10px_15px_-3px_rgba(6,54,105,0.1)]"
    >
      <UserPlus className="h-4 w-4" />
      Create {permissionPrefix === 'manager' ? 'Sales Head' : 'Sales Executive'}
    </Button>
  );

  return (
    <div className="space-y-4">
      <PageHeader title={title} description={description} actions={actions} />

      <FilterBar>
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search by Name, Phone, or Project..."
          className="relative w-[360px]"
        />
      </FilterBar>

      <UserTable
        data={sortedAndFilteredData}
        isLoading={isLoading || isFetching}
        page={page}
        limit={limit}
        total={totalItems}
        onPageChange={handlePageChange}
        onLimitChange={setLimit}
        onEdit={(user) => { setEditingUser(user); setIsDrawerOpen(true); }}
        onDelete={(id) => { setSelectedUserId(id); setIsDeleteDialogOpen(true); }}
        permissionPrefix={permissionPrefix}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
        offset={serverOffset}
        onNameClick={
          roleId === 4
            ? (user) => {
              navigate(`/scheduled-visits/${user.id}`);
            }
            : undefined
        }
      />

      <AppDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={editingUser ? `Edit ${roleLabel}` : `New ${roleLabel}`}
        description={editingUser ? "Modify user details below." : `Fill in the details to create a new ${roleLabel.toLowerCase()} account.`}
        showHeader={false}
        width="sm"
      >
        <UserForm
          onSubmit={handleFormSubmit}
          isLoading={isCreating || isUpdating}
          initialValues={editingUser || undefined}
          isEdit={!!editingUser}
          roleId={roleId}
          roleLabel={roleLabel}
          onClose={() => setIsDrawerOpen(false)}
        />
      </AppDrawer>

      <ConfirmDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Delete User"
        description={`Are you sure you want to delete this ${roleLabel.toLowerCase()}? This action cannot be undone.`}
      />

      <TelephonyAgentDialog
        open={isTelephonyDialogOpen}
        onClose={() => {
          setIsTelephonyDialogOpen(false);
          setCreatedUserData(null);
        }}
        userId={createdUserData?.id}
        userName={createdUserData?.name}
        initialPhone={createdUserData?.phone}
        onSuccess={() => {
          setIsTelephonyDialogOpen(false);
          setCreatedUserData(null);
        }}
      />
    </div>
  );

  async function handleFormSubmit(values: any) {
    try {
      if (editingUser) {
        await updateUser({ ...values, id: editingUser.id }).unwrap();
        toast.success('Updated successfully');
        setIsDrawerOpen(false);
      } else {
        const createRes = await createUser({ ...values, role_id: roleId }).unwrap();
        toast.success('User created successfully. Temporary password has been sent to the registered email.');
        setIsDrawerOpen(false);

        // Extract newly created user ID and open Telephony Agent Dialog
        const createdId =
          createRes?.id ||
          createRes?.user_id ||
          createRes?.data?.id ||
          (typeof createRes === "number" ? createRes : undefined);
        const fullName = `${values.first_name || ""} ${values.last_name || ""}`.trim();

        if (createdId) {
          setCreatedUserData({
            id: Number(createdId),
            name: fullName,
            phone: values.phone_number || "",
          });
          setIsTelephonyDialogOpen(true);
        }
      }
    } catch (err: any) {
      let message =
        err?.data?.error ||
        err?.data?.message ||
        "Something went wrong";

      if (message.includes("Duplicate entry") && message.includes("phone_number")) {
        message = "Phone number already exists";
      }

      toast.error(message);
    }
  }

  async function handleDeleteConfirm() {
    if (!selectedUserId) return;
    try {
      await deleteUser(selectedUserId).unwrap();
      toast.success('Deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || 'Delete operation failed');
    }
  }
};