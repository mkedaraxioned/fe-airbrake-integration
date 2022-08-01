export interface Task {
  title: string;
  hr: string;
}

export interface FixedFormData {
  members: string[];
  milestones: { title: string; budget: string }[];
  tasks: string[];
}
