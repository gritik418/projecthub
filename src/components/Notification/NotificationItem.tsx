import { Check, ClipboardCheck } from "lucide-react";
import type { Notification } from "../../features/notification/notification.interface";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const formatTime = (date: string) => {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  return (
    <div
      className={`group flex gap-3 border-b border-slate-800 px-4 py-4 transition hover:bg-slate-800/60 ${
        !notification.isRead ? "bg-slate-800/30" : ""
      }`}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
        <ClipboardCheck size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium text-slate-200">
            {notification.title}
          </p>

          {!notification.isRead && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
          )}
        </div>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {notification.message}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-600">
            {formatTime(notification.createdAt)}
          </span>

          {!notification.isRead && (
            <button
              type="button"
              onClick={() => onMarkAsRead(notification.id)}
              className="flex items-center gap-1 text-[11px] font-medium text-slate-500 opacity-0 transition group-hover:opacity-100 hover:text-indigo-400"
            >
              <Check size={13} />
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
