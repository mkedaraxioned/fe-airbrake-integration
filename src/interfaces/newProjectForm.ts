export interface MemberObj {
  id: number;
  name?: string;
}

export interface NewProjectFormData {
  client: string;
  title: string;
  type: 'FIXED' | 'RETAINER' | 'RETAINER_GRANULAR';
  startDate: string | null;
  endDate?: string | null;
  billable: boolean;
  members: MemberObj[];
}
export interface NewProjectFormErr {
  client?: string;
  title?: string;
  projectType?: string;
  startDate?: string;
  endDate?: string;
  members?: string;
}

export interface Client {
  id: string;
  name: string;
}
