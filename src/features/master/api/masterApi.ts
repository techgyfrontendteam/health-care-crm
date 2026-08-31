import { baseApi } from '../../../app/api/baseApi';
import type { MasterDataResponse } from '../types';

export const masterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMasterData: builder.query<MasterDataResponse, void>({
      query: () => ({
        url: '/master/getAllMasterData',
        method: 'POST',
      }),
      transformResponse: (response: MasterDataResponse) => ({
        ...response,
        projects: response?.projects?.filter((project) => project.code !== 'PLTGRN') ?? [],
      }),
      providesTags: ['Master'],
    }),
  }),
});

export const { 
  useGetAllMasterDataQuery,
} = masterApi;
