import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateClientMutation } from "../../features/client/client.api";
import CreateClientSchema, {
  type CreateClientDto,
} from "../../schemas/client/create-client.schema";

interface CreateClientModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateClientModal = ({ open, onClose }: CreateClientModalProps) => {
  const [createClient] = useCreateClientMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClientDto>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
    },
    resolver: zodResolver(CreateClientSchema),
  });

  const handleCreateClient = async (values: CreateClientDto) => {
    try {
      const result = await createClient(values).unwrap();

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
      <div className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-700 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <UserPlus size={20} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-100">
                Add Client
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Add a new client to your workspace.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-slate-200"
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateClient)}
          className="space-y-5 px-6 py-6"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Client Name
            </label>

            <input
              {...register("name", {
                required: "Client name is required.",
              })}
              id="name"
              type="text"
              placeholder="Enter client name"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>

            <input
              {...register("email", {
                required: "Email is required.",
              })}
              id="email"
              type="email"
              placeholder="client@example.com"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />

            {errors.email && (
              <p className="mt-1.5 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Company
              <span className="ml-1 text-slate-500">(optional)</span>
            </label>

            <input
              {...register("company")}
              id="company"
              type="text"
              placeholder="Enter company name"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-100 outline-none placeholder:text-slate-500 transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-slate-700 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              <UserPlus size={17} />
              Add Client
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientModal;
