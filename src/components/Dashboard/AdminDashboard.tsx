import {
  AlertCircle,
  Check,
  Eye,
  FolderKanban,
  ListTodo,
  Notebook,
  Users,
  Watch,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetDashboardAnalyticsQuery } from "../../features/dashboard/dashboard.api";
import type { AdminDashboardResponseDto } from "../../features/dashboard/dashboard.interface";
import { useGetTasksQuery } from "../../features/task/task.api";
import { selectTasks } from "../../features/task/task.slice";
import { selectActiveUsers } from "../../features/user/user.slice";
import StatItem from "./StatItem";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";

const AdminDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: analyticsData, isLoading: analyticsLoading } =
    useGetDashboardAnalyticsQuery();

  const [analytics, setAnalytics] = useState<AdminDashboardResponseDto>();

  const activeUsers = useSelector(selectActiveUsers);
  const { isLoading } = useGetTasksQuery({
    status: searchParams.get("status") || undefined,
    priority: searchParams.get("priority") || undefined,
    dueFrom: searchParams.get("dueFrom") || undefined,
    dueTo: searchParams.get("dueTo") || undefined,
  });
  const tasks = useSelector(selectTasks);

  useEffect(() => {
    if (analyticsData?.data) {
      setAnalytics(analyticsData.data as AdminDashboardResponseDto);
    }
  }, [analyticsData]);

  if (isLoading || analyticsLoading) {
    return (
      <div className="py-10">
        <p className="text-center text-base">Loading...</p>
      </div>
    );
  }

  console.log(tasks);

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
        <StatItem
          icon={FolderKanban}
          label="Total Projects"
          value={(analytics?.totalProjects ?? 0).toString()}
        />

        <StatItem
          icon={ListTodo}
          label="Total Tasks"
          value={(analytics?.totalTasks ?? 0).toString()}
        />

        <StatItem
          icon={AlertCircle}
          label="Overdue Tasks"
          value={(analytics?.overdueTasks ?? 0).toString()}
        />

        <StatItem
          icon={Users}
          label="Online"
          value={activeUsers.length.toString()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatItem
          icon={Notebook}
          label="Todo Tasks"
          value={(analytics?.tasksByStatus.todo ?? 0).toString()}
        />

        <StatItem
          icon={Watch}
          label="In Progress Tasks"
          value={(analytics?.tasksByStatus.inProgress ?? 0).toString()}
        />

        <StatItem
          icon={Eye}
          label="In Review Tasks"
          value={(analytics?.tasksByStatus.inReview ?? 0).toString()}
        />

        <StatItem
          icon={Check}
          label="Done Tasks"
          value={(analytics?.tasksByStatus.done ?? 0).toString()}
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
