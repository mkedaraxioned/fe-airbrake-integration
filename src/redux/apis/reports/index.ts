import { baseSlice } from '..';

export const reportsApi = baseSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReportData: builder.query<any, void>({
      query: (searchQueryValues: any) =>
        `api/reports?startDate=${searchQueryValues.startDate}&endDate=${searchQueryValues.endDate}&groupBy=${searchQueryValues.groupBy}&billableType=${searchQueryValues.billableType}&clientId=${searchQueryValues.clientId}&projectId=${searchQueryValues.projectId}&userId=${searchQueryValues.userId}`,
    }),
  }),
  overrideExisting: false,
});

export const { useGetReportDataQuery } = reportsApi;
