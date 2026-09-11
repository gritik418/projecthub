import { CalendarDays, FolderKanban, ListTodo } from "lucide-react";
import type { Project } from "../../features/project/project.interface";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }: { project: Project }) => {
  const user = useSelector(selectUser);
  if (!user) return null;

  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
            <FolderKanban size={19} />
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold text-slate-100">
              {project.name}
            </h2>

            <p className="mt-0.5 truncate text-sm text-slate-400">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 border-y border-slate-700 py-4">
        <div className="flex items-center gap-2">
          <ListTodo size={15} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Tasks</p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">
              {project._count?.tasks}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Last Updated:</p>
            <p className="mt-0.5 text-sm font-medium text-slate-200">
              {new Date(project.updatedAt).toDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100/70 text-xs font-semibold text-indigo-700">
            {project.createdBy.name.charAt(0)}
          </div>

          <div>
            <p className="text-[11px] text-slate-500">Created by</p>
            {user.id === project.createdById ? (
              <p className="text-sm font-medium text-green-400">You</p>
            ) : (
              <p className="text-sm font-medium text-slate-200">
                {project.createdBy.name}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => {
            navigate(`/projects/${project.id}`);
          }}
          className="text-sm cursor-pointer font-medium text-indigo-400 transition hover:text-indigo-300"
        >
          View Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
