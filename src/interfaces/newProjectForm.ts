export interface MemberObj {
  id: number;
  name: string;
  avatar: string;
  email: string;
  role: string;
  status: string;
}

export interface NewProjectFormData {
  clientId: string;
  title: string;
  type: 'FIXED' | 'RETAINER' | 'RETAINER_GRANULAR';
  startDate?: string;
  endDate?: string | null;
  billingType: boolean;
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
