import { CalendarDays, FolderKanban, ListTodo } from "lucide-react";
import StatusBadge from "./StatusBadge";

const ProjectCard = ({
  name,
  description,
  status,
  tasks,
  dueDate,
}: {
  name: string;
  description: string;
  status: string;
  tasks: string;
  dueDate: string;
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
            <FolderKanban size={19} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-100">{name}</h2>

            <p className="mt-0.5 truncate text-sm text-slate-400">
              {description}
            </p>
          </div>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="mt-6 grid grid-cols-2 border-y border-slate-700 py-4">
        <div className="flex items-center gap-2">
          <ListTodo size={15} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Tasks</p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">{tasks}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Due</p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">
              {dueDate}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100/70 text-xs font-semibold text-indigo-700">
            R
          </div>

          <div>
            <p className="text-[11px] text-slate-500">Created by</p>
            <p className="text-sm font-medium text-slate-200">Ritik Gupta</p>
          </div>
        </div>

        <button className="text-sm font-medium text-indigo-400 transition hover:text-indigo-300">
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
