export interface Task {
  title: string;
  hr: string;
}

export interface Member {
  avatar: string;
  createdAt: string;
  email: string;
  googleId: string;
  id: string;
  name: string;
  projectIds: string[];
  role: string;
  status: string;
  taskIds: [];
  updatedAt: string;
}

export interface Milestone {
  title: string;
  budget: string;
  id?: string;
  startDate: Date | string;
  endDate: Date | string;
}

export interface FixedFormObj {
  members: Member[];
  milestones: Milestone[];
}
export interface Task {
  title: string;
  hr: string;
}

export interface RecurringFormObj {
  members: Member[];
  tasks: Task[];
  milestones: Milestone[];
}
