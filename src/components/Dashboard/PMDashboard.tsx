import { FolderKanban, ListTodo, CalendarDays } from "lucide-react";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import StatItem from "./StatItem";
import ProjectItem from "./ProjectItem";

const PMDashboard = () => {
  return (
    <div className="min-h-screen space-y-6 px-8 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm font-medium text-slate-700">
          Manage your projects and upcoming work.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatItem icon={FolderKanban} label="My Projects" value="6" />
        <StatItem icon={ListTodo} label="Total Tasks" value="48" />
        <StatItem icon={CalendarDays} label="Due This Week" value="9" />
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-800 p-5">
        <div>
          <h2 className="text-2xl font-semibold text-slate-100">My Projects</h2>
          <p className="mt-1 text-base text-slate-300">
            Projects you are currently managing.
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <ProjectItem name="ProjectHub" tasks="18 tasks" />
          <ProjectItem name="Website Redesign" tasks="12 tasks" />
          <ProjectItem name="Mobile Application" tasks="18 tasks" />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Tasks </h2>
            <p className="mt-1 text-base text-slate-300">
              Upcoming and assigned tasks.
            </p>
          </div>
          <TaskFilters />
        </div>
        <TaskTable />
      </div>
    </div>
  );
};

export default PMDashboard;
