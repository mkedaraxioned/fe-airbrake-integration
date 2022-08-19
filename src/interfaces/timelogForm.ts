export interface TimelogForm {
  date: Date;
  projectName: string;
  retainerMonth: string;
  logTime: string;
  comments: string;
}

export interface TimelogFormError {
  date?: string;
  projectName?: string;
  task?: string;
  logTime?: string;
  comments?: string;
}

export interface TimeLogFormData {
  date: Date | string;
  projectId?: string;
  clientId?: string;
  milestoneId: string;
  taskId?: string;
  logTime: string;
  comments: string;
  billingType: boolean;
}
