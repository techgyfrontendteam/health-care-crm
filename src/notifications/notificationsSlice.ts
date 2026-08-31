import { baseApi } from '../app/api/baseApi';

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
  }),
});

export const { useRegisterDeviceMutation, useDeviceHeartbeatMutation } = notificationsSlice;
