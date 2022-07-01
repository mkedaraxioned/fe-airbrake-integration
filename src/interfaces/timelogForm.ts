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
