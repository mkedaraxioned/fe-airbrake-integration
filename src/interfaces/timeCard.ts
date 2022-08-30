export interface Timecards {
  totalHours: string;
  projects: Project[];
}

export interface Project {
  name: string;
  tasks: Task[];
  totalTime: string;
  client?: string;
}

export interface Task {
  timecardId: string;
  taskId?: string;
  milestoneId: string;
  projectId: string;
  isBillable: boolean;
  name: string;
  comments: string;
  minutesLogged?: number;
  timeLogged: string;
}

export interface Project {
  clientId: string;
  clientName: string;
  label: string;
  value: string;
}
