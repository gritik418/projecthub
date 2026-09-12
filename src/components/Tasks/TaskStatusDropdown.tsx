import type { TaskStatus } from "../../schemas/task/create-task.schema";
import { useUpdateTaskStatusMutation } from "../../features/task/task.api";

interface TaskStatusDropdownProps {
  taskId: string;
  status: TaskStatus;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const statusOptions: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "IN_REVIEW",
  "DONE",
];

const statusConfig: Record<
  TaskStatus,
  {
    label: string;
    className: string;
  }
> = {
  TODO: {
    label: "To Do",
    className: "bg-gray-100 text-gray-700",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700",
  },
  IN_REVIEW: {
    label: "In Review",
    className: "bg-orange-100 text-orange-700",
  },
  DONE: {
    label: "Done",
    className: "bg-green-100 text-green-700",
  },
};

const TaskStatusDropdown = ({
  taskId,
  status,
  isOpen,
  onToggle,
  onClose,
}: TaskStatusDropdownProps) => {
  const [updateTaskStatus, { isLoading }] = useUpdateTaskStatusMutation();

  const handleStatusChange = async (newStatus: TaskStatus) => {
    if (newStatus === status || isLoading) {
      onClose();
      return;
    }

    try {
      await updateTaskStatus({
        taskId,
        data: {
          status: newStatus,
        },
      }).unwrap();

      onClose();
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const current = statusConfig[status];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        disabled={isLoading}
        onClick={onToggle}
        className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ${current.className}`}
      >
        {current.label}

        <span className={isOpen ? "rotate-180" : ""}>▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-9999 mt-2 min-w-40 rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
          {statusOptions.map((option) => {
            const config = statusConfig[option];

            return (
              <button
                key={option}
                type="button"
                disabled={isLoading}
                onClick={() => handleStatusChange(option)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                {config.label}

                {option === status && <span>✓</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskStatusDropdown;
