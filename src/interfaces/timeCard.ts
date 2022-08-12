export interface Timecards {
  totalHours: string;
  projects: Project[];
}

export interface Project {
  name: string;
  tasks: Task[];
  totalTime: string;
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
