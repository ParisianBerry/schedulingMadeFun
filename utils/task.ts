import type { Task } from "@/types/task";

export function createTask(title: string): Task {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: title.trim(),
    status: "todo",
    createdAt: Date.now(),
  };
}

export function completeTask(task: Task): Task {
  return { ...task, status: "done", completedAt: Date.now() };
}
