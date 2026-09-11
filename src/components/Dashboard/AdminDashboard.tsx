import { AlertCircle, FolderKanban, ListTodo, Users } from "lucide-react";

import StatItem from "./StatItem";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";

const AdminDashboard = () => {
  return (
    <div className="space-y-6 px-8 min-h-screen py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-700 font-medium">
          Overview of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatItem icon={FolderKanban} label="Projects" value="12" />
        <StatItem icon={ListTodo} label="Tasks" value="86" />
        <StatItem icon={AlertCircle} label="Overdue" value="7" />
        <StatItem icon={Users} label="Online" value="14" />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-2xl text-slate-100">Tasks</h2>

            <p className="mt-1 text-base text-slate-300">All workspace tasks</p>
          </div>

          <TaskFilters />
        </div>

        <TaskTable />
      </div>
    </div>
  );
};

export default AdminDashboard;
