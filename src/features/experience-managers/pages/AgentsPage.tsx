import React from 'react';
import { usePermissions } from '../../../hooks/usePermissions';
import { ExperienceManagersPage } from './ExperienceManagersPage';


export const AgentsPage: React.FC = () => {
  const { roleCode, user } = usePermissions();

  if (roleCode === 'RELMNG') {
    const lockedRmId = user?.id ? Number(user.id) : undefined;
    return <ExperienceManagersPage lockedRmId={lockedRmId} />;
  }

  return <ExperienceManagersPage />;
};
