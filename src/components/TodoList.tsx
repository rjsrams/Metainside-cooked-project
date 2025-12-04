"use client";

import { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { TODO_LIST_ADDRESS, TODO_LIST_ABI } from "@/lib/contracts";
import { TodoItem } from "./TodoItem";
import { FilterTabs, type FilterType } from "./FilterTabs";
import { TaskStats } from "./TaskStats";
import { AddTaskForm } from "./AddTaskForm";
import { Inbox, Loader2 } from "lucide-react";

interface Task {
  id: bigint;
  content: string;
  completed: boolean;
  createdAt: bigint;
}

export function TodoList() {
  const { isConnected } = useAccount();
  const [filter, setFilter] = useState<FilterType>("all");

  const { data: tasks, isLoading, refetch } = useReadContract({
    address: TODO_LIST_ADDRESS,
    abi: TODO_LIST_ABI,
    functionName: "getMyTasks",
    query: {
      enabled: isConnected,
      refetchInterval: 5000,
    },
  });

  const taskList = (tasks as Task[]) || [];
  const activeTasks = taskList.filter((t) => !t.completed);
  const completedTasks = taskList.filter((t) => t.completed);

  const filteredTasks = filter === "all" 
    ? taskList 
    : filter === "active" 
      ? activeTasks 
      : completedTasks;

  const counts = {
    all: taskList.length,
    active: activeTasks.length,
    completed: completedTasks.length,
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 bg-violet-500/10 rounded-full mb-4">
          <Inbox className="h-12 w-12 text-violet-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-muted-foreground max-w-sm">
          Connect your wallet to start managing your decentralized todo list on Base Sepolia.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TaskStats
        total={counts.all}
        active={counts.active}
        completed={counts.completed}
      />

      <AddTaskForm onTaskAdded={() => refetch()} />

      <div className="flex items-center justify-between">
        <FilterTabs
          activeFilter={filter}
          onFilterChange={setFilter}
          counts={counts}
        />
      </div>

      <div className="space-y-3">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 bg-secondary/50 rounded-full mb-4">
              <Inbox className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">
              {filter === "all"
                ? "No tasks yet. Add your first task above!"
                : filter === "active"
                  ? "No active tasks. Great job!"
                  : "No completed tasks yet."}
            </p>
          </div>
        ) : (
          filteredTasks.map((task, idx) => {
            const originalIndex = taskList.findIndex((t) => t.id === task.id);
            return (
              <TodoItem
                key={task.id.toString()}
                task={task}
                index={originalIndex}
                onUpdate={() => refetch()}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
