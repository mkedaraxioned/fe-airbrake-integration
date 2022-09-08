export interface ProjectDetails {
  projectName: string;
  projectType: string;
  clientName: string;
  logTime: number;
  budget?: number;
  milestones: ProjectMileStone[];
}

export interface ProjectMileStone {
  name: string;
  logTime: number;
  budget?: number;
  users: ProjectUser[];
}

export interface ProjectUser {
  name: string;
  logTime: number;
  timecards: ProjectActivity[];
}

export interface ProjectActivity {
  timecardId: string;
  date: string;
  comments: string;
  taskId?: string | null;
  task?: string | null;
  logTime: number;
  updateAt: string;
}
