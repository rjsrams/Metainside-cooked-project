"use client";

import { CheckCircle2, Circle, ListTodo } from "lucide-react";

interface TaskStatsProps {
  total: number;
  active: number;
  completed: number;
}

export function TaskStats({ total, active, completed }: TaskStatsProps) {
  const stats = [
    {
      label: "Total Tasks",
      value: total,
      icon: ListTodo,
      iconColor: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Active",
      value: active,
      icon: Circle,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Completed",
      value: completed,
      icon: CheckCircle2,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map(({ label, value, icon: Icon, iconColor, bgColor }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center p-4 bg-card/50 backdrop-blur-sm 
                   border border-border/50 rounded-xl hover:border-violet-500/30 transition-all duration-300"
        >
          <div className={`p-2 ${bgColor} rounded-lg mb-2`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
