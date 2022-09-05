import { baseSlice } from '..';

export const user = baseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSelectedProject: builder.query<any, any>({
      query: (id) => `/api/projects/${id}/report`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSelectedProjectQuery } = user;
