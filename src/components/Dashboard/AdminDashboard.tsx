import { AlertCircle, FolderKanban, ListTodo, Users } from "lucide-react";

import StatItem from "./StatItem";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import { useGetTasksQuery } from "../../features/task/task.api";
import { useEffect, useState } from "react";
import type { Task } from "../../features/task/task.interface";
import { useSearchParams } from "react-router-dom";
import { selectActiveUsers } from "../../features/user/user.slice";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeUsers = useSelector(selectActiveUsers);
  const { data, isLoading } = useGetTasksQuery({
    status: searchParams.get("status") || undefined,
    priority: searchParams.get("priority") || undefined,
    dueFrom: searchParams.get("dueFrom") || undefined,
    dueTo: searchParams.get("dueTo") || undefined,
  });
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (data?.data?.tasks) {
      setTasks(data.data.tasks);
    }
  }, [data]);

  console.log(searchParams.get("status"));
  if (isLoading) {
    return (
      <div className="py-10">
        <p className="text-center text-base">Loading...</p>
      </div>
    );
  }

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
        <StatItem
          icon={Users}
          label="Online"
          value={activeUsers.length.toString()}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-2xl text-slate-100">Tasks</h2>

            <p className="mt-1 text-base text-slate-300">All workspace tasks</p>
          </div>

          <TaskFilters
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>

        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default AdminDashboard;
