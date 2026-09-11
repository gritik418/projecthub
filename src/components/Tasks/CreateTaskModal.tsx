import { CalendarDays, ListTodo, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CreateTaskDto } from "../../schemas/task/create-task.schema";
import CreateTaskSchema from "../../schemas/task/create-task.schema";
import SelectDeveloperDropdown from "./SelectDeveloperDropdown";
import { useGetDevelopersQuery } from "../../features/user/user.api";
import { useEffect, useState } from "react";
import type { Developer } from "../../features/user/user.interface";
import { useCreateTaskMutation } from "../../features/task/task.api";
import { toast } from "react-toastify";

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

const CreateTaskModal = ({
  open,
  onClose,
  projectId,
}: CreateTaskModalProps) => {
  const { data } = useGetDevelopersQuery();
  const [createTask] = useCreateTaskMutation();

  const [developers, setDevelopers] = useState<Developer[]>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateTaskDto>({
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
      projectId,
      assignedDeveloperId: "",
    },
    resolver: zodResolver(CreateTaskSchema),
  });

  useEffect(() => {
    if (data?.data?.developers) {
      setDevelopers(data.data.developers);
    }
  }, [data]);

  const handleCreateTask = async (values: CreateTaskDto) => {
    try {
      const result = await createTask(values).unwrap();

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-700 bg-slate-800 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <ListTodo size={20} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-100">
                Create Task
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Add a new task to this project.
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
          onSubmit={handleSubmit(handleCreateTask)}
          className="space-y-5 px-6 py-6"
        >
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Task Title
            </label>

            <input
              {...register("title")}
              id="task-title"
              type="text"
              placeholder="e.g. Build authentication API"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {errors.title && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Description
              <span className="ml-1 text-slate-500">(optional)</span>
            </label>

            <textarea
              {...register("description")}
              id="task-description"
              rows={4}
              placeholder="Describe what needs to be done..."
              className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {errors.description && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <SelectDeveloperDropdown
            developers={developers || []}
            setValue={setValue}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Status
              </label>

              <select
                {...register("status")}
                id="status"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="IN_REVIEW">IN_REVIEW</option>
                <option value="DONE">DONE</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Priority
              </label>

              <select
                {...register("priority")}
                id="priority"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="due-date"
              className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-200"
            >
              <CalendarDays size={16} className="text-slate-400" />
              Due Date
            </label>

            <input
              {...register("dueDate")}
              id="due-date"
              type="date"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {errors.dueDate && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.dueDate.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-700 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg cursor-pointer border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <ListTodo size={17} />
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
