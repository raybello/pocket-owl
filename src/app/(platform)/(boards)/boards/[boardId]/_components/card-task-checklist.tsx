"use client";

import { Circle, CircleCheckBig} from "lucide-react";
import { useState } from "react";

export function CardTaskChecklist({
  taskId,
  taskName,
}: {
  taskId: number;
  taskName: string;
}) {
  const [isTaskDone, setIsTaskDone] = useState(false);

  return (
    <div className="ml-3 flex items-center">
      <button
        className="flex flex-row items-center space-x-2"
        onClick={() => setIsTaskDone(!isTaskDone)}
      >
        <div>
          {isTaskDone ? (
            <CircleCheckBig className="h-4 w-4 stroke-slate-500" />
          ) : (
            <Circle className="h-4 w-4 stroke-slate-500" />
          )}
        </div>
        <div
          className={
            isTaskDone
              ? "text-sm text-slate-500 line-through"
              : "text-sm text-slate-500"
          }
        >
          {taskId}: {taskName}
        </div>
      </button>
    </div>
  );
}
