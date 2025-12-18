export type TaskStatus = "todo" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
  completedAt?: number;
};
