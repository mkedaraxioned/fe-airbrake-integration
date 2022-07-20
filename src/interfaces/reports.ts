export interface FilterFormData {
  clientName: string;
  personName: string;
  projectName: string;
  groupBy: string;
  startDate: Date | null;
  endDate: Date | null;
  include: {
    billable: string;
    nonBillable: string;
  };
}
