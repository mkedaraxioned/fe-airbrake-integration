export interface FilterFormData {
  clientId: string;
  userId: string;
  projectId: string;
  billableType: string;
  groupBy: string;
  startDate: Date | null;
  endDate: Date | null;
}
