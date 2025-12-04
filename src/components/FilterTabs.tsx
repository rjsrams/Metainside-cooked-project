"use client";

import { cn } from "@/lib/utils";

export type FilterType = "all" | "active" | "completed";

interface FilterTabsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export function FilterTabs({ activeFilter, onFilterChange, counts }: FilterTabsProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/30 rounded-lg">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
            activeFilter === key
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {label}
          <span
            className={cn(
              "ml-2 px-1.5 py-0.5 text-xs rounded-full",
              activeFilter === key
                ? "bg-violet-500/20 text-violet-400"
                : "bg-secondary text-muted-foreground"
            )}
          >
            {counts[key]}
          </span>
        </button>
      ))}
    </div>
  );
}
