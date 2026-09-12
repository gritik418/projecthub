import {
  CalendarDays,
  Check,
  Eye,
  FolderKanban,
  ListTodo,
  Notebook,
  Watch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useGetDashboardAnalyticsQuery } from "../../features/dashboard/dashboard.api";
import type { ProjectManagerDashboardResponseDto } from "../../features/dashboard/dashboard.interface";
import { useGetTasksQuery } from "../../features/task/task.api";
import { selectTasks } from "../../features/task/task.slice";
import StatItem from "./StatItem";
import TaskFilters from "./TaskFilters";
import TaskTable from "./TaskTable";

const PMDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: analyticsData, isLoading: analyticsLoading } =
    useGetDashboardAnalyticsQuery();

  const [analytics, setAnalytics] =
    useState<ProjectManagerDashboardResponseDto>();

  const { isLoading } = useGetTasksQuery({
    status: searchParams.get("status") || undefined,
    priority: searchParams.get("priority") || undefined,
    dueFrom: searchParams.get("dueFrom") || undefined,
    dueTo: searchParams.get("dueTo") || undefined,
  });

  const tasks = useSelector(selectTasks);

  useEffect(() => {
    if (analyticsData?.data) {
      setAnalytics(analyticsData.data as ProjectManagerDashboardResponseDto);
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
        <StatItem
          icon={FolderKanban}
          label="My Projects"
          value={(analytics?.projects.total ?? 0).toString()}
        />

        <StatItem
          icon={ListTodo}
          label="Active Projects"
          value={(analytics?.projects.active ?? 0).toString()}
        />

        <StatItem
          icon={CalendarDays}
          label="Done Projects"
          value={(analytics?.projects.completed ?? 0).toString()}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatItem
          icon={Notebook}
          label="Todo Tasks"
          value={(analytics?.tasks.todo ?? 0).toString()}
        />

        <StatItem
          icon={Watch}
          label="In Progress Tasks"
          value={(analytics?.tasks.inProgress ?? 0).toString()}
        />

        <StatItem
          icon={Eye}
          label="In Review Tasks"
          value={(analytics?.tasks.inReview ?? 0).toString()}
        />

        <StatItem
          icon={Check}
          label="Done Tasks"
          value={(analytics?.tasks.done ?? 0).toString()}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Tasks </h2>
            <p className="mt-1 text-base text-slate-300">
              Tasks from your projects.
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

export default PMDashboard;
