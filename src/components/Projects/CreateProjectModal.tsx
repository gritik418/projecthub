import { X, FolderKanban } from "lucide-react";
import SelectClientDropdown from "./SelectClientDropdown";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-700 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100/70 text-indigo-700">
              <FolderKanban size={20} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-100">
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

        <form className="space-y-5 px-6 py-6">
          <div>
            <label
              htmlFor="project-name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Project Name
            </label>

            <input
              id="project-name"
              type="text"
              placeholder="e.g. Website Redesign"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
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
              id="project-description"
              rows={4}
              placeholder="Briefly describe what this project is about..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <SelectClientDropdown />

          <div className="flex items-center justify-end gap-3 border-t border-slate-700 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-800"
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
