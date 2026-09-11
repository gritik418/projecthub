import {
  ArrowLeft,
  CalendarDays,
  FolderKanban,
  ListTodo,
  Plus,
  UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import TaskFilters from "../../components/Dashboard/TaskFilters";
import TaskTable from "../../components/Dashboard/TaskTable";
import { useGetProjectDetailsQuery } from "../../features/project/project.api";
import { useEffect, useState } from "react";
import type { ProjectDetails } from "../../features/project/project.interface";
import CreateTaskModal from "../../components/Tasks/CreateTaskModal";

export default function ProjectDetails() {
  const canCreateTask = true;
  const { projectId } = useParams();
  const [project, setProject] = useState<ProjectDetails>();
  const [showCreateTaskModal, setShowCreateTaskModal] =
    useState<boolean>(false);

  const { data, isLoading } = useGetProjectDetailsQuery(projectId!, {
    skip: !projectId,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data?.data?.project) {
      setProject(data.data.project);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="py-60 text-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isLoading && !project) {
    return (
      <div className="py-60 text-center">
        <p className="text-xl">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen space-y-6 px-8 py-10">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
      >
        <ArrowLeft size={17} />
        Back to Projects
      </Link>

      <div className="rounded-xl border border-slate-800 bg-slate-800 p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100/70 text-indigo-700">
              <FolderKanban size={23} />
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
                {project?.name}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                {project?.description}
              </p>
            </div>
          </div>

          {canCreateTask && (
            <button
              onClick={() => {
                setShowCreateTaskModal(true);
              }}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Create Task
            </button>
          )}
        </div>

        <div className="mt-6 flex justify-end flex-wrap gap-20 border-t border-slate-700 pt-5">
          <ProjectInfo
            icon={UserRound}
            label="Client"
            value={project?.client.name ?? ""}
          />

          <ProjectInfo
            icon={UserRound}
            label="Created By"
            value={project?.createdBy.name ?? ""}
          />

          <ProjectInfo
            icon={CalendarDays}
            label="Created"
            value={new Date(project?.createdAt!).toDateString()}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat
          label="Total Tasks"
          value={(project?._count.tasks || 0).toString()}
        />

        <Stat label="To Do" value="8" />

        <Stat label="In Progress" value="10" />

        <Stat label="Completed" value="6" />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-800">
        <div className="flex flex-col gap-4 border-b border-slate-700 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ListTodo size={20} className="text-indigo-400" />

              <h2 className="text-2xl font-semibold text-slate-100">Tasks</h2>
            </div>

            <p className="mt-1 text-sm text-slate-300">
              Manage and track tasks for this project.
            </p>
          </div>

          <TaskFilters />
        </div>

        <TaskTable tasks={project?.tasks || []} />
      </div>

      {showCreateTaskModal ? (
        <CreateTaskModal
          onClose={() => {
            setShowCreateTaskModal(false);
          }}
          open={showCreateTaskModal}
          projectId={projectId!}
        />
      ) : null}
    </div>
  );
}

function ProjectInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 text-slate-300">
        <Icon size={17} />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400">{label}</p>

        <p className="mt-0.5 text-sm font-medium text-slate-100">{value}</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-800 p-5">
      <p className="text-sm font-medium text-slate-300">{label}</p>

      <p className="mt-3 text-2xl font-semibold text-slate-100">{value}</p>
    </div>
  );
}
