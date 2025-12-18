import type { Task } from "@/types/task";
import { completeTask, createTask } from "@/utils/task";
import React, { createContext, useContext, useMemo, useState } from "react";

type TasksContextValue = {
  tasks: Task[];
  addTask: (title: string) => void;
  markDone: (id: string) => void;
};

const TasksContext = createContext<TasksContextValue | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    const t = title.trim();
    if (!t) return;
    setTasks((prev) => [createTask(t), ...prev]);
  };

  const markDone = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? completeTask(t) : t)));
  };

  const value = useMemo(() => ({ tasks, addTask, markDone }), [tasks]);

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside <TasksProvider>");
  return ctx;
}
