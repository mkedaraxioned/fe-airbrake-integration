import { baseSlice } from '..';

export const dashboard = baseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query<any, void>({
      query: () => 'api/clients',
    }),
    getAllProjects: builder.query<any, void>({
      query: () => 'api/projects',
    }),
    getAllUsers: builder.query<any, void>({
      query: () => 'api/users/all',
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllClientsQuery,
  useGetAllProjectsQuery,
  useGetAllUsersQuery,
} = dashboard;
