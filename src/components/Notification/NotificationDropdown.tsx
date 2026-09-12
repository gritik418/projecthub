import { Bell, CheckCheck } from "lucide-react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectNotifications } from "../../features/notification/notification.slice";
import NotificationItem from "./NotificationItem";
import {
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from "../../features/notification/notification.api";

type NotificationProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NotificationDropdown = ({ isOpen, setIsOpen }: NotificationProps) => {
  const notifications = useSelector(selectNotifications);
  const [markAllNotificationsAsRead] = useMarkAllAsReadMutation();
  const [markNotificationAsRead] = useMarkAsReadMutation();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead,
  ).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id).unwrap();
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead().unwrap();
    } catch (error) {
      console.error("Failed to mark notifications as read:", error);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {isOpen && (
        <div className="absolute right-0 top-0 z-50 w-95 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3.5">
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                Notifications
              </h3>

              {unreadCount > 0 && (
                <p className="mt-0.5 text-xs text-slate-500">
                  {unreadCount} unread
                </p>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
              >
                <CheckCheck size={14} />
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-105 overflow-y-auto">
            {notifications.length === 0 ? (
              <EmptyNotifications />
            ) : (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800">
        <Bell size={20} className="text-slate-500" />
      </div>

      <p className="text-sm font-medium text-slate-300">No notifications</p>

      <p className="mt-1 text-xs text-slate-500">You're all caught up.</p>
    </div>
  );
};

export default NotificationDropdown;
