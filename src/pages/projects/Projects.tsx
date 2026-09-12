import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CreateClientModal from "../../components/Clients/CreateClientModal";
import CreateProjectModal from "../../components/Projects/CreateProjectModal";
import ProjectCard from "../../components/Projects/ProjectCard";
import { useGetProjectsQuery } from "../../features/project/project.api";
import type { Project } from "../../features/project/project.interface";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.slice";

const Projects = () => {
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [showCreateClientModal, setShowCreateClientModal] =
    useState<boolean>(false);
  const user = useSelector(selectUser);
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

        {user && user.role !== "DEVELOPER" ? (
          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} /> New Project
          </button>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {isLoading ? (
          <div className="py-16 text-center w-full lg:col-span-2">
            Loading...
          </div>
        ) : (
          <>
            {projects.map((project: Project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </>
        )}
      </div>

      <CreateProjectModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        setShowCreateClientModal={setShowCreateClientModal}
      />

      <CreateClientModal
        open={showCreateClientModal}
        onClose={() => {
          setShowCreateClientModal(false);
        }}
      />
    </div>
  );
};

export default Projects;
