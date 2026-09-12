import { CalendarDays } from "lucide-react";
import type { Task } from "../../features/task/task.interface";
import TaskStatusDropdown from "../Tasks/TaskStatusDropdown";
import { useState } from "react";

const TaskTable = ({ tasks }: { tasks: Task[] }) => {
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);

  return (
    <div className="">
      <div className="overflow-x-auto min-h-60 overflow-y-visible">
        <table className="w-full min-w-180">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="px-5 py-3 text-sm font-semibold text-white">
                Task
              </th>

              <th className="px-5 py-3 text-sm font-semibold text-white">
                Project
              </th>

              <th className="px-5 py-3 text-sm font-semibold text-white">
                Priority
              </th>

              <th className="px-5 py-3 text-sm font-semibold text-white">
                Status
              </th>

              <th className="px-5 py-3 text-sm font-semibold text-white">
                Assigned Developer
              </th>

              <th className="px-5 py-3 text-sm font-semibold text-white">
                Due
              </th>
            </tr>
          </thead>

          {tasks.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={6} className="py-10 text-center text-white">
                  No tasks yet.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task.id}
                  className="border-b border-white/3 hover:bg-white/2"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm capitalize text-slate-300">
                      {task.title}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="text-xs capitalize text-slate-300">
                      {task.project.name}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <Priority priority={task.priority} />
                  </td>

                  <td className="px-5 py-4">
                    <TaskStatusDropdown
                      status={task.status}
                      taskId={task.id}
                      isOpen={openTaskId === task.id}
                      onToggle={() =>
                        setOpenTaskId((current) =>
                          current === task.id ? null : task.id,
                        )
                      }
                      onClose={() => setOpenTaskId(null)}
                    />
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-400">
                    <div className="flex flex-col gap-1">
                      {task.assignedDeveloper.name}

                      <span className="text-[11px] font-medium">
                        {task.assignedDeveloper.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <CalendarDays size={14} />
                      {new Date(task.dueDate).toDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default TaskTable;

function Priority({ priority }: { priority: string }) {
  return <span className="text-xs text-slate-400">{priority}</span>;
}
