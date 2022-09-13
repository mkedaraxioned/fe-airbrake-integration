import { baseSlice } from '..';

export const project = baseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSelectedProject: builder.query<any, any>({
      query: (id) => `/api/projects/${id}/report`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetSelectedProjectQuery } = project;
