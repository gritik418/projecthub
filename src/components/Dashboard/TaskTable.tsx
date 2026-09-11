import { CalendarDays } from "lucide-react";

export default function TaskTable() {
  const tasks = [
    {
      title: "Implement authentication",
      project: "ProjectHub",
      priority: "HIGH",
      status: "In Progress",
      dueDate: "Sep 13",
    },
    {
      title: "Create dashboard",
      project: "ProjectHub",
      priority: "MEDIUM",
      status: "To Do",
      dueDate: "Sep 15",
    },
    {
      title: "Fix notification bug",
      project: "Website",
      priority: "URGENT",
      status: "In Review",
      dueDate: "Sep 12",
    },
  ];

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

            <th className="px-5 py-3 text-sm font-semibold text-white">Due</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.title}
              className="border-b border-white/3 hover:bg-white/2"
            >
              <td className="px-5 py-4">
                <span className="text-sm text-slate-300">{task.title}</span>
              </td>

              <td className="px-5 py-4">
                <span className="text-xs text-slate-300">{task.project}</span>
              </td>

              <td className="px-5 py-4">
                <Priority priority={task.priority} />
              </td>

              <td className="px-5 py-4">
                <Status status={task.status} />
              </td>

              <td className="px-5 py-4">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CalendarDays size={14} />
                  {task.dueDate}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
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
