import { ListTodo, Clock, AlertCircle } from "lucide-react";

import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";
import StatItem from "./StatItem";
import { useGetTasksQuery } from "../../features/task/task.api";
import { useEffect, useState } from "react";
import type { Task } from "../../features/task/task.interface";
import { useSearchParams } from "react-router-dom";

const DeveloperDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
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

  if (isLoading) {
    return (
      <div className="py-10">
        <p className="text-center text-base">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 px-8 py-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm font-medium text-slate-700">
          Tasks assigned to you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatItem icon={ListTodo} label="Assigned" value="14" />

        <StatItem icon={Clock} label="In Progress" value="5" />

        <StatItem icon={AlertCircle} label="Urgent" value="2" />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">My Tasks</h2>

            <p className="mt-1 text-base text-slate-300">
              Sorted by priority and due date.
            </p>
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

export default DeveloperDashboard;
