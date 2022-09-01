import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { variables } from '../../constants/backend';

export const baseSlice = createApi({
  reducerPath: 'server-data',
  baseQuery: fetchBaseQuery({
    baseUrl: variables.BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Content-Type', 'application/json');
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // eslint-disable-next-line
  endpoints: (builder) => ({}),
});
