import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

const UpdatePasswordPage = React.lazy(() => import('../features/auth/pages/UpdatePasswordPage').then(m => ({ default: m.UpdatePasswordPage })));
const DashboardPage = React.lazy(() => import('../features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const LeadsPage = React.lazy(() => import('../features/leads/pages/LeadsPage').then(m => ({ default: m.LeadsPage })));
const LeadDetailsPage = React.lazy(() => import('../features/leads/pages/LeadDetailsPage').then(m => ({ default: m.LeadDetailsPage })));
const ChatListPage = React.lazy(() => import('../features/leads/pages/ChatListPage').then(m => ({ default: m.ChatListPage })));
const LeadChatPage = React.lazy(() => import('../features/leads/pages/LeadChatPage').then(m => ({ default: m.LeadChatPage })));
const RelationshipManagersPage = React.lazy(() => import('../features/relationship-managers/pages/RelationshipManagersPage').then(m => ({ default: m.RelationshipManagersPage })));
const RmDashboardPage = React.lazy(() => import('../features/relationship-managers/pages/RmDashboardPage').then(m => ({ default: m.RmDashboardPage })));
const ExperienceManagersPage = React.lazy(() => import('../features/experience-managers/pages/ExperienceManagersPage').then(m => ({ default: m.ExperienceManagersPage })));
const AgentsPage = React.lazy(() => import('../features/experience-managers/pages/AgentsPage').then(m => ({ default: m.AgentsPage })));
const EmDashboardPage = React.lazy(() => import('../features/experience-managers/pages/EmDashboardPage').then(m => ({ default: m.EmDashboardPage })));
const CustomersPage = React.lazy(() => import('../features/customers/pages/CustomersPage').then(m => ({ default: m.CustomersPage })));
const PlaygroundPage = React.lazy(() => import('../features/playground/pages/PlaygroundPage').then(m => ({ default: m.PlaygroundPage })));
const ScheduledVisitsPage = React.lazy(() => import('../features/scheduled-visits/pages/ScheduledVisitsPage').then(m => ({ default: m.ScheduledVisitsPage })));
const VisitFeedbackAuditPage = React.lazy(() => import('../features/scheduled-visits/pages/VisitFeedbackAuditPage').then(m => ({ default: m.VisitFeedbackAuditPage })));
const ReportsPage = React.lazy(() => import('../features/reports/pages/ReportsPage').then(m => ({ default: m.ReportsPage })));
const DailySalesReportPage = React.lazy(() => import('../features/reports/pages/DailySalesReportPage').then(m => ({ default: m.DailySalesReportPage })));
const ProjectObjectionsPage = React.lazy(() => import('../features/reports/pages/ProjectObjectionsPage').then(m => ({ default: m.ProjectObjectionsPage })));
const PersonaSegmentPage = React.lazy(() => import('../features/reports/pages/PersonaSegmentPage').then(m => ({ default: m.PersonaSegmentPage })));
const LeadSourceQualityPage = React.lazy(() => import('../features/reports/pages/LeadSourceQualityPage').then(m => ({ default: m.LeadSourceQualityPage })));
const CampaignPerformancePage = React.lazy(() => import('../features/reports/pages/CampaignPerformancePage').then(m => ({ default: m.CampaignPerformancePage })));
const ProjectAnalyticsPage = React.lazy(() => import('../features/project-analytics/pages/ProjectAnalyticsPage').then(m => ({ default: m.ProjectAnalyticsPage })));
const MasterDataPage = React.lazy(() => import('../features/master-data/pages/MasterDataPage').then(m => ({ default: m.MasterDataPage })));
const LeadStatusesPage = React.lazy(() =>
  import("../features/master-data/pages/LeadStatusesPage").then((m) => ({ default: m.LeadStatusesPage }))
);
const ContentPage = React.lazy(() =>
  import("../features/master-data/pages/ContentPage").then((m) => ({ default: m.ContentPage }))
);
const ContentTypesPage = React.lazy(() =>
  import("../features/master-data/pages/ContentTypesPage").then((m) => ({ default: m.ContentTypesPage }))
);
const FollowUpStatusesPage = React.lazy(() =>
  import("../features/master-data/pages/FollowUpStatusesPage").then((m) => ({ default: m.FollowUpStatusesPage }))
);
const ObjectionsPage = React.lazy(() =>
  import("../features/master-data/pages/ObjectionsPage").then((m) => ({ default: m.ObjectionsPage }))
);
const ProjectScorePage = React.lazy(() =>
  import("../features/master-data/pages/ProjectScorePage").then((m) => ({ default: m.ProjectScorePage }))
);
const PointsPage = React.lazy(() =>
  import("../features/master-data/pages/PointsPage").then((m) => ({ default: m.PointsPage }))
);
const FollowUpsPage = React.lazy(() =>
  import("../features/follow-ups/pages/FollowUpsPage").then((m) => ({ default: m.FollowUpsPage }))
);
const WarRoomPage = React.lazy(() =>
  import("../features/war-room/pages/WarRoomPage").then((m) => ({ default: m.WarRoomPage }))
);
const MarketingDashboardPage = React.lazy(() =>
  import("../features/marketing-dashboard/pages/MarketingDashboardPage").then((m) => ({ default: m.MarketingDashboardPage }))
);
const DoctorsPage = React.lazy(() =>
  import("../features/doctors/pages/DoctorsPage").then((m) => ({ default: m.DoctorsPage }))
);


const ComingSoonReportPage = React.lazy(() => import('../features/reports/pages/ComingSoonReportPage').then(m => ({ default: m.ComingSoonReportPage })));

export const PrivateRoutes = (
  <Route element={<MainLayout />}>
    <Route path="/" element={<Navigate to="/leads" replace />} />
    <Route path="/doctors" element={<DoctorsPage />} />
    {/* <Route path="/project-analytics" element={<ProjectAnalyticsPage />} /> */}
    {/* <Route path="/master-data" element={<MasterDataPage />} /> */}
    {/* <Route path="/master-data/lead-statuses" element={<LeadStatusesPage />} /> */}
    {/* <Route path="/master-data/content" element={<ContentPage />} /> */}
    {/* <Route path="/master-data/content-types" element={<ContentTypesPage />} /> */}
    {/* <Route path="/master-data/follow-up-statuses" element={<FollowUpStatusesPage />} /> */}
    {/* <Route path="/master-data/objections" element={<ObjectionsPage />} /> */}
    {/* <Route path="/master-data/project-score" element={<ProjectScorePage />} /> */}
    {/* <Route path="/master-data/points" element={<PointsPage />} /> */}
    <Route path="/update-password" element={<UpdatePasswordPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/leads" element={<LeadsPage />} />
    <Route path="/follow-ups" element={<FollowUpsPage />} />
    <Route path="/leads/:leadId" element={<LeadDetailsPage />} />
    <Route path="/chat" element={<ChatListPage />} />
    <Route path="/chat/:leadUuid" element={<LeadChatPage />} />
    <Route path="/scheduled-visits" element={<ScheduledVisitsPage />} />
    <Route path="/scheduled-visits/:emId" element={<ScheduledVisitsPage />} />
    <Route path="/visit-feedback/completed/:visitId" element={<VisitFeedbackAuditPage />} />
    {/* <Route path="/customers" element={<CustomersPage />} /> */}
    <Route path="/relationship-managers" element={<RelationshipManagersPage />} />
    <Route path="/relationship-managers/dashboard" element={<RmDashboardPage />} />
    <Route path="/relationship-managers/stale" element={<RelationshipManagersPage />} />
    <Route path="/relationship-managers/escalated" element={<RelationshipManagersPage />} />
    <Route path="/relationship-managers/leaderboard" element={<RelationshipManagersPage />} />
    <Route path="/relationship-managers/table" element={<RelationshipManagersPage />} />
    {/* <Route path="/agents" element={<AgentsPage />} /> */}
    <Route path="/agents/dashboard" element={<EmDashboardPage />} />
    <Route path="/playground" element={<PlaygroundPage />} />
    <Route path="/reports" element={<ReportsPage />} />
    {/* <Route path="/reports/daily-sales" element={<DailySalesReportPage />} /> */}
    {/* <Route path="/reports/project-objections" element={<ProjectObjectionsPage />} /> */}
    {/* <Route path="/reports/persona" element={<PersonaSegmentPage />} /> */}
    {/* <Route path="/reports/lead-quality" element={<LeadSourceQualityPage />} /> */}
    {/* <Route path="/reports/campaigns" element={<CampaignPerformancePage />} /> */}
    <Route path="/reports/op-reports" element={<ComingSoonReportPage title="OP Reports" />} />
    <Route path="/reports/ip-reports" element={<ComingSoonReportPage title="IP Reports" />} />
    {/* <Route path="/war-room" element={<WarRoomPage />} /> */}
    {/* <Route path="/marketing-dashboard" element={<MarketingDashboardPage />} /> */}
  </Route>
);
