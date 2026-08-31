import React from 'react';
import { usePermissions } from '../../../hooks/usePermissions';
import { ExperienceManagersPage } from './ExperienceManagersPage';

export const EmDashboardPage: React.FC = () => {
  const { user } = usePermissions();
  const lockedEmId = user?.id ? Number(user.id) : undefined;

  return <ExperienceManagersPage lockedEmId={lockedEmId} />;
};
