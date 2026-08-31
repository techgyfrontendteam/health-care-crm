import React from 'react';
import { usePermissions } from '../../../hooks/usePermissions';
import { RelationshipManagersPage } from './RelationshipManagersPage';

export const RmDashboardPage: React.FC = () => {
  const { user } = usePermissions();
  const lockedRmId = user?.id ? Number(user.id) : undefined;

  return <RelationshipManagersPage lockedRmId={lockedRmId} />;
};
