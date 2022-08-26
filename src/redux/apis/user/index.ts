import { baseSlice } from '..';

export const user = baseSlice.injectEndpoints({
  endpoints: (builder) => ({
    loggedInUser: builder.query<any, void>({
      query: () => 'api/users/profile',
    }),
  }),
  overrideExisting: false,
});

export const { useLoggedInUserQuery } = user;
