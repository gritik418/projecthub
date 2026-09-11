import { Plus, Search } from "lucide-react";
import ProjectCard from "../../components/Projects/ProjectCard";
import { useEffect, useState } from "react";
import CreateProjectModal from "../../components/Projects/CreateProjectModal";
import { useGetProjectsQuery } from "../../features/project/project.api";
import type { Project } from "../../features/project/project.interface";

const Projects = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { data, isLoading } = useGetProjectsQuery();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (data?.data?.projects) {
      setProjects(data.data.projects);
    }
  }, [data]);

  return (
    <div className="min-h-screen space-y-6 px-8 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Projects
          </h1>

          <p className="mt-1 text-sm font-medium text-slate-700">
            Manage and track your workspace projects.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} /> New Project
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search projects..."
            className="w-full rounded-lg border border-slate-800 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-indigo-500"
          />
        </div>

        <select className="rounded-lg border border-slate-800 bg-slate-800 px-4 py-2.5 text-sm text-slate-300 outline-none focus:border-indigo-500">
          <option>All Status</option>
          <option>Planning</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Archived</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((project: Project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default Projects;
