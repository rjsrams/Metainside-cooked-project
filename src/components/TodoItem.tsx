"use client";

import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TODO_LIST_ADDRESS, TODO_LIST_ABI } from "@/lib/contracts";
import { Check, Circle, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Task {
  id: bigint;
  content: string;
  completed: boolean;
  createdAt: bigint;
}

interface TodoItemProps {
  task: Task;
  index: number;
  onUpdate?: () => void;
}

export function TodoItem({ task, index, onUpdate }: TodoItemProps) {
  const { 
    writeContract: toggleWrite, 
    data: toggleHash, 
    isPending: isTogglePending 
  } = useWriteContract();
  
  const { 
    writeContract: deleteWrite, 
    data: deleteHash, 
    isPending: isDeletePending 
  } = useWriteContract();

  const { isLoading: isToggleConfirming } = useWaitForTransactionReceipt({
    hash: toggleHash,
  });

  const { isLoading: isDeleteConfirming } = useWaitForTransactionReceipt({
    hash: deleteHash,
  });

  const handleToggle = () => {
    toggleWrite({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "toggleTask",
      args: [BigInt(index)],
    });
  };

  const handleDelete = () => {
    deleteWrite({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "deleteTask",
      args: [BigInt(index)],
    });
  };

  const isToggling = isTogglePending || isToggleConfirming;
  const isDeleting = isDeletePending || isDeleteConfirming;
  const isLoading = isToggling || isDeleting;

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-4 p-4 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl",
        "hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-300",
        task.completed && "opacity-60",
        isLoading && "opacity-50 pointer-events-none"
      )}
    >
      <button
        onClick={handleToggle}
        disabled={isLoading}
        className={cn(
          "mt-0.5 flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
          task.completed
            ? "bg-gradient-to-r from-violet-600 to-indigo-600 border-transparent"
            : "border-muted-foreground/30 hover:border-violet-500 hover:bg-violet-500/10"
        )}
      >
        {isToggling ? (
          <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
        ) : task.completed ? (
          <Check className="h-3 w-3 text-white" />
        ) : (
          <Circle className="h-3 w-3 text-transparent group-hover:text-violet-500/50" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-foreground break-words transition-all duration-200",
            task.completed && "line-through text-muted-foreground"
          )}
        >
          {task.content}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Created {formatDate(task.createdAt)}
        </p>
      </div>

      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 
                 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        {isDeleting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
