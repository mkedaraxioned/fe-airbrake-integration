export interface MemberObj {
  id: number;
  name: string;
}

export interface NewProjectFormData {
  clientName: string;
  projectName: string;
  projectType: 'fixed' | 'retainer' | 'retainer-granular';
  startDate: Date | null;
  endDate?: Date | null;
  billable: 'billable' | 'nonBillable';
  teamMembers: MemberObj[];
}
export interface NewProjectFormErr {
  clientName?: string;
  projectName?: string;
  projectType?: string;
  startDate?: string;
  endDate?: string;
  teamMembers?: string;
}
