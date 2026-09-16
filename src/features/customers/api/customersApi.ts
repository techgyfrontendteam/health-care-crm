import { baseApi } from '@/shared/api/baseApi';
import type { 
  Customer, 
  GetCustomersRequest, 
  GetCustomersResponse,
  UpdateCustomerRequest
} from '../types';

export const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/customers/createCustomer', method: 'POST', body }),
      invalidatesTags: ['Customers'],
    }),
    getCustomerById: builder.query<Customer, Record<string, unknown>>({
      query: (body) => ({ url: '/customers/getCustomerById', method: 'POST', body }),
      providesTags: ['Customers'],
    }),
    createCustomerPersona: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/customers/createCustomerPersona', method: 'POST', body }),
      invalidatesTags: ['Customers'],
    }),
    getCustomerDetailsForIdealCustomerProfile: builder.query<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/customers/getCustomerDetailsForIdealCustomerProfile', method: 'POST', body }),
      providesTags: ['Customers'],
    }),
    updateIdealCustomerProfile: builder.mutation<unknown, Record<string, unknown>>({
      query: (body) => ({ url: '/customers/updateIdealCustomerProfile', method: 'POST', body }),
      invalidatesTags: ['Customers'],
    }),
    getCustomers: builder.query<GetCustomersResponse, GetCustomersRequest>({
      query: (body) => ({
        url: '/customers/getCustomers',
        method: 'POST',
        body,
      }),
      providesTags: ['Customers'],
    }),
    updateCustomer: builder.mutation<{ message: string }, UpdateCustomerRequest>({
      query: (body) => ({
        url: '/customers/updateCustomer',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Customers'],
    }),
  }),
});

export const { 
  useCreateCustomerMutation,
  useGetCustomerByIdQuery,
  useCreateCustomerPersonaMutation,
  useGetCustomerDetailsForIdealCustomerProfileQuery,
  useUpdateIdealCustomerProfileMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} = customersApi;
