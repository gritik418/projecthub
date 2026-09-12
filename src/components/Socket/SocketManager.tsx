import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import type { Notification } from "../../features/notification/notification.interface";
import {
  selectNotifications,
  updateNotifications,
} from "../../features/notification/notification.slice";
import { setActiveUsers } from "../../features/user/user.slice";
import type { AppDispatch, RootState } from "../../store";
import { toast } from "react-toastify";

export const socket = io(import.meta.env.VITE_API_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const SocketManager = () => {
  const accessToken = useSelector(
    (state: RootState) => state.authSlice.accessToken,
  );

  const notifications = useSelector(selectNotifications);

  const dispatch = useDispatch<AppDispatch>();

  const handleNotification = useCallback(
    (notification: Notification) => {
      const updatedNotifications = notifications.some(
        (item) => item.id === notification.id,
      )
        ? notifications
        : [notification, ...notifications];

      dispatch(
        updateNotifications({
          notifications: updatedNotifications,
        }),
      );

      toast(
        <div>
          <p className="text-sm font-semibold">{notification.title}</p>
          <p className="mt-1 text-xs">{notification.message}</p>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        },
      );
    },
    [notifications, dispatch],
  );

  useEffect(() => {
    if (!accessToken) {
      socket.disconnect();
      return;
    }

    socket.auth = {
      token: `Bearer ${accessToken}`,
    };

    socket.connect();

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
    });

    socket.on("active-users", (users) => {
      dispatch(setActiveUsers({ users }));
    });

    socket.on("new-notification", handleNotification);

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("active-users");
      socket.off("new-notification", handleNotification);
    };
  }, [accessToken, dispatch, handleNotification]);

  return null;
};
