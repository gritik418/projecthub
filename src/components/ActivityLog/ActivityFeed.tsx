import { CheckCircle2, Clock3, CircleDot, User } from "lucide-react";
import type { ActivityLog } from "../../features/project/project.interface";

interface ActivityFeedProps {
  activities: ActivityLog[];
}

const statusLabels: Record<string, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  DONE: "Done",
};

const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  if (!activities.length) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800 p-8 text-center">
        <Clock3 className="mx-auto mb-3 h-8 w-8 text-slate-500" />

        <h3 className="text-sm font-semibold text-slate-200">
          No activity yet
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Task activity will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
      <div className="border-b border-slate-700 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-100">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Latest activity across your projects
            </p>
          </div>

          <span className="rounded-full border border-slate-600 bg-slate-700/70 px-3 py-1 text-xs font-medium text-slate-300">
            {activities.length} events
          </span>
        </div>
      </div>

      <div className="divide-y divide-slate-700/70">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 px-5 py-4 transition-colors hover:bg-slate-700/30"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
              {activity.user.name ? (
                getInitials(activity.user.name)
              ) : (
                <User size={16} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm text-slate-300">
                  <span className="font-semibold text-slate-100">
                    {activity.user.name}
                  </span>

                  {activity.type === "STATUS_CHANGED" && (
                    <>
                      <span className="mx-1 text-slate-400">
                        changed status of
                      </span>

                      <span className="font-medium text-slate-200">
                        {activity.task.title}
                      </span>
                    </>
                  )}

                  {activity.type === "TASK_CREATED" && (
                    <>
                      <span className="mx-1 text-slate-400">created task</span>

                      <span className="font-medium text-slate-200">
                        {activity.task.title}
                      </span>
                    </>
                  )}

                  {activity.type === "TASK_ASSIGNED" && (
                    <>
                      <span className="mx-1 text-slate-400">was assigned</span>

                      <span className="font-medium text-slate-200">
                        {activity.task.title}
                      </span>
                    </>
                  )}
                </div>

                <span className="shrink-0 text-xs text-slate-500">
                  {formatTime(activity.createdAt)}
                </span>
              </div>

              {activity.type === "STATUS_CHANGED" && (
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="rounded-md border border-slate-600 bg-slate-700 px-2 py-1 font-medium text-slate-300">
                    {statusLabels[activity.oldStatus ?? ""] ??
                      activity.oldStatus}
                  </span>

                  <span className="text-slate-500">→</span>

                  <span className="flex items-center gap-1 rounded-md border border-indigo-400/20 bg-indigo-500/10 px-2 py-1 font-medium text-indigo-300">
                    {activity.newStatus === "DONE" ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <CircleDot size={13} />
                    )}

                    {statusLabels[activity.newStatus ?? ""] ??
                      activity.newStatus}
                  </span>
                </div>
              )}

              <p className="mt-1 text-xs text-slate-500">
                {activity.user.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
