import { X, FolderKanban } from "lucide-react";
import SelectClientDropdown from "./SelectClientDropdown";
import { useForm } from "react-hook-form";
import type { CreateProjectDto } from "../../schemas/project/create-project.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateProjectSchema from "../../schemas/project/create-project.schema";
import { useCreateProjectMutation } from "../../features/project/project.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.slice";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  setShowCreateClientModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProjectModal = ({
  open,
  onClose,
  setShowCreateClientModal,
}: CreateProjectModalProps) => {
  const user = useSelector(selectUser);
  const [createProject] = useCreateProjectMutation();

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CreateProjectDto>({
    defaultValues: {
      name: "",
      description: "",
      clientId: "",
    },
    resolver: zodResolver(CreateProjectSchema),
  });
  if (!open) return null;
  if (!user || user.role === "DEVELOPER") return null;

  const handleCreateProject = async (values: CreateProjectDto) => {
    try {
      const result = await createProject(values).unwrap();

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
      reset();
      onClose();
    } catch (error: any) {
      if (error.status === "FETCH_ERROR") {
        toast.error(
          "Unable to connect to the server. Please make sure the server is running.",
        );
        return;
      }

      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-700 px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
              <FolderKanban size={20} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-slate-100">
                Create Project
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Create a new project for your workspace.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateProject)}
          className="space-y-3 px-6 py-6"
        >
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Project Name
            </label>

            <input
              {...register("name")}
              id="project-name"
              type="text"
              placeholder="e.g. Website Redesign"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {errors.name ? (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="project-description"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Description
              <span className="ml-1 text-slate-500">(optional)</span>
            </label>

            <textarea
              {...register("description")}
              id="project-description"
              rows={4}
              placeholder="Briefly describe what this project is about..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            {errors.description ? (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            ) : null}
          </div>

          <input
            {...register("clientId")}
            value={getValues().clientId}
            hidden
          />

          <SelectClientDropdown
            setShowCreateClientModal={setShowCreateClientModal}
            setValue={setValue}
          />

          {errors.clientId ? (
            <span className="text-xs text-red-500">
              {errors.clientId.message}
            </span>
          ) : null}

          <div className="flex mt-8 items-center justify-end gap-3 border-t border-slate-700 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg cursor-pointer border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg cursor-pointer bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;
