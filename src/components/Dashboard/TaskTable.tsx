import { CalendarDays } from "lucide-react";
import type { Task } from "../../features/task/task.interface";

export default function TaskTable({ tasks }: { tasks: Task[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-180">
        <thead>
          <tr className="border-b border-white/5 text-left">
            <th className="px-5 py-3 text-sm font-semibold text-white">Task</th>

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

            <th className="px-5 py-3 text-sm font-semibold text-white">Due</th>
          </tr>
        </thead>

        {tasks.length === 0 ? (
          <tbody className="py-10 text-center text-white w-full">
            <tr>
              <td>
                <div className="py-10 text-center">No tasks yet.</div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.title}
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
                  </span>{" "}
                </td>

                <td className="px-5 py-4">
                  <Priority priority={task.priority} />
                </td>

                <td className="px-5 py-4">
                  <Status status={task.status} />
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
  );
}

function Priority({ priority }: { priority: string }) {
  return <span className="text-xs text-slate-400">{priority}</span>;
}

function Status({ status }: { status: string }) {
  return <span className="text-xs text-slate-400">{status}</span>;
}
