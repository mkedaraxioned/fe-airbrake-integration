export interface NewProjectFormData {
  clientName: string;
  projectName: string;
  projectType: 'fixed'|'retainer'|'retainer-granular';
  startDate: string;
  endDate?: string;
  billable:'billable'| 'nonBillable',
  teamMembers: string[]
}
export interface NewProjectFormErr {
  clientName?: string;
  projectName?: string;
  projectType?: string;
  startDate?: string;
  endDate?: string;
  teamMembers?:string;
}
