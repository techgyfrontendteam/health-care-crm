import { baseApi } from '@/shared/api/baseApi';

export interface RegisterDeviceRequest {
  device_id: string;
  fcm_token: string;
  platform: 'web';
}

export interface DeviceHeartbeatRequest {
  device_id: string;
  platform: 'web';
}

export const notificationsSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerDevice: builder.mutation<any, RegisterDeviceRequest>({
      query: (body) => ({
        url: '/auth/registerDevice',
        method: 'POST',
        body,
      }),
    }),
    deviceHeartbeat: builder.mutation<any, DeviceHeartbeatRequest>({
      query: (body) => ({
        url: '/auth/deviceHeartbeat',
        method: 'POST',
        body,
      }),
    }),
    getAllNotificationsByUserId: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/leadChats/getAllNotificationsByUserId', method: 'POST', body }),
    }),
    markAllNotificationsAsRead: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/leadChats/markAllNotificationAsReadByUserId', method: 'POST', body }),
    }),
    markNotificationAsRead: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/leadChats/markNotificationAsReadByUserNotificationId', method: 'POST', body }),
    }),
    sendMissedFollowupEscalations: builder.mutation<unknown, Record<string, unknown> | void>({
      query: (body = {}) => ({ url: '/escalation/sendMissedFollowupEscalations', method: 'POST', body }),
    }),
  }),
});

export const {
  useRegisterDeviceMutation,
  useDeviceHeartbeatMutation,
  useGetAllNotificationsByUserIdQuery,
  useMarkAllNotificationsAsReadMutation,
  useMarkNotificationAsReadMutation,
  useSendMissedFollowupEscalationsMutation,
} = notificationsSlice;
