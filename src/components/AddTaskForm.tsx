"use client";

import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { TODO_LIST_ADDRESS, TODO_LIST_ABI } from "@/lib/contracts";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AddTaskFormProps {
  onTaskAdded?: () => void;
}

export function AddTaskForm({ onTaskAdded }: AddTaskFormProps) {
  const [content, setContent] = useState("");
  
  const { writeContract, data: hash, isPending, reset } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && content) {
      setContent("");
      reset();
      onTaskAdded?.();
    }
  }, [isSuccess, content, reset, onTaskAdded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    writeContract({
      address: TODO_LIST_ADDRESS,
      abi: TODO_LIST_ABI,
      functionName: "createTask",
      args: [content.trim()],
    });
  };

  const isLoading = isPending || isConfirming;

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What needs to be done?"
            disabled={isLoading}
            maxLength={500}
            className="w-full px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl 
                     focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50
                     placeholder:text-muted-foreground/50 transition-all duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {content.length > 0 && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {content.length}/500
            </span>
          )}
        </div>
        <Button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 
                   shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200
                   disabled:shadow-none"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Add Task</span>
        </Button>
      </div>
      
      {isConfirming && (
        <p className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
          <Loader2 className="h-3 w-3 animate-spin" />
          Confirming transaction...
        </p>
      )}
    </form>
  );
}
